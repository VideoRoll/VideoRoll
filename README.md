<!--
 * @description: video roll
 * @Author: Gouxinyu
 * @Date: 2022-01-13 22:43:33
-->

# Video Roll

[![bbaiqK.png](https://s1.ax1x.com/2022/03/13/bbaiqK.png)](https://imgtu.com/i/bbaiqK)

![](https://img.shields.io/github/stars/gxy5202/VideoRoll) ![](https://img.shields.io/github/package-json/v/gxy5202/VideoRoll) ![](https://img.shields.io/github/package-json/license/gxy5202/VideoRoll)

[Chrome Web Store](https://chrome.google.com/webstore/detail/video-roll/cokngoholafkeghnhhdlmiadlojpindm?hl=zh-CN&authuser=0 "Chrome Web Store") / [Github](https://github.com/gxy5202/ "Github")

### 主要特性(Features)

---

-   采用最新 extension V3 标准开发
-   可旋转任何网页中的 HTML5 视频，支持 90/180/270° 旋转
-   针对播放器使用 Web components 或 Shadow dom 的网站做了特别优化（P 站、B 站）
-   针对同源 iframe 中的视频做了优化，支持旋转同源 iframe 中的视频
-   旋转视频时，会自动根据视频容器和视频原始大小尺寸进行自适应，避免旋转后只能展示部分内容的情况
-   轻量级插件，大小只有 70kb 左右
-   重视安全性，插件不会收集任何用户信息
-   支持快捷键 ctrl + 方向键

### 更新日志(Change Log)

---

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

若你发现问题或有更好的 idea，欢迎贡献代码~
