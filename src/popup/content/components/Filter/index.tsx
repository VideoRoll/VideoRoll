/*
 * @description: Filter Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject, computed, shallowReactive } from "vue";
import { ColorPaletteOutline } from "@vicons/ionicons5";
import type { IRollConfig, IFilter } from "../../../../types/type.d";
import "./index.less";

export default defineComponent({
    name: "Filter",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;
        const setPopupShow = inject("setPopupShow") as Function;
        const updateRenderContent = inject("updateRenderContent") as Function;

        let { filter } = rollConfig as IRollConfig;

        const setFilterMode = (value: "unset" | "custom") => {
            rollConfig.filter.mode = value;
            update("filter", rollConfig.filter);
        };

        const setFilter = (
            type: Exclude<keyof IFilter, "mode">,
            value: number
        ) => {
            rollConfig.filter[type] = value;
            update("filter", rollConfig.filter);
        };

        const filterConfigs = shallowReactive([
            {
                type: "blur",
                range: [0, 100],
                step: 1,
            },
            {
                type: "contrast",
                range: [0, 1000],
                step: 1,
            },
            {
                type: "brightness",
                range: [0, 10],
                step: 0.1,
            },
            {
                type: "grayscale",
                range: [0, 100],
                step: 1,
            },
            {
                type: "hue-rotate",
                range: [0, 359],
                step: 1,
            },
            {
                type: "invert",
                range: [0, 100],
                step: 1,
            },
        ]);

        const isDefault = computed(() => rollConfig.filter.mode === 'unset');

        const popupRender = () => (
            <div class="video-roll-filter">
                <van-radio-group
                    v-model={filter.mode}
                    direction="horizontal"
                    onChange={setFilterMode}
                >
                    <van-radio name="unset">Unset</van-radio>
                    <van-radio name="custom">Custom</van-radio>
                </van-radio-group>
                <div class="video-roll-filter-custom">
                    {filterConfigs.map((item) => (
                        <div class="video-roll-filter-slider">
                            <div
                                class={
                                    filter.mode === "unset"
                                        ? "disabled-label"
                                        : "filter-label"
                                }
                            >
                                {item.type}:{" "}
                            </div>
                            <van-stepper
                                button-size="12px"
                                v-model={filter[item.type as keyof IFilter]}
                                min={item.range[0]}
                                max={item.range[1]}
                                step={item.step}
                                disabled={filter.mode === "unset"}
                                onUpdate:modelValue={(value: number) => {
                                    setFilter(
                                        item.type as Exclude<
                                            keyof IFilter,
                                            "mode"
                                        >,
                                        value
                                    );
                                }}
                            ></van-stepper>
                        </div>
                    ))}
                </div>
            </div>
        )

        const showPopup = () => {
            setPopupShow(true);
            updateRenderContent(popupRender)
        }

        return () => (
            
            <div title='Stretch' class={`video-roll-focus video-roll-item ${!isDefault.value ? 'video-roll-on' : 'video-roll-off'}`} onClick={showPopup}>
            <div class="video-roll-icon-box">
                <span class="video-roll-label">
                    {
                        <ColorPaletteOutline
                            class="video-roll-icon"
                        ></ColorPaletteOutline>
                    }
                </span>
            </div>
        </div>
        );
    },
});
