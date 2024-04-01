import { defineComponent, onMounted, ref } from "vue";
import browser from "webextension-polyfill";

import './index.less'

export default defineComponent({
    name: "General",
    setup(props) {
        const autoScale = ref(true);
        const loading = ref(false);
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
                        loading.value ? <van-loading /> : <van-cell-group inset>
                            <van-field label-width="300" input-align="right" name="switch" label="Automatically changes video size when rotated" v-slots={{
                                input: () => <van-switch v-model={autoScale.value} onChange={onChange} />
                            }}>
                            </van-field>
                        </van-cell-group>
                    }
                </van-form>
            </div>
        );
    }
});
