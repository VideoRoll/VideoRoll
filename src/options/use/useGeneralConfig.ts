import { ref } from "vue";

export function useGeneralConfig() {
    return ref([
        {
            type: 'group',
            title: 'Lights Off',
            key: 'focus',
            config: [
                {
                    type: 'color-picker',
                    title: 'Lights off background color',
                    key: 'focus.backgroundColor',
                    value: 'rgba(0, 0, 0, 0.8)'
                },
                {
                    type: 'switch',
                    title: 'Enable rounded corners for the video',
                    key: 'focus.rounded',
                    value: false
                },
                {
                    type: 'switch',
                    title: 'Enable rounded corners for the video',
                    key: 'focus.blur',
                    value: false
                }
            ]
        }
    ])
}