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

[Chrome Web Store](https://chrome.google.com/webstore/detail/video-roll/cokngoholafkeghnhhdlmiadlojpindm?hl=zh-CN&authuser=0 "Chrome Web Store") |
[Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/video-roll/indeeigndpaahbcegcanpmbenmkbkmmn "Edge Add-ons") |
[Firefox Add-ons](https://addons.mozilla.org/firefox/addon/videoroll/ "Firefox Add-ons") |
[Home Page](https://gomi.site/VideoRoll "Home Page")

English | [简体中文](README-zh_CN.md)
</div>

### ✨ Describe

Video Roll is a web extension that helps you rotate, stretch, zoom, reposition, flip, tune, focus and filter HTML5 videos in any web pages. Works great on most sites(Youtube™/Bilibili/Vimeo/TikTok/Twitter, etc).Support the same-origin iframe's video(dailymotion.com).Support shortcut key:Ctrl+Up/Right/Down/Left/B.We provide an excellent memory system to help the next time you enter the website to take effect directly.

---

### ✨ Features

![9603e49b7121b314caf11da224ab3667.png](https://i.mji.rip/2023/07/24/9603e49b7121b314caf11da224ab3667.png)

-   ✅Support all HTML5 Video
-   ✅Flip(horizontal/vertical)
-   ✅Zoom
-   ✅Reposition
-   ✅Stretch
-   ✅Rotate 0/90/180/270deg
-   ✅Tune(Pitch)
-   ✅Focus
-   ✅Filter
-   ✅Memory system(You can save all the configuration of the current website so that it will take effect directly next time)
-   ✅Support shortcut key
-   ✅Support same-origin iframe
-   ✅Automatically calculates video scaling
-   ✅Respect user privacy

---

### ✨ Shortcut Key useage
#### Rotate
-   ctrl+ArrowUp(0deg)
-   ctrl+ArrowRight(90deg)
-   ctrl+ArrowDown(180deg)
-   ctrl+ArrowLeft(270deg)

#### Focus
ctrl+B  

---

### ✨ Installation

-   **crx**
    - [chrome.zzzmh.cn](https://chrome.zzzmh.cn/info/cokngoholafkeghnhhdlmiadlojpindm)
    - [Chrome Web Store](https://chrome.google.com/webstore/detail/video-roll/cokngoholafkeghnhhdlmiadlojpindm?hl=zh-CN&authuser=0 "Chrome Web Store")
    - [Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/video-roll/indeeigndpaahbcegcanpmbenmkbkmmn "Edge Add-ons")


-   **developer mode**
    If you can't install crx，you can open chrome's developer mode.

---

### ✨ Sponsoring

-   [afdian](https://afdian.net/a/gomi_gxy/plan)
-   [official(last page)](https://gomi.site/VideoRoll)

---

### ✨ Bug Report

If you have any questions, please commit a issue.

---

### ✨ Contribution

If you like this extension，please star it.
If you have any good idea, please commit a issue or send a PR.

#### Development steps

1. clone this repo to your local.
2. `pnpm install`
3. dev: `pnpm run dev:chromium`, then you can drag and drop the dist folder into chrome's extension management.(make sure open developer mode). Parcel will do the hot reload work for you, just change your code, then reclick the popup button.
4. build: `pnpm run build`. Both chromium zip and firefox zip will be done.


---

### ✨ Acknowledgments

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
