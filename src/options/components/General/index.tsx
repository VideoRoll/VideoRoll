import { defineComponent, onMounted, ref } from "vue";
import browser from "webextension-polyfill";

import './index.less'
import { useGeneralConfig } from "src/options/use/useGeneralConfig";
import render from "src/options/utils/render";
import "vue3-colorpicker/style.css";

export default defineComponent({
    name: "General",
    setup(props) {
        const autoScale = ref(true);
        const loading = ref(false);

        const config = useGeneralConfig();
        onMounted(() => {
            loading.value = true;
            browser.storage.sync.get('isAutoChangeSize').then((res) => {
                autoScale.value = res?.['isAutoChangeSize'] ?? true;
                loading.value = false;
            });
        })

        const onChange = (value: boolean) => {
            browser.storage.sync.set({
                isAutoChangeSize: value
            });
        }

        return () => (
            <div class="options-general">
                <van-form submit="onSubmit">
                    {
                        render(config)
                    }
                </van-form>
            </div>
        );
    }
});
