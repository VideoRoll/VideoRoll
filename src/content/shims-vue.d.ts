/*
 * @description: 
 * @Author: Gouxinyu
 * @Date: 2022-09-11 11:37:19
 */
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
