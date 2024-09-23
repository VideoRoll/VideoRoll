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

[![Chrome Web Store](https://img.shields.io/chrome-web-store/users/cokngoholafkeghnhhdlmiadlojpindm?icon=chrome&color=0f9d58)](https://chrome.google.com/webstore/detail/cokngoholafkeghnhhdlmiadlojpindm?hl=en) ![](https://img.shields.io/chrome-web-store/rating/cokngoholafkeghnhhdlmiadlojpindm) ![](https://badgen.net/chrome-web-store/stars/cokngoholafkeghnhhdlmiadlojpindm) ![](https://img.shields.io/github/stars/gxy5202/VideoRoll) ![](https://img.shields.io/github/package-json/v/gxy5202/VideoRoll) ![](https://img.shields.io/github/package-json/license/gxy5202/VideoRoll)

[Chrome Web Store](https://chrome.google.com/webstore/detail/video-roll/cokngoholafkeghnhhdlmiadlojpindm?hl=zh-CN&authuser=0 "Chrome Web Store") |
[Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/video-roll/indeeigndpaahbcegcanpmbenmkbkmmn "Edge Add-ons") |
[Firefox Add-ons](https://addons.mozilla.org/firefox/addon/videoroll/ "Firefox Add-ons") |
[Home Page](https://videoroll.gomi.site "Home Page")

[English](README.md) | 简体中文
</div>

### ✨ 介绍

Video Roll 是一个帮助你旋转、缩放、移动、下载、调整比例、镜像翻转、调节音调、音量、倍速、专注和滤镜任意网页中 HTML5 视频的浏览器插件。在大部分网站上都表现出色(Youtube™/Bilibili/Vimeo/TikTok/Twitter 等)，支持旋转同源 iframe 下的视频(如 dailymotion.com)，支持快捷键: Ctrl+Up/Right/Down/Left/B。我们提供了超棒的记忆功能，帮助你一下次进入网站直接生效。

---

### ✨ 主要特性

![9603e49b7121b314caf11da224ab3667.png](https://i.mji.rip/2023/07/24/9603e49b7121b314caf11da224ab3667.png)

---

-   ✅ 可旋转任何网页中的 HTML5 视频，支持 0/90/180/270° 旋转
-   ✅ 支持镜像翻转（垂直/水平翻转）
-   ✅ 支持自定义缩放
-   ✅ 支持移动视频位置
-   ✅ 支持自定义比例调整
-   ✅ 支持下载视频
-   ✅ 支持调节视频音调
-   ✅ 支持调节视频音量，突破最大音量
-   ✅ 支持调节视频倍速
-   ✅ 专注模式
-   ✅ 支持设置滤镜效果
-   ✅ 发现Iframes
-   ✅ 记忆系统（保存当前网站的配置，下次进入网页直接生效）
-   ✅ 针对同源 iframe 中的视频做了优化，支持旋转同源 iframe 中的视频(如 dailymotion.com)
-   ✅ 旋转视频时，会自动根据视频容器和视频原始大小尺寸进行自适应，避免旋转后只能展示部分内容的情况
-   ✅ 重视安全性，插件不会收集任何用户信息
-   ✅ 支持快捷键 ctrl + 方向键

---

### ✨ 快捷键使用方式
- 打开设置页面查看和自定义

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
-   webextension-polyfill
