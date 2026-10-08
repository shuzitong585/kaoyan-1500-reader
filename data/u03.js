window.UnitRegistry.register({
  id: "U03",
  status: "official",
  sequence: 3,
  totalUnits: 60,
  series: "考研阅读1500核心词",
  title: "When Museums Measure Attention",
  subtitle: "当博物馆开始衡量注意力",
  stage: "语境识别",
  newWordCount: 25,
  storage: { namespace: "kaoyan1500:U03", version: "official-v1", resetOnFirstVersion: true },
  goals: [
    "在数字文化语境中识别25个核心词",
    "区分公共服务改进与访客隐私风险",
    "理解作者如何在技术收益与制度边界之间形成平衡观点"
  ],
  paragraphs: [
    {
      id: "p1",
      en: "For many years, a museum judged a successful exhibition by ticket sales and reviews in the press. Today, digital tools offer a much richer picture. Visitors can search a collection on the internet before arriving, while anyone unable to travel may explore an online version of a gallery. Museums can also track which objects attract attention and how long people stay beside them. Such information appears to offer a direct signal of public interest, but it also raises a less obvious question: when does observation designed to improve a cultural service become surveillance?",
      cn: "多年来，博物馆主要通过门票销量和媒体评论来判断一次展览是否成功。如今，数字工具提供了丰富得多的信息。参观者可以在到馆前通过互联网搜索馆藏，而无法亲自前往的人也可以浏览展厅的线上版本。博物馆还可以追踪哪些展品吸引注意，以及人们在展品旁停留多久。这些信息似乎能够直接反映公众兴趣，但也带来了一个不那么显眼的问题：以改善文化服务为目的的观察，何时会变成监控？",
      targets: []
    },
    {
      id: "p2",
      en: "The attraction of measurement is easy to understand. If a dozen visitors in a row walk past an explanation without reading it, the label may be unclear. If a couple of minutes beside one object is the norm, a shorter stay elsewhere may suggest that the display has failed to communicate. Curators can then switch the order of objects, rewrite a label, or offer an audio option. The aim is not simply to produce a huge quantity of data. It is to discover where attention is lost and avoid the waste of money on displays that do not help visitors learn.",
      cn: "衡量行为的吸引力不难理解。如果连续十几位参观者都从一段说明前走过却没有阅读，标签可能写得不够清楚。如果在一件展品旁停留几分钟是常态，那么人们在别处停留更短，可能说明那里的展示没有有效传达信息。策展人随后可以调整展品顺序、重写标签，或提供语音选项。其目的并非单纯制造海量数据，而是发现注意力在哪里流失，并避免把资金浪费在无法帮助参观者学习的展示上。",
      targets: []
    },
    {
      id: "p3",
      en: "Yet the same system can create trouble. A camera may record movement without naming individuals, but repeated observations can sometimes be combined into a detailed pattern. The risk becomes worse when a museum uses an outside company whose business is to advertise products. Data collected in an educational setting may then support commercial decisions that visitors never expected. Most people may be happy to let a museum count anonymous visits, but that does not mean they accept being followed across websites or placed into marketing groups.",
      cn: "然而，同一套系统也可能带来麻烦。摄像头可以在不记录姓名的情况下拍下移动轨迹，但多次观察有时能够组合成详细的个人行为模式。当博物馆使用以广告业务为主的外部公司时，风险会变得更严重。在教育场景中收集的数据，随后可能被用于参观者从未预料到的商业决策。多数人或许乐意让博物馆匿名统计参观次数，但这并不意味着他们接受自己在不同网站上被持续追踪，或被划入营销群体。",
      targets: []
    },
    {
      id: "p4",
      en: "Online collections present a related problem. A digital image may be useful for research, yet the museum may not own the copyright. Rights may belong to an artist, a photographer, or another institution. Due to these limits, a complete online gallery may not be possible. One option is to publish a lower-resolution image with clear information about its permitted use. Another is to provide only a written record until permission is obtained. These restrictions can disappoint users, but ignoring them would weaken the museum's claim to treat cultural work responsibly.",
      cn: "线上馆藏也带来了相关问题。数字图像可能对研究很有用，但博物馆未必拥有其版权。权利可能属于艺术家、摄影师或其他机构。由于这些限制，完整的线上展厅可能无法实现。一种选择是发布较低分辨率的图片，并清楚说明允许的使用方式；另一种选择是在获得许可前只提供文字记录。这些限制可能令用户失望，但忽视它们会削弱博物馆负责任地对待文化作品的立场。",
      targets: []
    },
    {
      id: "p5",
      en: "The answer is therefore not to reject measurement, nor to assume that more data must always be better. Museums should collect only what serves a stated educational purpose, explain the choice in plain language, and give visitors a real option where possible. They should also separate information needed to improve an exhibition from information valuable mainly to advertisers. Used within such limits, digital evidence can help a museum understand its audience. Used without them, the search for attention may damage the public trust on which the institution depends.",
      cn: "因此，答案既不是拒绝衡量，也不是认定数据越多越好。博物馆应当只收集服务于明确教育目的的信息，用清楚的语言解释这种选择，并在可能时给予参观者真正的选择权。它们还应把改善展览所需的信息，与主要对广告商有价值的信息区分开来。在这些边界内使用，数字证据能够帮助博物馆理解受众；缺少这些边界时，对注意力的追逐反而可能损害机构赖以生存的公众信任。",
      targets: []
    }
  ],
  vocabulary: [
    { word: "search", pos: "v./n.", basicMeaning: "寻找；搜索", contextMeaning: "在线搜索馆藏", collocation: "search a collection", englishDefinition: "to look carefully for information or an object", contextualExample: "Visitors can search a collection before arriving.", readingNote: "本文既用于数字检索，也在结尾抽象表示对注意力的追求。" },
    { word: "stay", pos: "v./n.", basicMeaning: "停留；逗留", contextMeaning: "在展品旁停留", collocation: "stay beside an object", englishDefinition: "to remain in a place for a period of time", contextualExample: "Museums can measure how long people stay beside an object." },
    { word: "anyone", pos: "pron.", basicMeaning: "任何人", contextMeaning: "任何无法亲自前往的人", collocation: "anyone unable to travel", englishDefinition: "any person at all", contextualExample: "Anyone unable to travel may explore the gallery online." },
    { word: "press", pos: "n.", basicMeaning: "新闻界；媒体", contextMeaning: "新闻媒体", collocation: "reviews in the press", englishDefinition: "newspapers and news organizations as a group", contextualExample: "Museums once relied on reviews in the press.", readingNote: "本文不是“按压”，而是媒体集合义。" },
    { word: "internet", pos: "n.", basicMeaning: "互联网", contextMeaning: "用于访问线上馆藏的互联网", collocation: "on the internet", englishDefinition: "the global network that connects computers and information", contextualExample: "Visitors can search the collection on the internet." },
    { word: "setting", pos: "n.", basicMeaning: "环境；场景", contextMeaning: "教育性使用场景", collocation: "an educational setting", englishDefinition: "the situation or environment in which something happens", contextualExample: "Data collected in an educational setting may be reused commercially." },
    { word: "track", pos: "v.", basicMeaning: "追踪；记录", contextMeaning: "追踪访客注意与行为", collocation: "track visitor attention", englishDefinition: "to follow or record the movement or development of something", contextualExample: "Museums can track which objects attract attention." },
    { word: "due", pos: "adj.", basicMeaning: "由于；应有的", contextMeaning: "由于版权限制", collocation: "due to these limits", englishDefinition: "caused by or resulting from something", contextualExample: "A full gallery may be impossible due to copyright limits.", readingNote: "本文掌握 due to = 由于。" },
    { word: "norm", pos: "n.", basicMeaning: "常态；标准", contextMeaning: "通常的停留时长", collocation: "be the norm", englishDefinition: "a usual or expected pattern", contextualExample: "A couple of minutes beside one object may be the norm." },
    { word: "waste", pos: "n./v.", basicMeaning: "浪费", contextMeaning: "无效展陈造成的资金浪费", collocation: "the waste of money", englishDefinition: "the careless use of something valuable", contextualExample: "Better evidence may prevent the waste of money." },
    { word: "row", pos: "n.", basicMeaning: "一排；连续", contextMeaning: "连续发生", collocation: "in a row", englishDefinition: "in an uninterrupted series", contextualExample: "A dozen visitors in a row ignored the label.", readingNote: "本文使用固定结构 in a row，表示“连续地”。" },
    { word: "signal", pos: "n.", basicMeaning: "信号；迹象", contextMeaning: "反映公众兴趣的迹象", collocation: "a signal of public interest", englishDefinition: "a sign that gives information about a condition", contextualExample: "Time spent near an object may be a signal of interest." },
    { word: "option", pos: "n.", basicMeaning: "选择；选项", contextMeaning: "可选择的展示或授权方案", collocation: "offer an audio option", englishDefinition: "one choice among several possibilities", contextualExample: "A museum may offer an audio option." },
    { word: "aim", pos: "n./v.", basicMeaning: "目标；旨在", contextMeaning: "数据收集的目的", collocation: "the aim is to discover...", englishDefinition: "the purpose or intended result of an action", contextualExample: "The aim is to discover where attention is lost." },
    { word: "version", pos: "n.", basicMeaning: "版本", contextMeaning: "线上版本", collocation: "an online version", englishDefinition: "a particular form of something", contextualExample: "Remote visitors may explore an online version of a gallery." },
    { word: "dozen", pos: "n./det.", basicMeaning: "十二个；十几个", contextMeaning: "一组约十二名访客", collocation: "a dozen visitors", englishDefinition: "a group or set of twelve", contextualExample: "A dozen visitors passed the label without reading." },
    { word: "huge", pos: "adj.", basicMeaning: "巨大的；大量的", contextMeaning: "数量极大的数据", collocation: "a huge quantity of data", englishDefinition: "extremely large in size or amount", contextualExample: "The aim is not to create a huge quantity of data." },
    { word: "trouble", pos: "n.", basicMeaning: "麻烦；问题", contextMeaning: "数据追踪带来的问题", collocation: "create trouble", englishDefinition: "difficulty or problems", contextualExample: "The same tracking system can create trouble." },
    { word: "happy", pos: "adj.", basicMeaning: "高兴的；愿意的", contextMeaning: "愿意接受某种做法", collocation: "be happy to let...", englishDefinition: "willing or pleased to do something", contextualExample: "Many visitors may be happy to allow anonymous counting.", readingNote: "be happy to do 在本文更接近“乐意、愿意”。" },
    { word: "couple", pos: "n.", basicMeaning: "一对；几个", contextMeaning: "两三分钟", collocation: "a couple of minutes", englishDefinition: "two or a small number of people or things", contextualExample: "A couple of minutes may be the normal viewing time." },
    { word: "switch", pos: "v./n.", basicMeaning: "转换；调换", contextMeaning: "调整展品顺序", collocation: "switch the order", englishDefinition: "to change from one thing or position to another", contextualExample: "Curators can switch the order of objects." },
    { word: "worse", pos: "adj./adv.", basicMeaning: "更糟的；更严重", contextMeaning: "风险变得更严重", collocation: "become worse", englishDefinition: "more serious, harmful, or unpleasant", contextualExample: "The privacy risk becomes worse with commercial tracking." },
    { word: "advertise", pos: "v.", basicMeaning: "做广告；宣传", contextMeaning: "为商品做广告", collocation: "advertise products", englishDefinition: "to make a product or service known in order to sell it", contextualExample: "An outside company may use data to advertise products." },
    { word: "copyright", pos: "n.", basicMeaning: "版权", contextMeaning: "数字馆藏图片的版权", collocation: "own the copyright", englishDefinition: "the legal right to control the use of an original work", contextualExample: "A museum may not own the copyright to an image." },
    { word: "museum", pos: "n.", basicMeaning: "博物馆", contextMeaning: "收集、研究和展示文化作品的机构", collocation: "a museum collection", englishDefinition: "an institution that preserves and displays objects of cultural or scientific value", contextualExample: "A museum can use evidence to improve an exhibition." }
  ],
  questions: [
    {
      id: "q1", number: 1, type: "细节理解题",
      prompt: "According to Paragraph 2, how can visitor data help curators?",
      options: { A: "By proving that every popular object is educational.", B: "By showing where displays may be failing to hold attention.", C: "By allowing museums to remove all written labels.", D: "By measuring the commercial value of each visitor." },
      correctAnswer: "B", paragraphId: "p2",
      locationText: "It is to discover where attention is lost and avoid the waste of money on displays that do not help visitors learn.",
      retryHint: "提示：回到第2段，看看停留时间和连续跳过标签能帮助策展人发现什么。",
      analysis: { answer: "B", answerDetail: "By showing where displays may be failing to hold attention.", location: "第 2 段", navigation: "text", sections: [
        { title: "为什么选 B", content: `<p>访客连续跳过标签或在某处停留较短，都可能说明展示没有有效传达信息。数据的作用是帮助策展人发现注意力在哪里流失，再调整顺序、标签或讲解方式。</p>` },
        { title: "错误选项为什么错", content: `<div class="wrong-reason"><b>A</b><p>停留时间只是信号，不能证明教育效果。</p></div><div class="wrong-reason"><b>C</b><p>原文提出重写标签，而不是取消所有标签。</p></div><div class="wrong-reason"><b>D</b><p>本段目标是改善学习体验，不是计算访客商业价值。</p></div>` }
      ] }
    },
    {
      id: "q2", number: 2, type: "词义理解题",
      prompt: "The phrase “the norm” in Paragraph 2 is closest in meaning to:",
      options: { A: "the usual pattern", B: "a legal restriction", C: "a technical error", D: "the final aim" },
      correctAnswer: "A", paragraphId: "p2",
      locationText: "If a couple of minutes beside one object is the norm, a shorter stay elsewhere may suggest that the display has failed to communicate.",
      retryHint: "提示：句子把一件展品旁的停留时间当作比较基准。",
      analysis: { answer: "A", answerDetail: "the usual pattern", location: "第 2 段", navigation: "text", sections: [
        { title: "怎么从语境判断", content: `<p>{{vocab:norm}} 是用来判断其他展品停留时间长短的通常基准，因此最接近 <strong>the usual pattern</strong>。</p>` },
        { title: "错误选项为什么错", content: `<div class="wrong-reason"><b>B</b><p>本句没有讨论法律或版权。</p></div><div class="wrong-reason"><b>C</b><p>停留时长不是技术故障。</p></div><div class="wrong-reason"><b>D</b><p>aim 是目标，norm 是常态。</p></div>` }
      ] }
    },
    {
      id: "q3", number: 3, type: "推理判断题",
      prompt: "What can be inferred about visitors' acceptance of museum data collection?",
      options: { A: "They are likely to accept any use if names are removed.", B: "Their acceptance may depend on how narrowly the data is used.", C: "They mainly want museums to share data with advertisers.", D: "They oppose all attempts to measure exhibition quality." },
      correctAnswer: "B", paragraphId: "p3",
      locationText: "Most people may be happy to let a museum count anonymous visits, but that does not mean they accept being followed across websites or placed into marketing groups.",
      retryHint: "提示：比较匿名统计与跨网站营销追踪之间的边界。",
      analysis: { answer: "B", answerDetail: "Their acceptance may depend on how narrowly the data is used.", location: "第 3 段", navigation: "text", sections: [
        { title: "推理链", content: `<div class="context-path"><span>接受匿名参观统计</span><i>↓</i><span>不等于接受跨网站追踪</span><i>↓</i><strong>接受程度取决于用途与范围</strong></div>` },
        { title: "错误选项为什么错", content: `<div class="wrong-reason"><b>A</b><p>匿名并不自动使所有后续用途合理。</p></div><div class="wrong-reason"><b>C</b><p>原文把广告用途作为风险。</p></div><div class="wrong-reason"><b>D</b><p>作者明确承认测量可以改善展览。</p></div>` }
      ] }
    },
    {
      id: "q4", number: 4, type: "主旨理解题",
      prompt: "Which of the following best summarizes the passage?",
      options: { A: "Museums should replace physical exhibitions with online collections.", B: "Visitor tracking is useful only when it supports advertising.", C: "Museums should use digital evidence for clear educational purposes while limiting privacy and copyright risks.", D: "Copyright rules make meaningful museum digitization impossible." },
      correctAnswer: "C", paragraphId: null, locationText: "",
      retryHint: "提示：主旨需要同时覆盖数字工具的价值与作者提出的使用边界。",
      analysis: { answer: "C", answerDetail: "Museums should use digital evidence for clear educational purposes while limiting privacy and copyright risks.", location: "全文", navigation: "structure",
        structure: `<div class="article-structure"><div><b>P1</b><p>数字访问与注意力测量带来新问题</p></div><i>↓</i><div><b>P2</b><p>数据可帮助改善展览</p></div><i>↓</i><div><b>P3-P4</b><p>隐私与版权形成边界</p></div><i>↓</i><div><b>P5</b><p>以明确教育目的限制数据使用</p></div></div>`,
        sections: [
          { title: "为什么选 C", content: `<p>文章既没有否定数字工具，也没有无条件赞美数据。作者主张保留其教育价值，同时限制商业追踪并尊重版权。C 覆盖了全文的收益、风险和最终原则。</p>` },
          { title: "错误选项为什么错", content: `<div class="wrong-reason"><b>A</b><p>文章没有主张线上馆藏取代实体展览。</p></div><div class="wrong-reason"><b>B</b><p>广告用途被视为风险，不是主要价值。</p></div><div class="wrong-reason"><b>D</b><p>版权会限制呈现方式，但不会使数字化完全不可能。</p></div>` }
        ]
      }
    }
  ],
  sentences: [
    {
      id: "s1", number: "01",
      original: "Visitors can search a collection on the internet before arriving, while anyone unable to travel may explore an online version of a gallery.",
      sections: [
        { title: "抓主干", content: `<p><strong>Visitors can search a collection, while anyone may explore a version.</strong></p><p>参观者可以搜索馆藏，而任何人都可以浏览一个版本。</p>` },
        { title: "看关系", content: `<p><strong>while</strong> 连接两种并列的数字访问方式；<strong>unable to travel</strong> 修饰 anyone，说明是哪类人。</p>` },
        { title: "整句理解", content: `<p>参观者可以在到馆前通过互联网搜索馆藏，而无法亲自前往的人也可以浏览展厅的线上版本。</p>` }
      ], reminder: "先拆开 while 两侧的两个主干，再把修饰信息挂回去。"
    },
    {
      id: "s2", number: "02",
      original: "If a couple of minutes beside one object is the norm, a shorter stay elsewhere may suggest that the display has failed to communicate.",
      sections: [
        { title: "抓主干", content: `<p><strong>a shorter stay may suggest that...</strong></p><p>更短的停留可能说明……</p>` },
        { title: "看关系", content: `<p><strong>If...</strong> 给出比较前提；<strong>that...</strong> 是 suggest 的内容。{{vocab:norm}} 提供通常基准。</p>` },
        { title: "整句理解", content: `<p>如果在一件展品旁停留几分钟是常态，那么在别处停留更短可能说明展示没有有效传达信息。</p>` }
      ], reminder: "看到 if 条件时，先找逗号后的判断，再回头确认比较基准。"
    },
    {
      id: "s3", number: "03",
      original: "Used within such limits, digital evidence can help a museum understand its audience.",
      sections: [
        { title: "抓主干", content: `<p><strong>digital evidence can help a museum understand its audience</strong></p><p>数字证据能够帮助博物馆理解受众。</p>` },
        { title: "看关系", content: `<p><strong>Used within such limits</strong> 补充条件：只有在这些边界内使用，后面的积极作用才成立。</p>` },
        { title: "整句理解", content: `<p>在这些边界内使用，数字证据能够帮助博物馆理解自己的受众。</p>` }
      ], reminder: "句首过去分词信息常在限定主句成立的条件或方式。"
    }
  ],
  recallCards: [
    { id: "r1", word: "norm", type: "input", typeLabel: "语境召回英文", stem: "be the ______", context: "成为通常情况 / 常态", prompt: "缺少哪个词？", answer: "norm", hint: "提示：它在句中提供一个比较基准。", correctFeedback: "✓ 想起来了", answerLabel: "答案：norm", resolved: "be the norm<br>= 是常态" },
    { id: "r2", word: "press", type: "choice", typeLabel: "熟词换义", stem: "reviews in the press", prompt: "这里的 press 表示什么？", answer: "B", options: { A: "按压", B: "新闻媒体", C: "出版社机器", D: "压力" }, hint: "提示：reviews 会通过什么公共渠道出现？", correctFeedback: "✓ 对，这里是媒体集合义。", answerLabel: "答案：B｜新闻媒体", resolved: "the press<br>= 新闻界；媒体" },
    { id: "r3", word: "track", type: "choice", typeLabel: "阅读功能判断", stem: "track which objects attract attention", prompt: "track 在这里发挥什么作用？", answer: "C", options: { A: "把展品放上轨道", B: "宣传馆藏", C: "记录并跟随行为变化", D: "保护版权" }, hint: "提示：宾语是访客注意力和行为。", correctFeedback: "✓ 对，这里表示追踪记录。", answerLabel: "答案：C｜追踪记录", resolved: "track visitor attention<br>= 追踪访客注意" },
    { id: "r4", word: "row", type: "input", typeLabel: "搭配召回", stem: "a dozen visitors in a ______", context: "十几位参观者连续如此", prompt: "缺少哪个词？", answer: "row", hint: "提示：这个短语表示连续发生。", correctFeedback: "✓ 想起来了", answerLabel: "答案：row", resolved: "in a row<br>= 连续地" },
    { id: "r5", word: "happy", type: "choice", typeLabel: "当前语境判断", stem: "be happy to let a museum count anonymous visits", prompt: "happy 在这里最接近：", answer: "D", options: { A: "幸运的", B: "满意结果的", C: "快乐兴奋的", D: "乐意；愿意" }, hint: "提示：注意 be happy to do 这个结构。", correctFeedback: "✓ 对，这里强调愿意接受。", answerLabel: "答案：D｜乐意；愿意", resolved: "be happy to do<br>= 乐意做某事" },
    { id: "r6", word: "copyright", type: "choice", typeLabel: "语义区分", stem: "the museum may not own the copyright", prompt: "这句话说明什么？", answer: "A", options: { A: "博物馆未必有权决定图像如何使用", B: "博物馆无法保存实物", C: "所有图像都禁止研究", D: "访客拥有展览" }, hint: "提示：权利可能属于艺术家或摄影师。", correctFeedback: "✓ 对，版权决定作品使用权。", answerLabel: "答案：A｜未必拥有图像使用决定权", resolved: "own the copyright<br>= 拥有版权" }
  ],
  reviewWords: [
    { word: "search", meaning: "搜索；检索", collocation: "search a collection" },
    { word: "stay", meaning: "停留", collocation: "stay beside an object" },
    { word: "anyone", meaning: "任何人", collocation: "anyone unable to travel" },
    { word: "press", meaning: "新闻媒体", collocation: "reviews in the press" },
    { word: "internet", meaning: "互联网", collocation: "on the internet" },
    { word: "setting", meaning: "环境；场景", collocation: "an educational setting" },
    { word: "track", meaning: "追踪记录", collocation: "track visitor attention" },
    { word: "due", meaning: "由于", collocation: "due to these limits" },
    { word: "norm", meaning: "常态；通常标准", collocation: "be the norm" },
    { word: "waste", meaning: "浪费", collocation: "the waste of money" },
    { word: "row", meaning: "连续", collocation: "in a row" },
    { word: "signal", meaning: "信号；迹象", collocation: "a signal of interest" },
    { word: "option", meaning: "选择；方案", collocation: "offer an audio option" },
    { word: "aim", meaning: "目标；目的", collocation: "the aim is to..." },
    { word: "version", meaning: "版本；形式", collocation: "an online version" },
    { word: "dozen", meaning: "十二个；一打", collocation: "a dozen visitors" },
    { word: "huge", meaning: "巨大的；大量的", collocation: "a huge quantity" },
    { word: "trouble", meaning: "麻烦；问题", collocation: "create trouble" },
    { word: "happy", meaning: "乐意；愿意", collocation: "be happy to let..." },
    { word: "couple", meaning: "两个；几个", collocation: "a couple of minutes" },
    { word: "switch", meaning: "转换；调换", collocation: "switch the order" },
    { word: "worse", meaning: "更糟；更严重", collocation: "become worse" },
    { word: "advertise", meaning: "做广告；宣传", collocation: "advertise products" },
    { word: "copyright", meaning: "版权", collocation: "own the copyright" },
    { word: "museum", meaning: "博物馆", collocation: "a museum collection" }
  ],
  sections: [
    { id: "training", kicker: "READING PRACTICE", title: "阅读训练", summary: "4道题 · 检查数字文化议题中的证据与边界" },
    { id: "sentences", kicker: "SENTENCE LAB", title: "长难句区", summary: "3句 · 拆解比较、条件与限定关系" },
    { id: "recall", kicker: "ACTIVE RECALL", title: "主动回忆区", summary: "6词 · 从博物馆语境召回当前义" },
    { id: "review", kicker: "25-WORD REVIEW", title: "25词复盘区", summary: "25词 · 离开本篇前快速检查" }
  ]
});
