/* 倒计时 */

import timeitem from './component/djs.vue'
import gbutton from './component/g-button.vue'
import actionsheet from './component/ActionSheet.vue'
import touch from './component/touch.vue'
import slide from './component/content.vue'
import search from './component/search.vue'
import alert from './component/alert'

var gxc={
    timeitem,//倒计时
    gbutton,//发送按钮，倒计时
    actionsheet,//底部栏
    touch,//可拖动状态
    slide,//联系人左滑删除
    search,//搜索栏
}
export function install(Vue) {
    for(let i in gxc){
        Vue.component(i, gxc[i]);
    }
    
    
    Vue.prototype.$bbb= {
        c:'333',
        d:'4445'
    }
    Vue.use(alert);
}