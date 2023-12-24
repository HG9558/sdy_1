<template>
  <div>
    <div class="msg"> <span class=""> {{showBetItem.userName}}: </span> <span class="red">晒了一单</span> </div>
    <div class="showbet-wrap">
      <div class="left">
        <div>
          <p>{{showBetItem.betType}}</p>
          <p>{{showBetItem.betContent}}</p>  
        </div> 
        <div class="fllow" @click="fllowBet">跟单>></div>
      </div>
      <div class="right">
        <span class="tit">本金</span>
        <span>{{showBetItem.bet}} </span>
        <span class="tit">可赢</span>
        <span> {{showBetItem.estimatedPayout}} </span>
      </div>
    </div>
  </div>
</template>

<script> 

export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    showBetItem() {
      return this.message
    },
  },
  methods: {
    fllowBet(){
      this.messageTip({ message: '请下载APP跟单'});  
      window.scrollTo(0, 1550)
    }
  }
}
</script>

<style lang="scss" scoped>
.msg{
  color: $ft-fb;
  .red{
    color: $bg-ff;
    margin-left: 8px;
  }
}
.showbet-wrap{
  @include flex(center, row, nowrap, unset);
  color:$c-f;
  margin-top: 5px;
  font-size: 12px;
  .left{
    flex: 2.5;
    @include flex();
    border-radius: 0 8px 8px 0;
    background: $bg-62;
    padding: 10px;
    .fllow{
      color:$ft-fb;      
      cursor: pointer;
    }
  }
  .right{
    flex: 1;
    @include flex(flex-end, column, nowrap, flex-end);
    border-left: 1px dashed $c-30;
    border-radius: 8px 0 0 8px;
    background: $bg-62;
    padding: 5px 15px 5px 0;
    .tit{
      color: $c-c9;
    }
  }
}
</style>
