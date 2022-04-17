<!--
 * @description: VideoRoll
 * @Author: Gouxinyu
 * @Date: 2022-02-02 14:35:44
-->
<template>
    <div>
        <div class="video-roll-header">
            <div class="video-roll-logo">
                <img class="video-roll-logo-text" src="../icons/text.png" />
            </div>
            <div class="video-roll-github" @click="toGithub">
                <logo-github color="#ffffff"></logo-github>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { LogoGithub } from '@vicons/ionicons5';
export default defineComponent({
    name: "Head",
    setup(props) {
        const toGithub = () => {
            chrome.tabs.create({
                active: true,
                url: "https://github.com/gxy5202/VideoRoll"
            })
        }

        return {
            toGithub
        }
    },
    components: {
        LogoGithub
    }
})
</script>

<style lang="less">
.video-roll-github {
    width: 20px;
    height: 20px;
    cursor: pointer;
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