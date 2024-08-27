export function isVisible(element: HTMLElement): boolean {
    if (!element) {
        return false;
    }

    const style = window.getComputedStyle(element);
    
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
        return false;
    }

    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
        return false;
    }

    return element.offsetParent !== null;
}