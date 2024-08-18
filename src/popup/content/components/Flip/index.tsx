/*
 * @description: flip Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */
import { defineComponent, inject, computed } from "vue";
import { SwapHorizontalOutline } from "@vicons/ionicons5";
import type { IRollConfig } from "../../../../types/type.d";
import "./index.less";

export default defineComponent({
    name: "Flip",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;
        const setPopupShow = inject("setPopupShow") as Function;
        const updateRenderContent = inject("updateRenderContent") as Function;

        const isDefault = computed(() => rollConfig.flip === 'unset');

        const setFlip = (value: string) => {
            update("flip", value);
        };

        const popupRender = () => (
            <>
                <div class="video-roll-flip">
                    <van-radio-group v-model={rollConfig.flip} onChange={setFlip}>
                        <van-radio name="unset">Unset</van-radio>
                        <van-radio name="horizontal">Horizontal</van-radio>
                        <van-radio name="vertical">Vertical</van-radio>
                    </van-radio-group>
                </div>
            </>
        )

        const showPopup = () => {
            setPopupShow(true);
            updateRenderContent(popupRender)
        }

        return () => (
            
            <div v-tooltip='Flip' class={`video-roll-focus video-roll-item ${!isDefault.value ? 'video-roll-on' : 'video-roll-off'}`} onClick={showPopup}>
                <div class="video-roll-icon-box">
                    <span class="video-roll-label">
                        {
                            <SwapHorizontalOutline
                                class="video-roll-icon"
                            ></SwapHorizontalOutline>
                        }
                    </span>
                </div>
            </div>
        );
    },
});
