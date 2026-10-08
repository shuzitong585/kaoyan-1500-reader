# 考研阅读1500核心词｜Unit Content Standard V1.0

## 1. 文档定位

本规范从已经完成真实运行与浏览器验收的正式 U02 中提炼，用于 U03–U60 的内容生产、数据接入和逐 Unit 验收。

本规范不重新设计产品。U01、U02、60 组归属 V1.2、通用页面组件、交互逻辑和视觉系统均为冻结基线。后续生产遵循：**换 Unit 内容，不换产品壳**。

正式目标词的唯一归属来源是 V1.2 Manifest。任何内容生产过程均无权重新选词、换词或调整 Unit 归属。

## 2. 正式 Unit 基础结构

每个正式 Unit 必须完整包含以下学习模块：

1. 25 个正式目标词
2. 阅读正文与中文辅助
3. Vocabulary Card / 点击词义
4. Reading Practice / 阅读训练
5. Sentence Lab / 长难句
6. Active Recall / 主动回忆
7. 25-Word Review / 25词复盘
8. Second Pass / 二刷模式
9. Unit Completion / 单元完成状态

### 2.1 Unit 顶层数据结构

正式 `data/uXX.js` 沿用现有母版 schema：

```js
{
  id,
  sequence,
  totalUnits,
  status,
  series,
  title,
  subtitle,
  stage,
  newWordCount,
  storage,
  goals,
  paragraphs,
  vocabulary,
  questions,
  sentences,
  recallCards,
  reviewWords,
  sections
}
```

字段约束：

- `id`：连续 Unit ID，如 `U03`。
- `sequence`：数字序号，与 `id` 一致。
- `totalUnits`：固定为 `60`。
- `status`：正式冻结内容使用 `official`；发布锁定状态应在项目约定中标记为 `official / locked`，不得使用测试状态。
- `series`：产品系列名称。
- `title`、`subtitle`：本 Unit 英文标题与中文副标题。
- `stage`：必须符合四阶段划分。
- `newWordCount`：固定为 `25`。
- `storage`：本 Unit 独立的存储命名空间及必要版本信息。
- `goals`：本篇学习目标。
- `paragraphs`：正式英文正文及逐段中文辅助。
- `vocabulary`：本 Unit 25 个正式目标词的教学数据。
- `questions`：4 道阅读理解题及完整解析数据。
- `sentences`：2–3 个从正文中选取的 Sentence Lab 数据。
- `recallCards`：建议约 6 张主动回忆卡。
- `reviewWords`：与正式目标词一一对应的 25 词复盘数据。
- `sections`：一级模块标题、说明、数量等展示元信息。

## 3. 目标词标准

每个 Unit 的目标词必须严格读取：

```text
V1.2 Manifest → 对应 Unit → officialTargetWords
```

强制规则：

- 每 Unit 正好 25 个新学正式核心词。
- `vocabulary` 必须与 Manifest 对应 Unit 完全一致。
- 25 / 25 必须进入正式学习内容，并在正文中拥有自然、可解释的真实语境。
- 不得自行增加、删除、替换、交换或跨 Unit 调整正式目标词。
- 不得因文章难写、语义不顺或题目设计需要而换词。
- 正文可以自然使用普通支持词；这些词不计入 25 个正式目标词。
- 原 500 词如在正文中自然复现，不占本 Unit 的 25 个新词名额。
- 目标词可以按需要使用真实词形变化，但必须映射到正确词卡。

正式目标词归属由 V1.2 Manifest 锁定，Unit 内容文件只能实现该归属，不能改变该归属。

## 4. 阅读正文标准

### 4.1 基本要求

- 约 450–600 个英文词。
- 4–6 个自然段。
- 原创考研英语阅读型说明文或议论文。
- 有明确、可概括的中心议题。
- 有自然的观点推进和段落功能分工。
- 论证中应自然包含因果、转折、比较、解释、限定、举例或结论等真实阅读关系。
- 难度应匹配当前 Unit 所属阶段。

### 4.2 最高质量标准

> 去掉所有目标词高亮后，文章本身仍然必须是一篇自然、完整、逻辑连贯的英文阅读文章。

目标词必须服务于文章表达。不得让文章服务于机械覆盖词表。

### 4.3 禁止事项

- 串词作文。
- 25 个孤立例句的拼接。
- 为覆盖目标词而突然插入无关事实。
- 明显机械、错误或不符合真实英语使用习惯的造句。
- 爽文、小说化故事或与产品定位不符的剧情材料。
- 为塞入难词而扭曲文章中心论点。
- 只有词汇覆盖、没有完整论证主线的文章。

### 4.4 正文数据结构

```js
paragraphs: [
  {
    id: "p1",
    en: "...",
    zh: "..."
  }
]
```

- `id` 必须唯一。
- `en` 是正式英文自然段。
- `zh` 是对应自然段的中文辅助，不逐句切碎。
- 中文须准确传达当前语境、论证关系和目标词在本文中的真实含义。

## 5. 四阶段难度标准

### U01–U15｜语境识别

- 核心：让学习者把认识的词放回考研阅读语境中读懂。
- 正文结构清楚，论证关系明确，避免一开始堆叠过高抽象度。
- 词卡优先澄清当前义、熟词换义和基础搭配。
- 题目训练定位、语境判断与基本推断。

### U16–U30｜语义升级

- 核心：提高一词多义、抽象义、搭配义和语义范围判断能力。
- 增加同一基础词在专业、制度、社会议题中的语义变化。
- 题目与词卡更重视语义边界、指代和句意推断。

### U31–U45｜逻辑与论证

- 核心：识别词汇在论证推进中的功能。
- 提高段落之间的转折、让步、因果、限定和反驳密度。
- 阅读题更重视论证目的、作者策略、隐含前提和合理推断。
- Sentence Lab 更重视长句内部逻辑，而非术语堆叠。

### U46–U60｜综合考研阅读

- 核心：在接近正式考研阅读的密度中综合处理词义、句法、论证和篇章结构。
- 允许更高抽象度、更复杂的观点关系与更隐含的作者态度。
- 题目干扰项应更接近正式考试，但仍必须保持唯一正确答案和可解释性。

60 个 Unit 不得使用完全相同的文章难度。正文、词义讲解、题目干扰强度和长难句分析必须随阶段逐步升级。

## 6. Vocabulary Card 标准

每个正式目标词至少包含：

```js
{
  word,
  pos,
  contextMeaning,
  englishDefinition,
  contextualExample,
  collocation,
  readingNote // 可选
}
```

根据实际教学价值，可继续使用现有组件支持的 `basicMeaning`、`warning`、`forms`、`memory` 等字段，但不得为了栏目完整而强行填写。

内容要求：

- 第一任务是说明“这个词在当前文章中是什么意思”。
- `englishDefinition` 应简洁、准确，并与本文义一致。
- `contextualExample` 应直接体现本文语境，优先使用或紧贴正文表达。
- `collocation` 应保留本篇最值得掌握的搭配或结构。
- `readingNote` 只在确有阅读价值时出现。
- 熟词僻义、一词多义、逻辑功能、观点论证功能或高频阅读陷阱应优先说明。
- 不机械展示词典第一义，不把词卡做成传统电子词典。
- 所有词卡必须复用现有 Vocabulary Card 组件、生词功能和 Unit 隔离存储。

## 7. Reading Practice 标准

每个 Unit 固定 4 道阅读理解题。题型组合优先覆盖：

1. 主旨理解
2. 细节理解或推断判断
3. 词义、短语义或句意推断
4. 作者态度或论证目的

题目不能全部机械对应上述顺序，但整体必须覆盖文章理解的不同层级。

### 7.1 每题必需数据

```js
{
  id,
  number,
  type,
  prompt,
  options: { A, B, C, D },
  answer,
  hint,
  location: {
    paragraphId,
    quoteId,
    text
  },
  analysis: {
    location,
    answerText,
    sections
  }
}
```

具体字段名以当前母版实际 schema 为准，但必须数据化表达以下内容：

- 4 个英文选项。
- 唯一正确答案。
- 第一次答错时不泄露答案的中文提示。
- 中文解析。
- 可独立定位的原文依据。
- 正确答案成立的原因。
- 每个错误选项的错误原因。

同一段允许定位多道题，但每道题必须拥有自己的唯一定位信息与定位文本。

### 7.2 命题质量要求

- 题目必须依赖文章理解，不得退化成孤立的“这个单词是什么意思”。
- 词义或句意题必须能通过上下文逻辑推出答案。
- 干扰项应来自合理误读，如绝对化、反向干扰、偷换概念、以偏概全或范围扩大。
- 不得设置两个都可成立的选项。
- 解析必须能回到文章证据，而不是只宣布答案。

## 8. Sentence Lab 标准

每个 Unit 选择 2–3 个长难句，且必须逐字来自本 Unit 正式正文。

每句至少包含：

```js
{
  id,
  original,
  blocks: [
    { title: "抓主干", content: "..." },
    { title: "看关系", content: "..." },
    { title: "整句理解", content: "..." }
  ],
  tip
}
```

教学内容必须覆盖：

- 原句。
- 句子主干。
- 从句或修饰结构如何挂回主干。
- 关键逻辑关系。
- 自然中文理解。
- 阅读时应优先抓取的结构或信号。

分析目标是教用户以后自己拆句，不是堆从句名称、成分缩写或复杂句法树。不得为填充模块另外编造正文中不存在的句子。

## 9. Active Recall 标准

每 Unit 建议约 6 张主动回忆卡，固定复用现有组件和交互路径。

训练方式应有组合，不得全部退化成英文到中文的机械识别。优先覆盖：

- 输入召回。
- 当前语境判断。
- 英文释义回忆。
- 熟词换义。
- 语义区分。
- 搭配或阅读功能判断。

数据结构根据卡型包含：

```js
{
  id,
  word,
  type,
  typeLabel,
  stem,
  context,
  prompt,
  answer,
  options,          // 选择题使用
  hint,
  correctFeedback,
  answerLabel,
  resolved
}
```

要求：

- 召回词必须来自本 Unit 正式目标词。
- 提示先帮助用户重新建立语境联系，第一次错误不得直接泄露答案。
- 输入题忽略大小写和首尾空格。
- 完成后可以调用同一 Vocabulary Card，不创建第二套词卡。
- Recall 状态必须按 Unit 独立保存并可刷新恢复。

## 10. 25-Word Review 标准

每 Unit 的 `reviewWords` 必须正好 25 条，并与 Manifest 的 `officialTargetWords` 和 `vocabulary` 完全一致。

```js
reviewWords: [
  {
    word,
    meaning,
    collocation
  }
]
```

每条只显示：

- 英文单词。
- 本篇核心义。
- 一个短的本篇搭配或结构。

必须继续支持：

- 记住了 / 有点模糊 / 还不会三种互斥状态。
- 状态修改。
- 查看现有词卡。
- 25 / 25 完成统计。
- 薄弱词筛选和快速复习。
- 刷新恢复。
- Unit 间状态隔离。
- 完成 Review 后才允许用户主动标记 Unit 完成。

二刷不会改变 Review 的词汇归属，Review 也不得污染其他 Unit。

## 11. 二刷与 Unit 完成标准

### 11.1 二刷

- 一刷目标是“学会”；二刷目标是“确认自己真的会”。
- 开启后默认隐藏中文。
- 明确引导用户回到阅读正文，从头独立再读一次。
- 保留“回到阅读正文”入口。
- 不增加第二套正文、题目或复杂计分机制。
- 二刷状态必须按 Unit 保存和恢复。

### 11.2 Unit 完成

- Unit completion 是独立业务状态，不等同于模块折叠状态。
- 25 词 Review 未完成时，完成按钮保持禁用。
- Review 完成后解除禁用，但不得自动完成 Unit。
- 只有用户点击“标记本单元完成”才写入 completion。
- completion 刷新后恢复，并在 Unit Selector 中反映完成状态。
- Uxx 的 completion 不得影响 Uyy。

## 12. 状态与数据隔离标准

每个正式 Unit 必须使用独立命名空间保存：

```text
kaoyan1500:{unitId}:unknownWords
kaoyan1500:{unitId}:progress
kaoyan1500:{unitId}:secondPass
kaoyan1500:{unitId}:completion
```

其中 `progress` 必须能够承载并恢复当前母版已有的学习状态，包括：

- 阅读题作答和解析展开状态。
- Sentence Lab 展开状态。
- Active Recall 当前卡片及作答状态。
- 25词 Review 状态与薄弱词复习状态。
- 其他现有母版已保存的 Unit 内状态。

`unknownWords` 保存本 Unit 生词状态；`secondPass` 和 `completion` 分别独立保存二刷与完成状态。

强制回归场景：

```text
Uxx → Uyy → Uxx
```

返回后必须恢复 Uxx 自己的词汇、题目、Sentence Lab、Recall、Review、二刷和完成状态，不得继承或覆盖 Uyy 的数据。

## 13. 正式 Unit 状态与清洁要求

完成正式生产和验收的 Unit 必须标记为正式、锁定状态：

```text
status = official / locked
```

正式 Unit 页面、数据和注册信息不得残留：

- `TEST`
- `Architecture Test`
- `testword`
- `placeholder`
- `mock data`
- 测试正文
- 测试题
- 测试长难句
- 测试 Recall 或临时提示文案

静态扫描与浏览器真实页面均必须检查这些残留。

## 14. UI 与公共工程规则

现有产品壳、一级折叠系统、Unit Selector、Vocabulary Card、Question Component、Sentence Lab、Active Recall、Review、completion 和二刷交互均为冻结母版。

后续 U03–U60：

- 只新增或填写对应 `data/uXX.js` 并按现有机制注册。
- 不复制 `index.html`、`styles.css` 或 `app.js`。
- 不为单个 Unit 重写页面逻辑。
- 不修改字体、页面宽度、背景、导航结构或通用组件视觉。
- 不因某 Unit 内容特殊而创建第二套公共组件。
- 不改已验收的 72px 一级折叠标题、箭头、分割线和状态保持机制。
- 桌面与 390px 移动端继续使用同一套已验收响应式规则。

只有发现会阻断多个 Unit 正常运行的明确通用 Bug 时，才允许对公共代码做最小修复；修复后必须回归已冻结 Unit，确认 U01、U02 未被改变。

## 15. 每 Unit 正式验收 Checklist

每完成一个 Unit，必须逐项验证：

- [ ] Manifest 目标词正好 25
- [ ] `vocabulary` 与该 Unit 的 `officialTargetWords` 完全一致
- [ ] 正文目标词覆盖 25 / 25
- [ ] 正文约 450–600 词
- [ ] 正文为 4–6 个自然段
- [ ] 去掉目标词高亮后，正文仍自然、完整、逻辑连贯
- [ ] 无明显硬塞词或无关植词句
- [ ] 25 个目标词均可打开正确 Vocabulary Card
- [ ] 词卡包含词性、本文义、简洁英文释义和语境例句
- [ ] 4 道阅读题完整
- [ ] 每题只有一个正确答案
- [ ] 每题包含原文依据、中文解析和错误选项解释
- [ ] 题目依赖文章理解，不是孤立词义测试
- [ ] 2–3 个长难句全部直接来自正文
- [ ] Sentence Lab 主干、关系、整句理解与阅读提醒完整
- [ ] Active Recall 完整且训练形式不过度单一
- [ ] Review 与正式目标词一致，为 25 / 25
- [ ] 无 `TEST` / `testword` / `placeholder` / mock data 残留
- [ ] Unit 状态与其他 Unit 完全隔离
- [ ] 刷新后生词与学习进度恢复
- [ ] 二刷开启、中文隐藏、关闭恢复均正常
- [ ] completion 条件、主动完成与刷新恢复正常
- [ ] Unit Selector 切换与完成标识正常
- [ ] 7 个一级模块仍可折叠，内部状态不重置
- [ ] collapsed header 仍为 72px
- [ ] 完成卡片折叠后无绿色背景或高度残留
- [ ] 桌面端布局正常
- [ ] 390px 移动端无横向溢出
- [ ] browser console error = 0
- [ ] browser console warning = 0
- [ ] 已冻结 Unit 和 V1.2 Manifest 没有被修改

## 16. 推荐生产与冻结流程

后续 Unit 采用以下节奏：

```text
读取 V1.2 Manifest 锁定词表
→ 文章母题与25词可写性规划
→ 正式内容生成
→ 静态结构、数量和覆盖校验
→ 浏览器真实交互与响应式验收
→ 人工内容复核
→ 锁定该 Unit
→ 再进入下一 Unit
```

不得一次性生成未经检查的全部剩余 Unit。即使未来引入批量辅助，也必须保留：

- 每 Unit 独立 validator。
- 每 Unit 正文自然度与植词风险检查。
- 每 Unit 浏览器验收。
- 每 Unit 冻结门槛。
- 对已冻结 Unit 的回归保护。

## 17. 冻结基线

- 60 组正式词汇归属：V1.2，冻结。
- U01：正式内容与交互冻结。
- U02：正式内容与交互冻结，并作为本规范的可执行参考样板。
- U03–U60：按本规范逐 Unit 生产、验收和冻结。

本规范版本：`UNIT_CONTENT_STANDARD_V1.0`。
