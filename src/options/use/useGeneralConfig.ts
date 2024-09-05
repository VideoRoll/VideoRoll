import { ref } from "vue";
import browser from 'webextension-polyfill'

export function useGeneralConfig() {
    return ref([
        {
            type: 'group',
            title: browser.i18n.getMessage('video_focus'),
            key: 'focus',
            config: [
                {
                    type: 'color-picker',
                    title: browser.i18n.getMessage('options_general_focus_backgroundColor'),
                    key: 'focus.backgroundColor',
                    value: 'rgba(0, 0, 0, 0.9)'
                },
                {
                    type: 'switch',
                    title: browser.i18n.getMessage('options_general_focus_backgroundBlur'),
                    key: 'focus.blur',
                    value: false
                },
                {
                    type: 'switch',
                    title: browser.i18n.getMessage('options_general_focus_rounded'),
                    key: 'focus.rounded',
                    value: false
                }
            ]
        },
        {
            type: 'group',
            title: browser.i18n.getMessage('video_focus'),
            key: 'crossorigin',
            config: [
                {
                    type: 'switch',
                    title: browser.i18n.getMessage('options_general_focus_backgroundBlur'),
                    key: 'crossorigin',
                    value: false
                }
            ]
        },
    ])
}