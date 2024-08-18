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
import browser from 'webextension-polyfill';
import { Tooltip } from 'floating-vue';

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
            title: <Tooltip><div class="tab-title" v-tooltip="Video"><VideocamOutline class="tab-icon"/></div></Tooltip>,
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
                        title: browser.i18n.getMessage('video_rotate'),
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
                                        title: browser.i18n.getMessage('video_download'),
                                        showTitle: true,
                                        col: 24,
                                        children: [
                                            {
                                                type: 'component',
                                                component: defineAsyncComponent(() => import("../components/Loop"))
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
                        title: browser.i18n.getMessage('video_reposition'),
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
                        title: browser.i18n.getMessage('video_stretch'),
                        showTitle: true,
                        children: [{
                            type: 'component',
                            component: defineAsyncComponent(() => import("../components/Stretch"))
                        }]
                    },
                    {
                        type: 'container',
                        col: 8,
                        title: browser.i18n.getMessage('video_flip'),
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
                        title: browser.i18n.getMessage('video_focus'),
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
                        title: browser.i18n.getMessage('video_filter'),
                        showTitle: true,
                        col: 8,
                        children: [{
                            type: 'component',
                            component: defineAsyncComponent(() => import("../components/Filter"))
                        }]
                    },
                    {
                        type: 'container',
                        title: browser.i18n.getMessage('video_screenshot'),
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
                        title: browser.i18n.getMessage('video_speed'),
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
                        title: browser.i18n.getMessage('video_zoom'),
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
            title: <Tooltip><div class="tab-title" v-tooltip="Audio"><VolumeMediumOutline class="tab-icon" /></div></Tooltip>,
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
                            title: browser.i18n.getMessage('audio_volume'),
                            showTitle: true,
                            col: 24,
                            children: [{
                                type: 'component',
                                component: defineAsyncComponent(() => import("../components/Mute"))
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
                            title: browser.i18n.getMessage('audio_volume'),
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
                            title: browser.i18n.getMessage('audio_pitch'),
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
            title: <Tooltip><div class="tab-title" v-tooltip="Video List"><ListOutline class="tab-icon" /></div></Tooltip>,
            children: [
                {
                    type: 'component',
                    component: defineAsyncComponent(() => import("../components/VideoList"))
                }
            ]
        },
        {
            type: 'tab',
            title: <Tooltip><div class="tab-title" v-tooltip="More Settings"><EllipsisHorizontalCircleOutline class="tab-icon" /></div></Tooltip>,
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