import { defineComponent, ref, onMounted, provide, Transition, h } from "vue";
import { ReloadOutline } from "@vicons/ionicons5";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

import './index.less';
import { OPTIONS_MENU } from "./config";
import Panel from "./components/Panel";

export default defineComponent({
    name: "App",
    setup() {
        const active = ref(0);
        const onChange = (item: any, index: number) => {
            active.value = index;
        }
        return () => (
            <van-config-provider theme="dark">
                <Header></Header>
                <main>
                    <Navbar active={active.value} onChange={onChange}></Navbar>
                    <Panel v-slots={{
                        content: () => h(OPTIONS_MENU[active.value].component)
                    }}>
                    </Panel>
                </main>
            </van-config-provider>
        );
    }
});
