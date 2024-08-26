/*
 * @description: Scale Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject, computed } from "vue";
import { CropOutline } from "@vicons/ionicons5";
import type { IRollConfig } from "../../../../types/type";
import browser from 'webextension-polyfill'
import "./index.less";

export default defineComponent({
    name: "Stretch",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;
        const setPopupShow = inject("setPopupShow") as Function;
        const updateRenderContent = inject("updateRenderContent") as Function;

        const isDefault = computed(() => rollConfig.scale.mode === 'auto');

        let { scale } = rollConfig as IRollConfig;

        const setScaleMode = (value: "auto" | "custom") => {
            rollConfig.scale.mode = value;
            if (value === 'auto') {
                rollConfig.scale.values[0] = 1;
                rollConfig.scale.values[1] = 1;
            }
            update("scale", rollConfig.scale);
        };

        const setScaleX = (value: number) => {
            rollConfig.scale.values[0] = value;
            update("scale", rollConfig.scale);
        };

        const setScaleY = (value: number) => {
            rollConfig.scale.values[1] = value;
            update("scale", rollConfig.scale);
        };

        const popupRender = () => (
            <>
                <div class="video-roll-scale">
                    <van-radio-group
                        v-model={scale.mode}
                        direction="horizontal"
                        onChange={setScaleMode}
                    >
                        <van-radio name="auto">{browser.i18n.getMessage('video_unset')}</van-radio>
                        <van-radio name="custom">{browser.i18n.getMessage('video_custom')}</van-radio>
                    </van-radio-group>
                    <div class="video-roll-scale-custom">
                        <div class="video-roll-scale-slider">
                            <van-divider
                                class={
                                    scale.mode === "auto"
                                        ? "disable-label"
                                        : "enable-label"
                                }
                            >
                                {browser.i18n.getMessage('video_horizental')}
                            </van-divider>
                            <van-slider
                                v-model={scale.values[0]}
                                min={0}
                                max={4}
                                step="0.01"
                                bar-height="4px"
                                disabled={scale.mode === "auto"}
                                onUpdate:modelValue={setScaleX}
                                v-slots={{
                                    button: () => (
                                        <div class="custom-button">
                                            {scale.values[0]}
                                        </div>
                                    ),
                                }}
                            ></van-slider>
                        </div>

                        <div class="video-roll-scale-slider">
                            <van-divider
                                class={
                                    scale.mode === "auto"
                                        ? "disable-label"
                                        : "enable-label"
                                }
                            >
                                {browser.i18n.getMessage('video_vertical')}
                            </van-divider>
                            <van-slider
                                v-model={scale.values[1]}
                                min="0"
                                max="4"
                                step="0.01"
                                bar-height="4px"
                                disabled={scale.mode === "auto"}
                                onUpdate:modelValue={setScaleY}
                                v-slots={{
                                    button: () => (
                                        <div class="custom-button">
                                            {scale.values[1]}
                                        </div>
                                    ),
                                }}
                            ></van-slider>
                        </div>
                    </div>
                </div>

            </>
        )

        const showPopup = () => {
            setPopupShow(true);
            updateRenderContent(popupRender)
        }

        return () => (
            <div v-tooltip={browser.i18n.getMessage('video_stretch')} class={`video-roll-focus video-roll-item ${!isDefault.value ? 'video-roll-on' : 'video-roll-off'}`} onClick={showPopup}>
                <div class="video-roll-icon-box">
                    <span class="video-roll-label">
                        {
                            <CropOutline
                                class="video-roll-icon"
                            ></CropOutline>
                        }
                    </span>
                </div>
            </div>
        );
    },
});
