/*
 * @description: useComponents
 * @Author: Gouxinyu
 * @Date: 2022-09-11 11:12:50
 */
import { shallowReactive } from 'vue';

function useComponents() {
    const components = shallowReactive([
        {
            title: "Zoom"
        },
        {
            title: "Move",
        },
        {
            title: "Scale"
        },
        {
            title: "Flip"
        },
        {
            title: "Filter",
        },
        {
            title: "Audio"
        },
        {
            title: "Store"
        },
        {
            title: "About"
        },
    ]);

    return components;
}

export { useComponents }