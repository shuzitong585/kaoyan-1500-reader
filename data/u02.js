window.UnitRegistry.register({
  id: "U02",
  status: "official",
  sequence: 2,
  totalUnits: 60,
  series: "考研阅读1500核心词",
  title: "When a Health Headline Moves Faster Than Evidence",
  subtitle: "当健康新闻跑在证据前面",
  stage: "语境识别",
  newWordCount: 25,
  storage: {
    namespace: "kaoyan1500:U02",
    version: "official-v1",
    resetOnFirstVersion: true
  },
  goals: [
    "在专业审查语境中识别25个核心词",
    "区分研究发现、证据边界与公共结论",
    "理解作者如何通过转折形成审慎立场"
  ],
  paragraphs: [
    {
      id: "p1",
      en: "A medical journal recently received a study with an alarming claim: bacteria found on a reusable shopping bag might present a serious public-health risk. The finding was easy to turn into a powerful headline, and an editor knew that both readers and news sites would welcome it. Yet a basic question came first. Did the evidence show that a danger really existed, or only that researchers had found bacterial cells in one particular setting? At the beginning of the review, the answer was far from clear.",
      cn: "一家医学期刊最近收到了一项研究。这项研究提出了一个令人担忧的说法：在可重复使用的购物袋上发现的细菌，可能会带来严重的公共卫生风险。这个发现很容易被写成一个吸引眼球的标题，编辑也知道读者和新闻网站都会乐于看到这样的内容。然而，一个基本问题必须首先得到回答：证据真的说明危险确实存在，还是只说明研究人员在某一种特定环境中发现了细菌细胞？在审查刚开始时，答案远没有那么清楚。",
      targets: []
    },
    {
      id: "p2",
      en: "The study had compared bags from two groups of customers and reported a higher number of cells in one group. At first glance, that difference appeared meaningful. Yet the bags were not matched for age, cleaning, or frequency of use, and no information showed whether ordinary contact transferred bacteria to people. The result therefore described a pattern without identifying its cause. But the authors had not checked whether those cells could cause illness. Nor had they fully explained the conditions behind the result, such as how long each bag had been used or where it had been stored. This left an important line between detecting bacteria and demonstrating harm. Crossing that line without additional evidence would turn an observation into a conclusion it could not support.",
      cn: "这项研究比较了两组消费者使用的购物袋，并报告其中一组检测到了更多细菌细胞。乍看之下，这种差异似乎很有意义。然而，两组袋子并没有按照使用年限、清洁情况或使用频率进行匹配，也没有信息表明日常接触是否会把细菌传给人。这个结果因此只是描述了一种模式，却没有找出它的原因。研究人员也没有检查这些细胞是否会导致疾病，更没有充分解释结果背后的条件，例如每个袋子使用了多久、储存在什么地方。因此，“检测到细菌”和“证明存在危害”之间仍有一条重要界线。如果没有进一步证据就跨过这条界线，一个观察结果就会被变成它其实无法支持的结论。",
      targets: []
    },
    {
      id: "p3",
      en: "To decide what to publish, the editor asked the journal's board to form an outside panel. A laboratory professional was invited to examine the methods, while a public-health officer was asked to judge the practical risk. Neither had worked with the authors. Other specialists could join the discussion if a technical issue required their knowledge. The panel did not need every member to agree, but the majority had to determine whether the paper met the journal's standard for a health claim.",
      cn: "为了决定是否发表，编辑请期刊的委员会组织一个外部专家组。一位实验室专业人员受邀检查研究方法，一位公共卫生官员则负责判断现实风险。两人都没有与论文作者合作过。如果某个技术问题需要其他领域的知识，更多专家也可以加入讨论。专家组不要求所有成员意见完全一致，但多数成员必须判断这篇论文是否达到了期刊对健康结论所设定的标准。",
      targets: []
    },
    {
      id: "p4",
      en: "Some publishers resist such checks because they cost time and money. Fast publication can drive attention, and being first may help a journal win new readers. The extra review may also seem unnecessary when a result is simple to understand. However, speed changes the incentives behind publication. If editors are rewarded mainly for striking claims, they may pay less attention to uncertainty. A strong review system does not remove uncertainty; it makes sure that uncertainty remains visible.",
      cn: "一些出版机构会抵触这种核查，因为它需要时间和费用。快速发表能够吸引关注，抢先发布也可能帮助期刊赢得新读者。当一项结果看起来很容易理解时，额外审查还可能显得没有必要。然而，速度会改变发表行为背后的激励。如果编辑主要因为醒目的结论而获得回报，他们就可能减少对不确定性的关注。一个有力的审查体系并不会消除不确定性，而是确保不确定性仍然清楚可见。",
      targets: []
    },
    {
      id: "p5",
      en: "In this case, the journal chose to publish the research with a narrower conclusion and a note calling for more data. That decision did not make the study worthless. It placed the finding in its proper context. Readers could see what the researchers had discovered, what they had not proved, and why the difference mattered. If journals want to win public trust, they must stick to standards that separate an interesting signal from a reliable conclusion. Careful review is not an obstacle to useful knowledge; it is part of the process that makes such knowledge possible.",
      cn: "在这个案例中，期刊最终决定发表这项研究，但缩小了结论范围，并附上一条需要更多数据的说明。这个决定并没有让研究失去价值，而是把发现放回了恰当的语境。读者可以看清研究人员发现了什么、没有证明什么，以及两者的区别为什么重要。如果期刊希望赢得公众信任，就必须坚持能够区分“有趣信号”和“可靠结论”的标准。严谨审查并不是有用知识的障碍，而是使这种知识成为可能的过程之一。",
      targets: []
    }
  ],
  vocabulary: [
    {
      word: "exist", forms: ["existed"], pos: "v.", basicMeaning: "存在",
      contextMeaning: "确实存在",
      collocation: "a danger really existed",
      englishDefinition: "to be real or present",
      contextualExample: "Did the evidence show that a danger really existed?",
      readingNote: "阅读中常用于追问某种现象或风险是否真实存在。"
    },
    {
      word: "standard", pos: "n.", basicMeaning: "标准",
      contextMeaning: "审查标准；判断依据",
      collocation: "meet the journal's standard",
      englishDefinition: "a level or rule used to judge quality",
      contextualExample: "The paper had to meet the journal's standard for a health claim.",
      readingNote: "meet a standard 表示“达到标准”。"
    },
    {
      word: "board", pos: "n.", basicMeaning: "木板；委员会",
      contextMeaning: "委员会；理事会",
      collocation: "the journal's board",
      englishDefinition: "a group responsible for managing or advising an organization",
      contextualExample: "The journal's board formed an outside panel.",
      readingNote: "本文不是“木板”，而是拥有管理或决策职责的组织。"
    },
    {
      word: "behind", pos: "prep.", basicMeaning: "在……后面",
      contextMeaning: "作为……背后的原因或条件",
      collocation: "the conditions behind the result",
      englishDefinition: "responsible for or explaining something",
      contextualExample: "The authors had not fully explained the conditions behind the result.",
      readingNote: "抽象语境中 behind 常表示“在……背后、导致……”。"
    },
    {
      word: "outside", pos: "adj.", basicMeaning: "外面的",
      contextMeaning: "外部的；不属于原机构的",
      collocation: "an outside panel",
      englishDefinition: "not belonging to the organization involved",
      contextualExample: "The board formed an outside panel.",
      readingNote: "这里强调专家独立于论文作者和期刊内部关系。"
    },
    {
      word: "join", pos: "v.", basicMeaning: "加入；连接",
      contextMeaning: "加入讨论或工作",
      collocation: "join the discussion",
      englishDefinition: "to become involved in an activity or group",
      contextualExample: "Other specialists could join the discussion.",
      readingNote: "join 后可直接接 group、discussion 等名词。"
    },
    {
      word: "drive", pos: "v.", basicMeaning: "驾驶；驱动",
      contextMeaning: "推动；促使",
      collocation: "drive attention",
      englishDefinition: "to cause or strongly influence a change",
      contextualExample: "Fast publication can drive attention.",
      readingNote: "本文是抽象义，不是“驾驶”。"
    },
    {
      word: "majority", pos: "n.", basicMeaning: "大多数",
      contextMeaning: "多数成员",
      collocation: "the majority had to determine",
      englishDefinition: "more than half of a group",
      contextualExample: "The majority had to determine whether the paper met the standard.",
      readingNote: "常与 minority 对照，强调群体中的多数部分。"
    },
    {
      word: "basic", pos: "adj.", basicMeaning: "基本的",
      contextMeaning: "最基础、必须先回答的",
      collocation: "a basic question",
      englishDefinition: "forming the simplest or most necessary part",
      contextualExample: "Yet a basic question came first.",
      readingNote: "basic 不一定表示“容易”，也可以表示“根本、基础”。"
    },
    {
      word: "line", pos: "n.", basicMeaning: "线；行",
      contextMeaning: "界线；分界",
      collocation: "the line between A and B",
      englishDefinition: "a boundary separating two ideas or conditions",
      contextualExample: "There was a line between detecting bacteria and demonstrating harm.",
      readingNote: "本文是抽象界线，不是文字的一行。"
    },
    {
      word: "editor", pos: "n.", basicMeaning: "编辑",
      contextMeaning: "负责论文取舍与审查的期刊编辑",
      collocation: "an editor knew that...",
      englishDefinition: "a person who prepares and selects material for publication",
      contextualExample: "An editor knew the claim would attract attention.",
      readingNote: "在学术出版中，editor 负责组织审稿并作出发表决定。"
    },
    {
      word: "panel", pos: "n.", basicMeaning: "面板；专家组",
      contextMeaning: "专家组；评审小组",
      collocation: "form an outside panel",
      englishDefinition: "a small group chosen to examine or discuss an issue",
      contextualExample: "The board formed an outside panel.",
      readingNote: "本文不是设备面板，而是为特定任务组成的小组。"
    },
    {
      word: "extra", pos: "adj.", basicMeaning: "额外的",
      contextMeaning: "额外增加的",
      collocation: "the extra review",
      englishDefinition: "added to what is usual or necessary",
      contextualExample: "The extra review may seem unnecessary.",
      readingNote: "强调在常规流程之外增加。"
    },
    {
      word: "particular", pos: "adj.", basicMeaning: "特定的；特别的",
      contextMeaning: "某一特定的",
      collocation: "one particular setting",
      englishDefinition: "specific rather than general",
      contextualExample: "Researchers found cells in one particular setting.",
      readingNote: "用于限制结论范围，是阅读中重要的范围信号。"
    },
    {
      word: "professional", pos: "n.", basicMeaning: "专业人士；职业的",
      contextMeaning: "专业人员",
      collocation: "a laboratory professional",
      englishDefinition: "a person with specialized training and skill",
      contextualExample: "A laboratory professional examined the methods.",
      readingNote: "本文作可数名词，指具备专业训练的人。"
    },
    {
      word: "check", forms: ["checked"], pos: "v./n.", basicMeaning: "检查；核查",
      contextMeaning: "核查实验事实",
      collocation: "check whether the cells could cause illness",
      englishDefinition: "to examine something in order to verify it",
      contextualExample: "The authors had not checked whether the cells could cause illness.",
      readingNote: "重点是验证，不是简单“看一下”。"
    },
    {
      word: "medical", pos: "adj.", basicMeaning: "医学的；医疗的",
      contextMeaning: "医学研究或医学出版相关的",
      collocation: "a medical journal",
      englishDefinition: "related to medicine or the treatment of illness",
      contextualExample: "A medical journal received the study.",
      readingNote: "medical journal 指医学专业期刊。"
    },
    {
      word: "welcome", pos: "v.", basicMeaning: "欢迎",
      contextMeaning: "乐于接受；对……表示欢迎",
      collocation: "readers would welcome it",
      englishDefinition: "to accept something with approval or pleasure",
      contextualExample: "Readers and news sites would welcome the finding.",
      readingNote: "本文不是见面问候，而是对信息持积极接受态度。"
    },
    {
      word: "cell", forms: ["cells"], pos: "n.", basicMeaning: "细胞；小房间",
      contextMeaning: "细菌细胞",
      collocation: "bacterial cells",
      englishDefinition: "the smallest structural unit of a living organism",
      contextualExample: "Researchers had found bacterial cells on a bag.",
      readingNote: "本文为生物学义，不是手机或牢房。"
    },
    {
      word: "officer", pos: "n.", basicMeaning: "官员；工作人员",
      contextMeaning: "承担公共职责的专业官员",
      collocation: "a public-health officer",
      englishDefinition: "a person holding an official position of responsibility",
      contextualExample: "A public-health officer judged the practical risk.",
      readingNote: "officer 不只指军官或警察，也可指机构官员。"
    },
    {
      word: "bag", pos: "n.", basicMeaning: "袋；包",
      contextMeaning: "可重复使用的购物袋",
      collocation: "a reusable shopping bag",
      englishDefinition: "a container made of flexible material for carrying things",
      contextualExample: "Bacteria were found on a reusable shopping bag.",
      readingNote: "购物袋是本文研究对象，直接关系到健康结论是否成立。"
    },
    {
      word: "beginning", pos: "n.", basicMeaning: "开始；开端",
      contextMeaning: "审查流程开始时",
      collocation: "at the beginning of the review",
      englishDefinition: "the point at which something starts",
      contextualExample: "At the beginning of the review, the answer was unclear.",
      readingNote: "at the beginning of... 表示某过程的起始阶段。"
    },
    {
      word: "win", pos: "v.", basicMeaning: "赢；赢得",
      contextMeaning: "赢得；获得",
      collocation: "win public trust",
      englishDefinition: "to gain something through effort",
      contextualExample: "Journals want to win public trust.",
      readingNote: "win 后面可以接 trust、support 等抽象名词。"
    },
    {
      word: "stick", pos: "v.", basicMeaning: "粘；坚持",
      contextMeaning: "坚持遵守",
      collocation: "stick to standards",
      englishDefinition: "to continue following a rule, decision, or belief",
      contextualExample: "Journals must stick to reliable standards.",
      readingNote: "stick to 是固定结构，表示“坚持、遵守”。"
    },
    {
      word: "additional", pos: "adj.", basicMeaning: "附加的；额外的",
      contextMeaning: "进一步补充的",
      collocation: "additional evidence",
      englishDefinition: "added beyond what already exists",
      contextualExample: "The claim required additional evidence.",
      readingNote: "与 extra 接近，但本文更强调在已有证据基础上的补充。"
    }
  ],
  questions: [
    {
      id: "q1", number: 1, type: "细节理解题",
      prompt: "Why did the journal ask an outside panel to review the study?",
      options: {
        A: "To make the study more attractive to news sites.",
        B: "To decide whether the evidence supported a public-health claim.",
        C: "To help the authors collect bags from more customers.",
        D: "To replace the journal's editor with medical officers."
      },
      correctAnswer: "B",
      paragraphId: "p3",
      locationText: "To decide what to publish, the editor asked the journal's board to form an outside panel. A laboratory professional was invited to examine the methods, while a public-health officer was asked to judge the practical risk.",
      retryHint: "提示：回到第3段，区分实验方法检查和现实健康风险判断。",
      analysis: {
        answer: "B",
        answerDetail: "To decide whether the evidence supported a public-health claim.",
        location: "第 3 段",
        navigation: "text",
        sections: [
          { title: "为什么选 B", content: `<p>外部专家组承担两个互补任务：实验室专业人员检查研究方法，公共卫生官员判断现实风险。</p><p>最终目的不是让新闻更吸引人，而是判断论文是否达到健康结论所需要的证据标准。</p><blockquote>a laboratory professional ... examine the methods<br>a public-health officer ... judge the practical risk</blockquote>` },
          { title: "错误选项为什么错", content: `<div class="wrong-reason"><b>A</b><p>吸引媒体是快速发表的诱因，不是组建专家组的目的。</p></div><div class="wrong-reason"><b>C</b><p>原文没有说专家组负责重新收集购物袋。</p></div><div class="wrong-reason"><b>D</b><p>officer 只负责提供公共卫生判断，并未取代 editor。</p></div>` }
        ]
      }
    },
    {
      id: "q2", number: 2, type: "句意推断题",
      prompt: "What does the author mean by “a line between detecting bacteria and demonstrating harm” in Paragraph 2?",
      options: {
        A: "Bacteria must be counted in a straight line.",
        B: "Finding bacterial cells does not by itself prove a health danger.",
        C: "Only one group of customers used the bags correctly.",
        D: "The study should avoid discussing possible illness."
      },
      correctAnswer: "B",
      paragraphId: "p2",
      locationText: "This left an important line between detecting bacteria and demonstrating harm. Crossing that line without additional evidence would turn an observation into a conclusion it could not support.",
      retryHint: "提示：比较“发现细胞”和“证明危害”所需要的证据强度。",
      analysis: {
        answer: "B",
        answerDetail: "Finding bacterial cells does not by itself prove a health danger.",
        location: "第 2 段",
        navigation: "text",
        sections: [
          { title: "如何理解这条 line", content: `<p>{{vocab:line}} 在这里不是一条实物线，而是两种结论之间的界线：</p><div class="context-path"><span>detect bacterial cells</span><i>↓</i><span>还需要 additional evidence</span><i>↓</i><strong>demonstrate harm</strong></div><p>检测到细菌只能说明细胞存在，不能自动证明它会导致疾病。</p>` },
          { title: "错误选项为什么错", content: `<div class="wrong-reason"><b>A</b><p>把抽象义 line 错当成实物线。</p></div><div class="wrong-reason"><b>C</b><p>原文比较的是证据层级，不是顾客使用方式。</p></div><div class="wrong-reason"><b>D</b><p>作者没有要求回避风险，而是要求用足够证据讨论风险。</p></div>` }
        ]
      }
    },
    {
      id: "q3", number: 3, type: "作者态度题",
      prompt: "The author's attitude toward additional review is best described as:",
      options: {
        A: "supportive, because it makes the limits of evidence clearer.",
        B: "hostile, because it prevents useful studies from being published.",
        C: "indifferent, because editors should only consider reader interest.",
        D: "doubtful, because outside professionals cannot judge medical research."
      },
      correctAnswer: "A",
      paragraphId: "p4",
      locationText: "A strong review system does not remove uncertainty; it makes sure that uncertainty remains visible.",
      retryHint: "提示：作者承认额外审查有成本，但如何评价它对“不确定性”的作用？",
      analysis: {
        answer: "A",
        answerDetail: "supportive, because it makes the limits of evidence clearer.",
        location: "第 4 段",
        navigation: "text",
        sections: [
          { title: "态度从哪里看", content: `<p>作者先承认额外审查会增加时间和费用，随后用 <strong>However</strong> 转向自己的重点：</p><blockquote>A strong review system ... makes sure that uncertainty remains visible.</blockquote><p>这是有限度但明确的支持，而不是无条件赞美。</p>` },
          { title: "错误选项为什么错", content: `<div class="wrong-reason"><b>B</b><p>作者认为审查帮助形成可靠知识，并非阻止发表。</p></div><div class="wrong-reason"><b>C</b><p>作者正是在批评只追求读者注意力。</p></div><div class="wrong-reason"><b>D</b><p>外部专业人员被视为有助于独立判断。</p></div>` }
        ]
      }
    },
    {
      id: "q4", number: 4, type: "主旨理解题",
      prompt: "Which of the following best summarizes the passage?",
      options: {
        A: "Medical journals should refuse studies that attract public attention.",
        B: "Bacteria on shopping bags are a major cause of illness.",
        C: "Responsible review helps journals distinguish interesting findings from supported health conclusions.",
        D: "Outside panels should make every publication decision instead of editors."
      },
      correctAnswer: "C",
      paragraphId: null,
      locationText: "",
      retryHint: "提示：不要只抓 shopping bag。文章真正反复讨论的是发现、证据与发表标准之间的关系。",
      analysis: {
        answer: "C",
        answerDetail: "Responsible review helps journals distinguish interesting findings from supported health conclusions.",
        location: "全文",
        navigation: "structure",
        structure: `<div class="article-structure"><div><b>P1</b><p>健康结论引发关注，但证据范围不清</p></div><i>↓</i><div><b>P2</b><p>发现细胞不等于证明危害</p></div><i>↓</i><div><b>P3</b><p>专业、独立的审查如何判断证据</p></div><i>↓</i><div><b>P4</b><p>速度与可靠性之间的张力</p></div><i>↓</i><div><b>P5</b><p>审查让结论回到恰当范围</p></div></div>`,
        sections: [
          { title: "为什么选 C", content: `<p>购物袋只是案例。全文主线是：</p><div class="context-path"><span>醒目的研究发现</span><i>↓</i><span>证据能支持到哪里</span><i>↓</i><span>专业审查与发表标准</span><i>↓</i><strong>可靠而不过度的公共结论</strong></div><p>C 同时覆盖问题、方法和最终结论。</p>` },
          { title: "错误选项为什么错", content: `<div class="wrong-reason"><b>A</b><p>作者不反对有吸引力的研究，只反对超出证据范围。</p></div><div class="wrong-reason"><b>B</b><p>文章没有证明购物袋细菌会造成重大疾病。</p></div><div class="wrong-reason"><b>D</b><p>panel 提供审查，最终发表决定仍由期刊体系作出。</p></div>` }
        ]
      }
    }
  ],
  sentences: [
    {
      id: "s1", number: "01",
      original: "Did the evidence show that a danger really existed, or only that researchers had found bacterial cells in one particular setting?",
      sections: [
        { title: "抓主干", content: `<p><strong>Did the evidence show A, or only B?</strong></p><p>证据表明的是 A，还是仅仅表明 B？</p>` },
        { title: "看关系", content: `<p><strong>or only</strong> 把两个不同强度的结论并列比较：</p><div class="sentence-core"><span>a danger really {{vocab:exist}}</span><i>vs.</i><span>found bacterial {{vocab:cell}}s</span></div><p><strong>in one particular setting</strong> 限制了发现的适用范围。</p>` },
        { title: "整句理解", content: `<p>证据真的说明危险确实存在，还是只说明研究人员在某一种特定环境中发现了细菌细胞？</p>` }
      ],
      reminder: "看到 A or only B，要判断作者是在区分哪两个证据层级。"
    },
    {
      id: "s2", number: "02",
      original: "To decide what to publish, the editor asked the journal's board to form an outside panel.",
      sections: [
        { title: "抓主干", content: `<p><strong>the {{vocab:editor}} asked the journal's {{vocab:board}} to form a panel</strong></p><p>编辑请期刊委员会组织一个专家组。</p>` },
        { title: "看关系", content: `<p><strong>To decide what to publish</strong> 表示目的；<strong>ask A to do B</strong> 是主句中的核心结构。</p>` },
        { title: "整句理解", content: `<p>为了决定发表什么，编辑请期刊委员会组织一个外部专家组。</p>` }
      ],
      reminder: "先找 asked A to do B，再处理句首目的和句尾成员说明。"
    },
    {
      id: "s3", number: "03",
      original: "If journals want to win public trust, they must stick to standards that separate an interesting signal from a reliable conclusion.",
      sections: [
        { title: "抓主干", content: `<p><strong>they must {{vocab:stick}} to standards</strong></p><p>它们必须坚持审查标准。</p>` },
        { title: "看关系", content: `<p><strong>If...</strong> 给出目标条件；<strong>that...</strong> 修饰 standards，说明这些标准具体做什么。</p><div class="sentence-core"><span>interesting signal</span><i>≠</i><span>reliable conclusion</span></div>` },
        { title: "整句理解", content: `<p>如果期刊想赢得公众信任，就必须坚持能够区分“有趣信号”和“可靠结论”的标准。</p>` }
      ],
      reminder: "读到 standards that... 时，that 后面通常在解释标准的功能。"
    }
  ],
  recallCards: [
    {
      id: "r1", word: "bag", type: "input", typeLabel: "语境召回英文",
      stem: "a reusable shopping ______", context: "本文被研究的日常用品", prompt: "缺少哪个词？", answer: "bag",
      hint: "提示：研究人员在这个可重复使用的容器上发现了细菌。", correctFeedback: "✓ 想起来了",
      answerLabel: "答案：bag", resolved: "a reusable shopping bag<br>= 可重复使用的购物袋"
    },
    {
      id: "r2", word: "line", type: "choice", typeLabel: "当前句中真实含义",
      stem: "the line between detecting bacteria and demonstrating harm", prompt: "这里的 line 表示什么？", answer: "C",
      options: { A: "文字的一行", B: "研究产品线", C: "两个结论之间的界线", D: "排队的人群" },
      hint: "提示：句子正在区分“发现细菌”和“证明危害”。", correctFeedback: "✓ 对，这里是抽象的分界。",
      answerLabel: "答案：C｜两个结论之间的界线", resolved: "the line between A and B<br>= A与B之间的界线"
    },
    {
      id: "r3", word: "cell", type: "choice", typeLabel: "语义区分",
      stem: "researchers had found bacterial cells", prompt: "这里的 cell 是什么？", answer: "A",
      options: { A: "细胞", B: "手机", C: "牢房", D: "小组" },
      hint: "提示：它被 bacterial 修饰。", correctFeedback: "✓ 对，修饰词确定了生物学义。",
      answerLabel: "答案：A｜细胞", resolved: "bacterial cells<br>= 细菌细胞"
    },
    {
      id: "r4", word: "panel", type: "choice", typeLabel: "角色与阅读功能",
      stem: "the board formed an outside panel", prompt: "board 与 panel 的关系最接近哪一项？", answer: "B",
      options: { A: "两者都指设备面板", B: "委员会组织了一个专项专家组", C: "专家组取代了期刊", D: "编辑加入了一家公司" },
      hint: "提示：注意动作 form 以及 outside professionals。", correctFeedback: "✓ 对，两个词指不同层级的组织。",
      answerLabel: "答案：B｜委员会组织专项专家组", resolved: "board = 管理委员会<br>panel = 为特定审查组成的专家组"
    },
    {
      id: "r5", word: "stick", type: "input", typeLabel: "搭配召回",
      stem: "______ to standards", context: "坚持遵守标准", prompt: "缺少哪个动词？", answer: "stick",
      hint: "提示：这个基础词和 to 连用时可以表示“坚持”。", correctFeedback: "✓ 想起来了",
      answerLabel: "答案：stick", resolved: "stick to standards<br>= 坚持遵守标准"
    },
    {
      id: "r6", word: "drive", type: "choice", typeLabel: "熟词换义",
      stem: "Fast publication can drive attention.", prompt: "这里的 drive 最接近：", answer: "D",
      options: { A: "驾驶", B: "赶走", C: "乘车", D: "推动；引发" },
      hint: "提示：主语是 Fast publication，宾语是 attention。", correctFeedback: "✓ 对，这里是抽象的推动作用。",
      answerLabel: "答案：D｜推动；引发", resolved: "drive attention<br>= 推动关注"
    }
  ],
  reviewWords: [
    { word: "exist", meaning: "确实存在", collocation: "a danger really existed" },
    { word: "standard", meaning: "审查标准；判断依据", collocation: "meet the journal's standard" },
    { word: "board", meaning: "委员会；理事会", collocation: "the journal's board" },
    { word: "behind", meaning: "作为……背后的条件", collocation: "conditions behind the result" },
    { word: "outside", meaning: "外部的；独立于本机构的", collocation: "an outside panel" },
    { word: "join", meaning: "加入讨论或工作", collocation: "join the discussion" },
    { word: "drive", meaning: "推动；促使", collocation: "drive attention" },
    { word: "majority", meaning: "多数成员", collocation: "the majority had to determine" },
    { word: "basic", meaning: "最基础、必须先回答的", collocation: "a basic question" },
    { word: "line", meaning: "界线；分界", collocation: "the line between A and B" },
    { word: "editor", meaning: "期刊编辑", collocation: "an editor knew that..." },
    { word: "panel", meaning: "专家组；评审小组", collocation: "form an outside panel" },
    { word: "extra", meaning: "额外增加的", collocation: "the extra review" },
    { word: "particular", meaning: "某一特定的", collocation: "one particular setting" },
    { word: "professional", meaning: "专业人员", collocation: "a laboratory professional" },
    { word: "check", meaning: "核查；验证", collocation: "check whether..." },
    { word: "medical", meaning: "医学研究相关的", collocation: "a medical journal" },
    { word: "welcome", meaning: "乐于接受", collocation: "readers would welcome it" },
    { word: "cell", meaning: "细菌细胞", collocation: "bacterial cells" },
    { word: "officer", meaning: "承担公共职责的官员", collocation: "a public-health officer" },
    { word: "bag", meaning: "可重复使用的购物袋", collocation: "a reusable shopping bag" },
    { word: "beginning", meaning: "流程的开始阶段", collocation: "at the beginning of the review" },
    { word: "win", meaning: "赢得；获得", collocation: "win public trust" },
    { word: "stick", meaning: "坚持遵守", collocation: "stick to standards" },
    { word: "additional", meaning: "进一步补充的", collocation: "additional evidence" }
  ],
  sections: [
    { id: "training", kicker: "READING PRACTICE", title: "阅读训练", summary: "4道题 · 用题目确认语境、证据与论证理解" },
    { id: "sentences", kicker: "SENTENCE LAB", title: "长难句区", summary: "3句 · 拆解证据边界与审查逻辑" },
    { id: "recall", kicker: "ACTIVE RECALL", title: "主动回忆区", summary: "6词 · 从真实语境召回当前义" },
    { id: "review", kicker: "25-WORD REVIEW", title: "25词复盘区", summary: "25词 · 离开本篇前快速检查" }
  ]
});
