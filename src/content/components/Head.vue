<!--
 * @description: Head
 * @Author: Gouxinyu
 * @Date: 2022-02-02 14:35:44
-->
<template>
    <div class="video-roll-header">
        <div class="video-roll-logo">
            <img class="video-roll-logo-text" src="../../icons/text.png" />
        </div>
        <div class="video-roll-head-right">
            <div
                class="video-roll-setting-btn"
                title="settings"
                @click="onOpenSetting"
            >
                <settings-sharp class="settings-sharp" color="#fffff">
                </settings-sharp>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from "vue";
import { InformationCircle, SettingsSharp } from "@vicons/ionicons5";
import { FunctionExpression } from "@vue/compiler-core";
export default defineComponent({
    name: "Head",
    setup() {
        // 选中值
        const rollConfig = inject("rollConfig");

        const isShowSetting = ref(false);
        const onOpenSetting = inject<(e: Event) => void>("onOpenSetting");
        return {
            rollConfig,
            onOpenSetting,
            isShowSetting,
        };
    },
    components: {
        InformationCircle,
        SettingsSharp,
    },
});
</script>

<style lang="less">
.settings-sharp {
    display: flex;
    width: 14px;
    height: 14px;
    cursor: pointer;

    &:hover {
        color: #a494c6;
    }
}

.video-roll-head-right {
    // width: 112px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .video-roll-mode {
        margin-right: 5px;
        font-size: 12px;
    }
}

.video-roll-logo {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .video-roll-logo-img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }

    .video-roll-logo-text {
        width: 100%;
        height: 10px;
    }
}
</style>
