import { defineComponent, ref, onMounted, provide, Transition } from "vue";
import browser from "webextension-polyfill";
import Head from "./components/Head";
import Footer from "./components/Footer";
import SettingPanel from "./components/SettingPanel";
import {
    ChevronBackOutline,
} from "@vicons/ionicons5";
import { useConfig, useDegBtn } from "./use";
import { initRollConfig, updateRollConfig } from "./utils";
import { clone } from "../../util";
import { ActionType } from "../../types/type.d";

import "./index.less";

export default defineComponent({
    name: "App",
    setup() {
        const isShow = ref(false);

        /**
         * open settings panel
         */
        const onOpenSetting = (e: Event) => {
            isShow.value = !isShow.value;
        };

        // current website config
        const rollConfig = useConfig();

        // buttons
        const degBtns = useDegBtn();

        const update = updateRollConfig.bind(null, rollConfig);
        provide("rollConfig", rollConfig);
        provide("update", update);
        provide("onOpenSetting", onOpenSetting);

        /**
         * 当打开时就获取当前网站的视频信息
         * 添加样式
         */
        onMounted(async () => {
            const queryOptions = { active: true, currentWindow: true };
            const [tab] = await browser.tabs.query(queryOptions);

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
                const { type, rollConfig: config } = a;
                if (type === ActionType.UPDATE_STORAGE) {
                    Object.keys(config).forEach((key) => {
                        if (key in rollConfig) {
                            rollConfig[key] = config[key];
                        }
                    });
                }
                c("update_storage");
            });
        });

        return () => (
            <div>
                <Head isShow={isShow.value}></Head>
                <main>
                    <div>
                        <div class="video-roll-content">
                            {/* <div class="video-roll-website">
                                <span>{rollConfig.name}</span>
                            </div>
                            <div class="video-roll-rotate-control">
                                {degBtns.value.map((item) => (
                                    <div
                                        class={`rotate-${item.type}-${item.iconDeg} rotate-btn`}
                                        key={item.type}
                                        onClick={() => update("deg", item.deg)}
                                    >
                                        <ChevronBackOutline />
                                    </div>
                                ))}

                                <div class="rotate-deg-text">
                                    {rollConfig.deg}
                                </div>
                            </div> */}
                            {/* 布局 */}
                            <div></div>
                        </div>
                        <Footer></Footer>
                    </div>
                    {/* <Transition name="van-fade">
                        <div class="video-roll-setting" v-show={isShow.value}>
                            <SettingPanel />
                        </div>
                    </Transition> */}
                </main>
            </div>
        );
    }
});
