<!--
 * @description: Select Component
 * @Author: Gouxinyu
 * @Date: 2022-06-04 16:34:07
-->
<template>
    <div class="video-roll-select">
        <div class="video-roll-selectDisplay" @click="onShow">
            <!-- <div class="video-roll-select-title">{{ title }}</div> -->
            <div class="video-roll-select-value">
                <span class="video-roll-select-valueDisplay">{{ value }}</span>
                <span class="video-roll-select-arrow">
                    <chevron-down-outline class="chevron-down-outline" color="#fffff"></chevron-down-outline>
                </span>
            </div>
        </div>
        <div class="video-roll-selectOptions-box" v-show="isShow">
            <ul>
                <li v-for="item in options" :key="item.key" @click="onSelect(item, $event)">{{ item.title }}</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { IOptionsItem } from './index.d';
import { defineComponent, ref, PropType, onMounted, onUnmounted } from 'vue';
import { ChevronDownOutline } from '@vicons/ionicons5';
export default defineComponent({
    name: "Select",
    props: {
        title: {
            type: String,
            default: ''
        },
        options: {
            type: Array as PropType<IOptionsItem[]>,
            default: []
        },
        value: {
            type: String || Number,
            default: ''
        },
        select: {
            type: Function,
            default: () => { }
        }
    },
    setup(props) {
        const isShow = ref(false);

        const onClose = (e?: any) => {
            if (e && e.path.some((v) => v.classList?.toString()?.includes('video-roll-selectOptions-box') || v.classList?.toString()?.includes('video-roll-select'))) {
                return;
            }

            isShow.value = false;
        }

        const onShow = () => {
            isShow.value = true;
        }

        const onSelect = (target, e) => {
            props.select(target, e);
            onClose();
        }

        onMounted(() => {
            document.addEventListener('click', onClose);
        });

        onUnmounted(() => {
            document.removeEventListener('click', onClose);
        })
        return {
            isShow,
            onShow,
            onSelect
        }
    },
    components: {
        ChevronDownOutline
    }
})
</script>

<style lang="less">
.video-roll-select {
    width: 80px;
    height: 15px;
    // background-color: red;
    outline: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 2px;
    position: relative;

    .video-roll-selectDisplay {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        width: 100%;
        height: 100%;
        padding: 0 4px;
        box-sizing: border-box;
        cursor: pointer;

        .video-roll-select-value {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: rgba(255, 255, 255, 0.6);
        }

        .chevron-down-outline {
            display: flex;
            width: 12px;
            height: 12px;
        }
    }

    .video-roll-selectOptions-box {
        display: block;
        outline: 1px solid rgba(255, 255, 255, 0.4);
        border-top: none;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        top: calc(100% + 3px);
        position: absolute;
        width: 100%;
        background-color: #26262a;

        ul {
            width: 100%;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            list-style-type: none;
            cursor: pointer;

            li {
                margin: 0;
                padding: 0 4px;
                font-size: 12px;

                &:hover {
                    background-color: rgb(24, 24, 28);
                }
            }
        }
    }
}
</style>