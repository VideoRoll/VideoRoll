<!--
 * @description: video roll
 * @Author: Gouxinyu
 * @Date: 2022-01-13 22:43:33
-->

# Video Roll

[![bbaiqK.png](https://s1.ax1x.com/2022/03/13/bbaiqK.png)](https://imgtu.com/i/bbaiqK)

![](https://img.shields.io/github/stars/gxy5202/VideoRoll) ![](https://img.shields.io/github/package-json/v/gxy5202/VideoRoll) ![](https://img.shields.io/github/package-json/license/gxy5202/VideoRoll)

[Chrome Web Store](https://chrome.google.com/webstore/detail/video-roll/cokngoholafkeghnhhdlmiadlojpindm?hl=zh-CN&authuser=0 "Chrome Web Store") / [Github](https://github.com/gxy5202/ "Github")

### 介绍(Describe)

Video Roll is a web extension that helps you rotate HTML5 videos in any web pages. Different from other rotating extensions, we have specially optimized it for PXhub and Bilibili, and support image flipping. Works fine on most websites(Youtube/Bilibili/Vimeo/TikTok/Twitter, etc).Support the same-origin iframe's video(dailymotion.com).Support shortcut key:Ctrl+Up/Right/Down/Left.

Video Roll 是一个可以帮助你旋转任何网页中 HTML5 视频角度的浏览器插件。不同于其他旋转插件，我们特意针对 P 站、B 站进行了优化，同时支持镜像翻转。兼容市面上大部分视频网站(Youtube/Bilibili/Vimeo/TikTok/Twitter 等)，支持旋转同源 iframe 下的视频(如 dailymotion.com)，支持快捷键: Ctrl+Up/Right/Down/Left。

### 主要特性(Features)

---

-   ✅Support all HTML5 Video
-   ✅Flipping(horizontal/vertical)
-   ✅Rotating 0/90/180/270deg
-   ✅Support Pxhub/BiliBili
-   ✅Support shortcut key
-   ✅Support same-origin iframe
-   ✅Auto scale video size
-   ✅70kb bundle size
-   ✅Respect user privacy

---

-   ✅ 可旋转任何网页中的 HTML5 视频，支持 0/90/180/270° 旋转
-   ✅ 支持镜像翻转（垂直/水平翻转）
-   ✅ 针对播放器使用 Web components 或 Shadow dom 的网站做了特别优化（P 站、B 站）
-   ✅ 针对同源 iframe 中的视频做了优化，支持旋转同源 iframe 中的视频(如 dailymotion.com)
-   ✅ 旋转视频时，会自动根据视频容器和视频原始大小尺寸进行自适应，避免旋转后只能展示部分内容的情况
-   ✅ 轻量级插件，大小只有 70kb 左右
-   ✅ 重视安全性，插件不会收集任何用户信息
-   ✅ 支持快捷键 ctrl + 方向键

### 更新日志(Change Log)

---

-   v1.0.6

    -   优化界面交互
    -   修复 Youtube 从首页进入后，第一次旋转无效的问题

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

### 使用(Useage)

---

[![bqt7C9.png](https://s1.ax1x.com/2022/03/13/bqt7C9.png)](https://imgtu.com/i/bqt7C9)

-   **crx 安装**
    在谷歌应用商店或非官方商店直接下载该插件安装即可（由于谷歌对于新开发者采取信任制策略，可能需要数个月才能进入信任名单，如提示不信任，需要点击确认安装）

-   **开发模式安装**
    如您无法安装 crx，可以在浏览器的扩展程序中开启“开发者模式”，直接将 dist 文件夹拖入安装即可。

### 问题反馈(Bug Report)

---

若您在使用中遇到任何问题，比如 bug 或者网站有特殊的视频元素无法旋转，请在 issue 中留下问题，我们会尽快解决

### 贡献(Contribution)

---

如果你觉得这个插件对你有所帮助，please star it.

若你发现问题或有更好的 idea，欢迎贡献想法和代码~
