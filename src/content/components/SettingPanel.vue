<!--
 * @description: Tools Component
 * @Author: Gouxinyu
 * @Date: 2022-06-04 16:34:07
-->
<template>
    <div class="video-roll-setting-panel">
        <van-config-provider theme="dark">
            <van-sidebar v-model="active" @change="onChange">
                <van-sidebar-item v-for="item in components" :key="item.title" :title="item.title" />
            </van-sidebar>
            <div class="setting-content">
                <component :is="components[active].component" />
            </div>
        </van-config-provider>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, onMounted, onUnmounted } from 'vue';
import Flip from './Flip.vue';
import { ChevronDownOutline } from '@vicons/ionicons5';
export default defineComponent({
    name: "Tools",
    props: {},
    setup(props) {
        const components = ref([
            {
                title: 'Flip',
                component: Flip,
            },
            {
                title: 'Scale',
                component: Flip,
            },
            {
                title: 'Room',
                component: Flip,
            },
            {
                title: 'Store',
                component: Flip,
            },
            {
                title: 'Title',
                component: Flip,
            },
        ])
        const currentComponent = ref(null);
        const active = ref(0);

        const onChange = (index: number) => {

        }
        return { active, components, onChange };
    },
    components: {
        Flip,
        ChevronDownOutline
    }
})
</script>

<style lang="less">
.van-config-provider {
    height: 100%;
    display: flex;
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