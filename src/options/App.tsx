import { defineComponent, ref, onMounted, provide, Transition } from "vue";
import { ReloadOutline } from "@vicons/ionicons5";
import browser from "webextension-polyfill";

export default defineComponent({
    name: "App",
    setup() {
        return () => (
            <div>
                <div>123</div>
                <main>
                </main>
            </div>
        );
    }
});
