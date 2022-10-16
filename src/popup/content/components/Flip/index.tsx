/*
 * @description: flip Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */
import { defineComponent, inject } from "vue";
import { IRollConfig } from "../../../../types/type.d";
import "./index.less";

export default defineComponent({
    name: "Flip",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const setFlip = (value: string) => {
            update("flip", value);
        };

        return () => (
            <div class="video-roll-flip">
                <van-radio-group v-model={rollConfig.flip} onChange={setFlip}>
                    <van-radio name="unset">Unset</van-radio>
                    <van-radio name="horizontal">Horizontal</van-radio>
                    <van-radio name="vertical">Vertical</van-radio>
                </van-radio-group>
            </div>
        );
    },
});
