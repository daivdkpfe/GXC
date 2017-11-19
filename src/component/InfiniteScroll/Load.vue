<template>
    <div class="Load_div" v-show="IsShow">
        <p class="load-txt">
            <i class="fa fa-arrow-down" aria-hidden="true" :class="{'IsEffect':IsEffect}"></i>
            {{IsEffect?'释放刷新':'下拉刷新'}}
        </p>
    </div>
</template>
<style>
    .Load_div .load-txt {
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
        props: ['IsEffect','IsShow']
    }
</script>