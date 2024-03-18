import { defineComponent, useSlots, ref, onMounted, provide, Transition, h } from "vue";
import { ReloadOutline } from "@vicons/ionicons5";
import { OPTIONS_MENU } from "../../config";

import './index.less';

export default defineComponent({
    name: "Panel",
    slots: ['content'],
    setup(props, { slots }) {
        return () => (
            <div class="options-panel">
                {
                    h(slots.content as any)
                }
            </div>
        );
    }
});
