# 《孟买名利场》游戏设计文档（GDD）

> 版本：0.2 · Demo 导向（经 plot-designer 校验修订）  
> 类型：女性向 · 文字冒险 · 选项驱动  
> 输出目标：`story_nodes.json` 供前端引擎调用

---

## 1. 游戏概述

### 1.1 一句话定位

玩家扮演刚毕业的印度女大学生 **Kavya**，以高级公关顾问身份卷入孟买财阀、暗网、灵修圈与娱乐圈的权力漩涡。在公共战役与角色分线中做出对话与行动选择，与四位男主建立关系，最终走向各自 Good / Bad 结局。

### 1.2 版本规划

| 阶段 | 表现层 | 目标 |
|------|--------|------|
| **Demo（当前）** | 纯文字 + 选项按钮 | 验证公共线、好感度、分线切回、checkpoint 机制 |
| **正式版** | 立绘 + 背景图 + BGM/SE | 在 Demo 数据层上叠加视觉与音效，不改核心逻辑 |

Demo 与正式版共用同一份 `story_nodes.json`，正式版仅扩展 `scene` 节点的 `assets` 字段。

### 1.3 虚构声明

本作人物与机构均为虚构，映射印度财阀、媒体、种姓阶级等社会张力，**不对应任何真实政治人物或机构**。技术、司法名词追求「像真的」而非考据式写实。

---

## 2. 角色设定

### 2.1 命名对照表

| ID | 显示名 | 别名/备注 | 旧稿异名 |
|----|--------|-----------|----------|
| `kavya` | Kavya | 女主，玩家角色 | — |
| `vic` | Vikram | 日常简称 Vic（人名昵称，非姓氏） | Rakesh |
| `malhotra` | 马尔霍特拉航运 | 家族物流企业，Vikram 任董事长 | 勿称「Vic 集团」 |
| `rupesh` | Rupesh | 暗网化名 Zaker | — |
| `ananda` | Ananda | 灵修大师 | — |
| `kabir` | Kabir | 前总理之子、顶流 | — |
| `praya` | Praya | Vic 之妹，22 岁，Kabir 粉丝 | — |
| `gayatri` | Gayatri | Vic 继母 | — |

### 2.2 女主：Kavya

- **身份**：刚毕业的印度女大学生，孟买高级公关顾问
- **能力锚点**：舆论操盘、危机公关、读懂权力牌桌
- **情感立场**：由玩家选择体现，不设独立「女主好感度」数值

### 2.3 四位男主（摘要）

详细人设与**外貌声线**见 `design/*.md.txt` 各文件「👤 初次出场」章节。

| 男主 | 年龄 | 身高 | 乙女系 | 外形关键词 | 着装关键词 |
|------|------|------|--------|------------|------------|
| **Vikram (Vic)** | 29 | 188cm | 冷峻帝王 | 深琥珀眼、锋利下颌、攀岩肩背 | 炭灰定制三件套、极简名表 |
| **Rupesh** | 22 | 178cm | 天才犬系 | 亮眸、微乱刘海、精瘦前倾 | 硅谷衬衫、贵牌球鞋、贴纸平板 |
| **Ananda** | 34 | 183cm | 妖僧魅惑 | 蜜褐肤、狭长眼、及肩微卷发 | 月白亚麻长衫、念珠檀香 |
| **Kabir** | 27 | 182cm | 疯批美人 | 宝莱坞骨相、深睫、消瘦仍上镜 | 高定叠穿、猩红名场面外套 |

| 男主 | 生态位 | 核心心声 |
|------|--------|----------|
| **Vic** | 物流帝国继承人 | 不要跟蠢货太多计较，那只是浪费时间 |
| **Rupesh** | 暗网骇客 Zaker | （角色幽默台词，非世界观设定） |
| **Ananda** | 灵修大师 | 在谎言与恐惧中期待纯真拯救 |
| **Kabir** | 坠落神坛顶流 | 以肉身与脸为筹码，做阶级献祭的轮盘赌 |

**文字初遇规则：** 男主第一次进入场景时，须先写外貌/着装（1～3 句），再写台词或动作；详见各 `design` 档案「初遇镜头建议」。

### 2.4 男主关系网（剧情约束）

- Vic 与 Rupesh：投资局中的利用与欣赏，非绝对敌对
- Vic 之妹 Praya 暗恋 Kabir；Vic 对 Kabir 印象差但纵容妹妹
- Ananda 与豪门贵妇圈（含 Vic 姑姑）有利益链；Gayatri 庄园事件是 Ananda 线核心前置
- Rupesh（Zaker）曾扳倒 Kabir 父亲，Kabir 与 Rupesh 有隐含世仇张力
- 四人均会参与或影响公共战役，禁止写死「只能攻略一人」的世界状态

### 2.5 势力与家族约束

| 势力 | 约束 |
|------|------|
| **Vikram 家族（马尔霍特拉）** | 垄断物流、港口、海关报关；Vikram 黑化源于 Raven 之死与 B 家族空域禁令 |
| **B 家族（Sinha 家族）** | 军工门阀，对外常用 Sinha 姓氏；劣质钢材案、达拉维强拆、游轮收网的总幕后 |
| **Kabir 家族** | 前总理政治遗产崩塌，Kabir 从顶流跌落负债 |
| **Gayatri** | Vic 继母，庄园毒药线推动者，游轮合围参与者 |

---

## 3. 核心玩法

### 3.1 游戏循环

```
阅读旁白/对话 → 选项（对话/行动）→ 更新好感度 + flags
    → 下一节点（主线 / 分线 / 回归主线）→ 章节结算 → 终章结局
```

### 3.2 选项类型

| 类型 | `choiceType` | 说明 |
|------|--------------|------|
| **对话型** | `dialogue` | 说什么、语气、是否试探/撒谎 |
| **行动型** | `action` | 做什么、站队、是否冒险 |

### 3.3 选项设计原则

- 每个选项至少影响一位男主好感度或一个剧情标记
- 玩家应在利益、情感、道德间取舍，避免唯一正确答案
- 公共事件中，未登场男主可通过新闻/传闻受到间接影响

---

## 4. 数值系统：好感度

### 4.1 单向好感度

采用 **男主 → Kavya** 单向好感度，不为主角另建感情数值。玩家选择即代表 Kavya 态度；`route_focus` 标记当前深入分线。

Demo 阶段仅用 `affection` 一维。Vic 的「信任/防备」在 Demo 中用 **proxy flags** 代理（见 §5.5）。

### 4.2 好感度变量

| 字段 | 范围 | 初始值 |
|------|------|--------|
| `vic_affection` | -100 ~ 100 | 0 |
| `rupesh_affection` | -100 ~ 100 | 0 |
| `ananda_affection` | -100 ~ 100 | 0 |
| `kabir_affection` | -100 ~ 100 | 0 |

| 区间 | 语义 |
|------|------|
| 60 ~ 100 | 高好感，Good End 候选 |
| 20 ~ 59 | 暧昧，可触发小分线 |
| -19 ~ 19 | 中立 |
| -59 ~ -20 | 冷淡，Bad End 风险积累 |
| -100 ~ -60 | 敌对（仅由背叛类选项可达，见 §4.3） |

单次选项：**±3 ~ ±15**；关键战役：**±20 ~ ±30**。

### 4.3 竞争性衰减（修订）

偏袒某男主时，**同场其他男主**可小幅扣分（-3 ~ -8），但：

- 不强制零和
- **衰减下限**：仅衰减不会把任何男主推至 **-30 以下**；跌破 -30 必须来自明确的背叛/羞辱类选项
- 切回主线后，未互动男主好感不自动衰减

### 4.4 剧情标记（flags）

#### 4.4.1 路线控制

| 标记 | 类型 | 用途 |
|------|------|------|
| `route_focus` | `string\|null` | 当前深入分线的男主 ID |
| `mainline_checkpoint` | `string` | 进入分线前的主线节点 ID，`route_return` 跳回目标 |

#### 4.4.2 Ananda 庄园线（序章末前置）

| 标记 | 设置时机 | 用途 |
|------|----------|------|
| `ananda_poison_sample_received` | 庄园送客时收下样本 | Ananda 分线门槛 |
| `ananda_distress_signal_read` | 识破求救信号 | Ananda Good End 必要条件 |
| `ananda_manor_escape_witnessed` | 目睹 Ananda 借势离场 | 第三章游轮信任基础 |

#### 4.4.3 第一章：闭门投资局

| 标记 | 用途 |
|------|------|
| `ch1_stood_with_vic` | Vic Good End 条件 |
| `ch1_helped_rupesh` | Rupesh Good End 条件 |
| `ch1_blindbox_signed` | 公共结果（默认 true） |

#### 4.4.4 第二章：达拉维强拆

| 标记 | 用途 |
|------|------|
| `ch2_kabir_lifesaver` | Kabir Good End 条件 |
| `ch2_rupesh_trace_destroyed` | Rupesh Good End 条件 |
| `ch2_satellite_live_60s` | 公共结果；第三章机制前置 |
| `ch2_vic_phone_moment` | Vic 电话节点选择记录（代理 trust） |

#### 4.4.5 第三章：公海游轮

| 标记 | 用途 |
|------|------|
| `ch3_cruise_blind_60s` | 公共结果（烟花盲区） |
| `ch3_evidence_to_vic` | Vic Good End 条件 |
| `ch3_ananda_cold_storage_rescued` | Ananda Good End 条件 |
| `ch3_kabir_escape_stage` | Kabir Good End 条件 |
| `b_family_ledger_decrypted` | Rupesh 解密完成（公共 true） |
| `ledger_holder` | `rupesh`\|`vic`\|`kabir`\|`kavya` |
| `ledger_given_to_kabir` | Kabir Good End **必要条件** |

#### 4.4.6 背叛类标记（Bad End 触发）

| 标记 | 影响 |
|------|------|
| `vic_betrayed` | 出卖 Vic 商业机密或当众羞辱 |
| `rupesh_betrayed` | 出卖 Zaker 身份或站财阀压榨 |
| `ananda_betrayed` | 游轮弃冷库、公开毒药证据陷害 |
| `kabir_betrayed` | 拍卖会上冷眼旁观并媒体消费其尊严 |

---

## 5. 路线架构

### 5.1 总体结构

```
序章：入局
    ↓
序章末：庄园祈福大典（Ananda 前置公共事件）
    ↓
第一章：闭门投资局
    ↓
第二章：达拉维强拆暴乱
    ↓
第三章：公海游轮 · 焚心之夜
    ↓
终章：孟买天亮（结局结算）
```

各章之间可插入男主分线（`route_enter` → `route_return`）。

### 5.2 进入男主分线

同时满足：

1. 该男主 `affection` ≥ 40
2. 到达分线入口节点
3. 未触发 `*_betrayed` 且未触发路线关闭

进入时：设置 `route_focus`，将 **当前主线节点 ID** 写入 `mainline_checkpoint`，不重置好感度。

### 5.3 从分线切回主线（统一规范）

**引擎规则（强制）：**

1. `route_enter` 必须把进入分线前的最后一个主线节点 ID 写入 `flags.mainline_checkpoint`
2. `route_return` 节点 **不得** 写死 `next` 为目标章节；必须使用 `resolveNext: "mainline_checkpoint"`
3. 引擎读取 `flags.mainline_checkpoint`，跳转到该节点；若该节点已是章节末，则继续其 `next` 链

```json
{
  "id": "vic_private_scene_1_end",
  "type": "route_return",
  "text": "天快亮了。孟买的权力牌桌不会等你沉溺私情。",
  "clearRouteFocus": true,
  "resolveNext": "mainline_checkpoint"
}
```

**禁止写法（已废弃）：**

```json
{ "type": "route_return", "next": "ch2_dharavi_intro" }
```

Demo 说明：`ch1_investment_end` 作为 checkpoint 时，`route_return` 回到该节点；该节点的 `next` 指向 `ch2_dharavi_placeholder`（占位节点，文案提示「第二章即将开放」）。

### 5.4 多男主同场公共事件

节点三层结构：公共叙事层 → 视角备注层（`route_focus` 时追加）→ 选项层。

### 5.5 结局判定（重写）

#### 5.5.1 Good End 判定

**Step 1 — 确定候选男主：**

```
candidates = [男主 | affection ≥ 60]
```

**Step 2 — 排序（高 → 低）：**

1. `route_focus` 在终章仍指向该男主
2. 该男主 Good End 必要条件 flags 完成数量
3. `affection` 数值

**Step 3 — 校验必要条件：**

| 男主 | Good End | affection | 必要条件 flags |
|------|----------|-----------|----------------|
| Vic | 利益共谋者 | ≥ 60 | `ch1_stood_with_vic` + `ch3_evidence_to_vic` |
| Rupesh | 泥沼中的星光 | ≥ 60 | `ch1_helped_rupesh` + `ch2_rupesh_trace_destroyed` |
| Ananda | 致命的天生共犯 | ≥ 60 | `ananda_distress_signal_read` + `ch3_ananda_cold_storage_rescued` |
| Kabir | 帝国的重建 | ≥ 60 | `ch2_kabir_lifesaver` + `ch3_kabir_escape_stage` + `ledger_given_to_kabir` |

全部满足 → 该男主 **Good End**。满足好感但缺 flags → 进入该男主 **Incomplete End**（暧昧/未竟，正式版文案）。

#### 5.5.2 Bad End 判定（修订，防误杀）

**原则：** 多线探索中「附带得罪」不会单独触发 Bad End。Bad End 需 **好感极低 + 主动背叛/抛弃**。

仅当以下 **全部满足** 时触发某男主 Bad End：

1. `affection` ≤ **-50**
2. 且满足以下 **任一**：
   - 存在该男主的 `*_betrayed` flag
   - 终章 `route_focus` 为该男主且其 Good 必要条件 flags **少于一半**
3. 且该男主 **不是** 当前 Good End 候选第一名

| 男主 | Bad End | 典型触发 |
|------|---------|----------|
| Vic | 危险的雀鸟 | `vic_betrayed` 或长期偏袒他人 + `ch3_evidence_to_vic` 缺失 + affection ≤ -50 |
| Rupesh | 孤绝的毁灭者 | `rupesh_betrayed` 或出卖 Zaker 身份 |
| Ananda | 江湖不见 | `ananda_betrayed` 或冷库未救援且 `ananda_distress_signal_read` 为 false |
| Kabir | 破碎的飞鸟 | `kabir_betrayed` 或拍卖会上将其当舆论工具 |

**竞争性衰减** 单独造成的好感下降 **不得** 触发条件 1（因有 §4.3 下限保护）。

#### 5.5.3 账本跨线分配（Kabir 线关键）

第三章游轮 `ch3_ledger_choice` 节点（行动型）：

| 选项 | `ledger_holder` | 效果 |
|------|-----------------|------|
| 交给 Kabir | `kabir` | 设置 `ledger_given_to_kabir: true`；`kabir_affection +25` |
| 交给 Vic | `vic` | `vic_affection +20`；Kabir Good End 关闭 |
| 交给 Rupesh | `rupesh` | `rupesh_affection +20`；Kabir 政治线受阻 |
| 暂时持有 | `kavya` | 终章前 `ch_finale_ledger_decide` 再分配 |

默认：解密完成后 `ledger_holder = "rupesh"`，直到玩家做出分配选择。

#### 5.5.4 终章结算优先级（并列时）

```
1. route_focus（若有效且 affection ≥ 60）
2. Good flags 完成数
3. affection 最高
4. 若仍并列 → Incomplete End，由 UI 提示「你同时握住了多张牌」
```

---

## 6. 章节与事件大纲

公共战役正文见 `design/public.md.txt`（已补全）。

### 6.1 序章：入局

- Kavya 入职 Vic 家族公关部
- 四大男主社会位置简介
- 教学选项 1~2 个

**节点预算：** 8～12

### 6.2 序章末：庄园祈福大典（Ananda 前置）

> 详见 `design/public.md.txt` 庄园章节；`design/ananda.md.txt` 事件一

- **时间**：第一章投资局之前
- **公共核心**：Gayatri 借祈福设毒杀局；Ananda 识破酥油含乌头碱
- **男主戏份**：Ananda 主场；Vic 驱赶离场
- **关键选项**：
  - 对话型：是否当面点破毒药
  - 行动型：是否收下 Ananda 留下的样本
- **分线入口**：`ananda_distress_signal_read` + affection ≥ 40 → `enter_ananda_route_manor`（短分线，可切回）

**Demo 范围：** ❌ 不实现（正式版序章末）；GDD 与 flags 已定义，供 JSON 生产

### 6.3 第一章：闭门投资局

- **公共核心**：Rupesh 数字孪生伪装、Vic 盲盒协议、Kavya 法务包装
- **男主戏份**：Vic、Rupesh 主场；Kabir 经 Praya 侧写
- **分线入口**：Vic/Rupesh affection ≥ 40 → 各自分线

**节点预算：** 15～20

### 6.4 第二章：达拉维强拆暴乱

- **公共核心**：推土机、信号干扰、60 秒全球直播
- **男主戏份**：Kabir 挡履带；Rupesh 地下室毁证；Vic 高空旁观
- **分线入口**：Kabir/Rupesh 事件后分线

**Demo 范围：** ❌ 仅占位节点 `ch2_dharavi_placeholder`

### 6.5 第三章：公海游轮 · 焚心之夜

- **公共核心**：B 家族合围、烟花 60 秒盲区、账本解密
- **男主戏份**：四人全员；含 `ch3_ledger_choice`
- **分线入口**：Ananda 冷库逃生后 → `ananda_confession`（需庄园 flags）

**Demo 范围：** ❌ 不实现

### 6.6 终章：孟买天亮

- 按 §5.5 结算 Good / Bad / Incomplete End

---

## 7. 节点数据规范（`story_nodes.json`）

### 7.1 顶层结构

```json
{
  "meta": { "title": "孟买名利场", "version": "0.2.0", "playerId": "kavya" },
  "characters": {},
  "variables": {},
  "flags": {},
  "nodes": []
}
```

### 7.2 节点类型

| type | 用途 |
|------|------|
| `narration` | 旁白 |
| `dialogue` | 角色台词 |
| `choice` | 玩家选项 |
| `branch` | 条件跳转 |
| `route_enter` | 进入分线，写入 `route_focus` + `mainline_checkpoint` |
| `route_return` | 结束分线，`resolveNext: "mainline_checkpoint"` |
| `scene` | 场景切换（正式版） |
| `chapter_end` | 章节结算 |
| `placeholder` | Demo 占位（如未开放章节提示） |

### 7.3 `route_enter` 示例

```json
{
  "id": "enter_vic_route_1",
  "type": "route_enter",
  "routeFocus": "vic",
  "mainlineCheckpoint": "ch1_investment_end",
  "text": "投资局散场后，Vic 的助理送来一张只有你能看懂的便签。",
  "next": "vic_private_scene_1"
}
```

> `mainlineCheckpoint` 由引擎写入 `flags.mainline_checkpoint`。

### 7.4 `route_return` 示例（规范写法）

```json
{
  "id": "vic_private_scene_1_end",
  "type": "route_return",
  "clearRouteFocus": true,
  "resolveNext": "mainline_checkpoint",
  "text": "天快亮了。孟买的权力牌桌不会等你沉溺私情。"
}
```

### 7.5 账本分配选项示例

```json
{
  "id": "ch3_ledger_choice",
  "type": "choice",
  "chapter": 3,
  "text": "解密进度 100%。原始账本在你手中，而甲板上 Kabir 正在被拍卖。",
  "choices": [
    {
      "id": "ledger_to_kabir",
      "label": "把账本交给 Kabir——他比任何人都需要这把刀。",
      "choiceType": "action",
      "effects": { "kabir_affection": 25 },
      "flags": { "ledger_holder": "kabir", "ledger_given_to_kabir": true },
      "next": "ch3_kabir_escape_continue"
    },
    {
      "id": "ledger_to_vic",
      "label": "把账本交给 Vic——这是他的牌桌。",
      "choiceType": "action",
      "effects": { "vic_affection": 20, "kabir_affection": -10 },
      "flags": { "ledger_holder": "vic", "ledger_given_to_kabir": false },
      "next": "ch3_vic_vip_continue"
    }
  ]
}
```

---

## 8. Demo 交付范围

### 8.1 必须实现

| 模块 | 节点预算 |
|------|----------|
| 序章 | 8～12 |
| 第一章「闭门投资局」 | 15～20 |
| Vic 分线（进入 + 切回） | 8～12 |
| 第二章占位 `ch2_dharavi_placeholder` | 1 |
| **合计** | **约 32～45** |

- [ ] 四位男主好感度显示
- [ ] `choiceType` 区分 dialogue / action
- [ ] 存档：nodeId + variables + flags
- [ ] `route_return` 使用 `resolveNext: "mainline_checkpoint"` 验证

### 8.2 Demo 不实现

- 庄园祈福大典（Ananda 前置）
- 第二、三章可玩内容
- 全部 8 个结局
- 立绘、背景、BGM

### 8.3 验收标准

1. 序章 → 第一章 → Vic 分线 → `route_return` 回到 `ch1_investment_end` → 进入 `ch2_dharavi_placeholder`，无死节点
2. 不同选项致至少两位男主好感差 ≥ 10
3. `ledger_given_to_kabir` 等 flags 在 Demo 中可不出现，但 schema 与 §4.4 一致
4. `/plot-designer` 校验无严重冲突

---

## 9. 开发流水线

```
design/*.md.txt → story_nodes.json → /plot-designer 校验 → Demo 引擎 → 迭代扩展
```

---

## 10. 附录：结局条件速查

| 男主 | Good End | 必要 flags | Bad End | 触发 |
|------|----------|------------|---------|------|
| Vic | 利益共谋者 | `ch1_stood_with_vic` + `ch3_evidence_to_vic` | 危险的雀鸟 | `vic_betrayed` 或 focus 失败 + affection ≤ -50 |
| Rupesh | 泥沼中的星光 | `ch1_helped_rupesh` + `ch2_rupesh_trace_destroyed` | 孤绝的毁灭者 | `rupesh_betrayed` + affection ≤ -50 |
| Ananda | 致命的天生共犯 | `ananda_distress_signal_read` + `ch3_ananda_cold_storage_rescued` | 江湖不见 | `ananda_betrayed` 或冷库弃置 + affection ≤ -50 |
| Kabir | 帝国的重建 | `ch2_kabir_lifesaver` + `ch3_kabir_escape_stage` + `ledger_given_to_kabir` | 破碎的飞鸟 | `kabir_betrayed` + affection ≤ -50 |

---

## 11. 待决事项

- [ ] 终章并列 Good End 的 UI 提示文案
- [ ] 正式版立绘数量与表情拆分
- [ ] Vic `trust` 第二维是否在正式版启用（Demo 用 `ch2_vic_phone_moment` 代理）
