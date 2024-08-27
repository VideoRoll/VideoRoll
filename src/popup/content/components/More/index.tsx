/*
 * @description: pitch Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject, watch } from "vue";
import type { IRollConfig } from "../../../../types/type";
import browser from 'webextension-polyfill';
import "./index.less";

export default defineComponent({
    name: "More",
    setup() {
        const update = inject("update") as Function;
        const rollConfig = inject("rollConfig") as IRollConfig;

        const setAutomatically = (value: boolean) => {
            rollConfig.isAutoChangeSize = value;
            update("isAutoChangeSize", rollConfig.isAutoChangeSize);
        };

        const setStore = (value: boolean) => {
            rollConfig.store = value;
            update("store", rollConfig.store);
        };

        return () => (
            <div class="more-box">
                <div class="more-content">
                    <div>{browser.i18n.getMessage('more_save_preferences')}</div>
                    <van-switch size={16} v-model={rollConfig.store} onChange={setStore} />
                </div>
                <div class="more-content">
                    <div>{browser.i18n.getMessage('more_auto_resize')}</div>
                    <van-switch size={16} v-model={rollConfig.isAutoChangeSize} onChange={setAutomatically} />
                </div>
            </div>
        );
    },
});
