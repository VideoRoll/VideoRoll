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
import type { SwipeInstance } from 'vant';
import { useComponents } from "../../use";
import render from '../../utils/render';
import './index.less';

export default defineComponent({
    name: "GridPanel",
    setup() {
        const components = useComponents();
        const popupShow = ref<boolean>(false);
        const renderContent = ref();
        const activeSwiper = ref<number>(0);
        const swipeRef = ref<SwipeInstance>();
        const setPopupShow = (value: boolean) => {
            popupShow.value = value;
        }

        const updateRenderContent = (content: VueElement) => {
            renderContent.value = content;
        }

        const toSwiper = (value: number) => {
            swipeRef.value?.swipeTo(value);
            activeSwiper.value = value;
        }

        provide('setPopupShow', setPopupShow);
        provide('updateRenderContent', updateRenderContent)

        return () => (
            <div class="video-roll-setting-panel">
                <van-config-provider theme="dark">
                    <van-swipe ref={swipeRef} touchable={false} v-slots={{
                        indicator: () => {
                            return <div class="van-swipe__indicators">
                                {
                                    components.map((v, i) => <div class={`van-swipe__indicator ${activeSwiper.value === i ? 'van-swipe__indicator--active' : ''}`} onClick={() => toSwiper(i)}></div>)
                                }
                            </div>
                        }
                    }}>
                        {
                            render(components)
                        }
                    </van-swipe>
                    <van-popup v-model:show={popupShow.value} round closeable style={{ width: '250px' , height: '250px', padding: '20px', overflow: 'hidden'}}>{
                        h(renderContent.value)
                    }</van-popup>
                </van-config-provider>
            </div>
        );
    }
});
