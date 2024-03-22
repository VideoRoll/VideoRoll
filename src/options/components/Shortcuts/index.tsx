import { defineComponent, ref, onMounted, provide, PropType } from "vue";
import { ReloadOutline } from "@vicons/ionicons5";

export default defineComponent({
    name: "General",
    setup(props) {
        const autoScale = ref(true);
        return () => (
            <div class="options-general">
                <div class="options-content">
                    <span class="options-title">🤣 Now only support rotate function</span>
                    <p class="options-title-1"> 90deg: CTRL + → </p>
                    <p class="options-title-1"> 180deg: CTRL + ↓ </p>
                    <p class="options-title-1"> 270deg: CTRL + ← </p>
                    <p class="options-title-1"> 0deg: CTRL + ↑ </p>
                </div>

            </div>
        );
    }
});
