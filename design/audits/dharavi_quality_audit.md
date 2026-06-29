# 第二章「达拉维强拆暴乱」剧情质检报告

> 质检依据：`design/quality_workflow.md` 与 `.agents/story-quality-auditor.md`  
> 质检对象：`design/public.md.txt` 中第二战【达拉维强拆暴乱】  
> 结论日期：当前版本

---

## Audit Target

第二章：达拉维强拆暴乱

## Type

`public_event`

## Verdict

Revise

理由：当前事件的表层冲突强、视觉记忆点强，但路线独占真相和玩家选择后果还不够明确。Kabir 与 Rupesh 的行动有天然吸引力，Vic 的远程压迫感成立，Ananda 的参与目前缺席，导致“四路线复刷价值”尚未达标。可以保留核心事件，但进入 `story_nodes.json` 前需要先完成路线揭示和选择后果重构。

---

## Current Intent

- B 家族以城市更新为名强拆达拉维，实际同时压迫 Kabir 的精神家园与 Rupesh 的地下网关。
- Kabir 穿红毯战袍坐在推土机前，用自己的脸、身体和 5000 万粉丝赌命。
- Rupesh 在地下室销毁原始主板，用强酸或铝热剂抹除物理指纹。
- Vic 不亲临现场，通过高空航拍和电话观察 Kavya 是否有做局能力。
- Kavya 必须在救人、保信号、站队财阀之间做选择，最终争取 60 秒全球直播窗口。
- 公共结果是 Kabir 存活、Rupesh 毁证完成、Kavya 被 B 家族确认成舆论变量，并为第三章游轮 60 秒盲区机制埋伏笔。

---

## Truth Layer Check

### Surface

B 家族的推土机开进达拉维。地面上，Kabir 坐在履带前，直播信号被干扰；地下室里，Rupesh 正在销毁能暴露 Zaker 身份的旧网关。Kavya 被夹在两个倒计时之间：救 Kabir 的身体，还是保 Rupesh 的销毁窗口。

### Common Result

- 推土机在直播压力下暂停或延迟，Kabir 存活。
- Rupesh 完成毁证，但交出关键军事卫星网线接口。
- Kavya 获得或验证 `ch2_satellite_live_60s`。
- Vic 完成对 Kavya 的“牌桌资格”评估。
- B 家族确认 Kavya 是必须清除的舆论变量。

### Vic

当前版本：Vic 冷眼旁观，测试 Kavya 的公关价值。

建议强化真相：Vic 不是单纯不救人，而是在等 Kavya 证明“救人不会暴露马尔霍特拉航运与 Rupesh 的盲盒协议”。他手里有可以调动私人信号中继和直升机镜头的资源，但一旦他主动出手，就会把第一章的秘密交易暴露给 B 家族。  

路线独占真相：Vic 的冷酷其实是一次权力规则教学。他在电话里逼 Kavya 说出“这不是慈善救援，是可控舆论资产”的方案，才会默许她调用高空航拍源。

### Rupesh

当前版本：Rupesh 在地下室毁证，交出卫星接口。

建议强化真相：Rupesh 销毁的不只是技术证据，而是他作为“坍塌案幸存者家属”的最后物理连接。地下室原始网关里留有他早年复仇时的未清理签名，如果被 B 家族拿到，不只 Zaker 会暴露，他家人的死也会被改写成“恐怖分子家属案件”。  

路线独占真相：他看似冷血地不管 Kabir，其实是在亲手烧掉自己的过去。Kavya 若陪他完成销毁，他第一次承认自己不是为了正义，而是怕死人也被他们二次利用。

### Kabir

当前版本：Kabir 穿高定坐在履带前，用粉丝赌命。

建议强化真相：Kabir 不是临时冲动，而是精确计算过镜头伦理。他知道自己只剩两种价值：被消费的丑闻，或被压碎的圣像。他选择第二种，因为只有“差一点被碾死的脸”能让粉丝从追星重新变成政治人群。  

路线独占真相：他坐下之前已经录了一段遗言，但不是控诉 B 家族，而是向粉丝道歉：他以前让他们相信红毯和电影，现在要让他们看见泥地。

### Ananda

当前版本：Ananda 不在场。

建议强化真相：Ananda 仍可不物理到场，但必须成为情报线。建议设置：庄园事件后，如果 Kavya 收过毒药样本或读懂 Ananda 的求救信号，她会在强拆前收到一条含糊语音：“今天别相信任何延期公告，贵妇们不会为尘土改下午茶。”  

路线独占真相：Ananda 从豪门贵妇的祈福名单、慈善捐款和房产信托闲谈里提前拼出了强拆日期。他没有无偿救达拉维，只把情报卖给或试探 Kavya。这能保持他的利己与危险魅力。

### Multi-route reinterpretation

刷完两条线后，玩家应意识到这不是单纯强拆救援，而是四种资源争夺同一个 60 秒窗口：

- Kabir 要 60 秒直播，把肉身变成舆论。
- Rupesh 要 60 秒断点，销毁物证。
- Vic 要 60 秒观察，判断 Kavya 能否在不暴露交易的情况下控局。
- Ananda 要 60 秒验证，确认 Kavya 是否值得继续交换秘密。

刷完四条线后，完整真相应变为：达拉维不是偶然战场，而是 B 家族对第一章盲盒协议、Kabir 舆论残值、Rupesh 物证链和 Kavya 公关能力的一次压力测试。

---

## Choice Consequence Check

### Choice A：优先救 Kabir，抢直播

玩家行为：Kavya 直接把资源投入地面直播，利用 Kabir 的脸和推土机距离制造全球舆论压力。

表面收益：Kabir 存活，直播成功，B 家族当场后撤。

隐藏代价：Rupesh 的地下销毁窗口被压缩，他必须冒险交出更底层的卫星接口；Vic 认为 Kavya 过早选择情绪价值，职业风险上升。

建议效果：

- `kabir_affection +18`
- `rupesh_affection -5`
- `vic_affection -4`
- flags: `ch2_kabir_lifesaver: true`, `ch2_satellite_live_60s: true`, `ch2_public_first: true`

后续影响：Kabir Good End 条件推进；Rupesh 后续分线需要额外补偿，才愿意开放核心接口。

### Choice B：优先保 Rupesh，争取销毁窗口

玩家行为：Kavya 先定位干扰车盲区，协助 Rupesh 完成主板销毁，再用他交出的卫星接口开启直播。

表面收益：Rupesh 完成毁证，技术链安全；直播仍能延迟开启。

隐藏代价：Kabir 在履带前等待更久，身体风险和心理创伤加深；Kabir 会意识到自己被当成争取时间的筹码。

建议效果：

- `rupesh_affection +18`
- `kabir_affection -6`
- `vic_affection +3`
- flags: `ch2_rupesh_trace_destroyed: true`, `ch2_satellite_live_60s: true`, `ch2_rupesh_first: true`

后续影响：Rupesh Good End 条件推进；Kabir 线后续需要玩家补上“我不是只把你当镜头”的关系修复。

### Choice C：走专业控局，逼 Vic 借镜头但不暴露交易

玩家行为：Kavya 给 Vic 打电话，不求他救人，而是提出一套“第三方危机观察 + 非航运主体转播 + 现场人道风险切割”的公关方案，逼他开放高空镜头和短时中继。

表面收益：Kabir 获得镜头，Rupesh 获得销毁窗口，Vic 看到 Kavya 的专业价值。

隐藏代价：Kavya 更深卷入 Vic 的牌桌，B 家族更快确认她不是普通公关，而是能整合资源的中枢。

建议效果：

- `vic_affection +15`
- `kabir_affection +8`
- `rupesh_affection +8`
- flags: `ch2_vic_phone_moment: true`, `ch2_satellite_live_60s: true`, `ch2_professional_firewall: true`

后续影响：Vic 分线强化；公共线最优解但不是道德纯白解，因为它会让 Kavya 更难抽身。

### Optional Choice D：相信 Ananda 的提前暗示

适用条件：`ananda_poison_sample_received` 或 `ananda_distress_signal_read` 为 true。

玩家行为：Kavya 在强拆正式开始前根据 Ananda 的隐晦语音预判 B 家族会提前动手。

表面收益：提前到场，降低首轮混乱，发现干扰车位置更早。

隐藏代价：Ananda 确认 Kavya 会使用灰色情报，之后会用更危险的秘密试探她。

建议效果：

- `ananda_affection +12`
- `vic_affection -2`
- flags: `ch2_ananda_warning_used: true`

后续影响：Ananda 线获得间接参与；第三章冷库救援动机更自然。

---

## Scores

### Character appeal: 72/100

拆分判断：

- Kabir：84。视觉名场面强，欲望与脆弱点清楚。
- Rupesh：78。行动主动，技术和创伤结合有效，但需要补“烧掉过去”的亲密揭示。
- Vic：70。冷眼旁观成立，但当前像功能性评估者，需要更强的电话拉扯和占有式教学。
- Ananda：45。原版本缺席，复刷吸引力不足；加入情报暗线后可提升。

### Public replay value: 66/100

一周目清晰度高，但路线差异度不足。当前玩家能看懂“救直播/毁证/被观察”，但二刷三刷未必能获得足够新真相。加入 Ananda 暗线、Rupesh 物理连接、Kabir 遗言、Vic 不暴露交易的顾虑后，预计可提升到 82-88。

### Text readability: Not scored

当前审计对象主要是剧情大纲，不是最终节点正文。等写出第二章节点文本后，需要单独按 50 分制评分。

---

## Main Risks

1. 强拆事件容易显得“作者把 Kabir 和 Rupesh 硬塞到同一地点”。需要改成二人各自欲望自然撞车：Kabir 为剧院和政治重生而来，Rupesh 为切断物证链而来。
2. Vic 的旁观如果只写冷酷，会削弱攻略吸引力。必须让玩家感到他在用冷酷保护更大的秘密，同时试探 Kavya 是否能上桌。
3. Ananda 完全缺席会让四路线复刷结构缺一角。建议使用间接情报参与，而不是强行让他到达拉维现场。
4. 如果选择只改变好感数值，没有信息差和后续台词差异，第二章会变成单线大场面，复刷价值不足。

---

## Revision Actions

1. 把事件触发改成“欲望撞车”：Kabir 因剧院和粉丝政治化到场；Rupesh 因原始网关必须当天销毁到场；B 家族发现两人同时出现后提前强拆。
2. 给每条路线一个独占真相：Vic 的不出手原因、Rupesh 销毁过去、Kabir 的遗言视频、Ananda 的提前情报。
3. 将主选择设计成“救 Kabir / 保 Rupesh / 走 Vic 式专业控局”，每个选项都同时改变好感、flag 和后续关系修复需求。
4. 增加 Ananda 条件节点。如果玩家在庄园线拿到相关 flag，第二章开场前可收到暗示，解锁更早发现干扰车的选项。
5. 在第二章中加入至少三个可记忆台词钩子：
   - Kabir 对镜头：“别哭。看清楚，是谁把我推到这里。”
   - Rupesh 对 Kavya：“别用那种眼神看我。我不是在烧机器，我是在烧他们给我留的姓。”
   - Vic 电话里：“你要我救人，还是要我教你怎么让他们不敢杀人？”
6. 不要让 60 秒直播成为单纯技术按钮。它必须同时服务三件事：Kabir 活下来、Rupesh 完成销毁、Kavya 证明自己能做局。

---

## JSON Readiness

- Ready for `story_nodes.json`: No
- Required before JSON: 完成修订版章节大纲与节点清单

### Required flags

已有 GDD flags：

- `ch2_kabir_lifesaver`
- `ch2_rupesh_trace_destroyed`
- `ch2_satellite_live_60s`
- `ch2_vic_phone_moment`

建议新增 flags：

- `ch2_public_first`
- `ch2_rupesh_first`
- `ch2_professional_firewall`
- `ch2_ananda_warning_used`
- `ch2_kabir_last_message_seen`
- `ch2_rupesh_origin_burned`

### Suggested node IDs

```text
ch2_dharavi_intro
ch2_ananda_warning_branch
ch2_arrival_split_view
ch2_kabir_on_tread
ch2_rupesh_basement_signal
ch2_vic_phone_offer
ch2_choice_priority
ch2_choice_save_kabir
ch2_choice_protect_rupesh
ch2_choice_professional_firewall
ch2_satellite_live_60s
ch2_aftermath_kabir
ch2_aftermath_rupesh
ch2_aftermath_vic
ch2_route_branch
ch2_dharavi_end
```

### Blocking issues

- Ananda 线目前没有第二章参与方式。
- 三个主选择尚未固化成具体后果。
- 缺少“刷不同路线后重新理解事件”的明确信息锁。

---

## 修订版章节方案

### 章节核心

第二章不是“强拆救援”，而是“谁能拥有这 60 秒”。  
Kabir 要它救命，Rupesh 要它灭迹，Vic 要它验证 Kavya，Ananda 要它确认 Kavya 是否值得交换秘密。

### 开场

新闻先放出“达拉维城市更新行动延期”的假消息。若玩家有 Ananda 相关 flag，可收到一条模糊语音，暗示延期是假。没有 Ananda flag，则 Kavya 在行动开始后才接到 Praya 或助理的急电。

### 第一段：地上

Kavya 抵达现场，看到 Kabir 穿猩红高定坐在履带前。这里不先解释他的政治计算，只写他漂亮、狼狈、疯，和推土机之间只剩几米。

### 第二段：地下

Rupesh 通过短讯或现场入口暴露地下室危机。他需要 60 秒销毁原始网关，否则 Zaker 身份和坍塌案证据链都会被 B 家族反咬。

### 第三段：电话

Kavya 联系 Vic。Vic 不说“我帮你”，而是逼她说清楚方案：这次直播的法律主体是谁、镜头来源怎么切割、马尔霍特拉航运如何不被拖下水。

### 核心选择

玩家在三种策略中选一个：

- 地面优先：救 Kabir，直播先开。
- 地下优先：保 Rupesh，销毁先完成。
- 专业控局：借 Vic 镜头和 Rupesh 接口，同时制造 60 秒窗口。

### 高潮

无论选择如何，60 秒直播达成。但玩家选择决定谁在这 60 秒里被真正“看见”：

- Kabir 线：玩家看到遗言视频未发送版本。
- Rupesh 线：玩家看到他亲手烧毁旧身份。
- Vic 线：玩家听见他承认 Kavya “有资格站在桌边”。
- Ananda 条件线：玩家发现他早就知道强拆会提前。

### 结尾

推土机停下，地下室烟雾涌出，Vic 的直升机镜头移开，Ananda 的语音自动删除。Kavya 看似救下一场危机，实际已经被 B 家族从“公关顾问”升级为“必须清除的中枢变量”。

