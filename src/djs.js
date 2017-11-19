/* 倒计时 */

import timeitem from './component/djs.vue'
import gbutton from './component/g-button.vue'
import actionsheet from './component/ActionSheet.vue'
import touch from './component/touch.vue'
import slide from './component/content.vue'
import search from './component/search.vue'
import alert from './component/alert/alert'
import Toast from './component/Toast/Toast'
import grow from './component/Flex/Row.vue'
import gcol from './component/Flex/Col.vue'
import top from './component/header.vue'
import infinite from './component/InfiniteScroll/InfiniteScroll.vue'
import load from './component/InfiniteScroll/Load.vue'


var gxc={
    timeitem,//倒计时
    gbutton,//发送按钮，倒计时
    actionsheet,//底部栏
    touch,//可拖动状态
    slide,//联系人左滑删除
    search,//搜索栏,
    grow,//柵格化行
    gcol,//柵格化列
    top,//顶部栏
    infinite,//下拉刷新
    load,//加载中
}
export function install(Vue) {
    for(let i in gxc){
        Vue.component(i, gxc[i]);
    }
    
    
    Vue.prototype.$bbb= {
        c:'333',
        d:'4445'
    }
    Vue.use(alert);//Alert提示栏
    Vue.use(Toast);//Toast提示栏
}