/*
 * @description: Head
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent, inject } from "vue";
import { LogoUsd } from "@vicons/ionicons5";
import { createURL } from '../../utils';
import "./index.less";

export default defineComponent({
    name: "Head",
    props: {
        isShow: Boolean
    },
    setup(props) {
        const toDonate = () => {
            createURL('https://afdian.net/a/gomi_gxy/plan');
        }

        return () => (
            <div class="video-roll-header">
                <div class="video-roll-logo">
                    <img
                        class="video-roll-logo-text"
                        src="../../icons/text.png"
                    />
                </div>
                <div class="video-roll-head-right">
                    <div class="video-roll-setting-btn" title="donate" onClick={toDonate}>
                        <LogoUsd
                            class="logo-usd"
                        ></LogoUsd>
                        <span>Donate</span>
                    </div>
                </div>
            </div>
        );
    }
});
