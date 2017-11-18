<template>

    <div class="infinite_div" v-bind:style="'top:'+top+'px;left:'+left+'px'">
        <touch class="value_div" v-on:touchstart="infinite_touch_start" v-on:touching="infinite_touching" v-on:touchend="infinite_touch_end" monitor='true'>
            <div slot="touch">
                <slot></slot>
            </div>
        </touch>
        <!--
          v-on:touchstart 监听开始拖动触发的函数，返回鼠标x,y
          v-on:touching 监听拖动中触发的函数，返回鼠标x,y
          v-on:touchend 监听拖动结束触发的函数，返回鼠标x,y
          monitor  是否监听  拖动中的事件，默认false
        -->
    </div>
</template>
<style>
.infinite_div .value_div{
    z-index: 499;
}
    .infinite_div {
        width: 100%;
        height: 100%;
        position: absolute;
        background: red;
        top: 0;
        left: 0;
    }
</style>
<script>
    export default {
        data: function () {
            return {
                top: 0,
                left: 0,
                x: 0,
                y: 0,
                infinite_scroll: false,//是否允许滚动
                maxscroll:200,//允许的最大拖动
                effect:100,//最低的生效
            }
        },
        methods: {
            infinite_touch_start: function (x, y) {
                //开始拖动，先看看是不是在顶部了

                if (this.y == 0) {
                    this.infinite_scroll = true;
                    this.x = x;
                    this.y = y;
                }
            },
            infinite_touching: function (x, y) {
                //拖动中，先看看允许拖动
                //在vue里面设置一个最大的拖动值吧，方便配置
                if (this.infinite_scroll) {
                    var scrolling_top=y-this.y;
                    if(scrolling_top<=this.maxscroll)
                    {
                        this.top = y - this.y;                        
                    }
                }
            },
            infinite_touch_end:function(x,y){
                if(y-this.y>this.effect)
                {
                    //当超过有效值的时候，执行函数，反之不执行
                    alert('我生肖了');
                    this.top=0;
                    this.x=0;
                }
                else{
                    this.top=0;
                    this.x=0;
                }
            }

        }
    }
</script>