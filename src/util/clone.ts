export function clone(obj: object) {
    try {
        return JSON.parse(JSON.stringify(obj));
    } catch (err) {
        console.debug(err);
    }
}