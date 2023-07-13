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
            type: 'row',
            children: [
                {
                    type: 'container',
                    col: 16,
                    children: [{
                        type: 'component',
                        title: "rotate",
                        component: defineAsyncComponent(() => import("../components/Rotate"))
                    }]
                },
                {
                    type: "container",
                    col: 8,
                    children: [
                        {
                            type: 'row',
                            children: [
                                {
                                    type: 'component',
                                    title: 'Focus',
                                    col: 24,
                                    component: defineAsyncComponent(() => import("../components/Focus"))
                                },
                            ]
                        },
                        {
                            type: 'row',
                            children: [
                                {
                                    type: 'component',
                                    col: 24,
                                    component: defineAsyncComponent(() => import("../components/Rotate"))
                                },
                            ]
                        }
                    ]
                    
                }
            ]  
        },
        {
            type: 'row',
            children: [
                
            ],
            title: "Focus",
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