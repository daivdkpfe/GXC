<template>
  <div class="touch"  @touchstart="start" v-on:touchmove.prevent.stop="touching" @touchend="end">
      <slot name='touch'>
           
      </slot>
  </div>
</template>
<style>
.touch{
  position: absolute; 
}
</style>
<script>
export default {
  props:['monitor'],
  methods:{
    start:function(){
      this.$emit('touchstart',event.changedTouches["0"].clientX,event.changedTouches["0"].clientY);
      if(this.prevent)
      {
        event.stopPropagation();
      }
    },
    touching:function(event){
      if(this.monitor)
      {
      this.$emit('touching',event.changedTouches["0"].clientX,event.changedTouches["0"].clientY)
      }
      if(this.prevent)
      {
        event.stopPropagation();
      }
    },
    end:function(){
      this.$emit('touchend',event.changedTouches["0"].clientX,event.changedTouches["0"].clientY);
      if(this.prevent)
      {
        event.stopPropagation();
      }
    }
  }
}
</script>


