<!--三級標題-->
<template>
  <div class="big_div">
    <div class="h44 header">
        <div class="header_div h44">
            <slot name="left">
            <i class="fa fa-angle-left fl" aria-hidden="true" @click="left()"></i>
            </slot>
            <slot name="right">
            <i class="fa fa-ellipsis-h fr" aria-hidden="true" @click="right()"></i>
            </slot>
            <p>
{{title}}
            </p>
        </div>
    </div>
</div>
</template>
<style>

    .header{
        box-shadow: 0px 10px 125px rgba(0,0,0,0.1);
        width: 100vw;
        background: white;
        position: relative;
    }
    .header_div{
        width: 355px;
        margin: 0 auto;
    }
    .header_div img{
        width: 20px;
        height:20px;
        margin-top: 12px;
    }
    .header_div p{
        font-size: 18px;
        color: #181818;
        line-height: 44px;
        text-align: center;
    }
    .header_div i{
        font-size: 30px;
        margin-top: 7px;
    }
    .header_div .fa-ellipsis-h{
        font-size: 22px;
        margin-top:11px;
    }
</style>

<script>
export default {
   props:['title'],
   methods:{
       left:function(){
           this.$emit('left');
       },
       right:function(){
           this.$emit('right');
       }
   }
}
</script>
