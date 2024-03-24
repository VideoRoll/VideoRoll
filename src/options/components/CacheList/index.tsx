import { defineComponent, onMounted, ref } from "vue";
import './index.less';

export default defineComponent({
    name: "CacheList",
    setup(props) {
        const autoScale = ref(true);
        const loading = ref(false);
        const list = ref<any>([]);
        onMounted(() => {
            chrome.storage.sync.get().then((res) => {
                Object.keys(res).forEach((key) => {
                    const data = res[key];
                    if (key.startsWith("video-roll") && data.deg) {
                        list.value.push({
                            url: data.url,
                            data
                        })
                    }
                })

                Object.keys(res).forEach((key) => {
                    const data = res[key];
                    if (key.startsWith("video-roll") && data.deg) {
                        list.value.push({
                            url: data.url,
                            data
                        })
                    }
                })
            })
        })

        const onChange = (value: boolean) => {
            chrome.storage.sync.set({
                isAutoChangeSize: value
            });
        }

        return () => (
            <div class="options-general">
                {
                    list.value.map((item) => <van-cell key={item.url} v-slots={{
                        title: () => <span title={item.url} class="cell-title">{item.url}</span>
                    }}>
                        <van-icon name="close" class="close-icon" />
                    </van-cell>)
                }
            </div>
        );
    }
});
