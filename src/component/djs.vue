<template>
    <!-- <div> -->
        <!-- <p class="fl right_txt sl1 time" v-html="txt"></p> -->
        <p class="fl right_txt sl1 time">{{title}}{{day}} {{hour}} {{minute}} {{second}}</p>
    <!-- </div> -->
</template>
<script>
// 将传入的数字转成两位数,如果传入的字符串非法则返回空字符串
function formatNumber(number) {
  var _number = parseInt(number);
  if (isNaN(_number)) {
    return "";
  }

  return _number < 10 ? "0" + _number : _number;
}

// 将数字转化为要显示的文本，如果是00就不显示
function transToDisplayText(number,isAddColon = true ) {
    // console.log(number);
  var text = formatNumber(number);
  var after = isAddColon?":":"";
  return ("00" == text   ? "" : (text+after));
}

export default {
  name: "timeitem",
  props: ["t", "title"],
  data: function() {
    var that = this;
    return {
      counter: that.t
    };
  },
  computed: {

    day: function() {
      return transToDisplayText(this.counter / 3600 / 24);
    },

    hour: function() {
      return transToDisplayText((this.counter % (3600 * 24)) / 3600);
    },

    minute: function() {
      return transToDisplayText(((this.counter % (3600 * 24)) % 3600) / 60);
    },

    second: function() {
      return transToDisplayText((this.counter % (3600 * 24)) % 60,false);
    }
  },
  mounted: function() {
    var that = this;

    if(this.counter < 1){
        return;
    }

    setInterval(function() {
      if (0<that.counter ) {
        that.counter = that.counter - 1;
      } 
    }, 1000);
  }
};
</script>
