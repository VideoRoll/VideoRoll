<!--
 * @description: 
 * @Author: Gouxinyu
 * @Date: 2022-09-06 00:10:12
-->
<!--
 * @description: Scale Component
 * @Author: Gouxinyu
 * @Date: 2022-06-04 16:34:07
-->
<template>
    <div class="video-roll-scale">
        <van-radio-group v-model="checked" @change="setFlip">
            <van-radio name="auto">Auto</van-radio>
            <van-radio name="custom">Custom</van-radio>
        </van-radio-group>
        <div class="video-roll-scale-custom" v-show="checked === 'custom'">
            <van-stepper v-model="customScale.left" step="0.1" :decimal-length="1" :show-plus="false"
                         :show-minus="false" />
            <span class="custom-colon">:</span>
            <van-stepper v-model="customScale.right" step="0.1" :decimal-length="1" :show-plus="false"
                         :show-minus="false" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, reactive } from 'vue';
import { ChevronDownOutline } from '@vicons/ionicons5';
export default defineComponent({
    name: "Scale",
    props: {},
    setup() {
        const checked = ref('auto');
        const customScale = reactive({
            left: 16,
            right: 9
        })
        const setFlip = inject('setFlip');
        return {
            checked,
            setFlip,
            customScale
        }
    },
    components: {
        ChevronDownOutline
    }
})
</script>

<style lang="less">
.video-roll-scale {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
    height: 100px;
    margin-top: 30px;
}

.van-radio {
    margin-bottom: 10px;
}

.custom-colon {
    color: #fff;
}
</style>