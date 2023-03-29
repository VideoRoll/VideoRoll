<!--
 * @description: video roll
 * @Author: Gouxinyu
 * @Date: 2022-01-13 22:43:33
-->
<p align="center">
  <a href="https://gomi.site/VideoRoll">
    <img width="230" src="src/icons/icon_512.png">
  </a>
</p>

<h1 align="center">
Video Roll
</h1>

<div align="center">

[![Chrome Web Store](https://badgen.net/chrome-web-store/users/cokngoholafkeghnhhdlmiadlojpindm?icon=chrome&color=0f9d58)](https://chrome.google.com/webstore/detail/cokngoholafkeghnhhdlmiadlojpindm?hl=en) ![](https://badgen.net/chrome-web-store/rating/cokngoholafkeghnhhdlmiadlojpindm) ![](https://badgen.net/chrome-web-store/stars/cokngoholafkeghnhhdlmiadlojpindm) ![](https://img.shields.io/github/stars/gxy5202/VideoRoll) ![](https://img.shields.io/github/package-json/v/gxy5202/VideoRoll) ![](https://img.shields.io/github/package-json/license/gxy5202/VideoRoll)

[Chrome Web Store](https://chrome.google.com/webstore/detail/video-roll/cokngoholafkeghnhhdlmiadlojpindm?hl=zh-CN&authuser=0 "Chrome Web Store") /
[Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/video-roll/indeeigndpaahbcegcanpmbenmkbkmmn "Edge Add-ons") /
[Home Page](https://gomi.site/VideoRoll "Home Page")

[English](README.md) / 简体中文
</div>

### ✨ 介绍

Video Roll 是一个帮助你旋转、缩放、移动、调整比例、镜像翻转、调节音调和滤镜任意网页中 HTML5 视频的浏览器插件。在大部分网站上都表现出色(Youtube™/Bilibili/Vimeo/TikTok/Twitter 等)，支持旋转同源 iframe 下的视频(如 dailymotion.com)，支持快捷键: Ctrl+Up/Right/Down/Left。我们提供了超棒的记忆功能，帮助你一下次进入网站直接生效。

---

### ✨ 主要特性

![](https://tuchuangs.com/imgs/2022/09/11/0b4c21db7b3e0d01.png)

---

-   ✅ 可旋转任何网页中的 HTML5 视频，支持 0/90/180/270° 旋转
-   ✅ 支持镜像翻转（垂直/水平翻转）
-   ✅ 支持自定义缩放
-   ✅ 支持移动视频位置
-   ✅ 支持自定义比例调整
-   ✅ 支持调节视频音调
-   ✅ 支持设置滤镜效果
-   ✅ 记忆系统（保存当前网站的配置，下次进入网页直接生效）
-   ✅ 针对同源 iframe 中的视频做了优化，支持旋转同源 iframe 中的视频(如 dailymotion.com)
-   ✅ 旋转视频时，会自动根据视频容器和视频原始大小尺寸进行自适应，避免旋转后只能展示部分内容的情况
-   ✅ 重视安全性，插件不会收集任何用户信息
-   ✅ 支持快捷键 ctrl + 方向键

---

### ✨ 快捷键使用方式

-   ctrl+ArrowUp(旋转0度)
-   ctrl+ArrowRight(旋转90度)
-   ctrl+ArrowDown(旋转180度)
-   ctrl+ArrowLeft(旋转270度)

---

### ✨ 更新日志
-   v1.1.3:

    -   🐞Bug Fixes: 
        - 修复快捷键失效问题。
        - 修复当网站存在多个视频元素时，功能失效的问题。

    -   ✨Features:
        - 增加重置按钮。

    -   🌈Development:
        - 重构打包构建流程。
        - yarn切换到pnpm。

-   v1.1.2:

    -   🐞Bug Fixes: 
        - 修复记忆系统失效问题。

    -   ✨Features:
        - 增加调节视频音调功能。我们使用了 [jungle.js](https://github.com/cwilso/Audio-Input-Effects/blob/main/js/jungle.js) (Copyright Google)来完成这个功能。 感谢 [Pitch shifter](https://chrome.google.com/webstore/detail/pitch-shifter-html5-video/mpmkclglcbkjchakihfpblainfncennj) 带来的灵感。

-   v1.1.1:

    -   ✨Features:
        - 增加移动位置功能。
        - 增加滤镜功能。
        - 将 'Remenber this tab' 默认开启。

    -   🌈Development:
        - 将vue用tsx重写，得到更好的ts支持。

-   v1.1.0:

    -   ✨Features:
        - 全新的交互界面。
        - 支持自定义缩放。
        - 支持自定义调整比例。
        - 增加记忆系统。

-   v1.0.52:

    -   🐞Bug Fixes: 
        - 修复 Bilibili 旋转不生效。

-   v1.0.51:

    -   移除不必要的权限要求。

-   v1.0.5:

    -   ✨Features:
        - 增加镜像翻转功能（垂直/水平翻转），可同时镜像翻转和二维旋转。
        - 优化界面。

-   v1.0.4:

    -   ✨Features:
        - 增加快捷键操作：Ctrl+Right(90deg)/Ctrl+Down(180deg)/Ctrl+Left(270deg)/Ctrl+Up(0deg)。
        - 增加小图标 badge。

-   v1.0.3:

    -   🐞Bug Fixes: 
        - 修复存在跨域 iframe 时报错问题。
        - 修复 Youtube 全屏时旋转角度失效问题。

        bug 贡献者：
        chrome 用户 @天南地北随遇而安

-   v1.0.2:

    -   🐞Bug Fixes:
        - 修复了扩展程序管理中显示报错的问题。

    -   ✨Features:
        - 支持旋转 (同源)iframe 中的视频。
        - 增加了旋转时的动画。
        

---

### ✨ 安装

-   **crx 安装**
    - [chrome.zzzmh.cn](https://chrome.zzzmh.cn/info/cokngoholafkeghnhhdlmiadlojpindm)
    - [Chrome Web Store](https://chrome.google.com/webstore/detail/video-roll/cokngoholafkeghnhhdlmiadlojpindm?hl=zh-CN&authuser=0 "Chrome Web Store")

-   **开发模式安装**
    如您无法安装 crx，可以在浏览器的扩展程序中开启“开发者模式”，直接将 dist 文件夹拖入安装即可。

---

### ✨ 捐赠

-   [afdian](https://afdian.net/a/gomi_gxy/plan)
-   [official(最后一页)](https://gomi.site/VideoRoll)

---

### ✨ 问题反馈

若您在使用中遇到任何问题，比如 bug 或者网站有特殊的视频元素无法旋转，请在 issue 中留下问题，我们会尽快解决。

---

### ✨ 贡献

如果你觉得这个插件对你有所帮助，please star it.

若你发现问题或有更好的 idea，欢迎贡献想法和代码~

#### 贡献步骤

1. 将本仓库克隆到你的本地
2. 在根目录下执行 `pnpm install`
3. 开发模式: 执行 `pnpm run dev:chromium`, 然后可以将dist文件夹直接拖入chrome的扩展程序管理中.(确保打开了开发者模式). Parcel 将会帮你完成热更新，你只需要修改代码，然后重新点击popup按钮即可。
4. 构建: 执行 `pnpm run build`. 将会打包出 chromium zip 和 firefox zip。
---

### ✨ 感谢以下开源项目

-   vue
-   parcel
-   parcel-namer-hashless
-   jest
-   jsx
-   typescript
-   copyfiles
-   jungle
-   node
-   less
-   vant
-   visual Studio Code
-   pnpm
-   yarn
