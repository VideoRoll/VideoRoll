/*
 * @description: store Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject } from "vue";
import type { IRollConfig } from "../../../../types/type.d";
import "./index.less";

export default defineComponent({
    name: "Store",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const setStore = (value: boolean) => {
            rollConfig.store = value;
            update("store", value);
        };

        const setStoreThisTab = (value: boolean) => {
            rollConfig.storeThisTab = value;
            update("storeThisTab", value);
        };
        return () => (
            <div class="video-roll-store">
                <div class="store-site van-ellipsis" title={rollConfig.url}>
                    {rollConfig.url}
                </div>
                <div class="store-switch">
                    <van-divider class="store-label">
                        Remember this tab
                    </van-divider>
                    <div class="store-switch-btn">
                        <van-switch
                            v-model={rollConfig.storeThisTab}
                            size="22px"
                            onUpdate:modelValue={setStoreThisTab}
                        />
                    </div>
                </div>
                <div class="store-switch">
                    <van-divider class="store-label">
                        Remember this url
                    </van-divider>
                    <div class="store-switch-btn">
                        <van-switch
                            v-model={rollConfig.store}
                            size="22px"
                            onUpdate:modelValue={setStore}
                        />
                    </div>
                </div>
            </div>
        );
    },
});
