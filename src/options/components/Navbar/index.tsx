import { defineComponent, ref, onMounted, provide, PropType } from "vue";
import { ReloadOutline } from "@vicons/ionicons5";
import { OPTIONS_MENU } from "../../config";

import './index.less';

export default defineComponent({
    name: "Navbar",
    props: {
        active: Number,
        onChange: Function
    },
    setup(props) {
        const onChange = (item: any, index: number) => {
            props.onChange?.(item, index);
        }
        return () => (
            <nav class="options-nav">
                <ul>
                    {
                        OPTIONS_MENU.map((item, index) => {
                            return <li class={`options-nav-item ${index === props.active ? 'active-item' : ''}`} onClick={() => onChange(item, index)}>
                                {item.title}
                            </li>
                        })
                    }
                </ul>
            </nav>
        );
    }
});
