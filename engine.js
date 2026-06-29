/**
 * 《孟买名利场》纯文字版引擎 v0.3
 */

const SAVE_KEY = 'mumbai_hs_save_v1';

class StoryEngine {
  constructor(data) {
    this.data = data;
    this.nodeMap = new Map(data.nodes.map((n) => [n.id, n]));
    this.state = this.freshState();
    this.fromRouteReturn = false;
  }

  freshState() {
    return {
      nodeId: this.data.meta.startNode,
      variables: { ...this.data.variables },
      flags: { ...this.data.defaultFlags },
    };
  }

  getNode(id) {
    const node = this.nodeMap.get(id);
    if (!node) throw new Error(`节点不存在: ${id}`);
    return node;
  }

  getCharacterName(speakerId) {
    const c = this.data.characters[speakerId];
    if (!c) return speakerId;
    return c.displayName || c.name || speakerId;
  }

  applyEffects(effects = {}) {
    const deltas = {};
    for (const [key, delta] of Object.entries(effects || {})) {
      if (key in this.state.variables) {
        const before = this.state.variables[key];
        this.state.variables[key] = this.clamp(before + delta, -100, 100);
        deltas[key] = delta;
      }
    }
    return deltas;
  }

  applyFlags(flags = {}) {
    Object.assign(this.state.flags, flags);
  }

  clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  evaluateBranch(conditions) {
    for (const cond of conditions) {
      if (cond.default) continue;
      if (this.matchCondition(cond.if)) return cond.next;
    }
    return conditions.find((c) => c.default)?.next ?? null;
  }

  matchCondition(rule) {
    if (!rule) return false;
    if (rule.variable && rule.gte !== undefined) {
      if (this.state.variables[rule.variable] < rule.gte) return false;
    }
    if (rule.flag !== undefined) {
      const flagVal = this.state.flags[rule.flag];
      if (rule.flagEq !== undefined && flagVal !== rule.flagEq) return false;
      if (rule.flagEq === undefined && !flagVal) return false;
    }
    if (rule.flagNot && this.state.flags[rule.flagNot]) return false;
    return true;
  }

  advanceTo(nodeId) {
    this.state.nodeId = nodeId;
    this.save();
    return this.processAutoChain();
  }

  processAutoChain() {
    let node = this.getNode(this.state.nodeId);
    let guard = 0;

    while (guard++ < 20) {
      if (node.type === 'branch') {
        this.state.nodeId = this.evaluateBranch(node.conditions);
        node = this.getNode(this.state.nodeId);
        continue;
      }
      if (this.fromRouteReturn && node.type === 'chapter_end') {
        this.fromRouteReturn = false;
        if (node.setCheckpoint) {
          this.state.flags.mainline_checkpoint = node.setCheckpoint;
        }
        if (node.next) {
          this.state.nodeId = node.next;
          node = this.getNode(node.next);
          continue;
        }
      }
      break;
    }

    this.save();
    return node;
  }

  handleContinue() {
    const node = this.getNode(this.state.nodeId);
    if (node.setCheckpoint) {
      this.state.flags.mainline_checkpoint = node.setCheckpoint;
    }
    if (node.effects) this.applyEffects(node.effects);
    if (node.flags) this.applyFlags(node.flags);

    if (node.type === 'route_return') {
      if (node.clearRouteFocus) this.state.flags.route_focus = null;
      if (node.flags) this.applyFlags(node.flags);
      const target =
        node.resolveNext === 'mainline_checkpoint'
          ? this.state.flags.mainline_checkpoint
          : node.next;
      this.fromRouteReturn = true;
      return this.advanceTo(target);
    }

    if (node.next) return this.advanceTo(node.next);
    return node;
  }

  handleRouteEnter(node) {
    this.state.flags.route_focus = node.routeFocus ?? null;
    if (node.mainlineCheckpoint) {
      this.state.flags.mainline_checkpoint = node.mainlineCheckpoint;
    }
    if (node.next) return this.advanceTo(node.next);
    return node;
  }

  handleChoice(choice) {
    const deltas = this.applyEffects(choice.effects);
    if (choice.flags) this.applyFlags(choice.flags);
    return { node: this.advanceTo(choice.next), deltas, choice };
  }

  hasSave() {
    return !!localStorage.getItem(SAVE_KEY);
  }

  save() {
    localStorage.setItem(SAVE_KEY, JSON.stringify(this.state));
  }

  load() {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    try {
      this.state = JSON.parse(raw);
      return true;
    } catch {
      return false;
    }
  }

  reset() {
    localStorage.removeItem(SAVE_KEY);
    this.state = this.freshState();
    this.fromRouteReturn = false;
    return this.processAutoChain();
  }
}

class GameUI {
  constructor() {
    this.engine = null;
    this.history = [];
    this.lastLoggedNodeId = null;
    this.pendingRouteEnter = null;
    this.currentNode = null;

    this.els = {
      app: document.getElementById('app'),
      titleScreen: document.getElementById('title-screen'),
      gameTitle: document.getElementById('game-title'),
      titleSubtitle: document.getElementById('title-subtitle'),
      btnStart: document.getElementById('btn-start'),
      btnContinue: document.getElementById('btn-continue'),
      chapter: document.getElementById('chapter-label'),
      scene: document.getElementById('scene-label'),
      routeBadge: document.getElementById('route-badge'),
      history: document.getElementById('history-log'),
      story: document.getElementById('story-text'),
      speaker: document.getElementById('speaker-name'),
      choices: document.getElementById('choices'),
      continueBtn: document.getElementById('continue-btn'),
      affectionPanel: document.getElementById('affection-panel'),
      status: document.getElementById('status-bar'),
      overlay: document.getElementById('chapter-overlay'),
      overlayTitle: document.getElementById('overlay-title'),
      overlayText: document.getElementById('overlay-text'),
      overlayBtn: document.getElementById('overlay-btn'),
      loadError: document.getElementById('load-error'),
      toast: document.getElementById('toast'),
    };

    this.els.btnStart.addEventListener('click', () => this.startNewGame());
    this.els.btnContinue.addEventListener('click', () => this.continueGame());
    this.els.continueBtn.addEventListener('click', () => this.onContinue());
    this.els.overlayBtn.addEventListener('click', () => this.onOverlayClose());
    document.getElementById('btn-reset').addEventListener('click', () => this.onReset());
    document.getElementById('btn-new').addEventListener('click', () => this.onReset());
    document.getElementById('btn-export').addEventListener('click', () => this.onExportPlaytest());

    document.addEventListener('keydown', (e) => this.onKeydown(e));
  }

  async init() {
    try {
      const res = await fetch('story_nodes.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      this.engine = new StoryEngine(data);
      this.els.gameTitle.textContent = data.meta.title;
      this.els.titleSubtitle.textContent =
        '纯文字冒险 Demo · 序章 + 第一章 + Vic 分线 + 第二章达拉维';
      this.els.loadError.hidden = true;
      this.els.btnContinue.hidden = !this.engine.hasSave();
      this.els.titleScreen.hidden = false;
      this.els.app.hidden = true;
    } catch (err) {
      this.els.loadError.hidden = false;
      this.els.titleScreen.hidden = true;
      this.els.loadError.textContent =
        `无法加载 story_nodes.json：${err.message}\n\n请双击 start.bat 或在项目目录运行：\n  npm start\n\n然后打开 http://localhost:3000`;
    }
  }

  startNewGame() {
    this.history = [];
    this.lastLoggedNodeId = null;
    this.engine.reset();
    this.enterGame('新游戏');
  }

  continueGame() {
    this.history = [];
    this.lastLoggedNodeId = null;
    this.engine.load();
    this.enterGame('读取存档');
  }

  enterGame(status) {
    this.els.titleScreen.hidden = true;
    this.els.app.hidden = false;
    this.render(this.engine.processAutoChain(), { forceLog: true });
    this.setStatus(status);
  }

  setStatus(msg) {
    this.els.status.textContent = msg;
  }

  showToast(msg) {
    this.els.toast.textContent = msg;
    this.els.toast.hidden = false;
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      this.els.toast.hidden = true;
    }, 2200);
  }

  formatAffectionDelta(deltas) {
    if (!deltas || !Object.keys(deltas).length) return '';
    const names = { vic: 'Vic', rupesh: 'Rupesh', ananda: 'Ananda', kabir: 'Kabir' };
    return Object.entries(deltas)
      .map(([key, d]) => {
        const id = key.replace('_affection', '');
        const label = names[id] || id;
        return `${label} ${d > 0 ? '+' : ''}${d}`;
      })
      .join('　');
  }

  appendHistory(entry) {
    this.history.push(entry);
    const el = document.createElement('div');
    el.className = `log-entry log-${entry.kind}`;
    if (entry.speaker) {
      const sp = document.createElement('span');
      sp.className = 'log-speaker';
      sp.textContent = entry.speaker;
      el.appendChild(sp);
    }
    const body = document.createElement('div');
    body.className = 'log-body';
    body.textContent = entry.text;
    el.appendChild(body);
    this.els.history.appendChild(el);
    this.els.history.scrollTop = this.els.history.scrollHeight;
  }

  logNode(node, extra) {
    if (node.id === this.lastLoggedNodeId && !extra) return;
    this.lastLoggedNodeId = node.id;

    if (node.type === 'choice') {
      this.appendHistory({ kind: 'choice-prompt', text: node.text });
      return;
    }
    if (node.type === 'dialogue') {
      this.appendHistory({
        kind: 'dialogue',
        speaker: this.engine.getCharacterName(node.speaker),
        text: node.text,
      });
      return;
    }
    if (node.type === 'narration' || node.type === 'route_enter' || node.type === 'route_return') {
      this.appendHistory({ kind: 'narration', text: node.text });
      return;
    }
    if (node.type === 'placeholder') {
      this.appendHistory({ kind: 'system', text: node.text });
    }
    if (extra) {
      this.appendHistory({ kind: 'system', text: extra });
    }
  }

  renderAffection() {
    const { variables } = this.engine.state;
    const heroes = [
      { key: 'vic_affection', id: 'vic', color: '#c9a227' },
      { key: 'rupesh_affection', id: 'rupesh', color: '#4a9eff' },
      { key: 'ananda_affection', id: 'ananda', color: '#9b6dff' },
      { key: 'kabir_affection', id: 'kabir', color: '#e85d6c' },
    ];

    this.els.affectionPanel.innerHTML = heroes
      .map(({ key, id, color }) => {
        const val = variables[key];
        const pct = ((val + 100) / 200) * 100;
        const name = this.engine.getCharacterName(id);
        return `<div class="affection-row">
          <span class="affection-name">${name}</span>
          <div class="affection-track">
            <div class="affection-fill" style="width:${pct}%;background:${color}"></div>
            <div class="affection-center"></div>
          </div>
          <span class="affection-val">${val > 0 ? '+' : ''}${val}</span>
        </div>`;
      })
      .join('');
  }

  render(node, opts = {}) {
    this.currentNode = node;
    this.renderAffection();

    const chapterNames = ['序章', '第一章', '第二章', '第三章', '终章'];
    this.els.chapter.textContent = chapterNames[node.chapter] ?? `第 ${node.chapter} 章`;
    this.els.scene.textContent = node.scene ? node.scene.replace(/_/g, ' ') : '';

    const focus = this.engine.state.flags.route_focus;
    this.els.routeBadge.hidden = !focus;
    if (focus) {
      this.els.routeBadge.textContent = `分线 · ${this.engine.getCharacterName(focus)}`;
    }

    this.els.choices.innerHTML = '';
    this.els.continueBtn.hidden = true;
    this.els.overlay.hidden = true;
    this.pendingRouteEnter = null;

    if (opts.forceLog || node.type !== 'branch') {
      this.logNode(node);
    }

    if (node.type === 'choice') {
      this.els.speaker.hidden = true;
      this.els.story.textContent = node.text;
      node.choices.forEach((c, i) => {
        const btn = document.createElement('button');
        btn.className = `choice-btn choice-${c.choiceType || 'dialogue'}`;
        btn.dataset.index = i + 1;
        btn.innerHTML = `<span class="choice-key">${i + 1}</span><span class="choice-type">${c.choiceType === 'action' ? '行动' : '对话'}</span>${c.label}`;
        btn.addEventListener('click', () => this.pickChoice(c));
        this.els.choices.appendChild(btn);
      });
      return;
    }

    if (node.type === 'chapter_end') {
      this.showOverlay(node.title || '章节结束', node.text, '继续');
      return;
    }

    if (node.type === 'placeholder') {
      this.els.speaker.hidden = true;
      this.els.story.textContent = node.text;
      const btn = document.createElement('button');
      btn.className = 'choice-btn choice-action';
      btn.textContent = '从头再玩一次';
      btn.addEventListener('click', () => this.onReset());
      this.els.choices.appendChild(btn);
      this.setStatus('Demo 完结 — 感谢游玩');
      return;
    }

    if (node.type === 'dialogue') {
      this.els.speaker.hidden = false;
      this.els.speaker.textContent = this.engine.getCharacterName(node.speaker);
      this.els.story.textContent = node.text;
    } else {
      this.els.speaker.hidden = true;
      this.els.story.textContent = node.text || '';
    }

    if (node.type === 'route_enter') {
      this.els.continueBtn.hidden = false;
      this.els.continueBtn.textContent = '赴约 →';
      this.pendingRouteEnter = node;
      return;
    }

    if (node.type === 'route_return') {
      this.els.continueBtn.hidden = false;
      this.els.continueBtn.textContent = '回到主线 →';
      return;
    }

    this.els.continueBtn.hidden = false;
    this.els.continueBtn.textContent = '继续 →';
  }

  pickChoice(choice) {
    const { node, deltas } = this.engine.handleChoice(choice);
    const deltaStr = this.formatAffectionDelta(deltas);
    this.appendHistory({
      kind: 'player',
      text: `➤ ${choice.label}${deltaStr ? `　（${deltaStr}）` : ''}`,
    });
    this.lastLoggedNodeId = null;
    if (deltaStr) this.showToast(deltaStr);
    this.setStatus('已选择');
    this.render(node);
  }

  showOverlay(title, text, btnLabel) {
    this.els.overlay.hidden = false;
    this.els.overlayTitle.textContent = title;
    this.els.overlayText.textContent = text;
    this.els.overlayBtn.textContent = btnLabel;
  }

  onOverlayClose() {
    this.els.overlay.hidden = true;
    const node = this.engine.handleContinue();
    this.lastLoggedNodeId = null;
    this.appendHistory({ kind: 'system', text: `—— ${this.els.overlayTitle.textContent} ——` });
    this.render(node);
  }

  onContinue() {
    const node = this.engine.getNode(this.engine.state.nodeId);

    if (node.type === 'route_enter' && this.pendingRouteEnter) {
      const next = this.engine.handleRouteEnter(node);
      this.pendingRouteEnter = null;
      this.lastLoggedNodeId = null;
      this.setStatus(`进入 ${this.engine.getCharacterName(node.routeFocus)} 分线`);
      this.render(next);
      return;
    }

    const next = this.engine.handleContinue();
    this.lastLoggedNodeId = null;
    this.render(next);
  }

  onReset() {
    if (!confirm('清除存档并重新开始？')) return;
    this.history = [];
    this.lastLoggedNodeId = null;
    this.els.history.innerHTML = '';
    this.render(this.engine.reset(), { forceLog: true });
    this.setStatus('已重置');
    this.els.btnContinue.hidden = false;
  }

  buildPlaytestExport() {
    const state = this.engine?.state;
    const node = this.currentNode;
    const variables = state?.variables || {};
    const flags = state?.flags || {};
    const activeFlags = Object.entries(flags)
      .filter(([, value]) => value !== false && value !== null && value !== undefined)
      .map(([key, value]) => `  - ${key}: ${value}`)
      .join('\n') || '  - none';
    const choices = this.history
      .filter((entry) => entry.kind === 'player')
      .map((entry) => `  - ${entry.text.replace(/^➤\s*/, '')}`)
      .join('\n') || '  - none';

    return `# Playtest Export

## Basic Info

- Story version: ${this.engine?.data?.meta?.version || 'unknown'}
- Exported at: ${new Date().toISOString()}
- Current node: ${state?.nodeId || 'unknown'}
- Current node type: ${node?.type || 'unknown'}
- Chapter: ${node?.chapter ?? 'unknown'}
- Scene: ${node?.scene || 'unknown'}

## Affection

- Vic: ${variables.vic_affection ?? 0}
- Rupesh: ${variables.rupesh_affection ?? 0}
- Kabir: ${variables.kabir_affection ?? 0}
- Ananda: ${variables.ananda_affection ?? 0}

## Active Flags

${activeFlags}

## Major Choices

${choices}

## Current Text

${node?.text || ''}
`;
  }

  async onExportPlaytest() {
    const text = this.buildPlaytestExport();
    try {
      await navigator.clipboard.writeText(text);
      this.showToast('试玩状态已复制');
      this.setStatus('试玩状态已复制，可直接粘贴给 Codex');
    } catch {
      console.log(text);
      this.showToast('复制失败，已输出到控制台');
      this.setStatus('复制失败，请打开控制台复制 Playtest Export');
    }
  }

  onKeydown(e) {
    if (!this.engine || this.els.app.hidden) return;
    if (this.els.overlay.hidden === false) {
      if (e.key === 'Enter') this.onOverlayClose();
      return;
    }

    const node = this.currentNode;
    if (!node) return;

    if (node.type === 'choice') {
      const idx = parseInt(e.key, 10);
      if (idx >= 1 && idx <= node.choices.length) {
        e.preventDefault();
        this.pickChoice(node.choices[idx - 1]);
      }
      return;
    }

    if (!this.els.continueBtn.hidden && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      this.onContinue();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => new GameUI().init());
