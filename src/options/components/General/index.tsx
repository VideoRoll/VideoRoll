import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "General",
    setup(props) {
        const autoScale = ref(true);
        return () => (
            <div class="options-general">
                <van-form submit="onSubmit">
                    <van-cell-group inset>
                        <van-field label-width="300" input-align="right" name="switch" label="Automatically changes video size when rotated" v-slots={{
                            input: () => <van-switch v-model={autoScale.value} />
                        }}>
                        </van-field>
                    </van-cell-group>
                </van-form>
            </div>
        );
    }
});
