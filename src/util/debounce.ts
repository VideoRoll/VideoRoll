export default function debounce(func: Function, time: number) {
    let timer: any = null;

    const _debounce = (...args: any[]) => {
        if (timer) {
            clearTimeout(timer);
        }
    
        timer = setTimeout(() => {
            //@ts-ignore
            func.apply(this, args);
            timer = null;
        }, time);
    }

    return _debounce;
}