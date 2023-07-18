/*
 * @description: grid Component
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import {
    defineComponent,
    ref,
    defineAsyncComponent,
    resolveComponent,
    h,
} from "vue";
import { useComponents } from "../../use";
import render from '../../utils/render';
import './index.less';

export default defineComponent({
    name: "GridPanel",
    setup() {
        const components = useComponents();

        return () => (
            <div class="video-roll-setting-panel">
                <van-config-provider theme="dark">
                    <van-swipe touchable={false}>
                        {
                            render(components)
                        }
                    </van-swipe>
                </van-config-provider>
            </div>
        );
    }
});
