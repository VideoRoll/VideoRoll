/*
 * @description: 节流
 * @Author: Gouxinyu
 * @Date: 2022-05-29 10:36:47
 */
export default function (fn, delay = 400) {
    let timer = null;
    return function (e) {
        if (timer) return;
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay);
    };
}
