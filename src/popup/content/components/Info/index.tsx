/*
 * @description: Scale Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */
import { defineComponent, inject, ref, shallowReactive } from "vue";
import { ArrowDownOutline, VideocamOutline, DownloadSharp } from "@vicons/ionicons5";
import { showNotify } from 'vant';
import type { IRollConfig } from "../../../../types/type.d";
import "./index.less";

export default defineComponent({
    name: "Info",
    setup() {
        const rollConfig = inject("rollConfig") as IRollConfig;
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
            <div class="video-roll-info">
                {/* <div class="video-roll-info-item">
                    <GlobeOutline
                        class="video-roll-icon"
                    ></GlobeOutline>
                    <span title={rollConfig.name} class="video-roll-info-itemText">{rollConfig.name}</span>
                </div> */}
                <div class="video-roll-info-item">
                    <VideocamOutline
                        class="video-roll-icon"
                    ></VideocamOutline>
                    <span title="video number" class="video-roll-info-itemText">{rollConfig.videoNumber}</span>
                </div>
                <div class="video-roll-info-item">
                    <van-popover v-model={isShow} actions={actions} onSelect={onSelect} v-slots={{
                        reference: () => (
                            <van-button size="mini" type="primary" icon="down">Download</van-button>
                        ),
                    }}>

                    </van-popover>
                </div>
            </div>
        );
    },
});
