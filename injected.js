/*
 * @description:
 * @project: UEC11
 * @Author: Gouxinyu
 * @Identification: SF3569
 * @Date: 2020-01-22 16:03:25
 */
(function () {
    let info = {};

    let loopTimes = 0; // 循环次数
    // 事件类型
    const eventTypes = {
        click: new Event("click", { bubbles: true, cancelable: true }),
        focus: new Event("focus", { bubbles: true, cancelable: true }),
        value: new Event("value", { bubbles: true, cancelable: true }),
    };

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
            autoClickElement();
        }
    );

    /**
     * 循环获取dom，并触发事件
     * @param {*} selector
     * @param {*} event
     */
    function getElementsLoop(selector, i, event, text, callback) {
        return new Promise((resolve, reject) => {
            function excute() {
                let addNewElement;
                if (!text) {
                    const allElements = document.querySelectorAll(selector);
                    addNewElement =
                        allElements[i === -1 ? allElements.length - 1 : i];
                } else {
                    const nodeArr = Array.from(
                        document.querySelectorAll(selector)
                    );
                    addNewElement = nodeArr.find(
                        (v) => v.innerText.trim() === text
                    );
                }

                if (!addNewElement) {
                    if (loopTimes < 100) {
                        loopTimes++;
                        getElementsLoop(selector, event);
                    } else {
                        console.warn("获取不到页面DOM元素，请重新执行");
                        return;
                    }
                } else {
                    addNewElement.dispatchEvent(eventTypes[event]);
                    if (callback) {
                        callback(addNewElement);
                    }
                }
            }
            setTimeout(() => resolve(excute()), 300);
        });
    }

    /**
     * 自动执行
     */
    async function autoClickElement() {
        const elementsArr = [
            // 新增工时
            [".topMenu .toolbar .el-button", 0, "click"],
            // 日期
            [
                ".el-dialog__body .el-date-editor.el-input .el-input__inner",
                0,
                "focus",
            ],
            // 选择昨天
            [
                ".el-picker-panel.el-date-picker.el-popper .el-date-table .available",
                -1,
                "click",
            ],
            // 产品
            [
                ".el-dialog__body .el-row .el-form-item__content .el-select .el-input__inner",
                0,
                "focus",
            ],
            // 选择产品
            [
                ".el-select-dropdown__wrap .el-select-dropdown__item span",
                0,
                "click",
                info.productName,
            ],
            // 版本号
            [
                ".el-dialog__body .el-row .el-form-item__content .el-select .el-input__inner",
                1,
                "focus",
            ],
            // 选择版本号
            [
                ".el-select-dropdown__wrap .el-select-dropdown__item span",
                0,
                "click",
                info.productVersion,
            ],
            // 工作范畴
            [
                ".el-dialog__body .el-row .el-form-item__content .el-select .el-input__inner",
                2,
                "focus",
            ],
            // c40
            [
                ".el-select-dropdown__wrap .el-select-dropdown__item span",
                0,
                "click",
                info.productRange,
            ],
            // 工作内容
            [
                ".el-dialog__body .el-row .el-form-item__content .el-input__inner",
                4,
                "value",
                null,
                (el) => {
                    const ev = new InputEvent("input", {
                        inputType: "insertText",
                        data: info.productContent,
                        dataTransfer: null,
                        isComposing: false,
                    });

                    el.value = info.productContent;
                    el.dispatchEvent(ev);
                },
            ],
            // 实际工时
            [
                ".el-dialog__body .el-row .el-form-item__content .el-input__inner",
                5,
                "value",
                null,
                (el) => {
                    const input = document.querySelector(
                        '[for="addForm.0.hours"]+.el-form-item__content .el-input__inner'
                    );
                    const value = input.getAttribute("aria-valuenow");

                    const ev = new InputEvent("input", {
                        inputType: "insertText",
                        data:
                            (value && Number(value) > 0) ||
                            info.productWorkTime,
                        dataTransfer: null,
                        isComposing: false,
                    });
                    el.value =
                        (value && Number(value) > 0) || info.productWorkTime;
                    el.dispatchEvent(ev);
                    // const day = new Date().getDay();
                    // const work996 = [1, 2, 4, 6];
                    // el.value = work996.includes(day) ? 9.5 : 7.5;
                },
            ],
        ];

        for (let i = 0; i < elementsArr.length; i++) {
            await getElementsLoop.apply(this, elementsArr[i]);
        }

        if (info.productSubmit) {
            await getElementsLoop(
                ".el-dialog__wrapper .dialog-footer .el-button",
                0,
                "click"
            );
        }
    }
})();
