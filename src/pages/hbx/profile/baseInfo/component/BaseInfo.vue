<template>
  <div class="base-description"> 
    <div class="base-title">为了您的隐私安全，信息在提交后将无法修改。如需帮助请 <a :href="serUrl" class="service-link" target="_black">联系客服</a></div> 
  
    <div class="base-content">
      <span class="base-text">真实姓名：</span>
      <span class="real-text"> {{userInfo.realName | handleRealName}}</span>
    </div>
    <div class="base-content">
      <span class="base-text">性 别：</span>
      <span  class="real-text"> {{ userInfo.gender}}</span>
    </div>
    <div class="base-content">
      <span class="base-text">出生日期：</span>
      <span  class="real-text"> {{ userInfo.birthday | formatDate('YYYY-MM-DD') }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseInfo",
  props: {
    serUrl: String,
  }
}
</script>

<style lang="scss" scoped>
.base-description { 
  font-size: 14px;
  .base-title{
    color: $c-cec;
    margin: 26px 0 30px;
    .title-1{
      color:$c-f;
      font-size: 16px;
    }
    .service-link { 
      color: $c-6b;
    }
  }
  .base-content {
    margin-bottom: 26px;
    @include flex(flex-start);
    .base-text {
      color: $c-80;
      width: 100px;
      span{
        font-size: 16px;
        color: $c-f;
      }
    }
    .real-text {
      color:$c-f;
    }
    
  }
}
</style>