/*
 * @description: utils
 * @Author: Gouxinyu
 * @Date: 2022-09-11 10:58:15
 */
import { RollKey, RollValue, IRollConfig, ActionType } from "../../../types/type.d";
import WEBSITE from "../../../website";
import { clone } from "../../../util";

// url reg
const urlReg = /^http(s)?:\/\/(.*?)\//;

/**
 * send message to inject.js
 * @param rollConfig
 * @param extra
 * @param send
 */
function sendMessage(rollConfig: IRollConfig, extra = {}, send = (res: any) => {
    console.debug(res);
}) {
    chrome.tabs.sendMessage(
        rollConfig.tabId,
        { rollConfig: clone(rollConfig), type: ActionType.UPDATE_CONFIG },
        extra,
        send
    );
}

/**
 * update config
 * @param rollConfig
 * @param key
 * @param value 
 */
function updateRollConfig(rollConfig: IRollConfig, key: RollKey, value: RollValue) {
    if (key in rollConfig) {
        rollConfig[key] = value;
        sendMessage(rollConfig);
    }
}

/**
 * initialize config
 * @param rollConfig
 * @param tab
 * @returns
 */
function initRollConfig(rollConfig: IRollConfig, tab: any): void {
    const { url } = tab;
    rollConfig.tabId = tab.id;
    rollConfig.url = url;
    rollConfig.isInit = false;

    const hostName = urlReg.exec(url)?.[2] ?? "";

    if (!hostName) {
        rollConfig.name = "Error Website";
        rollConfig.videoSelector = {
            defaultDom: 'video'
        };
        return;
    }

    for (const key of Object.keys(WEBSITE)) {
        if (hostName.includes(key)) {
            const target = WEBSITE[key];
            rollConfig.name = target.name;
            rollConfig.videoSelector = target.videoSelector;
            return;
        }
    }

    if (!rollConfig.name) {
        rollConfig.name = hostName || "Error Website";
        rollConfig.videoSelector = { defaultDom: 'video' };
    }
};

function createURL(url: string) {
    chrome.tabs.create({
        active: true,
        url
    });
}

export { initRollConfig, updateRollConfig, createURL }