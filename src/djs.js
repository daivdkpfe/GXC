/* 倒计时 */

import timeitem from './component/djs.vue'
import gbutton from './component/g-button.vue'
import actionsheet from './component/ActionSheet.vue'
import touch from './component/touch.vue'



var gxc={
    timeitem,//倒计时
    gbutton,//发送按钮，倒计时
    actionsheet,//底部栏
    touch,//可拖动状态
}
export function install(Vue) {
    for(let i in gxc){
        Vue.component(i, gxc[i]);
    }
}