import { defineComponent, ref, onMounted, provide, watch } from "vue";
import browser from "webextension-polyfill";
import Head from "./components/Head";
import Footer from "./components/Footer";
import GridPanel from './components/GridPanel';
import { useConfig } from "../../use";
import { initRollConfig, updateRollConfig, reloadPage } from "./utils";
import { clone, getSessionStorage, sendTabMessage } from "../../util";
import { ActionType } from "../../types/type.d";

import "./index.less";

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

        // current website config
        const rollConfig = useConfig();

        provide("rollConfig", rollConfig);
        provide("update", updateRollConfig.bind(null, rollConfig));
        provide("onOpenSetting", onOpenSetting);
        provide("videoList", videoList);
        provide("onHoverVideo", onHoverVideo)
        provide("updateVideoCheck", updateVideoCheck)

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

            sendTabMessage(rollConfig.tabId, { rollConfig: clone(rollConfig), type: ActionType.ON_MOUNTED })

            chrome.runtime.onMessage.addListener((a, b, c) => {
                const { type, rollConfig: config, text, videoList: list } = a;
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
                    default:
                        break;
                }

                c("update");
            });
        });

        return () => (
            <div>
                <Head isShow={isShow.value}></Head>
                <main>
                    <div class="video-roll-content">
                        <GridPanel></GridPanel>
                    </div>
                    <Footer></Footer>
                </main>
            </div>
        );
    }
});
