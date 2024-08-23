import { defineComponent, h } from "vue";


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
