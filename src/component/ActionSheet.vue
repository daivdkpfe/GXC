<template>
<div class="ActionSheet_div">
    <slot name="value">
  <gbutton @click.native.stopc="show=!show"><c slot="btntxt">ActionSheet</c></gbutton>
  <!-- 不知道为什么没有.stop就会出来多个遮罩 -->
  </slot>
   <transition name="fade">
  <div class="mask" v-if="show" @click="show=false">
        <div class="menu_list">
            <ul class="menu_ul">
                <li v-for="(menu,index) in menulist" class="menu_li" @click.stop="select(index,menu)">{{menu}}</li>
            </ul>
            <div class="cancel_btn" @click.stop="hide()">取消</div>
        </div>
    </div>
   </transition>
</div>
</template>
<style>
.ActionSheet_div{
    display:inline-block;
}
.cancel_btn{
    width: 100vw;
    height: 54px;
    border-top: 10px solid rgb(239,239,244);
    line-height: 44px;
    text-align: center;
    font-size: 15px;
    color: #000;
}
.menu_ul{
    width: 100vw;
    margin: 0;
    padding:0;
    border: 0;
}
.menu_li{
    line-height: 44px;
    list-style: none;
    font-size: 15px;
    text-align: center;
    line-height: 44px;
    color: black;
    border-bottom: 1px solid #EEE;
}
.mask{
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.8);
    top: 0;
    left: 0;
    z-index: 501;
}
.menu_list{
    width: 100vw;
    background: white;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 502;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
body{
    overflow-y: hidden;
}
</style>
<script>
export default {
  data:function(){
      return{
          show:false
      }
  },
  props:['menulist'],
  methods:{
      hide:function(){
          this.show=false;
          this.$emit('cancel');
      },
      select:function(index,val){
          var t=this;
        this.show=false;
        this.$emit('selected',index,val);
      }
  }
}
</script>