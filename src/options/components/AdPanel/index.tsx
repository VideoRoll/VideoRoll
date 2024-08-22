import { defineComponent } from "vue";


import './index.less';

export default defineComponent({
    name: "AdPanel",
    slots: ['content'],
    setup(props, { slots }) {
        return () => (
            <div class="ad-panel">
                <div class="ad-content">广告位招商</div>
            </div>
        );
    }
});
