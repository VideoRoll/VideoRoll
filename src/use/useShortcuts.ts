import { IMove, IScale } from "src/types/type.d";
import { ref } from "vue";

export const shortcutsMap = {
    'Rotate ⭮': { key: 'deg', handler: (data: number) => { if (data > 0 && data + 90 >= 360) return 0; return data + 90; }, shortcuts: { key: '', code: []} },
    'Rotate ⭯': { key: 'deg', handler: (data: number) => { if (data === 0 && data - 90 < 0) return 270; return data - 90; }, shortcuts: { key: '', code: []} },
    'Rotate 90 deg': { key: 'deg', handler: (data: number) => 90, shortcuts: { key: '', code: []} },
    'Rotate 180 deg': { key: 'deg', handler: (data: number) => 180, shortcuts: { key: '', code: []} },
    'Rotate 270 deg': { key: 'deg', handler: (data: number) => 270, shortcuts: { key: '', code: []} },
    'Rotate 0 deg': { key: 'deg', handler: (data: number) => 0, shortcuts: { key: '', code: []} },
    'Flip Horizontally': { key: 'flip', handler: (data: string) => 'horizontal', shortcuts: { key: '', code: []} },
    'Flip Vertically': { key: 'flip', handler: (data: string) => 'vertical', shortcuts: { key: '', code: []} },
    'Flip Reset': { key: 'flip', handler: (data: string) => 'unset', shortcuts: { key: '', code: []} },
    'Zoom In': { key: 'zoom', handler: (data: number) => { if (data + 0.01 <= 3) return data + 0.01; return data; }, shortcuts: { key: '', code: []} },
    'Zoom Out': { key: 'zoom', handler: (data: number) => { if (data - 0.01 >= 0) return data - 0.01; return data; }, shortcuts: { key: '', code: []} },
    'Stretch Horizontally +': { key: 'scale', handler: (data: IScale) => { data.mode = 'custom'; const value = data.values[0] + 0.01; if (value <= 4) { data.values[0] = value; } return data; }, shortcuts: { key: '', code: []} },
    'Stretch Horizontally -': { key: 'scale', handler: (data: IScale) => { data.mode = 'custom'; const value = data.values[0] - 0.01; if (value >= 0) { data.values[0] = value; } return data; }, shortcuts: { key: '', code: []} },
    'Stretch Vertically +': { key: 'scale', handler: (data: IScale) => { data.mode = 'custom'; const value = data.values[1] + 0.01; if (value <= 4) { data.values[1] = value; } return data; }, shortcuts: { key: '', code: []} },
    'Stretch Vertically -': { key: 'scale', handler: (data: IScale) => { data.mode = 'custom'; const value = data.values[1] - 0.01; if (value >= 0) { data.values[1] = value; } return data; }, shortcuts: { key: '', code: []} },
    'Stretch Reset': { key: 'scale', handler: (data: IScale) => { data.mode = 'auto'; data.values = [1, 1]; return data; }, shortcuts: { key: '', code: []} },
    'Move Right': { key: 'move', handler: (data: IMove) => { if (data.x + 1 <= 100) data.x += 100; return data; }, shortcuts: { key: '', code: []} },
    'Move Left': { key: 'move', handler: (data: IMove) => { if (data.x - 1 >= 0) data.x -= 100; return data; }, shortcuts: { key: '', code: []} },
    'Move Up': { key: 'move', handler: (data: IMove) => { if (data.y + 1 <= 100) data.y += 100; return data; }, shortcuts: { key: '', code: []} },
    'Move Down': { key: 'move', handler: (data: IMove) => { if (data.y - 1 >= 0) data.y -= 100; return data; }, shortcuts: { key: '', code: []} },
    'Volume +': { key: 'volume', handler: (data: number) => { if (data + 0.01 <= 6) return data + 0.01; return data; }, shortcuts: { key: '', code: []} },
    'Volume -': { key: 'volume', handler: (data: number) => { if (data - 0.01 >= 0) return data - 0.01; return data; }, shortcuts: { key: '', code: []} },
    'PlaybackRate +': { key: 'playbackRate', handler: (data: number) => { if (data + 0.01 <= 4) return data + 0.01; return data; }, shortcuts: { key: '', code: []} },
    'PlaybackRate -': { key: 'playbackRate', handler: (data: number) => { if (data - 0.01 >= 0) return data - 0.01; return data; }, shortcuts: { key: '', code: []} },
    'Screenshot': { key: 'capture', trigger: ({ VideoRoll }) => {
        const url = VideoRoll.capture();
        const newUrl = chrome.runtime.getURL('inject/capture.html?imgData=' + encodeURIComponent(url));
        window.open(newUrl, '_blank');
    }, shortcuts: { key: '', code: []} }
};

export function useShortcuts() {
    const shortcutsMapRef = ref(shortcutsMap);

    return shortcutsMapRef;
}