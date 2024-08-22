import { ref } from "vue";

export function useGeneralConfig() {
    return ref([
        {
            type: 'group',
            title: 'Focus',
            key: 'focus',
            config: [
                {
                    type: 'color-picker',
                    title: 'background color',
                    key: 'focus.backgroundColor',
                    value: 'rgba(0, 0, 0, 0.8)'
                },
                {
                    type: 'switch',
                    title: 'Blur',
                    key: 'focus.blur',
                    value: false
                },
                {
                    type: 'switch',
                    title: 'Rounded corners',
                    key: 'focus.rounded',
                    value: false
                }
            ]
        },
    ])
}