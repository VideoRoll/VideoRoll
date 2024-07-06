export function getName(url: any) {
    let name = url.pathname.split("/").slice(-1)[0];
    if (!/\.\w+$/.test(name)) {
        if (name.match(/^\s*$/)) name = Date.now();
        name = name + ".mp4";
    }
    return name;
}