/*
 * @description: move Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject, computed } from "vue";
import { MoveOutline } from "@vicons/ionicons5";
import type { IRollConfig } from "../../../../types/type";
import { getDefaultConfig } from '../../../../use';
import "./index.less";

export default defineComponent({
    name: "Repostion",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;
        const setPopupShow = inject("setPopupShow") as Function;
        const updateRenderContent = inject("updateRenderContent") as Function;

        const isDefault = computed(() => JSON.stringify(rollConfig.move) === JSON.stringify(getDefaultConfig().move));

        const setMoveX = (value: number) => {
            rollConfig.move.x = value;
            update("move", rollConfig.move);
        };

        const setMoveY = (value: number) => {
            rollConfig.move.y = value;
            update("move", rollConfig.move);
        };

        const reset = () => {
            setMoveX(getDefaultConfig().move.x);
            setMoveY(getDefaultConfig().move.y)
        };

        const popupRender = () => (
            <>
                <div class="video-roll-move">
                    <div class="move-box">
                        <van-divider class="move-label">Left - Right</van-divider>
                        <div class="move-slider">
                            <van-slider
                                v-model={rollConfig.move.x}
                                min={-100}
                                max={100}
                                step={1}
                                bar-height="4px"
                                onUpdate:modelValue={setMoveX}
                                v-slots={{
                                    button: () => (
                                        <div class="custom-button">
                                            {rollConfig.move.x}
                                        </div>
                                    ),
                                }}
                            ></van-slider>
                        </div>
                    </div>
                    <div class="move-box">
                        <van-divider class="move-label">Bottom - Top</van-divider>
                        <div class="move-slider">
                            <van-slider
                                v-model={rollConfig.move.y}
                                min={-100}
                                max={100}
                                step={1}
                                bar-height="4px"
                                onUpdate:modelValue={setMoveY}
                                v-slots={{
                                    button: () => (
                                        <div class="custom-button">
                                            {rollConfig.move.y}
                                        </div>
                                    ),
                                }}
                            ></van-slider>
                        </div>
                    </div>
                </div>
                <van-button class="video-roll-resetBtn" size="mini" icon="replay" type="primary" onClick={reset}>reset</van-button>
            </>
        )

        const showPopup = () => {
            setPopupShow(true);
            updateRenderContent(popupRender)
        }

        return () => (
            <>
                <div class="video-roll-container-title">Top - Bottom</div>
                <div class="video-roll-container-merge-item">

                    <div class="video-roll-long-box">
                        <div class={`video-roll-switch ${rollConfig.move.x !== 1 ? 'video-roll-switch-on' : 'video-roll-switch-off'}`} onClick={() => setMoveX(1)}>
                            {/* <ExpandOutline class="video-roll-icon"></ExpandOutline> */}
                            reset
                        </div>
                        <div class="video-roll-zoom">
                            <van-slider
                                class="video-roll-nobackground-slider"
                                v-model={rollConfig.move.x}
                                min={-100}
                                max={100}
                                step={1}
                                bar-height="4px"
                                onUpdate:modelValue={setMoveX}
                                v-slots={{
                                    button: () => (
                                        <div class="custom-button">
                                            {rollConfig.move.x}
                                        </div>
                                    ),
                                }}
                            ></van-slider>
                        </div>
                    </div>
                </div>

                <div class="video-roll-container-title">Top - Bottom</div>
                <div class="video-roll-container-merge-item">
                    <div class="video-roll-long-box">
                        <div class={`video-roll-switch ${rollConfig.move.y !== 1 ? 'video-roll-switch-on' : 'video-roll-switch-off'}`} onClick={() => setMoveY(1)}>
                            {/* <ExpandOutline class="video-roll-icon"></ExpandOutline> */}
                            reset
                        </div>
                        <div class="video-roll-zoom">
                            <van-slider
                                class="video-roll-nobackground-slider"
                                v-model={rollConfig.move.y}
                                min={-100}
                                max={100}
                                step={1}
                                bar-height="4px"
                                onUpdate:modelValue={setMoveY}
                                v-slots={{
                                    button: () => (
                                        <div class="custom-button">
                                            {rollConfig.move.y}
                                        </div>
                                    ),
                                }}
                            ></van-slider>
                        </div>
                    </div>
                </div>
            </>

        );
    },
});
