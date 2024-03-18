import { defineComponent, ref, onMounted, provide, Transition } from "vue";
import { ReloadOutline } from "@vicons/ionicons5";


export default defineComponent({
    name: "Header",
    setup() {
        return () => (
            <div class="options-header">
                <img
                    class="video-roll-logo-text"
                    src="../../icons/text.png"
                />
            </div>
        );
    }
});
