export function getFavicon() {
    const linkElements = document.getElementsByTagName('link');
    for (let i = 0; i < linkElements.length; i++) {
        if ((linkElements[i].getAttribute('rel') === 'icon') ||
            (linkElements[i].getAttribute('rel') === 'shortcut icon') ||
            (linkElements[i].getAttribute('rel') === 'apple-touch-icon')) {
            return linkElements[i].getAttribute('href');
        }
    }
    return ''; // 默认情况下，如果未找到favicon，假设为根目录下的favicon.ico
}