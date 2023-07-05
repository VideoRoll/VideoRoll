/*
 * @description: useComponents
 * @Author: Gouxinyu
 * @Date: 2022-09-11 11:12:50
 */
import { shallowReactive } from 'vue';
import {
    defineComponent,
    ref,
    defineAsyncComponent,
    resolveComponent,
    h,
} from "vue";

function useComponents() {
    const components = shallowReactive([
        {
            title: "rotate",
            grid: 4,
            component: defineAsyncComponent(() => import("../components/Rotate"))
        },
        {
            title: "Focus",
            grid: 4,
            component: defineAsyncComponent(() => import("../components/Focus"))
        },
        {
            title: "Pitch",
            component: defineAsyncComponent(() => import("../components/Pitch"))
        },
        {
            title: "Zoom",
            component: defineAsyncComponent(() => import("../components/Zoom"))
        },
        {
            title: "Move",
            component: defineAsyncComponent(() => import("../components/Move"))
        },
        {
            title: "Scale",
            component: defineAsyncComponent(() => import("../components/Scale"))
        },
        {
            title: "Flip",
            component: defineAsyncComponent(() => import("../components/Flip"))
        },
        {
            title: "Filter",
            component: defineAsyncComponent(() => import("../components/Filter"))
        },
        {
            title: "Store",
            component: defineAsyncComponent(() => import("../components/Store"))
        },
        {
            title: "About",
            component: defineAsyncComponent(() => import("../components/About"))
        },
    ]);

    return components;
}

export { useComponents }