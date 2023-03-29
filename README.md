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

English / [简体中文](README-zh_CN.md)
</div>

### ✨ Describe

Video Roll is a web extension that helps you rotate, scale, zoom, move, flip, tune and filter HTML5 videos in any web pages. Works great on most sites(Youtube™/Bilibili/Vimeo/TikTok/Twitter, etc).Support the same-origin iframe's video(dailymotion.com).Support shortcut key:Ctrl+Up/Right/Down/Left.We provide an excellent memory system to help the next time you enter the website to take effect directly.

---

### ✨ Features

![](https://tuchuangs.com/imgs/2022/09/11/0b4c21db7b3e0d01.png)

-   ✅Support all HTML5 Video
-   ✅Flip(horizontal/vertical)
-   ✅Zoom
-   ✅Move(reposition)
-   ✅Scale
-   ✅Rotate 0/90/180/270deg
-   ✅Tune(Pitch)
-   ✅Filter
-   ✅Memory system(You can save all the configuration of the current website so that it will take effect directly next time)
-   ✅Support shortcut key
-   ✅Support same-origin iframe
-   ✅Automatically calculates video scaling
-   ✅Respect user privacy

---

### ✨ Shortcut Key useage

-   ctrl+ArrowUp(0deg)
-   ctrl+ArrowRight(90deg)
-   ctrl+ArrowDown(180deg)
-   ctrl+ArrowLeft(270deg)

---

### ✨ Change Log
-   v1.1.3:

    -   🐞Bug Fixes: 
        - Fix the problem that the shortcut key is invalid.

    -   ✨Features:
        - Add reset button.

    -   🌈Development:
        - Rewrite the build flow.
        - Change yarn into pnpm.

-   v1.1.2:

    -   🐞Bug Fixes: 
        - Fix the problem that the memory system is invalid.

    -   ✨Features:
        - Add tune function. Now you can adjust the pitch of HTML5 Videos.We used [jungle.js](https://github.com/cwilso/Audio-Input-Effects/blob/main/js/jungle.js) (Copyright Google) to accomplish this function. And thanks for the inspiration [Pitch shifter](https://chrome.google.com/webstore/detail/pitch-shifter-html5-video/mpmkclglcbkjchakihfpblainfncennj)

-   v1.1.1:

    -   ✨Features:
        - Add move function.
        - Add filter function.
        - Set 'Remenber this tab' as default option.
    
    -   🌈Development:
        - Change .vue into .tsx for better typescript dev experience.

-   v1.1.0:

    -   ✨Features:
        - Brand new interface.
        - Support zoom.
        - Support scale.
        - Add memory system.

-   v1.0.52:

    -   🐞Bug Fixes: 
        - Fix the problem that Bilibili is not working.

-   v1.0.51:

    -   Remove unnecessary permissions.

-   v1.0.5:

    -   ✨Features:
        - Support flip.
        - Brand new interface.

-   v1.0.4:

    -   ✨Features:
        - Support shortcut key：Ctrl+Right(90deg)/Ctrl+Down(180deg)/Ctrl+Left(270deg)/Ctrl+Up(0deg)
        - Add badge.

-   v1.0.3:

    -   🐞Bug Fixes: 
        - Fix the problem that F12 reporting an error when rotating iframe's video.
        - Fix the problem that Youtube fullscreen is not working.

        bug reporter：
        chrome user @天南地北随遇而安

-   v1.0.2:

    -   🐞Bug Fixes: 
        - Fixed an error display in extension management.

    -   ✨Features:
        - Support same-origin iframe.
        - Add rotate animation.
        

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
