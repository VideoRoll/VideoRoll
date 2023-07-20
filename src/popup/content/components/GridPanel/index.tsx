/*
 * @description: grid Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import {
    defineComponent,
    ref,
    provide,
    defineAsyncComponent,
    resolveComponent,
    h,
    VueElement,
} from "vue";
import { useComponents } from "../../use";
import render from '../../utils/render';
import './index.less';

export default defineComponent({
    name: "GridPanel",
    setup() {
        const components = useComponents();
        const popupShow = ref(false);
        const renderContent = ref();

        const setPopupShow = (value: boolean) => {
            popupShow.value = value;
        }

        const updateRenderContent = (content: VueElement) => {
            console.log(content);
            renderContent.value = content;
        }

        provide('setPopupShow', setPopupShow);
        provide('updateRenderContent', updateRenderContent)

        return () => (
            <div class="video-roll-setting-panel">
                <van-config-provider theme="dark">
                    <van-swipe touchable={false}>
                        {
                            render(components)
                        }
                    </van-swipe>
                    <van-popup v-model:show={popupShow.value} round closeable style={{ width: '250px' , height: '200px'}}>{
                        h(renderContent.value)
                    }</van-popup>
                </van-config-provider>
            </div>
        );
    }
});
