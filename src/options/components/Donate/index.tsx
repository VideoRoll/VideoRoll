import { defineComponent, onMounted, ref } from "vue";
import { createURL } from 'src/util';
import './index.less';

export default defineComponent({
    name: "Donate",
    setup(props) {

        const toAfdian = () => {
            createURL('https://afdian.net/a/gomi_gxy/plan');
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
                        <div><a href="https://afdian.net/a/gomi_gxy/plan" target="_blank">爱发电</a></div>
                    </div>
                    <div class="options-donate-item">
                        <img
                            class="options-donate-img"
                            src={wechat}
                            alt="weChat"
                        />
                        <div>WeChat</div>
                    </div>
                    <div class="options-donate-item">
                        <img
                            class="options-donate-img"
                            src={mayi}
                            alt="alipay"
                        />
                        <div>Alipay</div>
                    </div>
                </div>
            </div>
        );
    }
});
