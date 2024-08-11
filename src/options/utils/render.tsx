import { h } from 'vue';
import { IComponentConfig, IContainerConfig, IRowConfig, ISwiperConfig, ITabConfig, IFragmentConfig } from 'src/popup/content/utils/useComponents'
import { ColorPicker } from 'vue3-colorpicker';

export default function render(config) {
    return config.map((item) => {
        switch (item.type) {
            case 'group':
                return <div>
                    <div class="general-title">{item.title}</div>
                    <van-cell-group inset>
                        {render(item.config)}
                    </van-cell-group>
                </div>
            case 'color-picker':
                return <van-field label-width="300" input-align="right" name="switch" label={item.title} v-slots={{
                    input: () => <ColorPicker format="rgb" shape="circle" v-model:pureColor={item.value}/>
                }}>
                </van-field>
            case 'switch':
                return <van-field label-width="300" input-align="right" name="switch" label={item.title}  v-slots={{
                    input: () => <van-switch v-model={item.value} />
                }}>
                </van-field>
            default:
                return null;
        }
    })
}