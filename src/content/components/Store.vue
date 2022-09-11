<!--
 * @description: store Component
 * @Author: Gouxinyu
 * @Date: 2022-06-04 16:34:07
-->
<template>
    <div class="video-roll-store">
        <div class="store-switch">
            <van-divider class="store-label">Remember this tab: </van-divider>
            <div class="store-switch-btn">
                <van-switch
                    v-model="rollConfig.storeThisTab"
                    size="22px"
                    @update:model-value="setStoreThisTab"
                />
            </div>
        </div>
        <div class="store-switch">
            <van-divider class="store-label">Remember this site: </van-divider>
            <div class="store-switch-btn">
                <van-switch
                    v-model="rollConfig.store"
                    size="22px"
                    @update:model-value="setStore"
                />
            </div>
        </div>
        <div class="store-site van-ellipsis" :title="rollConfig.url">
            {{ rollConfig.url }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { IRollConfig } from "../../type.d";
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
        return {
            rollConfig,
            setStoreThisTab,
            setStore,
        };
    },
});
</script>

<style lang="less">
.store-switch-btn {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 180px;
}

.store-label {
    color: #fff;
}

.store-site {
    margin-top: 10px;
    width: 180px;
    user-select: none;
    font-weight: bold;
    color: #a494c6;
}
</style>
