<template>
    <div class="Infinite-mask">
        <load :IsEffect="IsEffect" :IsShow="top>0" :loading="loading"></load>
        <div class="infinite_div" v-bind:style="'top:'+top+'px;left:'+left+'px'" v-bind:class="{dh:dh}">
            <touch class="value_div" v-on:touchstart="infinite_touch_start" v-on:touching="infinite_touching" v-on:touchend="infinite_touch_end"
                monitor='true'>
                <div class="slot_div" slot="touch">
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

    .Infinite-mask {
        height: 100vh;
        width: 100vw;
    }

    .infinite_div {
        width: 100vw;
        height: 100vh;
        position: absolute;
        overflow-x: hidden;
        top: 0;
        left: 0;
    }

    .dh {
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
        transition: all 0.5s;
    }

    .infinite_div .value_div {
        height: 100vh;
        width: 100vw;
    }

    .infinite_div .slot_div {
        height: 100vh;
        width: 100vw;
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
                maxscroll: 200, //允许的最大拖动
                effect: 100, //最低的生效
                IsEffect: false,
                dh: false,
                loading: false
            }
        },
        methods: {
            infinite_touch_start: function (x, y) {
                //开始拖动，先看看是不是在顶部了
                this.dh = false;
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

                    if (scrolling_top <= this.maxscroll) {
                        this.top = y - this.y;

                        if (this.effect < y - this.y) {
                            this.IsEffect = true;
                        } else {
                            this.IsEffect = false;
                        }

                    } else {
                        this.top = this.maxscroll;
                    }
                }
            },
            infinite_touch_end: function (x, y) {
                this.dh = true;
                if (this.infinite_scroll) {
                    if (y - this.y > this.effect) {
                        //当超过有效值的时候，执行函数，反之不执行
                        this.$Toast('我生肖了');
                        this.top = 50; //转转转的，留50像素好了，就不会再触发了
                        this.y = 50; //转转转的，留50像素好了，然后不要回顶部，就不会再触发了
                        this.infinite_scroll = false;
                        this.loading = true;
                        this.$emit('loading');
                    } else {
                        this.top = 0;
                        this.y = 0;
                        this.infinite_scroll = false;
                    }
                }

            }
            ,infinite_reset:function(){
                this.loading=false;
                this.top=0;
                this.y=0;
            }

        }
    }
</script>