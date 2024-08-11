import { defineComponent, useSlots, ref, onMounted, provide, Transition, h } from "vue";
import { ReloadOutline } from "@vicons/ionicons5";
import { OPTIONS_MENU } from "../../config";

import './index.less';

export default defineComponent({
    name: "AdPanel",
    slots: ['content'],
    setup(props, { slots }) {
        return () => (
            <div class="ad-panel">
                <div>广告位招商</div>
            </div>
        );
    }
});
