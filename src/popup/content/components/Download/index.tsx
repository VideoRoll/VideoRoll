/*
 * @description: store Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */
import { defineComponent, inject, ref, shallowReactive } from "vue";
import { ArrowDownOutline } from "@vicons/ionicons5";
import Clipboard  from "clipboard";
import { showNotify } from 'vant';
import "./index.less";

export default defineComponent({
    name: "Download",
    setup() {
        const isShow = ref(false);

        const actions = shallowReactive([
            {
                icon: 'video',
                text: 'ssyoutube',
                url: 'https://ssyoutube.com'
            },
            {
                icon: 'live',
                text: 'zhouql.vip',
                url: 'https://zhouql.vip/bilibili'
            },
            {
                icon: 'audio',
                text: 'savemp3',
                url: 'https://savemp3.net'
            }
        ]);

        const onSelect = (action: any) => {
            // const clipboard = new Clipboard('');
            showNotify({
                type: 'success',
                message: '已复制当前视频地址',
                duration: 1000,
                onClose: () => {
                    window.open(action.url, '__blank');
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
