import Vue from './main.js'
import  './style/public.less'
import  './style/index.less'

Vue.use('Menu')
var page = new Vue({
  el: ".el_div",
  data: {
    theme3: 'light'
  }
})