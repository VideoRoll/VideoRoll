/*
 * @description: Scale Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject, computed } from "vue";
import { GlobeOutline, VideocamOutline, DownloadSharp } from "@vicons/ionicons5";
import type { IRollConfig } from "../../../../types/type.d";
import "./index.less";

export default defineComponent({
    name: "Info",
    setup() {
        const rollConfig = inject("rollConfig") as IRollConfig;

        const toDownload = () => {
            window.open('https://ssyoutube.com/en164qB/youtube-video-downloader', '__blank');
        }
        
        return () => (
            <div class="video-roll-info">
                <div class="video-roll-info-item">
                    <GlobeOutline
                        class="video-roll-icon"
                    ></GlobeOutline>
                    <span title={rollConfig.name} class="video-roll-info-itemText">{rollConfig.name}</span>
                </div>
                <div class="video-roll-info-item">
                    <VideocamOutline
                        class="video-roll-icon"
                    ></VideocamOutline>
                    <span title="video number" class="video-roll-info-itemText">{rollConfig.videoNumber}</span>
                </div>
                <div class="video-roll-info-item">
                    <DownloadSharp
                        class="video-roll-icon"
                        onClick={toDownload}
                    ></DownloadSharp>
                </div>
            </div>
        );
    },
});
