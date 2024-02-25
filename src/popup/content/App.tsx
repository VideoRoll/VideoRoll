import { defineComponent, ref, onMounted, provide, Transition } from "vue";
import { ReloadOutline } from "@vicons/ionicons5";
import browser from "webextension-polyfill";
import Head from "./components/Head";
import Footer from "./components/Footer";
import GridPanel from './components/GridPanel';
import Info from './components/Info';
import { useConfig } from "./use";
import { initRollConfig, updateRollConfig, reloadPage } from "./utils";
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

        const update = updateRollConfig.bind(null, rollConfig);
        provide("rollConfig", rollConfig);
        provide("update", update);
        provide("onOpenSetting", onOpenSetting);

        const onReload = () => {
            reloadPage(rollConfig.tabId);
        }
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
                const { type, rollConfig: config, text } = a;
                switch(type) {
                    case ActionType.UPDATE_STORAGE:
                        console.log(config, '---config');
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
                    <div class="video-roll-headBar">
                        <Info></Info>
                        <div title="reload page" class="reload-btn" onClick={onReload}>
                            <ReloadOutline class="video-roll-icon"></ReloadOutline>
                        </div>
                    </div>
                    
                    <div class="video-roll-content">
                        <GridPanel></GridPanel>
                    </div>
                    <Footer></Footer>
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
