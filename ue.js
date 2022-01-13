/*
 * @description: 自动填工时
 * @Author: Gouxinyu
 * @Date: 2020-02-08 17:50:30
 */
(function () {
    let info = {};
    // http://10.0.8.26:9001/jobhoursmanage/static/index.
    const map = {
        "autp-product-url": "productUrl",
        "auto-product-name": "productName",
        "auto-product-version": "productVersion",
        "auto-product-range": "productRange",
        "auto-product-content": "productContent",
        "auto-product-workTime": "productWorkTime",
        "auto-product-tips": "productTipsTime",
        "auto-product-submit": "productSubmit",
    };

    // 产品
    const products = [
        "AntiSpamming2850",
        "BMS-华为",
        "MVAS2890",
        "SDC BC",
        "SDC BE",
        "SDC BMS",
        "SDC CPBGL",
        "SDC DR",
        "SDC DS",
        "SDC ETL",
        "SDC Govern",
        "SDC Graph",
        "SDC Hadoop",
        "SDC ME",
        "SDC ME-S",
        "SDC Miner",
        "SDC Miner-PS",
        "SDC Miner-Traffic",
        "SDC NKXT",
        "SDC QuickSilverDB",
        "SDC RE",
        "SDC SAE",
        "SDC UE",
        "SDC UE-GIS",
        "SDC UE-W3D",
        "SefonOA",
        "填报管理系统",
        "智能可视化",
    ];

    // 内容
    const contents = [
        "研发版本管理",
        "需求和分析设计",
        "代码开发",
        "产品和售前工作",
        "团队建设",
        "其他研发工作",
        "三维开发",
        "技术预研和规划",
        "测试设计",
        "功能测试",
        "性能测试",
        "安全测试",
    ];

    const versions = [
        "V302R009C01",
        "V302R006C07",
        "V302R001C13L01",
        "V302R001C40",
        "V302R005C06",
    ];

    // 读取数据，第一个参数是指定要读取的key以及设置默认值
    chrome.storage.sync.get(
        {
            productUrl:
                "http://171.221.203.127:30037/jobhoursmanage/static/index.html#/",
            productName: "SDC UE",
            productVersion: "V302R001C40",
            productRange: "代码开发",
            productContent: "C40重构",
            productWorkTime: (() => {
                const day = new Date().getDay();
                const work996 = [1, 2, 4, 6];
                return work996.includes(day) ? 9.5 : 7.5;
            })(),
            productTipsTime: "16:00",
            productSubmit: true,
        },
        function (items) {
            info = items;
            try {
                start();
            } catch (err) {
                console.warn(err);
            }
        }
    );

    /**
     * 添加选项
     * @param {} arr
     * @param {*} v
     */
    function setOptions(arr, v) {
        let options = "";
        let selected = "";
        arr.forEach((item) => {
            if (item === info[map[v.id]]) {
                selected = "selected";
            } else {
                selected = "";
            }
            options += `<option ${selected} value="${item}">${item}</option>`;
        });
        v.innerHTML = options;
        v.removeEventListener("change", setAutoInfo);
        v.addEventListener("change", setAutoInfo);
    }

    /**
     * datalist
     */
    function setList(arr, v) {
        let options = "";
        arr.forEach((item) => {
            options += `<option value="${item}">`;
        });
        v.list.innerHTML = options;

        v.setAttribute("value", info[map[v.id]]);
        v.removeEventListener("input", setAutoInfo);
        v.addEventListener("input", setAutoInfo);
    }

    /**
     * 初始化
     */
    function start() {
        const author = document.getElementById("author");
        if (author) {
            author.onclick = () => {
                window.open("https://www.gomi.site");
            };
        }

        changeBtnContent();
        const btn = document.getElementById("auto-finish");
        const productName = document.getElementById("auto-product-name");
        const productVersion = document.getElementById("auto-product-version");
        const productRange = document.getElementById("auto-product-range");
        const productContent = document.getElementById("auto-product-content");
        const productWorkTime = document.getElementById(
            "auto-product-workTime"
        );
        const productTipsTime = document.getElementById("auto-product-tips");
        const productSubmit = document.getElementById("auto-product-submit");
        const productUrl = document.getElementsByName("url");

        const elementsArr = [
            productName,
            productVersion,
            productRange,
            productContent,
            productWorkTime,
            productTipsTime,
            productSubmit,
            productUrl,
        ];

        if (btn) {
            btn.removeEventListener("click", autoFinish);
            btn.addEventListener("click", autoFinish);

            elementsArr.forEach((v, i) => {
                switch (i) {
                    case 0: {
                        setOptions(products, v);
                        break;
                    }
                    case 1: {
                        setList(versions, v);
                        break;
                    }
                    case 2: {
                        setList(contents, v);
                        break;
                    }
                    case 5: {
                        v.setAttribute("value", info[map[v.id]]);
                        v.removeEventListener("change", setAutoInfo);
                        v.addEventListener("change", setAutoInfo);
                        break;
                    }
                    case 6: {
                        v.checked = info[map[v.id]];
                        v.removeEventListener("change", setAutoInfo);
                        v.addEventListener("change", setAutoInfo);
                        break;
                    }
                    case 7: {
                        v.forEach((c) => {
                            c.value === info.productUrl
                                ? (c.checked = true)
                                : (c.checked = false);
                            c.onchange = setAutoInfo;
                        });
                        break;
                    }
                    default: {
                        v.setAttribute("value", info[map[v.id]]);
                        v.removeEventListener("input", setAutoInfo);
                        v.addEventListener("input", setAutoInfo);
                        break;
                    }
                }
            });
        }
    }

    // 获取当前标签
    function changeBtnContent() {
        const btn = document.getElementById("auto-finish");
        try {
            chrome.tabs.query(
                { active: true, currentWindow: true },
                function (tabs) {
                    if (
                        ![
                            "http://171.221.203.127:30037/jobhoursmanage/static/index.html#/",
                            "http://10.0.8.26:9001/jobhoursmanage/static/index",
                        ].includes(tabs[0].url)
                    ) {
                        btn.innerHTML = "跳转到工时页面";
                    } else {
                        btn.innerHTML = "一键爽";
                    }
                }
            );
        } catch (e) {}
    }

    /**
     * 判断当前页签
     */
    function getCurrentTabLoop() {
        setTimeout(() => {
            try {
                chrome.tabs.query(
                    { active: true, currentWindow: true },
                    function (tabs) {
                        if (
                            ![
                                "http://171.221.203.127:30037/jobhoursmanage/static/index.html#/",
                                "http://10.0.8.26:9001/jobhoursmanage/static/index",
                            ].includes(tabs[0].url)
                        ) {
                            getCurrentTabLoop();
                        } else {
                            const btn = document.getElementById("auto-finish");
                            btn.innerHTML = "一键爽";
                        }
                    }
                );
            } catch (e) {}
        }, 200);
    }

    // 自动执行
    function autoFinish(e) {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                chrome.tabs.update(
                    tabs[0].id,
                    {
                        url: info.productUrl,
                        selected: true,
                    },
                    function (tab) {
                        getCurrentTabLoop();
                        if (info.productUrl === tabs[0].url) {
                            // 动态执行JS文件
                            chrome.tabs.executeScript(tabs[0].id, {
                                file: "injected.js",
                            });
                        }
                    }
                );
            }
        );
    }

    // 工时信息
    function setAutoInfo(e) {
        const { id, value, checked } = e.target;
        switch (id) {
            case "auto-product-name":
                info.productName = value;
                break;
            case "auto-product-version":
                info.productVersion = value;
                break;
            case "auto-product-range":
                info.productRange = value;
                break;
            case "auto-product-content":
                info.productContent = value;
                break;
            case "auto-product-tips":
                info.productTipsTime = value;
                break;
            case "auto-product-submit":
                info.productSubmit = checked;
                break;
            default:
                info.productUrl = value;
                const btn = document.getElementById("auto-finish");
                btn.innerHTML = "跳转到工时页面";
                break;
        }

        // 保存数据
        chrome.storage.sync.set(info, function () {
            if (id === "auto-product-tips") {
                // 通知background.js
                const bg = chrome.extension.getBackgroundPage();
                bg.setTime(info.productTipsTime); // 访问bg的函数
            }
        });
    }
})();
