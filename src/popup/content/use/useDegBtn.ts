/*
 * @description: 
 * @Author: Gouxinyu
 * @Date: 2022-09-11 11:12:50
 */
import { shallowRef } from 'vue';

function useDegBtn() {
    const degBtns = shallowRef([
        {
            type: "left",
            iconDeg: 0,
            deg: 270,
        },
        {
            type: "up",
            iconDeg: 90,
            deg: 0,
        },
        {
            type: "right",
            iconDeg: 180,
            deg: 90,
        },
        {
            type: "down",
            iconDeg: 270,
            deg: 180,
        },
    ]);

    return degBtns;
}

export { useDegBtn }