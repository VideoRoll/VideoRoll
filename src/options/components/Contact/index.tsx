import { defineComponent, onMounted, ref } from "vue";
import { createURL } from "src/popup/content/utils";
import './index.less';

export default defineComponent({
    name: "Contact",
    setup(props) {

        return () => (
            <div class="options-general">
                <div class="options-content">
                    <div>Discord</div>
                    <div>Discord</div>
                </div>
            </div>
        );
    }
});
