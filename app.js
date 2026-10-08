(async function start() {
const app = document.querySelector("#app");

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function renderLoadError(error) {
  console.error(error);
  app.innerHTML = `<section class="load-error" role="alert"><div class="section-kicker">UNIT LOAD ERROR</div><h1>无法加载学习单元</h1><p>${error.message}</p></section>`;
}

function validateUnitData(unit) {
  const required = ["id", "sequence", "totalUnits", "title", "paragraphs", "vocabulary", "questions", "sentences", "recallCards", "reviewWords", "storage"];
  const missing = required.filter(key => unit[key] === undefined || unit[key] === null);
  if (missing.length) throw new Error(`Unit 数据缺少字段：${missing.join(", ")}`);
  ["paragraphs", "vocabulary", "questions", "sentences", "recallCards", "reviewWords"].forEach(key => {
    if (!Array.isArray(unit[key])) throw new Error(`Unit 字段 ${key} 必须是数组。`);
  });
  if (!Number.isInteger(unit.sequence) || !Number.isInteger(unit.totalUnits) || unit.sequence < 1 || unit.sequence > unit.totalUnits) throw new Error("Unit sequence / totalUnits 无效。");
  [["paragraphs", "id"], ["questions", "id"], ["sentences", "id"], ["recallCards", "id"], ["vocabulary", "word"], ["reviewWords", "word"]].forEach(([group, key]) => {
    const values = unit[group].map(item => item?.[key]);
    if (values.some(value => !value)) throw new Error(`${group} 中存在缺失的 ${key}。`);
    if (new Set(values).size !== values.length) throw new Error(`${group} 中存在重复的 ${key}。`);
  });
  if (!unit.storage.namespace) throw new Error("Unit storage.namespace 缺失。");
  unit.questions.forEach(question => {
    if (!question.correctAnswer || !question.options || !question.analysis) throw new Error(`题目 ${question.id} 缺少答案、选项或解析。`);
    if (question.paragraphId && !unit.paragraphs.some(paragraph => paragraph.id === question.paragraphId)) throw new Error(`题目 ${question.id} 引用了不存在的段落 ${question.paragraphId}。`);
  });
  return unit;
}

let unitData;
try {
  const requestedUnit = new URLSearchParams(location.search).get("unit");
  unitData = validateUnitData(await window.UnitRegistry.load(requestedUnit));
} catch (error) {
  renderLoadError(error);
  return;
}

const storageKeys = {
  unknownWords: `${unitData.storage.namespace}:unknownWords`,
  progress: `${unitData.storage.namespace}:progress`,
  secondPass: `${unitData.storage.namespace}:secondPass`,
  completion: `${unitData.storage.namespace}:completion`
};

function migrateStorageVersion() {
  const version = unitData.storage.version;
  if (!version) return;
  const versionKey = `${unitData.storage.namespace}:dataVersion`;
  if (localStorage.getItem(versionKey) === version) return;
  if (unitData.storage.resetOnFirstVersion && localStorage.getItem(versionKey) === null) {
    Object.values(storageKeys).forEach(key => localStorage.removeItem(key));
  }
  localStorage.setItem(versionKey, version);
}

function migrateUnitDataVersion() {
  const version = unitData.storage.version;
  if (!version) return;
  const marker = `${unitData.storage.namespace}:dataVersion`;
  if (localStorage.getItem(marker) === version) return;
  if (unitData.storage.resetOnFirstVersion === true && localStorage.getItem(marker) === null) {
    Object.values(storageKeys).forEach(key => localStorage.removeItem(key));
  }
  localStorage.setItem(marker, version);
}

migrateUnitDataVersion();

document.title = `${unitData.series}｜${unitData.id}`;
document.querySelector('meta[name="description"]').content = `${unitData.series} ${unitData.id} 阅读训练`;
document.querySelector("[data-unit-id]").textContent = unitData.id;
document.querySelector("[data-unit-progress]").textContent = `${String(unitData.sequence).padStart(2, "0")} / ${unitData.totalUnits}`;

function readStorage(key, fallback) {
  try { const value = localStorage.getItem(key); return value === null ? fallback : JSON.parse(value); }
  catch { return fallback; }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function migrateLegacyUnknownWords() {
  const legacyKey = unitData.storage.legacyUnknownWords;
  if (!legacyKey || localStorage.getItem(storageKeys.unknownWords) !== null) return;
  const legacyValue = localStorage.getItem(legacyKey);
  if (legacyValue !== null) localStorage.setItem(storageKeys.unknownWords, legacyValue);
}

migrateStorageVersion();
migrateLegacyUnknownWords();

function migrateRecallState() {
  const recallStateVersion = "4";
  const marker = `${unitData.storage.namespace}:recallStateVersion`;
  if (localStorage.getItem(marker) === recallStateVersion) return;

  const progress = readStorage(storageKeys.progress, {});
  if (progress && typeof progress === "object" && Object.prototype.hasOwnProperty.call(progress, "recall")) {
    delete progress.recall;
    writeStorage(storageKeys.progress, progress);
  }
  localStorage.setItem(marker, recallStateVersion);
}

migrateRecallState();
const savedProgress = readStorage(storageKeys.progress, {});
const savedSecondPass = readStorage(storageKeys.secondPass, false) === true;
const completionState = { completed: readStorage(storageKeys.completion, false) === true };
const state = { studyMode: true, showChinese: !savedSecondPass, reviewMode: savedSecondPass, activeWord: null, unitSelectorOpen: false };
const questionState = Object.fromEntries(unitData.questions.map(question => [question.id, { ...{
  attemptCount: 0,
  selectedAnswer: null,
  isCorrect: null,
  isFinished: false,
  analysisOpen: false,
  structureOpen: false
}, ...(savedProgress.questions?.[question.id] || {}) }]));
const sentenceState = Object.fromEntries(unitData.sentences.map(sentence => [sentence.id, { open: false, ...(savedProgress.sentences?.[sentence.id] || {}) }]));

function restoreRecallCardState(savedCardState) {
  const initial = { attemptCount: 0, response: null, isCorrect: null, completed: false, revealed: false };
  if (!savedCardState || typeof savedCardState !== "object") return initial;

  const response = typeof savedCardState.response === "string" && savedCardState.response.trim()
    ? savedCardState.response
    : null;
  const attemptCount = Number.isInteger(savedCardState.attemptCount) && savedCardState.attemptCount > 0
    ? savedCardState.attemptCount
    : 0;
  const completed = savedCardState.completed === true && Boolean(response) && attemptCount > 0;
  return {
    attemptCount,
    response,
    isCorrect: typeof savedCardState.isCorrect === "boolean" ? savedCardState.isCorrect : null,
    completed,
    revealed: completed && savedCardState.revealed === true
  };
}

const recallState = {
  currentIndex: Math.min(savedProgress.recall?.currentIndex || 0, Math.max(0, unitData.recallCards.length - 1)),
  cards: Object.fromEntries(unitData.recallCards.map(card => [card.id, restoreRecallCardState(savedProgress.recall?.cards?.[card.id])]))
};
const reviewState = {
  statuses: savedProgress.reviewStatuses && typeof savedProgress.reviewStatuses === "object" ? savedProgress.reviewStatuses : {},
  weakMode: savedProgress.review?.weakMode === true,
  weakIndex: savedProgress.review?.weakIndex || 0,
  weakCompleted: savedProgress.review?.weakCompleted === true
};
const moduleDefaults = {
  article: true,
  training: false,
  sentences: false,
  recall: false,
  review: false,
  complete: false,
  secondPass: false
};
const moduleState = { ...moduleDefaults, ...(savedProgress.modules || {}) };

function saveProgress() {
  writeStorage(storageKeys.progress, {
    questions: questionState,
    sentences: sentenceState,
    recall: recallState,
    reviewStatuses: reviewState.statuses,
    review: { weakMode: reviewState.weakMode, weakIndex: reviewState.weakIndex, weakCompleted: reviewState.weakCompleted },
    modules: moduleState
  });
}

function unitCompletionStatus(id) {
  return readStorage(`kaoyan1500:${id}:completion`, false) === true;
}

function renderUnitSelector() {
  const available = new Set(window.UnitRegistry.listRoutes());
  const units = Array.from({ length: window.UnitManifest.unitCount }, (_, index) => {
    const id = `U${String(index + 1).padStart(2, "0")}`;
    const isCurrent = id === unitData.id;
    const isAvailable = available.has(id);
    const completed = isAvailable && unitCompletionStatus(id);
    const label = `${id}${completed ? " ✓" : ""}`;
    if (!isAvailable) return `<button type="button" class="unit-index-item is-pending" disabled aria-label="${id} 未开放"><span>${id}</span><small>未开放</small></button>`;
    return `<a class="unit-index-item${isCurrent ? " is-current" : ""}" href="?unit=${id}" ${isCurrent ? 'aria-current="page"' : ""}><span>${label}</span><small>${completed ? "已完成" : "进入"}</small></a>`;
  }).join("");
  return `<div class="unit-selector${state.unitSelectorOpen ? " is-open" : ""}">
    <button type="button" class="unit-selector-trigger" data-unit-selector-toggle aria-expanded="${state.unitSelectorOpen}">
      <span class="unit-selector-label"><small>学习单元</small><strong>${unitData.id}</strong></span>
      <span class="unit-selector-count">${String(unitData.sequence).padStart(2, "0")} / ${unitData.totalUnits}</span><span class="unit-selector-chevron" aria-hidden="true">▾</span>
    </button>
    ${state.unitSelectorOpen ? `<div class="unit-selector-panel" aria-label="选择学习单元"><header><div><strong>选择 Unit</strong><span>60 Units · 每单元25词</span></div><button type="button" data-unit-selector-close aria-label="关闭 Unit Selector">×</button></header><div class="unit-index-grid">${units}</div><footer><span class="unit-index-legend"><i></i> 已开放</span><span>未开放 Unit 暂不可进入</span></footer></div>` : ""}
  </div>`;
}

function highlightTargets(text, targets) {
  return unitData.vocabulary.reduce((output, item) => [item.word, ...(item.forms || [])].reduce((result, form) => result.replace(new RegExp(`\\b(${form})\\b([.,;:!?])?`, "gi"), `<span class="target-token"><button class="target-word" type="button" data-word="${item.word}" aria-label="查看 ${item.word} 词卡">$1</button>$2</span>`), output), text);
}

function renderParagraphEnglish(paragraph) {
  const locations = unitData.questions
    .filter(item => item.paragraphId === paragraph.id && item.locationText && paragraph.en.includes(item.locationText))
    .map(question => ({ question, start: paragraph.en.indexOf(question.locationText), end: paragraph.en.indexOf(question.locationText) + question.locationText.length }))
    .sort((a, b) => a.start - b.start || b.end - a.end);
  if (!locations.length) return highlightTargets(paragraph.en, paragraph.targets);
  const boundaries = [...new Set([0, paragraph.en.length, ...locations.flatMap(item => [item.start, item.end])])].sort((a, b) => a - b);
  return boundaries.slice(0, -1).map((start, index) => {
    const end = boundaries[index + 1];
    const content = highlightTargets(paragraph.en.slice(start, end), paragraph.targets);
    const active = locations.filter(item => item.start <= start && item.end >= end);
    return active.reduce((output, item) => `<span class="location-sentence" data-location-for="${item.question.id}">${output}</span>`, content);
  }).join("");
}

function getSavedWords() {
  return readStorage(storageKeys.unknownWords, []);
}

function toggleSavedWord(word) {
  const words = getSavedWords();
  const next = words.includes(word) ? words.filter(item => item !== word) : [...words, word];
  writeStorage(storageKeys.unknownWords, next);
  return next.includes(word);
}

function closeWordCard() {
  state.activeWord = null;
  document.querySelector(".word-card-layer")?.remove();
}

function openWordCard(word, anchor) {
  closeWordCard();
  const entry = unitData.vocabulary.find(item => item.word.toLowerCase() === word.toLowerCase());
  if (!entry) return;
  const memoryData = entry.memory || (entry.memoryHook ? {
    items: [{ title: "💡 记忆钩子", content: entry.memoryHook.content }]
  } : null);
  state.activeWord = entry.word;
  const saved = getSavedWords().includes(entry.word);
  const layer = document.createElement("div");
  layer.className = "word-card-layer";
  layer.innerHTML = `<aside class="word-card" role="dialog" aria-modal="true" aria-labelledby="word-card-title">
    <button class="word-card-close" type="button" data-card-close aria-label="关闭词卡">×</button>
    <div class="word-card-heading"><h3 id="word-card-title">${entry.word}</h3><span>${entry.pos}</span></div>
    <dl>
      <div><dt>本篇核心义</dt><dd>${entry.contextMeaning}</dd></div>
      <div><dt>本篇搭配 / 结构</dt><dd>${entry.collocation}</dd></div>
      ${entry.englishDefinition ? `<div><dt>English definition</dt><dd>${entry.englishDefinition}</dd></div>` : ""}
      ${entry.contextualExample ? `<div><dt>Contextual example</dt><dd>${entry.contextualExample}</dd></div>` : ""}
      ${entry.basicMeaning && entry.basicMeaning !== entry.contextMeaning ? `<div><dt>基础义</dt><dd>${entry.basicMeaning}</dd></div>` : ""}
      ${entry.readingNote ? `<div><dt>阅读提醒</dt><dd>${entry.readingNote}</dd></div>` : ""}
      ${entry.warning ? `<div class="word-card-warning"><dt>易错提醒</dt><dd>${entry.warning}</dd></div>` : ""}
    </dl>
    ${memoryData ? `<div class="memory-block"><button class="memory-toggle" type="button" data-memory-toggle aria-expanded="false">＋ 怎么记？</button><div class="memory-content" hidden>${memoryData.items.map(item => `<section class="memory-item"><h4>${item.title}</h4><p>${item.content}</p>${item.relatedWords?.length ? `<div class="memory-family"><span>顺便认识：</span>${item.relatedWords.map(related => `<p><b>${related.word}</b><i>—</i>${related.meaning}</p>`).join("")}</div>` : ""}</section>`).join("")}${memoryData.note ? `<p class="memory-note">${memoryData.note}</p>` : ""}</div></div>` : ""}
    <button class="save-word" type="button" data-save-word="${entry.word}" aria-pressed="${saved}">${saved ? "★ 已加入我的生词" : "☆ 加入我的生词"}</button>
  </aside>`;
  document.body.append(layer);
  if (window.innerWidth > 600) {
    const rect = anchor.getBoundingClientRect();
    const card = layer.querySelector(".word-card");
    const cardHeight = card.getBoundingClientRect().height;
    card.style.left = `${Math.max(16, Math.min(rect.left, window.innerWidth - 340))}px`;
    card.style.top = `${Math.max(16, Math.min(rect.bottom + 10, window.innerHeight - cardHeight - 16))}px`;
  }
  layer.querySelector(".word-card-close").focus();
}

function control(label, key, helper) {
  return `<button class="control" type="button" data-control="${key}" aria-pressed="${key === "showChinese" ? !state[key] : state[key]}"><span>${label}</span><small>${helper}</small></button>`;
}

function renderModuleShell(id, kicker, title, summary, content, className = "") {
  const open = moduleState[id];
  return `<section class="module-shell module-${id} ${className} ${open ? "is-open" : "is-collapsed"}" data-module="${id}"><button type="button" class="module-toggle" data-module-toggle="${id}" aria-expanded="${open}" aria-controls="module-panel-${id}"><span class="module-title"><small>${kicker}</small><strong>${title}</strong></span><span class="module-summary">${summary}</span><i aria-hidden="true">⌄</i></button><div class="module-panel" id="module-panel-${id}" aria-hidden="${!open}" ${open ? "" : "inert"}><div class="module-panel-inner">${content}</div></div></section>`;
}

function vocabLink(word) {
  return `<button class="analysis-vocab" type="button" data-word="${word}" aria-label="查看 ${word} 词卡">${word}</button>`;
}

function renderRichContent(content = "") {
  return content.replace(/\{\{vocab:([a-z0-9-]+)\}\}/gi, (_, word) => vocabLink(word));
}

function renderQuestionAnalysis(question) {
  const analysis = question.analysis;
  const qState = questionState[question.id];
  const answerDetail = analysis.answerDetail ? `<small>${analysis.answerDetail}</small>` : "";
  const navigation = analysis.navigation === "structure"
    ? `<button type="button" class="return-to-text" data-structure-toggle data-question-id="${question.id}" aria-expanded="${qState.structureOpen}">${qState.structureOpen ? "收起文章结构" : "查看文章结构"}</button>`
    : `<button type="button" class="return-to-text" data-return-text="${question.paragraphId}" data-question-id="${question.id}">回到原文</button>`;
  const structure = analysis.navigation === "structure" && qState.structureOpen ? renderRichContent(analysis.structure) : "";
  const sections = analysis.sections.map(section => `<section><h4>${section.title}</h4>${renderRichContent(section.content)}</section>`).join("");
  return `<div class="question-analysis" id="${question.id}-analysis">
    <div class="analysis-summary"><div><span>正确答案</span><strong>${analysis.answer}</strong>${answerDetail}</div><div><span>原文定位</span><strong>${analysis.location}</strong></div>${navigation}</div>
    ${structure}${sections}
  </div>`;
}

function renderQuestionCard(question) {
  const qState = questionState[question.id];
  let feedback = "";
  if (qState.attemptCount === 1 && !qState.isFinished) feedback = `<div class="answer-feedback retry"><strong>✕ 再想想</strong><p>${question.retryHint}</p></div>`;
  if (qState.isFinished && qState.isCorrect && qState.attemptCount === 1) feedback = `<div class="answer-feedback correct"><strong>✓ 回答正确</strong></div>`;
  if (qState.isFinished && qState.isCorrect && qState.attemptCount === 2) feedback = `<div class="answer-feedback correct"><strong>✓ 这次答对了</strong></div>`;
  if (qState.isFinished && !qState.isCorrect) feedback = `<div class="answer-feedback finished"><strong>正确答案：${question.correctAnswer}</strong></div>`;
  const options = Object.entries(question.options).map(([letter, text]) => {
    const selected = qState.selectedAnswer === letter;
    const classNames = ["answer-option", selected ? "selected" : "", selected && qState.isCorrect ? "is-correct" : "", selected && qState.isCorrect === false ? "is-wrong" : "", qState.isFinished && !qState.isCorrect && letter === question.correctAnswer ? "show-correct" : ""].filter(Boolean).join(" ");
    return `<button type="button" class="${classNames}" data-answer="${letter}" data-question-id="${question.id}" ${qState.isFinished ? "disabled" : ""}><span>${letter}</span><p>${text}</p></button>`;
  }).join("");
  return `<article class="question-shell" data-question="${question.id}"><header><div><span>Question ${question.number}</span><em>${question.type}</em></div><small>定位：${question.analysis.location}</small></header><h3>${question.prompt}</h3><div class="answer-options">${options}</div>${feedback}${qState.isFinished ? `<button type="button" class="analysis-toggle" data-analysis-toggle data-question-id="${question.id}" aria-expanded="${qState.analysisOpen}">${qState.analysisOpen ? "收起解析" : "查看解析 ›"}</button>` : ""}${qState.analysisOpen ? renderQuestionAnalysis(question) : ""}</article>`;
}

function renderReadingPractice() {
  return `<section class="learning-section reading-practice" id="training"><div class="section-kicker">READING PRACTICE</div><h2>阅读训练</h2><div class="section-body"><div class="question-list">${unitData.questions.map(renderQuestionCard).join("")}</div></div></section>`;
}

function renderSentenceItem(sentence) {
  const sState = sentenceState[sentence.id];
  return `<article class="sentence-item" data-sentence="${sentence.id}">
    <header><span>Sentence ${sentence.number}</span></header>
    <p class="sentence-original">${highlightTargets(sentence.original, [])}</p>
    <button type="button" class="sentence-action" data-sentence-toggle="${sentence.id}" aria-expanded="${sState.open}">${sState.open ? "收起解析" : "拆一下 →"}</button>
    ${sState.open ? `<div class="sentence-breakdown">${sentence.sections.map((section, index) => `<section><header><span>0${index + 1}</span><h3>${section.title}</h3></header><div>${renderRichContent(section.content)}</div></section>`).join("")}<div class="sentence-reminder"><span>阅读提醒</span><p>${sentence.reminder}</p></div></div>` : ""}
  </article>`;
}

function renderSentenceLab() {
  return `<section class="learning-section sentence-lab" id="sentences"><div class="section-kicker">SENTENCE LAB</div><h2>长难句区</h2><div class="section-body"><header class="sentence-lab-intro"><p>不是逐词翻译，<br>而是学会怎么把长句拆开。</p></header><div class="sentence-list">${unitData.sentences.map(renderSentenceItem).join("")}</div></div></section>`;
}

function renderRecallInteraction(card, cardState) {
  if (card.type === "input") {
    if (cardState.completed) {
      return `<div class="recall-input-complete" aria-label="已完成回答"><span>你的回答</span><strong>${escapeHtml(cardState.response)}</strong></div>`;
    }
    return `<div class="recall-input-row"><input type="text" data-recall-input="${card.id}" aria-label="输入回忆答案" autocomplete="off" spellcheck="false"><button type="button" data-recall-check="${card.id}">检查 →</button></div>`;
  }
  return `<div class="recall-options">${Object.entries(card.options).map(([letter, text]) => { const selected = cardState.response === letter; const correct = cardState.completed && letter === card.answer; return `<button type="button" data-recall-choice="${letter}" data-recall-card="${card.id}" class="${selected && !cardState.isCorrect ? "is-wrong" : ""} ${correct ? "is-correct" : ""}" ${cardState.completed ? "disabled" : ""}><span>${letter}</span><p>${text}</p></button>`; }).join("")}</div>`;
}

function renderRecallFeedback(card, cardState) {
  if (!cardState.attemptCount) return "";
  if (!cardState.completed) return `<div class="recall-feedback retry"><p>${card.hint}</p></div>`;
  return `<div class="recall-feedback ${cardState.isCorrect ? "correct" : "revealed"}"><strong>${cardState.isCorrect ? card.correctFeedback : card.answerLabel}</strong><p>${card.resolved}</p></div><button type="button" class="recall-vocab-link" data-word="${card.word}" aria-label="查看 ${card.word} 词卡">查看词卡 →</button>`;
}

function renderActiveRecall() {
  const card = unitData.recallCards[recallState.currentIndex];
  const cardState = recallState.cards[card.id];
  const completedCount = Object.values(recallState.cards).filter(item => item.completed).length;
  const allCompleted = completedCount === unitData.recallCards.length;
  return `<section class="learning-section active-recall" id="recall"><div class="section-kicker">ACTIVE RECALL</div><h2>主动回忆区</h2><div class="section-body"><header class="recall-intro"><div><p>先别翻词卡，试着自己想一次。</p>${allCompleted ? `<strong>✓ 本轮回忆完成</strong><small>有些词没一次想起来很正常，后面的复盘还会再见到它们。</small>` : ""}</div><span>${completedCount} / ${unitData.recallCards.length}</span></header><article class="recall-card" data-recall-current="${card.id}"><header><span>Card ${String(recallState.currentIndex + 1).padStart(2, "0")}</span><em>${card.typeLabel}</em></header><div class="recall-stem">${card.stem}</div>${card.context ? `<p class="recall-context">${card.context}</p>` : ""}<h3>${card.prompt}</h3>${renderRecallInteraction(card, cardState)}${renderRecallFeedback(card, cardState)}</article><nav class="recall-nav" aria-label="回忆卡导航"><button type="button" data-recall-prev ${recallState.currentIndex === 0 ? "disabled" : ""}>上一张</button><span>${String(recallState.currentIndex + 1).padStart(2, "0")} / ${String(unitData.recallCards.length).padStart(2, "0")}</span><button type="button" data-recall-next ${!cardState.completed || recallState.currentIndex === unitData.recallCards.length - 1 ? "disabled" : ""}>下一张</button></nav></div></section>`;
}

function submitRecall(cardId, response) {
  const card = unitData.recallCards.find(item => item.id === cardId);
  const cardState = recallState.cards[cardId];
  if (!card || cardState.completed) return;
  const normalized = card.type === "input" ? response.trim().toLowerCase() : response;
  if (!normalized) return;
  cardState.attemptCount += 1;
  cardState.response = normalized;
  cardState.isCorrect = normalized === (card.type === "input" ? card.answer.toLowerCase() : card.answer);
  if (cardState.isCorrect || cardState.attemptCount >= 2) {
    cardState.completed = true;
    cardState.revealed = !cardState.isCorrect;
  }
  render();
}

function getWeakWords() {
  return unitData.reviewWords.filter(item => reviewState.statuses[item.word] === "fuzzy" || reviewState.statuses[item.word] === "unknown");
}

function isReviewComplete() {
  return unitData.reviewWords.every(item => Boolean(reviewState.statuses[item.word]));
}

function renderReviewWord(item, index) {
  const current = reviewState.statuses[item.word] || "";
  const statuses = [
    { value: "known", label: "✓ 记住了" },
    { value: "fuzzy", label: "○ 有点模糊" },
    { value: "unknown", label: "× 还不会" }
  ];
  return `<article class="review-word" data-review-word="${item.word}"><div class="review-word-copy"><span>${String(index + 1).padStart(2, "0")}</span><div><h3>${item.word}</h3><p>${item.meaning}</p><small>${item.collocation}</small></div><button type="button" data-word="${item.word}" aria-label="查看 ${item.word} 词卡">查看词卡 →</button></div><div class="review-statuses">${statuses.map(status => `<button type="button" data-review-status="${status.value}" data-review-target="${item.word}" aria-pressed="${current === status.value}" class="${current === status.value ? `is-${status.value}` : ""}">${status.label}</button>`).join("")}</div></article>`;
}

function renderWeakReview() {
  const weakWords = getWeakWords();
  if (reviewState.weakCompleted) return `<div class="weak-review-done"><strong>薄弱词复习完成</strong><button type="button" data-review-return>返回25词复盘</button></div>`;
  const item = weakWords[reviewState.weakIndex];
  return `<div class="weak-review"><header><span>薄弱词 ${String(reviewState.weakIndex + 1).padStart(2, "0")} / ${String(weakWords.length).padStart(2, "0")}</span><em>${reviewState.statuses[item.word] === "fuzzy" ? "有点模糊" : "还不会"}</em></header><h3>${item.word}</h3><p>${item.meaning}</p><small>${item.collocation}</small><button type="button" class="weak-card-link" data-word="${item.word}" aria-label="查看 ${item.word} 词卡">查看词卡 →</button><nav><button type="button" data-weak-prev ${reviewState.weakIndex === 0 ? "disabled" : ""}>上一词</button>${reviewState.weakIndex === weakWords.length - 1 ? `<button type="button" data-weak-finish>完成薄弱词复习</button>` : `<button type="button" data-weak-next>下一词</button>`}</nav></div>`;
}

function renderWordReview() {
  const reviewedCount = Object.keys(reviewState.statuses).length;
  const complete = isReviewComplete();
  const counts = { known: 0, fuzzy: 0, unknown: 0 };
  Object.values(reviewState.statuses).forEach(status => { counts[status] += 1; });
  const weakCount = counts.fuzzy + counts.unknown;
  if (reviewState.weakMode) return `<section class="learning-section word-review" id="review"><div class="section-kicker">25-WORD REVIEW</div><h2>25词复盘区</h2><div class="section-body"><header class="review-intro"><p>快速再看一遍还不够清晰的词。</p><span>${weakCount} 个薄弱词</span></header>${renderWeakReview()}</div></section>`;
  return `<section class="learning-section word-review" id="review"><div class="section-kicker">25-WORD REVIEW</div><h2>25词复盘区</h2><div class="section-body"><header class="review-intro"><p>快速扫一遍，标记你此刻的记忆状态。</p><span>已复盘 ${reviewedCount} / ${unitData.reviewWords.length}</span></header><div class="review-grid">${unitData.reviewWords.map(renderReviewWord).join("")}</div>${complete ? `<footer class="review-result"><strong>本篇25词复盘完成</strong><div><span>记住了 ${counts.known}</span><span>有点模糊 ${counts.fuzzy}</span><span>还不会 ${counts.unknown}</span></div>${weakCount ? `<button type="button" data-weak-start>只复习薄弱词 →</button>` : `<p>✓ 本篇25词已全部标记为“记住了”</p>`}</footer>` : ""}</div></section>`;
}

function handleAnswer(questionId, answer) {
  const qState = questionState[questionId];
  if (qState.isFinished) return;
  const question = unitData.questions.find(item => item.id === questionId);
  qState.attemptCount += 1;
  qState.selectedAnswer = answer;
  qState.isCorrect = answer === question.correctAnswer;
  qState.isFinished = qState.isCorrect || qState.attemptCount >= 2;
  render();
}

function highlightLocation(paragraphId, questionId) {
  const paragraph = document.querySelector(`#${paragraphId} .paragraph-en`);
  if (!paragraph) return;
  paragraph.scrollIntoView({ behavior: "smooth", block: "center" });
  const sentences = paragraph.querySelectorAll(`[data-location-for="${questionId}"]`);
  if (!sentences.length) return;
  sentences.forEach(sentence => sentence.classList.add("is-located"));
  setTimeout(() => sentences.forEach(sentence => sentence.classList.remove("is-located")), 2400);
}

function render() {
  saveProgress();
  document.querySelector(".unit-progress").innerHTML = renderUnitSelector();
  const articleContent = `<article class="reading-paper"><header class="reading-head"><div class="reading-title-row"><div><div class="section-kicker">ARTICLE</div><h2>阅读正文</h2></div><span class="reading-note">自然段双语对照</span></div><div class="reading-brief"><div><strong>${unitData.id} · ${unitData.stage}</strong><span>本篇新学 ${unitData.newWordCount}词 · 阅读训练 ${unitData.questions.length}题</span></div><p>提示：第一遍先读英文，卡住再看中文</p></div></header>${unitData.paragraphs.map((p, index) => `<div class="paragraph" id="${p.id}" data-paragraph-number="${String(index + 1).padStart(2, "0")}"><p class="paragraph-en">${renderParagraphEnglish(p)}</p><p class="paragraph-cn">${p.cn}</p></div>`).join("")}</article>`;
  const learningModules = unitData.sections.map(section => {
    if (section.id === "training") return renderModuleShell("training", section.kicker, section.title, section.summary, renderReadingPractice());
    if (section.id === "sentences") return renderModuleShell("sentences", section.kicker, section.title, section.summary, renderSentenceLab());
    if (section.id === "recall") return renderModuleShell("recall", section.kicker, section.title, section.summary, renderActiveRecall());
    return renderModuleShell("review", section.kicker, section.title, section.summary, renderWordReview());
  }).join("");
  const completionContent = `<section class="completion" id="complete"><div class="section-kicker">UNIT COMPLETE</div><h2>完成 ${unitData.id}</h2><p>${completionState.completed ? "本单元已完成。" : isReviewComplete() ? "25词复盘已完成，可以结束本单元。" : `完成${unitData.reviewWords.length}词复盘后即可结束本单元。`}</p><button type="button" data-action="complete" ${isReviewComplete() && !completionState.completed ? "" : "disabled"}>${completionState.completed ? `已完成 ${unitData.id}` : "标记本单元完成"}</button></section>`;
  const secondPassCopy = state.reviewMode
    ? `<div class="second-pass-copy"><strong class="second-pass-status">二刷已开启</strong><p>现在回到阅读正文，从头再读一次。<br>遇到核心词时先主动回忆词义，尽量不依赖中文完成整篇阅读。</p><small>一刷是学会，二刷是确认自己真的会。</small><button type="button" class="return-to-article" data-return-article>↑ 回到阅读正文</button></div>`
    : `<div class="second-pass-copy"><p>开启二刷后，中文提示将默认隐藏。<br>回到阅读正文，从头再读一遍，遇到核心词时先主动回忆词义。</p><small>一刷是学会，二刷是确认自己真的会。</small></div>`;
  const secondPassContent = `<section class="learning-section" id="second-pass"><div class="section-kicker">SECOND PASS</div><h2>二刷模式入口</h2><div class="section-body"><div class="placeholder">${secondPassCopy}<span class="section-index">02</span></div></div></section>`;
  app.innerHTML = `
    <section class="hero" id="top">
      <div><div class="eyebrow">${unitData.id} · Reading Unit</div><h1>${unitData.title}</h1><p class="hero-cn">${unitData.subtitle}</p><div class="meta-row"><span>阶段：<b>${unitData.stage}</b></span><span>本篇新学：<b>${unitData.newWordCount}词</b></span></div></div>
      <div class="controls" aria-label="学习控制">${control("学习模式", "studyMode", state.studyMode ? "开启" : "关闭")}${control(state.showChinese ? "隐藏中文" : "显示中文", "showChinese", state.showChinese ? "当前显示" : "当前隐藏")}${control("二刷模式", "reviewMode", state.reviewMode ? "已进入" : "未开启")}</div>
    </section>
    <section class="goal"><h2>本篇学习目标</h2><div class="goal-list">${unitData.goals.map((goal, i) => `<div class="goal-item"><span class="goal-number">0${i + 1}</span><span>${goal}</span></div>`).join("")}</div></section>
    ${renderModuleShell("article", "ARTICLE", "阅读正文", `本篇新学${unitData.newWordCount}词 · 阅读训练${unitData.questions.length}题`, articleContent, "module-article")}
    <div class="flow">${learningModules}</div>
    ${renderModuleShell("complete", "UNIT COMPLETE", `完成 ${unitData.id}`, "完成25词复盘后即可结束本单元", completionContent)}
    ${renderModuleShell("secondPass", "SECOND PASS", "二刷模式", "减少提示，独立再读一次", secondPassContent)}`;
  document.body.classList.toggle("hide-chinese", !state.showChinese);
  document.body.classList.toggle("review-mode", state.reviewMode);
}

document.addEventListener("click", event => {
  const selectorToggle = event.target.closest("[data-unit-selector-toggle]");
  if (selectorToggle) { state.unitSelectorOpen = !state.unitSelectorOpen; render(); return; }
  if (event.target.closest("[data-unit-selector-close]")) { state.unitSelectorOpen = false; render(); return; }
  if (state.unitSelectorOpen && !event.target.closest(".unit-selector")) { state.unitSelectorOpen = false; render(); return; }
  const wordButton = event.target.closest("[data-word]");
  if (wordButton) { openWordCard(wordButton.dataset.word, wordButton); return; }
  if (event.target.matches(".word-card-layer") || event.target.closest("[data-card-close]")) { closeWordCard(); return; }
  const saveButton = event.target.closest("[data-save-word]");
  if (saveButton) {
    const saved = toggleSavedWord(saveButton.dataset.saveWord);
    saveButton.setAttribute("aria-pressed", String(saved));
    saveButton.textContent = saved ? "★ 已加入我的生词" : "☆ 加入我的生词";
    return;
  }
  const memoryToggle = event.target.closest("[data-memory-toggle]");
  if (memoryToggle) {
    const expanded = memoryToggle.getAttribute("aria-expanded") === "true";
    memoryToggle.setAttribute("aria-expanded", String(!expanded));
    memoryToggle.textContent = expanded ? "＋ 怎么记？" : "－ 怎么记？";
    memoryToggle.nextElementSibling.hidden = expanded;
    if (!expanded && window.innerWidth > 600) {
      const card = memoryToggle.closest(".word-card");
      const cardHeight = card.getBoundingClientRect().height;
      card.style.top = `${Math.max(16, Math.min(parseFloat(card.style.top), window.innerHeight - cardHeight - 16))}px`;
    }
    return;
  }
  const answerButton = event.target.closest("[data-answer]");
  if (answerButton) { handleAnswer(answerButton.dataset.questionId, answerButton.dataset.answer); return; }
  const analysisToggle = event.target.closest("[data-analysis-toggle]");
  if (analysisToggle) { const qState = questionState[analysisToggle.dataset.questionId]; qState.analysisOpen = !qState.analysisOpen; render(); return; }
  const returnButton = event.target.closest("[data-return-text]");
  if (returnButton) { highlightLocation(returnButton.dataset.returnText, returnButton.dataset.questionId); return; }
  const structureToggle = event.target.closest("[data-structure-toggle]");
  if (structureToggle) { const qState = questionState[structureToggle.dataset.questionId]; qState.structureOpen = !qState.structureOpen; render(); return; }
  const sentenceToggle = event.target.closest("[data-sentence-toggle]");
  if (sentenceToggle) { const sState = sentenceState[sentenceToggle.dataset.sentenceToggle]; sState.open = !sState.open; render(); return; }
  const recallCheck = event.target.closest("[data-recall-check]");
  if (recallCheck) { const input = document.querySelector(`[data-recall-input="${recallCheck.dataset.recallCheck}"]`); submitRecall(recallCheck.dataset.recallCheck, input.value); return; }
  const recallChoice = event.target.closest("[data-recall-choice]");
  if (recallChoice) { submitRecall(recallChoice.dataset.recallCard, recallChoice.dataset.recallChoice); return; }
  const recallPrev = event.target.closest("[data-recall-prev]");
  if (recallPrev) { recallState.currentIndex = Math.max(0, recallState.currentIndex - 1); render(); return; }
  const recallNext = event.target.closest("[data-recall-next]");
  if (recallNext) { const current = unitData.recallCards[recallState.currentIndex]; if (recallState.cards[current.id].completed) { recallState.currentIndex = Math.min(unitData.recallCards.length - 1, recallState.currentIndex + 1); render(); } return; }
  const reviewStatus = event.target.closest("[data-review-status]");
  if (reviewStatus) { reviewState.statuses[reviewStatus.dataset.reviewTarget] = reviewStatus.dataset.reviewStatus; render(); return; }
  const weakStart = event.target.closest("[data-weak-start]");
  if (weakStart) { reviewState.weakMode = true; reviewState.weakIndex = 0; reviewState.weakCompleted = false; render(); return; }
  const weakPrev = event.target.closest("[data-weak-prev]");
  if (weakPrev) { reviewState.weakIndex = Math.max(0, reviewState.weakIndex - 1); render(); return; }
  const weakNext = event.target.closest("[data-weak-next]");
  if (weakNext) { reviewState.weakIndex = Math.min(getWeakWords().length - 1, reviewState.weakIndex + 1); render(); return; }
  const weakFinish = event.target.closest("[data-weak-finish]");
  if (weakFinish) { reviewState.weakCompleted = true; render(); return; }
  const reviewReturn = event.target.closest("[data-review-return]");
  if (reviewReturn) { reviewState.weakMode = false; reviewState.weakCompleted = false; render(); return; }
  const returnArticle = event.target.closest("[data-return-article]");
  if (returnArticle) { document.querySelector('[data-module="article"] .module-toggle')?.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
  const moduleToggle = event.target.closest("[data-module-toggle]");
  if (moduleToggle) {
    const id = moduleToggle.dataset.moduleToggle;
    moduleState[id] = !moduleState[id];
    const shell = moduleToggle.closest(".module-shell");
    const panel = shell.querySelector(".module-panel");
    shell.classList.toggle("is-open", moduleState[id]);
    shell.classList.toggle("is-collapsed", !moduleState[id]);
    moduleToggle.setAttribute("aria-expanded", String(moduleState[id]));
    panel.setAttribute("aria-hidden", String(!moduleState[id]));
    panel.inert = !moduleState[id];
    saveProgress();
    return;
  }
  const button = event.target.closest("button");
  if (!button) return;
  const key = button.dataset.control;
  if (key === "showChinese") state.showChinese = !state.showChinese;
  if (key === "studyMode") state.studyMode = !state.studyMode;
  if (key === "reviewMode") {
    state.reviewMode = !state.reviewMode;
    state.showChinese = !state.reviewMode;
    writeStorage(storageKeys.secondPass, state.reviewMode);
  }
  if (button.dataset.action === "complete" && isReviewComplete()) {
    completionState.completed = true;
    writeStorage(storageKeys.completion, true);
    render();
    return;
  }
  if (key) render();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && state.activeWord) closeWordCard();
  if (event.key === "Enter" && event.target.matches("[data-recall-input]")) submitRecall(event.target.dataset.recallInput, event.target.value);
});

render();
})();
