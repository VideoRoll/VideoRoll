export function getDomain(url: string) {
    const regex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/i;
    const match = url.match(regex);
    return match ? match[1] : null;
};