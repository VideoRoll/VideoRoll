/*
 * @description: 
 * @Author: Gouxinyu
 * @Date: 2022-08-13 02:02:17
 */
type S = string | string[];
function test<T extends S>(params: T): T {
  if (typeof params === 'string') {
    return '';
  } else {
    return ['']
  }
}