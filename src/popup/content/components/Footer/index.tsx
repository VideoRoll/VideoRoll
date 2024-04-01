/*
 * @description: Footer
 * @Author: Gouxinyu
 * @Date: 2022-09-19 22:53:23
 */

import { defineComponent } from "vue";
import { createURL } from 'src/util';
import "./index.less";

export default defineComponent({
    name: "Footer",
    setup() {
        return () => (
            <div class="video-roll-footer">
                <p><a href="https://videoroll.gomi.site/#donate" target="_blank" class="text-link">Pay what you like</a> - made by <a href="https://gomi.site" target="_blank" class="text-link">Gomi</a></p>
            </div>
        );
    }
});
