# BATCH U11–U13 REPORT

## 批次结论

**BATCH QUALITY：PASS**

U11、U12、U13 已按 V1.2 Manifest 和 `UNIT_CONTENT_STANDARD_V1.0.md` 完成正式内容、静态校验、独立浏览器上下文交互验收及真实 Unit Selector 往返验收。三者均已注册为 `official / locked`；U14–U60 继续保持未开放。

## U11

- 正式25词：modern, opinion, stream, adopt, fight, badly, bar, apple, cry, tourist, circuit, theatre, castle, cable, coalition, drop, facility, impossible, meantime, north, opening, park, rip, tv, weigh
- 文章母题：废弃北方煤矿应如何转型为兼顾工业记忆、社区使用和旅游价值的现代遗产公园
- 正文：450词，5个自然段
- Manifest / Vocabulary / Review：25 / 25，完全一致
- 正文目标词覆盖：25 / 25
- 植入质量：Natural 23；Acceptable 2（`apple`、`tv`）；Forced 0
- Memory Hook：0（本组没有为了展示功能而硬加钩子）
- Questions：4题；细节理解、推理判断、词义理解、主旨理解；答案唯一
- Sentence Lab：3句，全部逐字来自正文
- Active Recall：6张，输入召回与语境选择混合
- Review：25 / 25
- 390px：无横向溢出，PASS
- Console：error 0，warning 0
- CONTENT QUALITY：PASS

## U12

- 正式25词：royal, head, counterpart, mere, privilege, danger, maintain, uniform, unlike, ordinary, style, sleep, monarch, queen, wealthy, automobile, behave, depth, east, extent, failure, fan, following, fresh, holder
- 文章母题：现代君主制能否在保留象征传统的同时，以公共服务、透明度和问责证明其合理性
- 正文：450词，5个自然段
- Manifest / Vocabulary / Review：25 / 25，完全一致
- 正文目标词覆盖：25 / 25
- 植入质量：Natural 22；Acceptable 3（`automobile`、`sleep`、`east`）；Forced 0
- Memory Hook：0（本组无必须加入的高价值钩子）
- Questions：4题；细节理解、推理判断、词义理解、主旨理解；答案唯一
- Sentence Lab：3句，全部逐字来自正文
- Active Recall：6张，输入召回与语境选择混合
- Review：25 / 25
- 390px：无横向溢出，PASS
- Console：error 0，warning 0
- CONTENT QUALITY：PASS

## U13

- 正式25词：wish, title, career, reflect, relationship, red, list, algorithm, outlet, database, request, cure, detect, differ, editorial, expression, flag, imitate, intelligent, june, meaning, medicine, mislead, missing, mostly
- 文章母题：新闻机构能否用算法筛查健康报道，同时保留编辑判断并避免误导公众
- 正文：464词，5个自然段
- Manifest / Vocabulary / Review：25 / 25，完全一致
- 正文目标词覆盖：25 / 25
- 植入质量：Natural 25；Acceptable 0；Forced 0
- Memory Hook：0（本组无牵强扩展）
- Questions：4题；细节理解、推理判断、句意理解、主旨理解；答案唯一
- Sentence Lab：3句，全部逐字来自正文
- Active Recall：6张，输入召回与语境选择混合
- Review：25 / 25
- 390px：无横向溢出，PASS
- Console：error 0，warning 0
- CONTENT QUALITY：PASS

## ACTIVE RECALL FRESH-STATE TEST

测试使用独立 Edge / Playwright browser context；context 在验收后关闭，因此不会写入或污染用户实际浏览器的学习状态。

### U11

- fresh CARD 01：输入为空、0 / 6、无答案反馈、下一张 disabled，PASS
- CARD 01：真实输入 `adopt` 并提交，完成后下一张 enabled，PASS
- CARD 01 → CARD 02：PASS
- CARD 02：真实选择 B，完成后下一张 enabled，PASS
- CARD 02 → CARD 03：PASS
- refresh restore：停留 CARD 03；前两张完成状态恢复；CARD 03 仍为空，PASS

### U12

- fresh CARD 01：输入为空、0 / 6、无答案反馈、下一张 disabled，PASS
- CARD 01：真实输入 `privilege` 并提交，完成后下一张 enabled，PASS
- CARD 01 → CARD 02：PASS
- CARD 02：真实选择 C，完成后下一张 enabled，PASS
- CARD 02 → CARD 03：PASS
- refresh restore：停留 CARD 03；前两张完成状态恢复；CARD 03 仍为空，PASS

### U13

- fresh CARD 01：输入为空、0 / 6、无答案反馈、下一张 disabled，PASS
- CARD 01：真实输入 `mislead` 并提交，完成后下一张 enabled，PASS
- CARD 01 → CARD 02：PASS
- CARD 02：真实选择 B，完成后下一张 enabled，PASS
- CARD 02 → CARD 03：PASS
- refresh restore：停留 CARD 03；前两张完成状态恢复；CARD 03 仍为空，PASS

自动验收污染真实状态：否。

## UNIT SELECTOR REAL TEST

在当前 Web App 真实 Unit Selector 中完成点击往返：

`U10 → U11 → U12 → U13 → U12 → U11 → U10`

- U11：可点击进入，URL、页面标题和当前 Unit 一致，PASS
- U12：可点击进入，URL、页面标题和当前 Unit 一致，PASS
- U13：可点击进入，URL、页面标题和当前 Unit 一致，PASS
- U14：仍显示“未开放”且不可点击，PASS
- Unit 状态隔离：独立命名空间，切换未出现串 Unit，PASS

## 综合回归

- Reading / 目标词点击 / Vocabulary Card：PASS
- Questions / Sentence Lab / Active Recall / Review：PASS
- 二刷 / completion / refresh restore：PASS
- Unit Selector：PASS
- 桌面端：PASS
- 390px：PASS
- 浏览器控制台：error 0，warning 0
- U01–U10 正式内容：未修改
- V1.2 Manifest：未修改
- `UNIT_CONTENT_STANDARD_V1.0.md`：未修改
- 公共代码：未修改

## 文件变更

- `data/u11.js`：新增 U11 正式锁定内容
- `data/u12.js`：新增 U12 正式锁定内容
- `data/u13.js`：新增 U13 正式锁定内容
- `data/units.js`：仅注册 U11–U13，使 Selector 与动态加载可进入
- `BATCH_U11_U13_REPORT.md`：本批次生产与验收记录

