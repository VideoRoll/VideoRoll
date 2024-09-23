import { defineComponent, ref, onMounted, provide, watch, onUnmounted, onBeforeMount } from "vue";
import browser from "webextension-polyfill";
import Head from "./components/Head";
import Footer from "./components/Footer";
import GridPanel from './components/GridPanel';
import { useConfig } from "../../use";
import { initRollConfig, updateRollConfig, reloadPage } from "./utils";
import { clone, getSessionStorage, sendTabMessage } from "../../util";
import { ActionType } from "../../types/type.d";
import { Close } from "@vicons/ionicons5";

import "./index.less";
import Iframe from "./components/Iframe";

export default defineComponent({
    name: "App",
    setup() {
        const isShow = ref(false);
        const tabId = ref(0);
        const videoList = ref([]);

        /**
         * open settings panel
         */
        const onOpenSetting = (e: Event) => {
            isShow.value = !isShow.value;
        };

        const onHoverVideo = (id: string, isIn: boolean) => {
            sendTabMessage(rollConfig.tabId, { id, type: ActionType.ON_HOVER_VIDEO, isIn })
        }

        const updateVideoCheck = (ids: string[]) => {
            sendTabMessage(rollConfig.tabId, { ids, type: ActionType.UPDATE_VIDEO_CHECK })
        }

        const updateEnable = () => {
            sendTabMessage(rollConfig.tabId, { rollConfig, type: ActionType.UPDATE_ENABLE })
        }

        const capture = () => {
            sendTabMessage(rollConfig.tabId, { rollConfig, type: ActionType.CAPTURE })
        }

        // current website config
        const rollConfig = useConfig();

        provide("rollConfig", rollConfig);
        provide("update", updateRollConfig.bind(null, rollConfig));
        provide("onOpenSetting", onOpenSetting);
        provide("videoList", videoList);
        provide("onHoverVideo", onHoverVideo)
        provide("updateVideoCheck", updateVideoCheck)
        provide("updateEnable", updateEnable)
        provide("capture", capture)

        watch(() => tabId.value, (value: number) => {
            if (!value) return;
            const config = getSessionStorage(value);

            Object.keys(config).forEach((key) => {
                if (key in rollConfig && key !== 'tabId') {
                    rollConfig[key] = config[key];
                }
            });
        })
        /**
         * 当打开时就获取当前网站的视频信息
         * 添加样式
         */
        onMounted(async () => {
            const queryOptions = { active: true, currentWindow: true };
            const [tab] = await browser.tabs.query(queryOptions);

            tabId.value = tab.id as number;
            initRollConfig(rollConfig, tab);

            chrome.runtime.onMessage.addListener((a, b, c) => {
                const { type, rollConfig: config, text, videoList: list, imgData, muted, iframes } = a;

                if (a.tabId !== tabId.value) {
                    c("not current tab");
                    return;
                }

                switch (type) {
                    case ActionType.UPDATE_STORAGE:
                        Object.keys(config).forEach((key) => {
                            if (key in rollConfig) {
                                rollConfig[key] = config[key];
                            }
                        });
                        break;
                    case ActionType.UPDATE_BADGE:
                        rollConfig.videoNumber = Number(text);
                        videoList.value = list;
                        break;
                    case ActionType.UPDATE_VIDEO_LIST:
                        videoList.value = list;
                        break;
                    case ActionType.CAPTURE:
                        const newUrl = chrome.runtime.getURL('inject/capture.html?imgData=' + encodeURIComponent(imgData));
                        chrome.tabs.create({ url: newUrl });
                        break;
                    case ActionType.MUTED:
                        chrome.tabs.get(tabId.value).then((tab) => {
                            chrome.tabs.update(tabId.value, { muted });
                        });
                        break;
                    case ActionType.UPDATE_IFRAMES:
                        rollConfig.iframes = iframes;
                        break;
                    default:
                        break;
                }

                c("update");
            });

            sendTabMessage(rollConfig.tabId, { rollConfig: clone(rollConfig), type: ActionType.ON_MOUNTED })
        });

        const renderComponent = () => {
            if (rollConfig.enable) {
                if (rollConfig.videoNumber === 0) return <Iframe></Iframe>

                return <GridPanel></GridPanel>
            }

            return <div class="empty-box">
                <Close class="logo-empty" />
                <div>{browser.i18n.getMessage('tips_disabled')}</div>
            </div>
        }

        return () => (
            <div class={rollConfig.enable ? "video-roll-wrapper" : "video-roll-wrapper-empty"}>
                <Head class="video-roll-wrapper-head" isShow={isShow.value}></Head>
                <main class={rollConfig.enable ? "video-roll-main" : "video-roll-main-empty"}>
                    <div class={rollConfig.enable ? "video-roll-content" : "video-roll-content-empty"}>
                        {

                            renderComponent()
                        }
                    </div>
                </main>
                <Footer></Footer>
            </div>
        );
    }
});
