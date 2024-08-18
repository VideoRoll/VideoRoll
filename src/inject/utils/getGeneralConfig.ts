import { IRollConfig } from "src/types/type";
import set from 'lodash-es/set';

export async function getGeneralConfig(rollConfig: IRollConfig) {
    return chrome.storage.sync.get('generalConfig').then((res) => {
        const data = res?.['generalConfig'];
        console.log(data, 'generalConfig');
        if (Array.isArray(data)) {
            data.forEach((item: any) => {
                if(rollConfig[item.key]) {
                    item.config.reduce((result: any, value: any) => {
                        console.log(value.key, value.value, '----');
                        set(result, value.key, value.value);
                        return result;
                    }, rollConfig)
                }
            })
        }

        return rollConfig;
    });   
}