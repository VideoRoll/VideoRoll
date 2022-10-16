<!--
 * @description: video roll
 * @Author: Gouxinyu
 * @Date: 2022-01-13 22:43:33
-->

# ✨Video Roll

![bbaiqK.png](https://s1.ax1x.com/2022/03/13/bbaiqK.png)

[![Chrome Web Store](https://badgen.net/chrome-web-store/users/cokngoholafkeghnhhdlmiadlojpindm?icon=chrome&color=0f9d58)](https://chrome.google.com/webstore/detail/cokngoholafkeghnhhdlmiadlojpindm?hl=en) ![](https://img.shields.io/github/stars/gxy5202/VideoRoll) ![](https://img.shields.io/github/package-json/v/gxy5202/VideoRoll) ![](https://img.shields.io/github/package-json/license/gxy5202/VideoRoll)

[Chrome Web Store](https://chrome.google.com/webstore/detail/video-roll/cokngoholafkeghnhhdlmiadlojpindm?hl=zh-CN&authuser=0 "Chrome Web Store") / [Home Page](https://gomi.site/VideoRoll "Home Page")

### ✨ 介绍(Describe)

Video Roll is a web extension that helps you rotate, scale, zoom, mve, flip and filter HTML5 videos in any web pages. Works great on most sites(Youtube™/Bilibili/Vimeo/TikTok/Twitter, etc).Support the same-origin iframe's video(dailymotion.com).Support shortcut key:Ctrl+Up/Right/Down/Left.We provide an excellent memory system to help the next time you enter the website to take effect directly.

Video Roll 是一个帮助你旋转、缩放、移动、调整比例、镜像翻转和滤镜任意网页中 HTML5 视频的浏览器插件。在大部分网站上都表现出色(Youtube™/Bilibili/Vimeo/TikTok/Twitter 等)，支持旋转同源 iframe 下的视频(如 dailymotion.com)，支持快捷键: Ctrl+Up/Right/Down/Left。我们提供了超棒的记忆功能，帮助你一下次进入网站直接生效。

---

### ✨ 主要特性(Features)

![](https://tuchuangs.com/imgs/2022/09/11/0b4c21db7b3e0d01.png)

-   ✅Support all HTML5 Video
-   ✅Flip(horizontal/vertical)
-   ✅Zoom
-   ✅Move(reposition)
-   ✅Scale
-   ✅Rotate 0/90/180/270deg
-   ✅Filter
-   ✅Memory system(You can save all the configuration of the current website so that it will take effect directly next time)
-   ✅Support shortcut key
-   ✅Support same-origin iframe
-   ✅Automatically calculates video scaling
-   ✅Respect user privacy

---

-   ✅ 可旋转任何网页中的 HTML5 视频，支持 0/90/180/270° 旋转
-   ✅ 支持镜像翻转（垂直/水平翻转）
-   ✅ 支持自定义缩放
-   ✅ 支持移动视频位置
-   ✅ 支持自定义比例调整
-   ✅ 支持设置滤镜效果
-   ✅ 记忆系统（保存当前网站的配置，下次进入网页直接生效）
-   ✅ 针对同源 iframe 中的视频做了优化，支持旋转同源 iframe 中的视频(如 dailymotion.com)
-   ✅ 旋转视频时，会自动根据视频容器和视频原始大小尺寸进行自适应，避免旋转后只能展示部分内容的情况
-   ✅ 重视安全性，插件不会收集任何用户信息
-   ✅ 支持快捷键 ctrl + 方向键

---

### ✨ 快捷键使用方式(Shortcut Key useage)

#### Steps:

1. 地址栏输入 `chrome://extensions/shortcuts`
2. 找到 Video Roll, 设置快捷键

---

### ✨ 更新日志(Change Log)

-   v1.1.1:

    -   Add move function.
    -   Add filter function.
    -   Set 'Remenber this tab' as default option.
    -   Change .vue into .tsx for better typescript dev experience.

-   v1.1.0:

    -   Brand new interface(全新的交互界面)
    -   Support zoom(支持自定义缩放)
    -   Support scale(支持自定义调整比例)
    -   Add memory system(增加记忆系统)

-   v1.0.52:

    -   fixed: Bilibili 旋转不生效

-   v1.0.51:

    -   移除不必要的权限要求

-   v1.0.5:

    -   增加镜像翻转功能（垂直/水平翻转），可同时镜像翻转和二维旋转
    -   优化界面

-   v1.0.4:

    -   增加快捷键操作：Ctrl+Right(90deg)/Ctrl+Down(180deg)/Ctrl+Left(270deg)/Ctrl+Up(0deg)
    -   增加小图标 badge

-   v1.0.3:

    -   修复存在跨域 iframe 时报错问题
    -   修复 Youtube 全屏时旋转角度失效问题

        bug 贡献者：
        chrome 用户 @天南地北随遇而安

-   v1.0.2:
    -   支持旋转 (同源)iframe 中的视频
    -   增加了旋转时的动画
    -   修复了扩展程序管理中显示报错的问题

---

### ✨ 安装(Installation)

-   **crx 安装**
    在谷歌应用商店或非官方商店直接下载该插件安装即可（由于谷歌对于新开发者采取信任制策略，可能需要数个月才能进入信任名单，如提示不信任，需要点击确认安装）

-   **开发模式安装**
    如您无法安装 crx，可以在浏览器的扩展程序中开启“开发者模式”，直接将 dist 文件夹拖入安装即可。

---

### ✨ 捐赠(Sponsoring)

-   [afdian](https://afdian.net/a/gomi_gxy/plan)
-   [official(last page)](https://gomi.site/VideoRoll)

---

### ✨ 问题反馈(Bug Report)

若您在使用中遇到任何问题，比如 bug 或者网站有特殊的视频元素无法旋转，请在 issue 中留下问题，我们会尽快解决。

---

### ✨ 贡献(Contribution)

如果你觉得这个插件对你有所帮助，please star it.

若你发现问题或有更好的 idea，欢迎贡献想法和代码~

---

### ✨ 感谢以下开源项目(Acknowledgments)

-   Vue
-   Parcel
-   Copyfiles
-   Less
-   Vant
-   Visual Studio Code
