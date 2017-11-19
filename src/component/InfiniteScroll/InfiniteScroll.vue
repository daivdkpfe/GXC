<template>
    <div class="Infinite-mask">
        <load :IsEffect="IsEffect" :IsShow="top>0"></load>
        <div class="infinite_div" v-bind:style="'top:'+top+'px;left:'+left+'px'" v-bind:class="{dh:dh}">
            <touch class="value_div" v-on:touchstart="infinite_touch_start" v-on:touching="infinite_touching" v-on:touchend="infinite_touch_end"
                monitor='true'>
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
    </div>
</template>
<style>
    .infinite_div .value_div {
        z-index: 499;
    }

    .infinite_div {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        }
        .dh{
            -webkit-transition: all 0.5s;
            -moz-transition: all 0.5s;
            transition: all 0.5s;
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
                infinite_scroll: false, //是否允许滚动
                maxscroll: 100, //允许的最大拖动
                effect: 50, //最低的生效
                IsEffect:false,
                dh:false
            }
        },
        methods: {
            infinite_touch_start: function (x, y) {
                //开始拖动，先看看是不是在顶部了
                this.dh=false;
                if (this.y == 0) {
                    this.infinite_scroll = true;
                    this.x = x;
                    this.y = y;
                }
                /* console.log('start:' + y); */
            },
            infinite_touching: function (x, y) {
                //拖动中，先看看允许拖动
                //在vue里面设置一个最大的拖动值吧，方便配置
                if (this.infinite_scroll) {
                    var scrolling_top = y - this.y;
                    if(scrolling_top<=0) return;
                    if (scrolling_top <= this.maxscroll) {
                        this.top = y - this.y;

                        if(this.effect<y-this.y){
                            this.IsEffect=true;
                        }
                        else{
                            this.IsEffect=false;
                        }

                    }
                    else{
                        this.top=this.maxscroll;
                    }
                }
            },
            infinite_touch_end: function (x, y) {
                this.dh=true;
                if (y - this.y > this.effect) {
                    //当超过有效值的时候，执行函数，反之不执行
                    this.$Toast('我生肖了');
                    this.top = 0;
                    this.y = 0;
                    this.infinite_scroll = false;
                } else {
                    this.top = 0;
                    this.y = 0;
                    this.infinite_scroll = false;
                }
            }

        }
    }
</script>