<template>
  <div class="loading_txt">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<style scoped lang="scss">
.loading_txt {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 3px;
  align-self: flex-end;
  margin-bottom: 2px;
  span {
    display: inline-block;
    width: 4px;
    height: 4px;
    margin: 0 2px;
    background-color: var(--l_37);
    border-radius: 50%;
    animation: loading_txt_animate 1s infinite ease-in-out;
    &:nth-child(1) {
      animation-delay: 0s;
    }
    &:nth-child(2) {
      animation-delay: 0.1s;
    }
    span:nth-child(3) {
      animation-delay: 0.2s;
    }
    &:nth-child(4) {
      animation-delay: 0.3s;
    }
    &:nth-child(5) {
      animation-delay: 0.4s;
    }
    &:nth-child(6) {
      animation-delay: 0.5s;
    }
  }

  @keyframes loading_txt_animate {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.5);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
}
</style>
