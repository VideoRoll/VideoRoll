import { h } from 'vue';
import { IComponentConfig, IContainerConfig, IRowConfig, ISwiperConfig, ITabConfig, IFragmentConfig } from 'src/popup/content/utils/useComponents'
import { ColorPicker } from 'vue3-colorpicker';

export default function render(config: any, onChange: Function) {
    return config.map((item: any) => {
        switch (item.type) {
            case 'group':
                return <div>
                    <div class="general-title">{item.title}</div>
                    <van-cell-group inset>
                        {render(item.config, onChange)}
                    </van-cell-group>
                </div>
            case 'color-picker':
                return <van-field label-width="300" input-align="right" name="switch" label={item.title} v-slots={{
                    input: () => <ColorPicker theme="black" format="rgb" shape="circle" v-model:pureColor={item.value}/>
                }}>
                </van-field>
            case 'switch':
                return <van-field label-width="300" input-align="right" name="switch" label={item.title}  v-slots={{
                    input: () => <van-switch size="15px" v-model={item.value} onChange={onChange}/>
                }}>
                </van-field>
            default:
                return null;
        }
    })
}