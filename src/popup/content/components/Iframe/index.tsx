/*
 * @description: pictureInPicture Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */
import { defineComponent, inject } from "vue";
import { TvOutline } from "@vicons/ionicons5";
import type { IRollConfig } from "../../../../types/type.d";
import browser from 'webextension-polyfill'
// import "./index.less";

export default defineComponent({
    name: "Iframe",
    setup() {
        const rollConfig = inject("rollConfig") as IRollConfig;

        return () => (
            <div class="">
                <van-empty image="error" description={browser.i18n.getMessage('tips_empty')} />
                <div>
                    {
                        rollConfig.iframes?.length ?
                        <div>
                            <p>检测到该页面存在iframe框架</p>
                            <p>点击跳转使用Video Roll</p>
                            {
                                (rollConfig.iframes).map((url) => <div class="iframe-item"><a href={url} target="_blank">{url}</a></div>) 
                            }
                        </div> : null  
                    }
                </div>
            </div>
        );
    },
});
