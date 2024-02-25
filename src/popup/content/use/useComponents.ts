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
                    margin: '30px 0',
                    height: '120px'
                },
                children: [
                    {
                        type: 'container',
                        col: 16,
                        title: "Rotate",
                        showTitle: true,
                        children: [{
                            type: 'component',
                            component: defineAsyncComponent(() => import("../components/Rotate"))
                        }]
                    },
                    {
                        type: "container",
                        col: 8,
                        title: 'Pic In Pic',
                        showTitle: true,
                        style: {
                            flexDirection: "column",
                            background: 'none',
                            justifyContent: 'space-between',
                        },
                        children: [
                            {
                                type: 'row',
                                style: {
                                    marginBottom: '30px'
                                },
                                children: [
                                    {
                                        type: 'container',
                                        title: 'Focus',
                                        showTitle: true,
                                        col: 24,
                                        children: [
                                            {
                                                type: 'component',
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
                                        title: 'Pic In Pic',
                                        showTitle: false,
                                        col: 24,
                                        children: [
                                            {
                                                type: 'component',
                                                component: defineAsyncComponent(() => import("../components/PictureInPicture"))
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
                    margin: '30px 0',
                    height: '40px'
                },
                children: [
                    {
                        type: 'container',
                        title: "Repostion",
                        showTitle: true,
                        col: 8,
                        children: [{
                            type: 'component',
                            component: defineAsyncComponent(() => import("../components/Repostion"))
                        }]
                    },
                    {
                        type: 'container',
                        col: 8,
                        title: "Stretch",
                        showTitle: true,
                        children: [{
                            type: 'component',
                            component: defineAsyncComponent(() => import("../components/Stretch"))
                        }]
                    },
                    {
                        type: 'container',
                        col: 8,
                        title: "Flip",
                        showTitle: true,
                        children: [{
                            type: 'component',
                            component: defineAsyncComponent(() => import("../components/Flip"))
                        }]
                    },
                ],
            },
            {
                type: 'row',
                style: {
                    margin: '30px 0',
                    height: '40px'
                },
                children: [
                    {
                        type: 'container',
                        col: 24,
                        title: "Zoom",
                        showTitle: true,
                        children: [{
                            type: 'component',
                            component: defineAsyncComponent(() => import("../components/Zoom"))
                        }]
                    },
                ]
            },
            {
                type: 'row',
                style: {
                    margin: '30px 0',
                    height: '40px'
                },
                children: [
                    {
                        type: 'container',
                        title: "Pitch",
                        showTitle: true,
                        col: 24,
                        children: [{
                            type: 'component',
                            component: defineAsyncComponent(() => import("../components/Pitch"))
                        }]
                    },
                ]
            }]
        },
        {
            type: 'swiper',
            children: [
            {
                type: 'row',
                style: {
                    margin: '30px 0',
                    height: '40px'
                },
                children: [
                    {
                        type: 'container',
                        title: "Filter",
                        showTitle: true,
                        col: 8,
                        children: [{
                            type: 'component',
                            component: defineAsyncComponent(() => import("../components/Filter"))
                        }]
                    },
                    {
                        type: 'container',
                        title: 'Cache Site',
                        showTitle: true,
                        col: 8,
                        children: [
                            {
                                type: 'component',
                                component: defineAsyncComponent(() => import("../components/Store"))
                            }
                        ]
                    }
                ],
            }]
        }
    ]);

    return components;
}

export { useComponents, ISwiperConfig, IRowConfig, IComponentConfig, IContainerConfig, IConfig }