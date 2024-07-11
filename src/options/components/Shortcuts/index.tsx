import { defineComponent, ref, onMounted, provide, PropType, onUnmounted } from "vue";
import { ReloadOutline } from "@vicons/ionicons5";
import hotkeys from 'hotkeys-js';
import './index.less'
import { getkeyCodeMap } from "src/util/getKeycodeMap";

export default defineComponent({
	name: "Shortcuts",
	setup(props) {
		const shortcuts = ref('');
		const isShowSettingInput = ref(false);

		const formatter = (val) => {
			return 'ctrl'
		}

		const updateShowSettingInput = (val) => {
			isShowSettingInput.value = val;
		}

		onMounted(() => {
			hotkeys('*', function (event, handler) {
				event.preventDefault();

				console.log(event, handler)
				if (!isShowSettingInput.value) return;


				const keys = handler.keys.map((key) => getkeyCodeMap()[key]).join('+');
				shortcuts.value = keys;
			});

		});

		onUnmounted(() => {
			hotkeys.unbind('*')
		})

		return () => (
			<div class="options-general">
				<van-overlay show={isShowSettingInput.value} onClick={() => updateShowSettingInput(false)}>
					<div>Press</div>
					<div class="shortcuts-input" onClick={(e) => e.stopPropagation()}>
						{shortcuts.value}
					</div>
				</van-overlay>
				<div class="options-content">
					<van-form submit="onSubmit">
						<van-cell-group inset>
							<van-field
								v-model={shortcuts.value}
								label="rotate 90"
								readonly
								placeholder="Click to update"
								onClick={() => updateShowSettingInput(true)}
							/>
						</van-cell-group>
					</van-form>
				</div>
			</div>
		);
	}
});
