/*
 * @description: 
 * @Author: Gouxinyu
 * @Date: 2021-12-01 22:25:06
 */
// vite.config.js
import vue from "@vitejs/plugin-vue";
export default {
    // 配置选项
    // root: 'popup.html',
    server: { port: '8000', }, // 默认是 3000 端口
    plugins: [
        vue()
    ]
}