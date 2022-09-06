<!--
 * @description: VideoRoll
 * @Author: Gouxinyu
 * @Date: 2022-02-02 14:35:44
-->
<template>
    <div class="video-roll-header">
        <div class="video-roll-logo">
            <img class="video-roll-logo-text" src="../../icons/text.png" />
        </div>
        <div class="video-roll-head-right">
            <div class="video-roll-setting-btn" title="settings" @click="onOpenSetting">
                <settings-sharp class="settings-sharp" color="#fffff">
                </settings-sharp>
            </div>

            <!-- <span class="video-roll-mode">Flip: </span>
            <Select :options="options" :value="webInfo.flip" :select="onSelect"></Select> -->
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, inject } from 'vue';
// import Select from './components/Select.vue';
import { InformationCircle, SettingsSharp } from '@vicons/ionicons5';
export default defineComponent({
    name: "Head",
    setup(props) {
        // 选中值
        const webInfo = inject('webInfo');

        const isShowSetting = ref(false);
        // 下拉选项
        const options = ref([{
            key: 0,
            title: 'none',
            value: 'none'
        }, {
            key: 1,
            title: 'horizontal',
            value: 'horizontal'
        }, {
            key: 2,
            title: 'vertical',
            value: 'vertical'
        }]);

        const onSelect = inject('setFlip');
        const onOpenSetting = inject('onOpenSetting');
        return {
            options,
            webInfo,
            onOpenSetting,
            isShowSetting,
            onSelect
        }
    },
    components: {
        // Select,
        InformationCircle,
        SettingsSharp
    }
})
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