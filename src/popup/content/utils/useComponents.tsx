/*
 * @description: useComponents
 * @Author: Gouxinyu
 * @Date: 2022-09-11 11:12:50
 */
import { shallowReactive } from 'vue';
import {
    defineAsyncComponent,
} from "vue";
import { VideocamOutline, VolumeMediumOutline, ListOutline, EllipsisHorizontalCircleOutline } from '@vicons/ionicons5';

interface IConfig {
    type: string;
    title?: JSX.Element | string;
    merge?: boolean;
    style?: Object;
    class?: string;
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

interface IFragmentConfig extends IConfig {
    type: 'fragment',
    col?: number;
    children?: IComponentConfig[] | IRowConfig[]
}

interface IRowConfig extends IConfig {
    type: 'row';
    children: IContainerConfig[] | IFragmentConfig[]
}

interface ISwiperConfig extends IConfig {
    type: 'swiper';
    children: IRowConfig[]
}

interface ITabConfig extends IConfig {
    type: 'tab';
    children: IRowConfig[] | IComponentConfig[]
}

export default function useComponents() {
    const components = shallowReactive<ITabConfig[]>([
        {
            type: 'tab',
            title: <div class="tab-title"><VideocamOutline class="tab-icon" /><span class="tab-title-text">Video</span></div>,
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
                                    height: '45px'
                                },
                                children: [
                                    {
                                        type: 'container',
                                        title: 'Download',
                                        showTitle: true,
                                        col: 24,
                                        children: [
                                            {
                                                type: 'component',
                                                component: defineAsyncComponent(() => import("../components/Download"))
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: 'row',
                                style: {
                                    height: '45px'
                                },
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
                        title: "Reposition",
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
                        title: 'Focus',
                        showTitle: true,
                        col: 8,
                        children: [
                            {
                                type: 'component',
                                component: defineAsyncComponent(() => import("../components/Focus"))
                            }
                        ]
                    },
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
                        title: 'Screenshot',
                        showTitle: true,
                        col: 8,
                        children: [
                            {
                                type: 'component',
                                component: defineAsyncComponent(() => import("../components/Capture"))
                            }
                        ]
                    }
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
                        title: "Speed",
                        showTitle: true,
                        children: [{
                            type: 'component',
                            component: defineAsyncComponent(() => import("../components/PlaybackRate"))
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
                        col: 24,
                        title: "Zoom",
                        showTitle: true,
                        children: [{
                            type: 'component',
                            component: defineAsyncComponent(() => import("../components/Zoom"))
                        }]
                    },
                ]
            }
            ]
        },
        {
            type: 'tab',
            title: <div class="tab-title"><VolumeMediumOutline class="tab-icon" /><span class="tab-title-text">Audio</span></div>,
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
                            title: "Volume",
                            showTitle: true,
                            col: 24,
                            children: [{
                                type: 'component',
                                component: defineAsyncComponent(() => import("../components/Volume"))
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
                }
            ]
        },
        {
            type: 'tab',
            title: <div class="tab-title"><ListOutline class="tab-icon" /><span class="tab-title-text">List</span></div>,
            children: [
                {
                    type: 'component',
                    component: defineAsyncComponent(() => import("../components/VideoList"))
                }
            ]
        },
        {
            type: 'tab',
            title: <div class="tab-title"><EllipsisHorizontalCircleOutline class="tab-icon" /><span class="tab-title-text">more</span></div>,
            children: [
                {
                    type: 'row',
                    style: {
                        margin: '30px 0',
                        height: '100px'
                    },
                    children: [
                        {
                            type: 'fragment',
                            col: 24,
                            children: [{
                                type: 'component',
                                component: defineAsyncComponent(() => import("../components/More"))
                            }]
                        },
                    ]
                }
            ]
        }
    ]);

    return components;
}

export { ITabConfig, ISwiperConfig, IRowConfig, IComponentConfig, IContainerConfig, IFragmentConfig, IConfig }