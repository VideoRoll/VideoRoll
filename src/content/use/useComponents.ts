/*
 * @description: useComponents
 * @Author: Gouxinyu
 * @Date: 2022-09-11 11:12:50
 */
import { shallowReactive } from 'vue';
import Flip from "../components/Flip.vue";
import Scale from "../components/Scale.vue";
import Zoom from "../components/Zoom.vue";
import Store from "../components/Store.vue";
import About from "../components/About.vue";

function useComponents() {
    const components = shallowReactive([
        {
            title: "Zoom",
            component: Zoom,
        },
        {
            title: "Scale",
            component: Scale,
        },
        {
            title: "Flip",
            component: Flip,
        },
        {
            title: "Store",
            component: Store,
        },
        {
            title: "About",
            component: About,
        },
    ]);

    return components;
}

export { useComponents }