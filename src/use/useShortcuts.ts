import { IMove, IScale } from "src/types/type.d";
import { ref } from "vue";
import browser from 'webextension-polyfill';

export const shortcutsMap = {
    'Rotate ⭮': { title: browser.i18n.getMessage('options_shortcuts_rotate_left'), key: 'deg', handler: (data: number) => { if (data > 0 && data + 90 >= 360) return 0; return data + 90; }, shortcuts: { key: '', code: [] } },
    'Rotate ⭯': { title: browser.i18n.getMessage('options_shortcuts_rotate_right'), key: 'deg', handler: (data: number) => { if (data === 0 && data - 90 < 0) return 270; return data - 90; }, shortcuts: { key: '', code: [] } },
    'Rotate 90 deg': { title: browser.i18n.getMessage('options_shortcuts_rotate_90'), key: 'deg', handler: (data: number) => 90, shortcuts: { key: '', code: [] } },
    'Rotate 180 deg': { title: browser.i18n.getMessage('options_shortcuts_rotate_180'), key: 'deg', handler: (data: number) => 180, shortcuts: { key: '', code: [] } },
    'Rotate 270 deg': { title: browser.i18n.getMessage('options_shortcuts_rotate_270'), key: 'deg', handler: (data: number) => 270, shortcuts: { key: '', code: [] } },
    'Rotate 0 deg': { title: browser.i18n.getMessage('options_shortcuts_rotate_0'), key: 'deg', handler: (data: number) => 0, shortcuts: { key: '', code: [] } },
    'Flip Horizontally': { title: browser.i18n.getMessage('options_shortcuts_flip_horizontally'), key: 'flip', handler: (data: string) => 'horizontal', shortcuts: { key: '', code: [] } },
    'Flip Vertically': { title: browser.i18n.getMessage('options_shortcuts_vertically'), key: 'flip', handler: (data: string) => 'vertical', shortcuts: { key: '', code: [] } },
    'Flip Reset': { title: browser.i18n.getMessage('options_shortcuts_flip_reset'), key: 'flip', handler: (data: string) => 'unset', shortcuts: { key: '', code: [] } },
    'Zoom In': { title: browser.i18n.getMessage('options_shortcuts_zoomin'), key: 'zoom', handler: (data: number) => { if (data + 0.01 <= 3) return data + 0.01; return data; }, shortcuts: { key: '', code: [] } },
    'Zoom Out': { title: browser.i18n.getMessage('options_shortcuts_zoomout'), key: 'zoom', handler: (data: number) => { if (data - 0.01 >= 0) return data - 0.01; return data; }, shortcuts: { key: '', code: [] } },
    'Stretch Horizontally +': { title: browser.i18n.getMessage('options_shortcut_stretch_horizontally_p'), key: 'scale', handler: (data: IScale) => { data.mode = 'custom'; const value = data.values[0] + 0.01; if (value <= 4) { data.values[0] = value; } return data; }, shortcuts: { key: '', code: [] } },
    'Stretch Horizontally -': { title: browser.i18n.getMessage('options_shortcut_stretch_horizontally_r'), key: 'scale', handler: (data: IScale) => { data.mode = 'custom'; const value = data.values[0] - 0.01; if (value >= 0) { data.values[0] = value; } return data; }, shortcuts: { key: '', code: [] } },
    'Stretch Vertically +': { title: browser.i18n.getMessage('options_shortcut_stretch_vertically_p'), key: 'scale', handler: (data: IScale) => { data.mode = 'custom'; const value = data.values[1] + 0.01; if (value <= 4) { data.values[1] = value; } return data; }, shortcuts: { key: '', code: [] } },
    'Stretch Vertically -': { title: browser.i18n.getMessage('options_shortcut_stretch_vertically_r'), key: 'scale', handler: (data: IScale) => { data.mode = 'custom'; const value = data.values[1] - 0.01; if (value >= 0) { data.values[1] = value; } return data; }, shortcuts: { key: '', code: [] } },
    'Stretch Reset': { title: browser.i18n.getMessage('options_shortcut_stretch_reset'), key: 'scale', handler: (data: IScale) => { data.mode = 'auto'; data.values = [1, 1]; return data; }, shortcuts: { key: '', code: [] } },
    'Move Right': { title: browser.i18n.getMessage('options_shortcut_move_right'), key: 'move', handler: (data: IMove) => { if (data.x + 1 <= 100) data.x += 100; return data; }, shortcuts: { key: '', code: [] } },
    'Move Left': { title: browser.i18n.getMessage('options_shortcut_move_left'), key: 'move', handler: (data: IMove) => { if (data.x - 1 >= 0) data.x -= 100; return data; }, shortcuts: { key: '', code: [] } },
    'Move Up': { title: browser.i18n.getMessage('options_shortcut_move_up'), key: 'move', handler: (data: IMove) => { if (data.y + 1 <= 100) data.y += 100; return data; }, shortcuts: { key: '', code: [] } },
    'Move Down': { title: browser.i18n.getMessage('options_shortcut_move_down'), key: 'move', handler: (data: IMove) => { if (data.y - 1 >= 0) data.y -= 100; return data; }, shortcuts: { key: '', code: [] } },
    'Volume +': { title: browser.i18n.getMessage('options_shortcut_volume_p'), key: 'volume', handler: (data: number) => { if (data + 0.01 <= 6) return data + 0.01; return data; }, shortcuts: { key: '', code: [] } },
    'Volume -': { title: browser.i18n.getMessage('options_shortcut_volume_r'), key: 'volume', handler: (data: number) => { if (data - 0.01 >= 0) return data - 0.01; return data; }, shortcuts: { key: '', code: [] } },
    'PlaybackRate +': { title: browser.i18n.getMessage('options_shortcut_speed_p'), key: 'playbackRate', handler: (data: number) => { if (data + 0.01 <= 4) return data + 0.01; return data; }, shortcuts: { key: '', code: [] } },
    'PlaybackRate -': { title: browser.i18n.getMessage('options_shortcut_speed_r'), key: 'playbackRate', handler: (data: number) => { if (data - 0.01 >= 0) return data - 0.01; return data; }, shortcuts: { key: '', code: [] } },
    'Screenshot': {
        title: browser.i18n.getMessage('options_shortcut_screenshot'),
        key: 'capture', trigger: ({ VideoRoll }) => {
            const url = VideoRoll.capture();
            const newUrl = chrome.runtime.getURL('inject/capture.html?imgData=' + encodeURIComponent(url));
            window.open(newUrl, '_blank');
        }, shortcuts: { key: '', code: [] }
    }
};

export function useShortcuts() {
    const shortcutsMapRef = ref(shortcutsMap);

    return shortcutsMapRef;
}