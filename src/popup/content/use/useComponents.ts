/*
 * @description: useComponents
 * @Author: Gouxinyu
 * @Date: 2022-09-11 11:12:50
 */
import { shallowReactive } from 'vue';

function useComponents() {
    const components = shallowReactive([
        {
            title: "Pitch",
            new: true
        },
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
            title: "Store"
        },
        {
            title: "About"
        },
    ]);

    return components;
}

export { useComponents }