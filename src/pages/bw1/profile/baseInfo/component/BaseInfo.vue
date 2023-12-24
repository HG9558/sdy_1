<template>
  <div class="base-description">
    <div class="base-content">
      <span class="base-text"> 为了您的隐私安全，信息在提交后将无法修改。如需帮助请 </span>
      <a :href="serUrl" class="service-link" target="_black">联系客服</a>。
    </div>
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
  margin-top: 30px;
  font-size: 14px;
  .base-content {
    margin-bottom: 22px;
    .base-text {
      margin: 26px 0 30px;
      color: #3B4165;
    }
    .real-text {
      color:#505679;
    }
    .service-link {
      font-weight: 800;
      color: rgb(228, 154, 115);
    }
  }
}
</style>