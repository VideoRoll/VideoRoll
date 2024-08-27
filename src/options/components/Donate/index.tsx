import { defineComponent } from "vue";
import { createURL } from 'src/util';
import browser from 'webextension-polyfill'
import './index.less';

export default defineComponent({
    name: "Donate",
    setup(props) {

        const toAfdian = () => {
            createURL('https://afdian.com/a/gomi_gxy/plan');
        }

        const afdian = new URL(
            'images/afdian.png',
            import.meta.url
        ).toString();

        const wechat = new URL(
            'images/weChat.jpg',
            import.meta.url
        ).toString();

        const mayi = new URL(
            'images/mayi.jpg',
            import.meta.url
        ).toString();

        return () => (
            <div class="options-general">
                <div class="options-content-h">
                    <div class="options-donate-item" onClick={toAfdian}>
                        <img class="options-donate-img options-donate-afdian" src={afdian} />
                        <div><a href="https://afdian.com/a/gomi_gxy/plan" target="_blank">{browser.i18n.getMessage('tips_afdian')}</a></div>
                    </div>
                    <div class="options-donate-item">
                        <img
                            class="options-donate-img"
                            src={wechat}
                            alt="weChat"
                        />
                        <div>{browser.i18n.getMessage('tips_wechat')}</div>
                    </div>
                    <div class="options-donate-item">
                        <img
                            class="options-donate-img"
                            src={mayi}
                            alt="alipay"
                        />
                        <div>{browser.i18n.getMessage('tips_alipay')}</div>
                    </div>
                </div>
            </div>
        );
    }
});
