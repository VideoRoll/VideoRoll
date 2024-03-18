import { defineComponent, ref, onMounted, provide, watch } from "vue";
import browser from "webextension-polyfill";
import Head from "./components/Head";
import Footer from "./components/Footer";
import GridPanel from './components/GridPanel';
import { useConfig } from "./use";
import { initRollConfig, updateRollConfig, reloadPage } from "./utils";
import { clone, getSessionStorage } from "../../util";
import { ActionType } from "../../types/type.d";

import "./index.less";

export default defineComponent({
    name: "App",
    setup() {
        const isShow = ref(false);
        const tabId = ref(0);

        /**
         * open settings panel
         */
        const onOpenSetting = (e: Event) => {
            isShow.value = !isShow.value;
        };

        // current website config
        const rollConfig = useConfig();

        const update = updateRollConfig.bind(null, rollConfig);
        provide("rollConfig", rollConfig);
        provide("update", update);
        provide("onOpenSetting", onOpenSetting);

        watch(() => tabId.value, (value: number) => {
            if (!value) return;
            const config = getSessionStorage(value);

            Object.keys(config).forEach((key) => {
                if (key in rollConfig) {
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

            // add style
            chrome.tabs.sendMessage(
                rollConfig.tabId,
                { rollConfig: clone(rollConfig), type: ActionType.ON_MOUNTED },
                {},
                (res) => {
                    console.debug(res);
                }
            )

            chrome.runtime.onMessage.addListener((a, b, c) => {
                const { type, rollConfig: config, text } = a;
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
