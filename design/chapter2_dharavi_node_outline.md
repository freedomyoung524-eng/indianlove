# 第二章「达拉维强拆暴乱」可玩节点大纲

> 来源：`design/audits/dharavi_quality_audit.md`  
> 目标：将第二章从公共事件设定推进为可实装的节点方案。  
> 状态：可进入下一轮质检；暂不直接写入 `story_nodes.json`。

---

## 1. 章节核心

第二章不是单纯的强拆救援，而是“四个人争夺同一个 60 秒窗口”。

| 角色 | 这 60 秒对他意味着什么 | 路线独占真相 |
|------|------------------------|--------------|
| Kabir | 用直播让自己活下来，也让粉丝重新政治化 | 他不是冲动挡车，而是录好了遗言，准备用身体完成最后一场表演 |
| Rupesh | 销毁原始网关，切断 Zaker 与坍塌案幸存者身份的物证链 | 他烧掉的不只是主板，而是 B 家族能二次利用死者的证据 |
| Vic | 判断 Kavya 能否在不暴露盲盒协议的情况下控局 | 他不是不救，而是不允许救援牵出马尔霍特拉与 Rupesh 的秘密交易 |
| Ananda | 验证 Kavya 是否值得继续交换灰色情报 | 他提前从上流圈闲谈中拼出强拆会提前，但只给隐晦暗示 |

---

## 2. 新增或使用的 flags

### 已在 GDD 中定义

| flag | 类型 | 用途 |
|------|------|------|
| `ch2_kabir_lifesaver` | boolean | Kabir Good End 条件之一 |
| `ch2_rupesh_trace_destroyed` | boolean | Rupesh Good End 条件之一 |
| `ch2_satellite_live_60s` | boolean | 公共结果；第三章游轮机制前置 |
| `ch2_vic_phone_moment` | boolean | Vic 电话节点选择记录 |

### 建议新增

| flag | 类型 | 用途 |
|------|------|------|
| `ch2_public_first` | boolean | 玩家优先救 Kabir / 开直播 |
| `ch2_rupesh_first` | boolean | 玩家优先保 Rupesh / 毁证 |
| `ch2_professional_firewall` | boolean | 玩家采用 Vic 式专业控局 |
| `ch2_ananda_warning_used` | boolean | 玩家使用 Ananda 的提前暗示 |
| `ch2_kabir_last_message_seen` | boolean | 玩家看到 Kabir 未发送遗言 |
| `ch2_rupesh_origin_burned` | boolean | 玩家知道 Rupesh 销毁的是旧身份连接 |

### 依赖但当前 Demo 尚未实现的前置 flags

| flag | 来源 | 第二章用途 |
|------|------|------------|
| `ananda_poison_sample_received` | 庄园祈福大典 | 解锁 Ananda 提前暗示 |
| `ananda_distress_signal_read` | 庄园祈福大典 | 解锁 Ananda 提前暗示 |

如果第二章先于庄园线实装，可以让 Ananda 暗示节点暂时走默认未解锁分支。

---

## 3. 节点总览

```text
ch2_dharavi_intro
  → ch2_ananda_warning_branch
  → ch2_news_false_delay
  → ch2_arrival_split_view
  → ch2_kabir_on_tread
  → ch2_rupesh_basement_signal
  → ch2_vic_phone_offer
  → ch2_choice_priority
      A → ch2_choice_save_kabir
      B → ch2_choice_protect_rupesh
      C → ch2_choice_professional_firewall
  → ch2_satellite_live_60s
  → ch2_aftermath_route_truth
  → ch2_dharavi_end
  → ch2_route_branch
```

---

## 4. 节点详案

### `ch2_dharavi_intro`

| 字段 | 内容 |
|------|------|
| type | `narration` |
| chapter | 2 |
| scene | `dharavi_morning` |
| 目的 | 从第一章投资局后切入第二章，建立“延期公告”的假平静 |
| 文本要点 | 早晨新闻称达拉维城市更新延期；Kavya 的工作群却异常安静；Praya 连续未接电话 |
| next | `ch2_ananda_warning_branch` |

关键写法：不要一上来就写推土机。先写“平静不可信”，给 Ananda 暗示和后续突发留空间。

---

### `ch2_ananda_warning_branch`

| 字段 | 内容 |
|------|------|
| type | `branch` |
| 目的 | 如果玩家有 Ananda 前置关系，解锁提前情报 |
| 条件 1 | `ananda_poison_sample_received === true` → `ch2_ananda_warning` |
| 条件 2 | `ananda_distress_signal_read === true` → `ch2_ananda_warning` |
| default | `ch2_news_false_delay` |

---

### `ch2_ananda_warning`

| 字段 | 内容 |
|------|------|
| type | `dialogue` 或 `narration` |
| speaker | `ananda`（语音/消息） |
| 目的 | 让 Ananda 不到场也参与第二章真相层 |
| 文本要点 | “今天别相信延期公告。贵妇们不会为了尘土改下午茶。” |
| effects | `ananda_affection +6` |
| flags | `ch2_ananda_warning_used: true` |
| next | `ch2_news_false_delay` |

作用：玩家二刷 Ananda 线时会意识到强拆不是突发，而是上流圈早已默许的行动。

---

### `ch2_news_false_delay`

| 字段 | 内容 |
|------|------|
| type | `narration` |
| 目的 | 将“延期是假”落实为行动压力 |
| 文本要点 | 新闻还在滚动延期公告；Praya 的消息突然弹出：Kabir 去了达拉维剧院；同一时间，陌生号码发来地下室坐标 |
| next | `ch2_arrival_split_view` |

---

### `ch2_arrival_split_view`

| 字段 | 内容 |
|------|------|
| type | `narration` |
| scene | `dharavi_demolition_line` |
| 目的 | 建立地上/地下双倒计时 |
| 文本要点 | 推土机、干扰车、警戒线、剧院招牌；手机信号从 5G 掉到无服务；地下坐标仍在闪 |
| next | `ch2_kabir_on_tread` |

---

### `ch2_kabir_on_tread`

| 字段 | 内容 |
|------|------|
| type | `narration` |
| 目的 | Kabir 名场面；先给情绪冲击，暂不解释全部动机 |
| 文本要点 | 猩红高定外套落在泥水里；Kabir 坐在履带正前方；镜头无法连通；他对驾驶员微笑 |
| 可记忆台词 | Kabir：“别哭。看清楚，是谁把我推到这里。” |
| next | `ch2_rupesh_basement_signal` |

路线信息锁：Kabir 的遗言视频此时不直接暴露，只埋手机屏幕“未发送草稿”的视觉。

---

### `ch2_rupesh_basement_signal`

| 字段 | 内容 |
|------|------|
| type | `dialogue` |
| speaker | `rupesh` |
| 目的 | 引出地下倒计时与 Rupesh 真相 |
| 文本要点 | Rupesh 短讯或耳机接入：“别只看地上。地下室还有 90 秒。”；他正在烧主板；推土机会压塌出口 |
| next | `ch2_vic_phone_offer` |

路线信息锁：此时只说“主板不能落到他们手里”，不直接说这与家人旧案有关。

---

### `ch2_vic_phone_offer`

| 字段 | 内容 |
|------|------|
| type | `dialogue` |
| speaker | `vic` |
| 目的 | 让 Vic 远程进入公共事件，建立专业控局选择 |
| 文本要点 | Kavya 拨给 Vic；他已通过高空镜头看见现场；他不问“人死没死”，只问“这次直播的法律主体是谁” |
| 可记忆台词 | Vic：“你要我救人，还是要我教你怎么让他们不敢杀人？” |
| next | `ch2_choice_priority` |

---

### `ch2_choice_priority`

| 字段 | 内容 |
|------|------|
| type | `choice` |
| 目的 | 第二章核心选择 |
| 文本要点 | 你只有一个 60 秒窗口。地上是 Kabir 的身体，地下是 Rupesh 的过去，高处是 Vic 的镜头。 |

#### 选项 A：优先救 Kabir

```json
{
  "id": "ch2_c_save_kabir",
  "label": "先抢直播窗口，让全世界看见履带前的 Kabir。",
  "choiceType": "action",
  "effects": { "kabir_affection": 18, "rupesh_affection": -5, "vic_affection": -4 },
  "flags": {
    "ch2_kabir_lifesaver": true,
    "ch2_satellite_live_60s": true,
    "ch2_public_first": true,
    "ch2_kabir_last_message_seen": true
  },
  "next": "ch2_choice_save_kabir"
}
```

#### 选项 B：优先保 Rupesh

```json
{
  "id": "ch2_c_protect_rupesh",
  "label": "先接地下室信号，给 Rupesh 争取毁证时间。",
  "choiceType": "action",
  "effects": { "rupesh_affection": 18, "kabir_affection": -6, "vic_affection": 3 },
  "flags": {
    "ch2_rupesh_trace_destroyed": true,
    "ch2_satellite_live_60s": true,
    "ch2_rupesh_first": true,
    "ch2_rupesh_origin_burned": true
  },
  "next": "ch2_choice_protect_rupesh"
}
```

#### 选项 C：专业控局

```json
{
  "id": "ch2_c_professional_firewall",
  "label": "让 Vic 借镜头、Rupesh 借频段，你来切割直播主体。",
  "choiceType": "action",
  "effects": { "vic_affection": 15, "kabir_affection": 8, "rupesh_affection": 8 },
  "flags": {
    "ch2_kabir_lifesaver": true,
    "ch2_rupesh_trace_destroyed": true,
    "ch2_satellite_live_60s": true,
    "ch2_vic_phone_moment": true,
    "ch2_professional_firewall": true
  },
  "next": "ch2_choice_professional_firewall"
}
```

---

### `ch2_choice_save_kabir`

| 字段 | 内容 |
|------|------|
| type | `narration` |
| 目的 | Kabir 优先路线的信息奖励与代价 |
| 文本要点 | 直播先接通；Kabir 的脸出现在全球 feed；你看到他手机里的未发送视频标题：“给还愿意看我的人” |
| 独占真相 | Kabir 是主动把自己变成政治画面，不是单纯等救 |
| 代价 | 地下室信号一度失联；Rupesh 后续语气变冷 |
| next | `ch2_satellite_live_60s` |

---

### `ch2_choice_protect_rupesh`

| 字段 | 内容 |
|------|------|
| type | `dialogue` / `narration` |
| 目的 | Rupesh 优先路线的信息奖励与代价 |
| 文本要点 | Kavya 先接入地下室；Rupesh 烧毁主板前停了半秒；他承认这块板连着他家人旧案的最后物理痕迹 |
| 可记忆台词 | Rupesh：“别用那种眼神看我。我不是在烧机器，我是在烧他们给我留的姓。” |
| 代价 | Kabir 的履带距离更近；直播开启时他已经撑过最危险的几秒 |
| next | `ch2_satellite_live_60s` |

---

### `ch2_choice_professional_firewall`

| 字段 | 内容 |
|------|------|
| type | `dialogue` / `narration` |
| 目的 | Vic 专业控局路线的信息奖励与代价 |
| 文本要点 | Kavya 把直播主体切给第三方人道组织，镜头源伪装成路人聚合流，Rupesh 的卫星接口只做临时跳板；Vic 默许开放高空画面 |
| 独占真相 | Vic 能救，但必须由 Kavya 给他一个“不暴露盲盒协议”的合法外壳 |
| 代价 | B 家族更快确认 Kavya 是中枢变量 |
| next | `ch2_satellite_live_60s` |

---

### `ch2_satellite_live_60s`

| 字段 | 内容 |
|------|------|
| type | `narration` |
| 目的 | 公共高潮，三路线汇合 |
| 文本要点 | 信号恢复 60 秒；Kabir 的脸、推土机履带、地下室烟雾、高空镜头同时进入同一个 feed；司机停下 |
| 必设 flags | `ch2_satellite_live_60s: true` |
| next | `ch2_aftermath_route_truth` |

注意：如果前面选项已设置该 flag，此节点可只作为公共叙事汇合，不重复设置也可以。

---

### `ch2_aftermath_route_truth`

| 字段 | 内容 |
|------|------|
| type | `branch` |
| 目的 | 根据玩家选择进入不同余波节点 |
| 条件 | `ch2_public_first` → `ch2_aftermath_kabir` |
| 条件 | `ch2_rupesh_first` → `ch2_aftermath_rupesh` |
| 条件 | `ch2_professional_firewall` → `ch2_aftermath_vic` |
| default | `ch2_aftermath_balanced` |

---

### `ch2_aftermath_kabir`

| 字段 | 内容 |
|------|------|
| type | `dialogue` |
| speaker | `kabir` |
| 目的 | Kabir 关系推进 |
| 文本要点 | 他活下来后没有感谢镜头，只问 Kavya 有没有看见那个未发送视频；他第一次承认自己害怕不是死，而是死了也被写成丑闻 |
| next | `ch2_dharavi_end` |

---

### `ch2_aftermath_rupesh`

| 字段 | 内容 |
|------|------|
| type | `dialogue` |
| speaker | `rupesh` |
| 目的 | Rupesh 关系推进 |
| 文本要点 | 他从地下室出来，手背有烧伤；他把卫星接口塞给 Kavya，说“这次不是借，是还” |
| next | `ch2_dharavi_end` |

---

### `ch2_aftermath_vic`

| 字段 | 内容 |
|------|------|
| type | `dialogue` |
| speaker | `vic` |
| 目的 | Vic 关系推进 |
| 文本要点 | Vic 电话里说她终于知道“救人”和“保局”不是两件事；这句话既是认可，也是占有式邀请 |
| next | `ch2_dharavi_end` |

---

### `ch2_aftermath_balanced`

| 字段 | 内容 |
|------|------|
| type | `narration` |
| 目的 | 兜底余波 |
| 文本要点 | 所有人都活了下来，但没有人真的赢。Kavya 意识到 60 秒只是第三章更大盲区的预演 |
| next | `ch2_dharavi_end` |

---

### `ch2_dharavi_end`

| 字段 | 内容 |
|------|------|
| type | `chapter_end` |
| chapter | 2 |
| title | `第二章 · 达拉维强拆暴乱` |
| 文本要点 | 推土机停下，地下室冒烟，高空镜头移开；B 家族把 Kavya 从“公关顾问”升级为“必须清除的变量” |
| setCheckpoint | `ch2_dharavi_end` |
| next | `ch2_route_branch` |

---

### `ch2_route_branch`

| 字段 | 内容 |
|------|------|
| type | `branch` |
| 目的 | 第二章后进入可能的男主分线，或进入第三章 |

建议条件顺序：

```json
[
  {
    "if": {
      "variable": "kabir_affection",
      "gte": 40,
      "flag": "ch2_kabir_lifesaver",
      "flagEq": true,
      "flagNot": "kabir_betrayed"
    },
    "next": "enter_kabir_route_1"
  },
  {
    "if": {
      "variable": "rupesh_affection",
      "gte": 40,
      "flag": "ch2_rupesh_trace_destroyed",
      "flagEq": true,
      "flagNot": "rupesh_betrayed"
    },
    "next": "enter_rupesh_route_1"
  },
  {
    "default": true,
    "next": "ch3_cruise_placeholder"
  }
]
```

注：如果暂不实现 Kabir/Rupesh 分线，可以先让所有路径进入第三章占位。

---

## 5. 建议短分线入口

### `enter_kabir_route_1`

触发条件：`kabir_affection >= 40` + `ch2_kabir_lifesaver`

分线主题：Kabir 的未发送遗言。  
功能：让玩家看到他不是单纯疯批，而是把“被看见”当成最后的政治武器。

### `enter_rupesh_route_1`

触发条件：`rupesh_affection >= 40` + `ch2_rupesh_trace_destroyed`

分线主题：烧伤的手和被烧掉的姓。  
功能：让玩家看到他不是纯技术复仇者，而是恐惧死者也被系统污名化。

---

## 6. 第二章复刷价值检查

| 路线 | 一周目可见 | 路线独占 | 二刷价值 |
|------|------------|----------|----------|
| Kabir | 坐履带赌命 | 未发送遗言与镜头伦理 | 重新理解他不是求死，是夺回叙事权 |
| Rupesh | 地下毁证 | 主板连着旧身份与家人污名风险 | 重新理解他不是冷血，是害怕死人被二次利用 |
| Vic | 电话冷酷评估 | 他能救，但需要 Kavya 给合法外壳 | 重新理解他不是旁观，而是在保护盲盒交易 |
| Ananda | 可能无直接出现 | 提前知道强拆日期但只给暗示 | 重新理解强拆是上流圈早已知情的默许 |

---

## 7. 进入 JSON 前的待办

- [ ] 决定是否先实装 Ananda 庄园前置；如果不实装，第二章 Ananda 节点先作为不可达条件分支保留。
- [ ] 决定第二章后是否立即实装 Kabir/Rupesh 短分线。
- [ ] 将建议新增 flags 加入 `story_nodes.json.defaultFlags`。
- [ ] 把 `ch2_dharavi_placeholder` 替换为本章节点链。
- [ ] 增加 `ch3_cruise_placeholder`，避免第二章完成后无后续节点。
- [ ] 完成节点正文后，再按 `design/quality_workflow.md` 做文本可读性评分。

