/*
 * @description: About
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */
import { defineComponent, shallowRef } from "vue";
import "./index.less";
export default defineComponent({
    name: "About",
    setup() {
        const list = shallowRef([
            {
                type: "primary",
                plain: false,
                name: "Donate",
                href: "https://afdian.net/a/gomi_gxy/plan",
            },
            {
                name: "Give a like",
                plain: true,
                href: "https://chrome.google.com/webstore/detail/video-roll/cokngoholafkeghnhhdlmiadlojpindm",
            },
            {
                name: "Give a star",
                plain: true,
                href: "https://github.com/VideoRoll/VideoRoll",
            },
            {
                name: "Author",
                plain: true,
                href: "https://gomi.site",
            },
        ]);

        const toSite = (url: string) => {
            chrome.tabs.create({
                active: true,
                url,
            });
        };

        return () => (
            <div class="video-roll-about">
                <ul>
                    {list.value.map((item) => (
                        <li class="about-list-item" key={item.name}>
                            <van-button
                                class="about-btn"
                                size="small"
                                plain={item.plain}
                                round
                                onClick={() => toSite(item.href)}
                                type={item.type}
                            >
                                {item.name}
                            </van-button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    },
});
