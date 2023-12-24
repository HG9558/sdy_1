<template>
  <div class="discount-wrapper" id="box">
    <img src="./img/default_banner.png" v-if="!bannerlist.length" width="100%" alt="">
    <el-carousel v-else arrow="never" class="discount-banner">
      <el-carousel-item v-for="(_, i) in bannerlist" :key="i"><img @click="goDetailPage(_)" :src="_.picPcPath"/></el-carousel-item>
    </el-carousel>
    <SplitLine />
    <div class="discount-content">
      <el-tabs class="discount-tabs" v-model="activeName" tab-position="left" @tab-click="changeType">
        <el-tab-pane v-for="(item,index) in Object.values(discountData)" :name="item.catName" :key="item.id">

          <div class="icon-catName" slot="label" v-if="item.disable === '1'">
            <img class="icon" :src="require(`./img/icon_${index+1}${activeName===item.catName?`_active`:''}.png`)">
            <span class="cat-name"> {{ item.catName }} </span>
            <img class="right-arrow" :src="require(`./img/right_arrows${activeName===item.catName?`_active`:''}.png`)">
          </div>
          <list-content @openDetail="openDetail" :list="discountData[activeName].list"></list-content>
        </el-tab-pane>
      </el-tabs>

      <div class="no-data" v-show="shwoNodata">
        <img class="no-data-img" src="./img/no_data.png" alt="" />
        <div class="no-data-title">暂无数据</div>
      </div>
      <Loading :showLoading="showLoading" styleName="discount" />
    </div>

    <RedEnvelopeEntrance />

    <global-dialog title="优惠详情" :showDialog.sync="showDialog" className="discount-dialog" :width="'800px'" :hasSelfFooter="true">
      <discount-detail-dialog ref="dialog" :token="token" :detailData="detailData"></discount-detail-dialog>
    </global-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import SplitLine from "commonComponent/SplitLine/SplitLine.vue"
import ListContent from './component/ListContent.vue'
import DiscountDetailDialog from './component/DiscountDetailDialog.vue'
import RedEnvelopeEntrance from "./component/RedEnvelopeEntrance.vue"
import Loading from "commonComponent/Loading"

export default {
  name: "discount",
  components: {
    SplitLine,
    ListContent,
    DiscountDetailDialog,
    RedEnvelopeEntrance,
    Loading
  },
  created () {
    if (!this.discountType) return
    if (Object.keys(this.discountData).length) {
      !this.discountData[this.discountType] && this.set_discount_type('全部优惠');
      this._getDataList();
    } else {
      this._getDiscountTypeList();
    }
  },
  watch: {
    SToken: {
      handler (val) {
        val && this._getDiscountTypeList();
      }
    },
    discountType (val) {
      this._getDataList();
    },
    scrollTop: {
      immediate: true,
      handler (num) {
        this.$nextTick(() => {
          if (num) {
            document.documentElement.scrollTop = num
            this.set_scroll_top(0);
          }
        })
      }
    },
    linkData: {
      immediate: true,
      handler (obj) {
        if (obj.bannerLink) {
          if (Object.keys(this.discountData).length) {
            const key = Object.values(this.discountData).find(item => {
              return item.id === obj.id
            })?.catName;
            key && this.set_discount_type(key);
            this._getDataList();
          } else {
            this._getDiscountTypeList();
          }
        }
      }
    }
  },
  data () {
    return {
      showDialog: false,
      showLoading: false,
      shwoNodata: false,
      detailData: {},
      initRed: false,
      bannerlist:[],
    };
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      discountData: state => state.discount.discountData,
      discountType: state => state.normal.discountType,
      scrollTop: state => state.normal.scrollTop,
      linkData: state => state.normal.linkData,
    }),
    activeName: {
      get () {
        return (this.discountData[this.discountType] && this.discountType) || '全部优惠'
      },
      set (val) { }
    }
  },
  methods: {
    ...mapMutations('discount', ['set_discount_data']),
    ...mapMutations('normal', ['set_discount_type', 'set_link_data', 'set_scroll_top']),
    changeType (data) {
      if (this.discountType === data.name) return
      this.set_discount_type(data.name);
    },
    goDetailPage (item) {
      if (item.picTarget === 2) return
      // picTarget 2 不跳转 1 外链 0 优惠详情 activityId 这个是否为null来判断 是否跳转详情，不为null跳转优惠分类
      if (item.picTarget === 1) {
        window.open(item.outStation)
      } else {
        this.$router.push('/discount')
        if (!item.activityId) {
          this.set_link_data({ bannerLink: true })
        } else {
          this.set_link_data({ bannerLink: true, id: item.actId, activityId: item.activityId })
        }
      }
    },
    async _getDiscountTypeList () {
      const res = await this.$http.getDiscountTypeList();
      if (res.data.code) return;
      const tempObj = JSON.parse(JSON.stringify(this.discountData));
      res.data.page.forEach(item => {
        item.catName === '全部' && (item.catName = '全部优惠');
        !tempObj[item.catName] && (tempObj[item.catName] = { ...item, list: [] })
      })
      this.set_discount_data(tempObj)
      this._getDataList()
    },
    async _getDataList () {
      this.shwoNodata = false;
      
      try {
        this.showLoading = !this.discountData[this.activeName].list.length;
        const requestMethods = this.token ? this.$http.getDiscountDataList : this.$http.getNoTokenDiscountDataList;
        const res = await requestMethods(this.discountData[this.activeName].id);
        this.bannerlist = res.data.data.youhuiBanners || []
        if (res.data.code) return this.messageTip({ message: res.data.msg, duration: 1000 });

        const tempObj = JSON.parse(JSON.stringify(this.discountData));
        Object.keys(tempObj).forEach((key => {
          if (tempObj[key].id === res.config.actCatId) {
            tempObj[key].list = res.data.page.list;
          }
        }))
        this.set_discount_data(tempObj);
        this.shwoNodata = !this.discountData[this.activeName].list.length;
        this.showLoading = false;
        if (this.linkData.activityId) {
          const targetItem = this.discountData[this.activeName].list.find(item => item.id == this.linkData.activityId)
          targetItem && this.openDetail(targetItem);
          this.set_link_data({})
        }
      } catch (error) {
        this.showLoading && (this.showLoading = false);
        this.shwoNodata = false;
      }
    },
    openDetail (item) {
      this.detailData = item;
      this.showDialog = true;
    }
  },
  beforeDestroy () {
    this.set_link_data({})
    this.set_discount_type('');
    this.set_scroll_top(0);
  }
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
