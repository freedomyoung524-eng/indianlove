# Dialogue Voice Pass 2026-06-28

> 依据：`design/character_voice_bible.md` 与 `.agents/dialogue-voice-guardian.md`  
> 范围：当前 `story_nodes.json` v0.3.0 全部 `dialogue` 节点与对话型选项  
> 目标：减少 OOC、翻译腔、设定说明腔，以及“角色在朗读旁白”的问题。

---

## Verdict

Needs Minor Polish / Partial Rewrite

试玩版主要角色大方向成立，但当前文本仍有三类问题：

1. **Vic 偶尔在解释设定**，而不是用低声、规则、成本和结果压迫对方。
2. **Kavya 的正式发言过长**，有时像法务模板，不像玩家角色在现场快速控局。
3. **第二章若干 `dialogue` 节点混入旁白**，UI 会显示为某角色说完整段舞台说明，破坏沉浸。

---

## Voice Consistency Score

| 角色 | 分数 | 说明 |
|------|------|------|
| Vic | 7/10 | 压迫感基本有，但部分台词问句过多、解释过多 |
| Rupesh | 8/10 | 技术刺感和柔软反差较好，少数节点混入旁白 |
| Kabir | 8/10 | 第二章情绪很准，但余波节点需避免旁白归入他说话 |
| Ananda | 8/10 | 暗示语符合角色；当前戏份少 |
| Kavya | 6/10 | 专业性有，但法务长句偏模板，需要更像现场控局 |
| Supporting cast | 7/10 | 助理已改善，Praya 可再更口语 |

---

## Priority Findings

### 1. [P1] `ch2_choice_protect_rupesh`

Current issue: `speaker: rupesh` 但文本包含“你先接了地下室”“上方传来人群尖叫”等旁白。  
Voice rule violated: 角色不应朗读环境说明。  
Fix level: node rewrite / type change.

建议：改为 `narration`，保留 Rupesh 直接台词为引号内片段。

### 2. [P1] `ch2_aftermath_kabir`, `ch2_aftermath_rupesh`, `ch2_aftermath_vic`

Current issue: 都是 `dialogue` 节点，但含大量旁白动作。  
Voice rule violated: UI speaker 会让旁白看起来像角色自述。  
Fix level: node rewrite / type change.

建议：暂时改为 `narration`，用引号保留角色声音；后续正式版可拆成旁白节点 + 对话节点。

### 3. [P2] `ch1_vic_entrance`

Current:

> 你就是新来的公关？坐。今天你会看到很多不该看的东西——学会假装没看见，是你的第一份工作。

Problem: Vic 在直接告诉玩家“你的工作是什么”，略像主题说明。  
Fix: 改为证据、位置、留痕，增强 Vic 的规则感。

### 4. [P2] `ch1_vic_blindbox_brief`

Problem: 信息有效，但“你把条款洗干净，然后念给他们听”略直接。  
Fix: 保留命令感，换成更 Vic 的“纸面干净”。

### 5. [P2] `vic_private_2`

Problem: “我是在给自己留一条后路”解释性偏强。  
Fix: 让 Vic 用账、门、钥匙表达，不直接解释心思。

### 6. [P2] `ch2_vic_phone_offer`

Problem: 一连串问句削弱 Vic 的陈述式压迫。  
Fix: 改成规则清单式陈述，只留一个核心选择。

### 7. [P2] `ch1_blindbox_proposal`

Problem: Kavya 发言过长，偏法务模板。  
Fix: 缩短为现场可说出口的专业话术。

---

## Patch Plan

本轮先修高影响节点，不全面重写剧情：

1. 修 Vic 开场、盲盒命令、私人码头和第二章电话。
2. 缩短 Kavya 的盲盒协议发言。
3. 将第二章混合旁白的 `dialogue` 节点改为 `narration`。
4. 保留剧情结构和跳转不变。

