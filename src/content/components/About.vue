<!--
 * @description: about Component
 * @Author: Gouxinyu
 * @Date: 2022-06-04 16:34:07
-->
<template>
    <div class="video-roll-about">
        <ul>
            <li class="about-list-item" v-for="item in list" :key="item.name">
                <van-button
                    class="about-btn"
                    size="small"
                    :plain="item.plain"
                    round
                    @click="() => toSite(item.href)"
                    :type="item.type"
                    >{{ item.name }}</van-button
                >
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from "vue";
export default defineComponent({
    name: "About",
    setup() {
        const list = shallowRef([
            {
                type: "primary",
                plain: false,
                name: "Donate",
                href: "https://gomi.site/VideoRoll",
            },
            {
                name: "Give a like",
                plain: true,
                href: "https://chrome.google.com/webstore/detail/video-roll/cokngoholafkeghnhhdlmiadlojpindm",
            },
            {
                name: "Github",
                plain: true,
                href: "https://github.com/VideoRoll/VideoRoll",
            },
            {
                name: "Author",
                plain: true,
                href: "https://gomi.site",
            },
        ]);

        const toSite = (url: string) => {
            chrome.tabs.create({
                active: true,
                url,
            });
        };

        return {
            list,
            toSite,
        };
    },
    components: {},
});
</script>

<style lang="less">
.about-list-item {
    margin-bottom: 10px;
}
.about-btn {
    width: 80px;
}
</style>
