<template>
    <div class="Load_div" v-show="IsShow">
        <p class="load-txt" v-show="!loading">
            <i class="fa fa-arrow-down" aria-hidden="true" :class="{'IsEffect':IsEffect}"></i>
            {{IsEffect?'释放刷新':'下拉刷新'}}
        </p>
        <p class="loading-txt" v-show="loading">
            <!-- 转转转，加载中 -->
            <i class="fa fa-circle-o-notch" aria-hidden="true"></i>
            加载中...
        </p>
    </div>
</template>
<style>
    .Load_div .load-txt {
        font-size: 20px;
        line-height: 100px;
        height: 100px;
        text-align: center;
    }

    .Load_div .loading-txt {
        font-size: 20px;
        line-height: 50px;
        height: 50px;
        text-align: center;
    }

    .Load_div {
        height: 200px;
    }

    .Load_div .fa-arrow-down {

        transition: all 0.5s;
        -ms-transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -o-transition: all 0.5s;
        -moz-transition: all 0.5s;
    }

    .Load_div .fa-circle-o-notch {
        animation: loading 2s;
-moz-animation: loading 2s;	/* Firefox */
-webkit-animation: loading 2s;	/* Safari 和 Chrome */
-o-animation: loading 2s;	/* Opera */
animation-timing-function: linear;
animation-iteration-count: infinite;
    }

    @keyframes loading {
        from {
            transform: rotate(0deg);
            
        }
        
        to {
            transform: rotate(360deg);
            
        }
        
    }

    .Load_div .IsEffect {
        transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        /* IE 9 */
        -webkit-transform: rotate(180deg);
        /* Safari and Chrome */
        -o-transform: rotate(180deg);
        /* Opera */
        -moz-transform: rotate(180deg);
    }
</style>
<script>
    export default {
        props: ['IsEffect', 'IsShow','loading']
    }
</script>