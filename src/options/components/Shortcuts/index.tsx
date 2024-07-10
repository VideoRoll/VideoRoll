import { defineComponent, ref, onMounted, provide, PropType } from "vue";
import { ReloadOutline } from "@vicons/ionicons5";

export default defineComponent({
    name: "Shortcuts",
    setup(props) {
        const value = ref('');

        const formatter = (val) => {
            return 'ctrl'
        }
        return () => (
            <div class="options-general">
                <van-form submit="onSubmit">
                    <van-cell-group inset>
                    <van-field
                        v-model={value}
                        label="文本"
                        readonly
                        formatter={formatter}
                        placeholder="在输入时执行格式化"
                    />
                        {/* <van-field label-width="300" input-align="right" name="switch" label="Automatically changes video size when rotated" v-slots={{
                            input: () => <van-switch v-model={autoScale.value} onChange={onChange} />
                        }}>
                        </van-field> */}
                    </van-cell-group>
                </van-form>

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
