import { defineComponent, onMounted, ref, toRaw } from "vue";
import browser from "webextension-polyfill";

import './index.less'
import { useGeneralConfig } from "src/options/use/useGeneralConfig";
import render from "src/options/utils/render";
import "vue3-colorpicker/style.css";

export default defineComponent({
    name: "General",
    setup(props) {
        const loading = ref(false);

        const config = useGeneralConfig();
        onMounted(() => {
            loading.value = true;
            // browser.storage.sync.remove('generalConfig');
            browser.storage.sync.get('generalConfig').then((res) => {
                const data = res?.['generalConfig'];
                if (data) {
                    console.log(data, '--config')
                    config.value = data;
                }
                
                loading.value = false;
            });
        })

        const onChange = () => {
            browser.storage.sync.set({
                generalConfig: JSON.parse(JSON.stringify(config.value))
            });
        }

        return () => (
            <div class="options-general">
                <van-form submit="onSubmit">
                    {
                        render(config.value, onChange)
                    }
                </van-form>
            </div>
        );
    }
});
