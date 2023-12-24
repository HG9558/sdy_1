<template>
  <div class="header-navigator-container">
    <div class="header-navigator_main">
      <img class="logo" @click="$router.push('/')" :src="siteImgMap.logo" alt="" />
      <div class="navigator_list_wrapper" @mouseenter="$emit('changeMenuStatus',true)" @mouseleave="$emit('changeMenuStatus',false)">
        <div :class="{'list_wrapper_item':true, [item.icon]:true, 'on':(item.path === $route.path || currenIndex=== index) }" v-for="(item,index) in navigatorList" :key="item.icon" @mouseenter="changeCurrentMenu(item.componentName,index)" @mouseleave="currenIndex=-1" @click="goTargetPage(item, index)">
          <img class="icon-img" :src="require(`../img/${item.icon+ison(item,index)}.png`)" alt="">
          <span :class="[$route.path==='/sponsor'&&'act']">{{item.name}}</span>
        </div>
        <!-- 下拉菜单插槽 -->
        <slot></slot>
      </div>
    </div>
<!--    <user-operation></user-operation>-->
  </div>
</template>
<script>

import { navigatorList } from 'static_data/header_data.js';
import {mapMutations, mapGetters, mapState} from 'vuex'
// import UserOperation from './UserOperation.vue';
import siteImgMap from '@/configs/siteImgMap'

export default {
  name: "HeaderNavigator",
  components: {
    // UserOperation
  },
  props: {
    currentComponentName: String
  },
  data () {
    return {
      currenIndex: -1,
			siteImgMap,
    }
  },
  methods: {
    ...mapMutations('normal', ['set_discount_type', 'set_scroll_app_downLoad']),
    ison(item, index) {
      return (item.path === this.$route.path || this.currenIndex=== index||this.$route.path==='/sponsor') ? '_on' : ''
    },
    changeCurrentMenu (currentMenu, index) {
      this.$emit('update:currentComponentName', currentMenu);
      this.currenIndex = index
    },
		goTargetPage (item, index) {
			if (item.name === 'APP') {
				if (this.$route.path !== '/') {
					this.$router.push('/');
				}
				this.set_scroll_app_downLoad(true);
				this.$nextTick(() => this.set_scroll_app_downLoad(false));
			} else {
				if (item.componentName === "DiscountsMenu") {
					this.set_discount_type('全部优惠')
				}
				this.$router.push(item.path)
			}
			this.currenIndex = index
		},
  },
	computed: {
		navigatorList() {
			return navigatorList
		},
	},
}
</script>

<style scoped lang="scss">
@import "../css/HeaderNavigator.scss";
.header-navigator-container .header-navigator_main .navigator_list_wrapper {
  span.act {
    color: #fff;
  }
 .list_wrapper_item.sponsor {
    width: 114px;
    position: relative;
    &::after {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-image: url('../img/sponsor.gif');
    }
  }
}
</style>
