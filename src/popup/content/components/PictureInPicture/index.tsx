/*
 * @description: pictureInPicture Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */
import { defineComponent, inject } from "vue";
import { TvOutline } from "@vicons/ionicons5";
import type { IRollConfig } from "../../../../types/type.d";
import "./index.less";

export default defineComponent({
    name: "PictureInPicture",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const setPictureInPicture = () => {
            rollConfig.pictureInPicture = !rollConfig.pictureInPicture;
            update("pictureInPicture", rollConfig.pictureInPicture);
        };
        return () => (
            <div title='picture in picture' class={`video-roll-focus video-roll-item ${rollConfig.pictureInPicture ? 'video-roll-on' : 'video-roll-off'}`} onClick={setPictureInPicture}>
                <div class="video-roll-icon-box">
                    <span class="video-roll-label">
                        <TvOutline
                            class="video-roll-icon"
                        ></TvOutline>
                    </span>
                </div>
            </div>
        );
    },
});
