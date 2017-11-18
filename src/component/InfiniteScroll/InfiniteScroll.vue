<template>
    <div class="infinite_div">
        <touch>
            <slot></slot>
        </touch>
    </div>
</template>
<style>
    .infinite_div {
        width: 100%;
        height: 100%;
        position: absolute;
        background: red;
        top: 0;
        left: 0;
    }
</style>