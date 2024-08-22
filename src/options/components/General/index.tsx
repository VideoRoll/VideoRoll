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
                    const array2Map = new Map(data.map((item:any) => [item.key, item.config]));

                    config.value.forEach(item1 => {
                        const matchingConfig2 = array2Map.get(item1.key) as any[];

                        if (matchingConfig2) {
                            const configMap2 = new Map(matchingConfig2.map((configItem: any) => [configItem.key, configItem.value]));

                            item1.config.forEach(configItem1 => {
                                if (configMap2.has(configItem1.key)) {
                                    configItem1.value = configMap2.get(configItem1.key);
                                }
                            });
                        }
                    });
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
