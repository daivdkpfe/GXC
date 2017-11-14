
import galert from './alert.vue'


function instance(title,value,btn,okcallback,cancelcakkback){
    
    var vueObj = new Vue({
        template:`<galert :alert_show="alert_show" title="`+title+`" value="`+value+`" :btn="btn" v-on:clickok="clickok" v-on:clickcancel="clickcancel"></galert>`,
        components:{galert},
        data: {
            alert_show:false,
            btn:[]
        },
        methods:{
            clickok:function(){
                okcallback('ok');
            },
            clickcancel:function(){
                
                cancelcakkback('cancel')
            }
        },
        mounted:function(){
           this.btn=btn;
            this.alert_show = true;
            console.log(this.btn);
        }
    });
   
    const component = vueObj.$mount();
    document.body.appendChild(component.$el);
}
// export default alertshow;
export default function(){
    Vue.prototype.$alertshow=function(title,value,btn,okcallback,cancelcakkback){
        
        instance(title,value,btn,okcallback,cancelcakkback);
    }
} 



