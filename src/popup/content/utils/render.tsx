import { h } from 'vue';
import { IComponentConfig, IContainerConfig, IRowConfig, ISwiperConfig, ITabConfig, IFragmentConfig } from 'src/popup/content/utils/useComponents'

export default function render(children: IRowConfig[] | IContainerConfig[] | IComponentConfig[] | ISwiperConfig[] | ITabConfig[] | IFragmentConfig[]) {
    return children.map((item) => {
        switch (item.type) {
            case 'tab':
                return <van-tab v-slots={{ title: () => item.title }}>
                    {
                        render(item.children)
                    }
                </van-tab>
            case 'swiper':
                return <van-swipe-item>
                    {
                        render(item.children)
                    }
                </van-swipe-item>
            case 'row':
                return <van-row justify="start" gutter='10' wrap={true} style={{...item.style}}>
                    {
                        render(item.children)
                    }
                </van-row>
            case 'container':
                return <van-col span={item.col}>
                    {
                        item.children ? <div class={`${item.class ?? ''} video-roll-container`} style={{...item.style}}>{
                            render(item.children)
                        }</div> : null
                    }{
                        item.showTitle ? <div class="video-roll-container-title">{item.title}</div> : null
                    }
                </van-col>
            case 'fragment':
                return <van-col span={item.col}>
                    {
                        item.children ? <div class={item.class ?? 'video-roll-fragment'} style={{...item.style}}>{
                            render(item.children)
                        }</div> : null
                    }
                </van-col>
            case 'component':
                return h(item.component);
            default:
                return null;
        }
    })
}