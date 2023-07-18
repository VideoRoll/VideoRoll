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

interface IConfig {
    type: string;
    title?: string;
    style?: Object;
    children?: any[];
}

interface IComponentConfig extends IConfig {
    type: 'component',
    component: any;
}

interface IContainerConfig extends IConfig {
    type: 'container',
    title?: string,
    col?: number;
    showTitle?: boolean;
    children?: IComponentConfig[] | IRowConfig[]
}

interface IRowConfig extends IConfig {
    type: 'row';
    children: IContainerConfig[]
}

interface ISwiperConfig extends IConfig {
    type: 'swiper';
    children: IRowConfig[]
}

function useComponents() {
    const components = shallowReactive<ISwiperConfig[]>([
        {
            type: 'swiper',
            children: [{
                type: 'row',
                style: {
                    margin: '20px 0',
                    height: '120px'
                },
                children: [
                    {
                        type: 'container',
                        col: 16,
                        title: "rotate",
                        showTitle: false,
                        children: [{
                            type: 'component',
                            component: defineAsyncComponent(() => import("../components/Rotate"))
                        }]
                    },
                    {
                        type: "container",
                        col: 8,
                        style: {
                            flexDirection: "column",
                            background: 'none',
                            justifyContent: 'space-between',
                        },
                        children: [
                            {
                                type: 'row',
                                style: {
                                    marginBottom: '10px'
                                },
                                children: [
                                    {
                                        type: 'container',
                                        title: 'Focus',
                                        showTitle: false,
                                        col: 24,
                                        children: [
                                            {
                                                type: 'component',
                                                // component: null
                                                component: defineAsyncComponent(() => import("../components/Focus"))
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                type: 'row',
                                children: [
                                    {
                                        type: 'container',
                                        title: 'Store',
                                        showTitle: false,
                                        col: 24,
                                        children: [
                                            {
                                                type: 'component',
                                                component: null
                                                // component: defineAsyncComponent(() => import("../components/Store"))
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                type: 'row',
                style: {
                    margin: '20px 0',
                    height: '40px'
                },
                children: [
                    {
                        type: 'container',
                        title: "Move",
                        showTitle: true,
                        col: 8,
                        children: [{
                            type: 'component',
                            component: null
                            // component: defineAsyncComponent(() => import("../components/Move"))
                        }]
                    },
                    {
                        type: 'container',
                        col: 8,
                        title: "Scale",
                        showTitle: true,
                        children: [{
                            type: 'component',
                            component: null
                            // component: defineAsyncComponent(() => import("../components/Scale"))
                        }]
                    },
                    {
                        type: 'container',
                        col: 8,
                        title: "Flip",
                        showTitle: true,
                        children: [{
                            type: 'component',
                            component: null
                            // component: defineAsyncComponent(() => import("../components/Flip"))
                        }]
                    },
                ],
            },
            {
                type: 'row',
                style: {
                    margin: '20px 0',
                    height: '40px'
                },
                children: [
                    {
                        type: 'container',
                        col: 24,
                        title: "Pitch",
                        showTitle: true,
                        children: [{
                            type: 'component',
                            component: null
                            // component: defineAsyncComponent(() => import("../components/Pitch"))
                        }]
                    },
                ]
            },
            {
                type: 'row',
                style: {
                    margin: '20px 0',
                    height: '40px'
                },
                children: [
                    {
                        type: 'container',
                        title: "Zoom",
                        showTitle: true,
                        col: 24,
                        children: [{
                            type: 'component',
                            component: null
                            // component: defineAsyncComponent(() => import("../components/Zoom"))
                        }]
                    },
                ]
            }]
        },
        {
            type: 'swiper',
            children: [{
                type: 'row',
                children: [
                    {
                        type: 'container',
                        col: 16,
                        title: "rotate",
                        children: [{
                            type: 'component',
                            component: defineAsyncComponent(() => import("../components/Rotate"))
                        }]
                    },
                    {
                        type: "container",
                        col: 8,
                        style: {
                            flexDirection: "column",
                            background: 'none',
                            justifyContent: 'space-between',
                        },
                        children: [
                            {
                                type: 'row',
                                children: [
                                    {
                                        type: 'container',
                                        title: 'Focus',
                                        col: 24,
                                        children: [
                                            {
                                                type: 'component',
                                                component: null
                                                // component: defineAsyncComponent(() => import("../components/Focus"))
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                type: 'row',
                                children: [
                                    {
                                        type: 'container',
                                        title: 'Store',
                                        col: 24,
                                        children: [
                                            {
                                                type: 'component',
                                                component: null
                                                // component: defineAsyncComponent(() => import("../components/Store"))
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                type: 'row',
                children: [
                    {
                        type: 'container',
                        title: "Move",
                        col: 8,
                        children: [{
                            type: 'component',
                            component: null
                            // component: defineAsyncComponent(() => import("../components/Move"))
                        }]
                    },
                    {
                        type: 'container',
                        col: 8,
                        title: "Scale",
                        children: [{
                            type: 'component',
                            component: null
                            // component: defineAsyncComponent(() => import("../components/Scale"))
                        }]
                    },
                    {
                        type: 'container',
                        col: 8,
                        title: "Flip",
                        children: [{
                            type: 'component',
                            component: null
                            // component: defineAsyncComponent(() => import("../components/Flip"))
                        }]
                    },
                ],
            },
            {
                type: 'row',
                children: [
                    {
                        type: 'container',
                        col: 24,
                        title: "Pitch",
                        children: [{
                            type: 'component',
                            component: null
                            // component: defineAsyncComponent(() => import("../components/Pitch"))
                        }]
                    },
                ]
            },
            {
                type: 'row',
                children: [
                    {
                        type: 'container',
                        title: "Zoom",
                        col: 24,
                        children: [{
                            type: 'component',
                            component: null
                            // component: defineAsyncComponent(() => import("../components/Zoom"))
                        }]
                    },
                ]
            }]
        }
    ]);

    return components;
}

export { useComponents, ISwiperConfig, IRowConfig, IComponentConfig, IContainerConfig, IConfig }