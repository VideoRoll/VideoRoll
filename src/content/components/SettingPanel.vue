<!--
 * @description: Tools Component
 * @Author: Gouxinyu
 * @Date: 2022-06-04 16:34:07
-->
<template>
    <div class="video-roll-setting-panel">
        <van-config-provider theme="dark">
            <van-sidebar v-model="active">
                <van-sidebar-item
                    v-for="item in components"
                    :key="item.title"
                    :title="item.title"
                />
            </van-sidebar>

            <div class="setting-content">
                <component :is="components[active].component" />
            </div>
        </van-config-provider>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useComponents } from "../use";

export default defineComponent({
    name: "SettingPanel",
    setup() {
        const components = useComponents();

        const active = ref(0);

        return { active, components };
    },
});
</script>

<style lang="less">
.van-config-provider {
    height: 100%;
    display: flex;
}

.van-sidebar {
    border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.setting-content {
    // width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8);
}
</style>
