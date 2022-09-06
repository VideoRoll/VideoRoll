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
import { defineComponent, ref, shallowReactive, onMounted, onUnmounted } from 'vue';
import Flip from './Flip.vue';
import Scale from './Scale.vue';
import { ChevronDownOutline } from '@vicons/ionicons5';
export default defineComponent({
    name: "Tools",
    props: {},
    setup(props) {
        const components = shallowReactive([
            {
                title: 'Flip',
                component: Flip,
            },
            {
                title: 'Scale',
                component: Scale,
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

        const active = ref(0);

        const onChange = (index: number) => {
            console.log(index);
        }
        return { active, components, onChange };
    },
    components: {
        Flip,
        Scale,
        ChevronDownOutline
    }
})
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