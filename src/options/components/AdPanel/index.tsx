import { defineComponent } from "vue";
import browser from 'webextension-polyfill'
import './index.less';

export default defineComponent({
    name: "AdPanel",
    slots: ['content'],
    setup(props, { slots }) {
        return () => (
            <div class="ad-panel">
                <div class="ad-content"><p>{browser.i18n.getMessage('options_ad')}</p><p>{browser.i18n.getMessage('tips_mail')}</p></div>
            </div>
        );
    }
});
