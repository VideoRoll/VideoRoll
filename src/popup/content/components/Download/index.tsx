/*
 * @description: download Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */
import { defineComponent, inject, ref, shallowReactive } from "vue";
import { ArrowDownOutline } from "@vicons/ionicons5";
import Clipboard from "clipboard";
import { showNotify } from 'vant';
import "./index.less";
import { createURL } from 'src/util';

export default defineComponent({
    name: "Download",
    setup() {
        const isShow = ref(false);

        const actions = shallowReactive([
            {
                icon: 'video',
                text: 'savevideo',
                url: 'https://www.savethevideo.com/home'
            },
            {
                icon: 'live',
                text: 'zhouql.vip',
                url: 'https://zhouql.vip/bilibili'
            }
        ]);

        const onSelect = (action: any) => {
            chrome.tabs.query({ active: true }, (res) => {
                if (Array.isArray(res)) {
                    const url = res[0].url ?? '';
                    Clipboard.copy(url);
                    showNotify({
                        type: 'success',
                        message: 'copied successfully',
                        duration: 600,
                        onClose: () => {
                            createURL(action.url);
                        }
                    });
                }
            });
        }

        return () => (
            <van-popover placement="bottom-end" theme="dark" class="popover-size" v-model={isShow} actions={actions} onSelect={onSelect} v-slots={{
                reference: () => (
                    <div title='Download' class='video-roll-download video-roll-item video-roll-off'>
                        <div class="video-roll-icon-box">
                            <span class="video-roll-label">
                                <ArrowDownOutline class="video-roll-icon"></ArrowDownOutline>
                            </span>
                        </div>
                    </div>
                ),
            }}>
            </van-popover>
        );
    },
});
