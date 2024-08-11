import { shallowReactive } from "vue";

export function useGeneralConfig() {
    return shallowReactive([
        {
            type: 'group',
            title: 'Lights Off',
            config: [
                {
                    type: 'color-picker',
                    title: 'Lights off background color',
                    value: ''
                },
                {
                    type: 'switch',
                    title: 'Enable rounded corners for the video',
                    value: false
                },
                {
                    type: 'switch',
                    title: 'Enable rounded corners for the video',
                    value: false
                }
            ]
        }
    ])
}