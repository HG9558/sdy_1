<template>
  <div class="footer-container">

    <template v-if="!isViLanguage">
			<div class="footer_icon_container">
				<img class="mr-10" v-for="(item, index) in 19" :key="index" :src="require(`./img/icon_${index+1}.png`)" alt="" />
			</div>

			<div class="footer_main_container">
				<div class="notice-msg">
					<img width="175" :src="siteImgMap.footerLogo" alt="" />
					<div class="desc-text-wrapper">
						<div>{{$tt('appTitle')}}{{$t('拥有欧洲马耳他博彩管理局（MGA）、英国GC监督委员会（Gambling Commission） 和菲律宾政府博彩委员会（PAGCOR）颁发的合法执照。 注册于英属维尔京群岛，是受国际博彩协会认可的合法博彩公司。 进行注册并娱乐前，请确保您年满18周岁！')}}</div>
					</div>
				</div>
				<div class="brand_wrapper">
					<div class="brand_item" v-for="(item,index) in branchList" :key="index">
						<img class="brand-img" :src="require(`./img/branch_${index+1}.png`)" alt="" />
						<div class="msg-box">{{ item }}</div>
					</div>
				</div>
			</div>

			<div class="footer_link_box">
				<router-link class="link_item" :to="item.url" tag="div" v-for="item in linkUrlList" :key="item.url"> {{ item.value }} </router-link>
			</div>
		</template>

		<template v-else>
			<div class="footer-content">
				<div class="footer-platforms">
					<img src="./img/platform.png" />
				</div>
				<div class="footer-desc">
					{{$tt('appTitle')}}{{$t('拥有欧洲马耳他博彩管理局（MGA）、英国GC监督委员会（Gambling Commission） 和菲律宾政府博彩委员会（PAGCOR）颁发的合法执照。 注册于英属维尔京群岛，是受国际博彩协会认可的合法博彩公司。 进行注册并娱乐前，请确保您年满18周岁！')}}
				</div>
				<div class="footer-association">
					<div v-for="(item,index) in branchList" :key="index" class="footer-association-item">
						<img class="brand-img" :src="require(`./img/branch_${index+1}.png`)" alt="" />
						<p>{{ item }}</p>
					</div>
				</div>
				<div class="footer-link">
					<router-link class="link-item" :to="item.url" tag="div" v-for="item in linkUrlList" :key="item.url"> {{ item.value }} </router-link>
				</div>
				<div class="footer-copyright">{{$t('版权所有 © 2014-2023')}} {{$tt('appTitle')}}{{$t('保留所有权')}}</div>
			</div>
		</template>

  </div>
</template>

<script>
import { linkUrlList, branchList } from 'static_data/footer_data.js'
import { mapState, mapGetters } from "vuex";
import siteImgMap from '@/configs/siteImgMap'

export default {
  name: "Footer",
  data () {
    return {
      linkUrlList,
      branchList,
			siteImgMap,
    };
  },
	computed: {
		...mapGetters('global', ['isViLanguage']),
	},
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
