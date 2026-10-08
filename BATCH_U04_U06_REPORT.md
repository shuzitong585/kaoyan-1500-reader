# U04–U06 最终验收报告

验收日期：2026-09-06  
生产标准：`UNIT_CONTENT_STANDARD_V1.0`  
词汇归属：V1.2 Manifest（冻结）

## U04

- 状态：`official / locked`
- 正式25词：single, something, moment, actual, understand, interesting, kid, adult, magazine, love, partner, celebrate, rarely, baby, celebrity, candidate, wonder, chamber, surround, hit, translate, yes, ambition, guard, post
- 文章母题：公共人物分享家庭生活时，公共理解、证据判断与儿童隐私之间的边界
- 正文：461词 / 5段
- Manifest与正文覆盖：25/25
- Vocabulary Card：25词均可打开正确词卡
- Reading Practice：4题（细节理解、句意推断、推理判断、主旨理解）
- Sentence Lab：3句，全部逐字来自正文
- Active Recall：6张，输入召回与语境选择混合
- Review：25/25；三态选择、完成条件与完成状态正常
- 内容植入：Natural 21 / Acceptable 4 / Forced 0
- 内容质量：PASS
- 390px：scrollWidth 390 = clientWidth 390，无横向溢出；长文本、按钮、卡片、底部目录均正常
- 状态恢复：题目、Sentence、Recall、Review、二刷与 completion 刷新后恢复
- Console：error 0 / warning 0
- 最终结果：PASS

## U05

- 状态：`official / locked`
- 正式25词：resource, massive, fashion, advance, imagine, fast, chemical, conscious, anticipate, cycle, film, release, remarkable, vision, conflict, exhibit, odds, brand, craft, revolution, foreign, wash, bake, bottle, divert
- 文章母题：时尚产业能否通过材料设计、回收技术和透明证据实现真正循环生产
- 正文：459词 / 5段
- Manifest与正文覆盖：25/25
- Vocabulary Card：25词均可打开正确词卡；`washed` 正确映射到 wash
- Reading Practice：4题（细节理解、推理判断、词义理解、主旨理解）
- Sentence Lab：3句，全部逐字来自正文
- Active Recall：6张，输入召回、熟词换义、语境与阅读功能判断混合
- Review：25/25；三态选择、完成条件与完成状态正常
- 内容植入：Natural 22 / Acceptable 3 / Forced 0
- 内容质量：PASS
- 390px：scrollWidth 390 = clientWidth 390，无横向溢出；长文本、按钮、卡片、底部目录均正常
- 状态恢复：题目、Sentence、Recall、Review、二刷与 completion 刷新后恢复
- Console：error 0 / warning 0
- 最终结果：PASS

## U06

- 状态：`official / locked`
- 正式25词：democratic, event, equal, lobby, approval, gift, ethic, representative, trial, wealth, premise, overturn, double, proud, senate, goods, rural, equality, undermine, meeting, poll, citizen, contract, refer, tech
- 文章母题：公共技术采购中，企业影响、证据质量、平等程序与民主信任的关系
- 正文：453词 / 5段
- Manifest与正文覆盖：25/25
- Vocabulary Card：25词均可打开正确词卡；`proudly` 正确映射到 proud
- Reading Practice：4题（细节理解、推理判断、词义理解、论证目的）
- Sentence Lab：3句，全部逐字来自正文
- Active Recall：6张，输入召回、熟词换义、语境与搭配判断混合
- Review：25/25；三态选择、完成条件与完成状态正常
- 内容植入：Natural 23 / Acceptable 2 / Forced 0
- 内容质量：PASS
- 390px：scrollWidth 390 = clientWidth 390，无横向溢出；长文本、按钮、卡片、底部目录均正常
- 状态恢复：题目、Sentence、Recall、Review、二刷与 completion 刷新后恢复
- Console：error 0 / warning 0
- 最终结果：PASS

## 跨 Unit 验收

- 跨 Unit 状态隔离：PASS
  - 独立测试中，U04 保存完成题目 + s1 展开 + `single=known` + 二刷开启。
  - U05 保存完成题目 + s2 展开 + `resource=fuzzy` + 二刷关闭。
  - U06 保存首次错题待重试 + s3 展开 + `democratic=unknown` + 二刷关闭。
  - U04 → U05 → U06 → U04 → U05 → U06 后三套状态各自恢复，无交叉污染。
- Refresh restore：PASS；U06 刷新前后上述状态完全一致。真实页面中的 completion 刷新后仍显示已完成。
- Unit Selector：PASS；U04/U05/U06 均可进入并显示 `✓ 已完成`，当前 Unit 高亮与 URL、标题一致；U07–U60 显示未开放并禁用。
- 390px mobile：PASS；三页均无横向溢出，响应式单列、长文本、按钮、卡片和页面底部正常。
- Console：PASS；三页桌面与390px共6次独立加载均为 error 0 / warning 0。
- Data validator：PASS；三 Unit Manifest 精确一致、数量与ID完整、题目答案结构有效、Sentence 原句均存在于正文。
- U01–U03：未修改；本轮未发现回归或状态污染。

## 文件记录

本批正式内容文件：

- `data/u04.js`
- `data/u05.js`
- `data/u06.js`
- `data/units.js`（仅注册已通过验收的 U04–U06）

只读验收工具与产物：

- `scripts/validate_batch_units.mjs`
- `scripts/browser_batch_check.mjs`
- `scripts/verify_batch_state.mjs`
- `u04-desktop.png`, `u04-390px.png`
- `u05-desktop.png`, `u05-390px.png`
- `u06-desktop.png`, `u06-390px.png`

本次续验没有修改 `index.html`、`styles.css`、`app.js`、Manifest、生产标准或 U01–U03。测试中未发现需要公共代码修复的问题。

## 批次结论

**BATCH QUALITY：PASS**

U04、U05、U06 均已完成正式内容、静态校验、真实浏览器验收、390px验收、刷新恢复和跨 Unit 状态隔离验证，可以锁定。生产规范无需因本批次进行修订。
