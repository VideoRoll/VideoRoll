import { defineComponent, ref, onMounted, provide, PropType } from "vue";
import { ReloadOutline } from "@vicons/ionicons5";

export default defineComponent({
    name: "General",
    setup(props) {
        const autoScale = ref(true);
        return () => (
            <div class="options-general">
                <van-form submit="onSubmit">
                    <van-cell-group inset>
                        <van-field label-width="300"	input-align="right" name="switch" label="Whether to scale automatically when rotating" v-slots={{
                            input: () => <van-switch v-model={autoScale.value} />
                        }}>
                        </van-field>
                        <van-field input-align="right" name="switch" label="开关" v-slots={{
                            input: () => <van-switch v-model={autoScale.value} />
                        }}>
                        </van-field>
                        <van-field input-align="right" name="switch" label="开关" v-slots={{
                            input: () => <van-switch v-model={autoScale.value} />
                        }}>
                        </van-field>
                    </van-cell-group>
                </van-form>
            </div>
        );
    }
});
