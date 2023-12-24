<template>
  <el-popover
    placement="bottom-start"
    class="mobileArea-select"
    popper-class="mobileArea-select-popper"
    trigger="click"
    :visible-arrow="false"
    transition="el-zoom-in-top"
    v-model="visible"
  >
    <div slot="reference">
      <template v-if="value">
        {{ `+${value}` }}
        <i :class="['el-icon-arrow-down', { 'arrow-up': visible }]"></i>
      </template>
    </div>
    <input v-model="searchVal" class="mobileArea-select-search" type="text" :placeholder="$t('搜索')" />
    <ul v-if="filterList.length" class="mobileArea-select-list">
      <li @click="handleSelect(item)" v-for="item in filterList" :key="item.id" :class="{ 'active': value === item.mobileAreaCode }">
        <span>{{ item.countryName }}</span>
        <span>(+{{ item.mobileAreaCode }})</span>
      </li>
    </ul>
    <p v-else>{{$t('无匹配数据')}}</p>
  </el-popover>
</template>

<script>
  import { getMobileAreasCfg } from 'common/js/mobileAreaCfg'
  import { mapState } from "vuex"

  export default {
    props: {
      value: String,
    },
    data() {
      return {
        searchVal: '',
        visible: false,
      }
    },
    computed: {
      ...mapState('global', ['mobileAreaCodes']),
      mobileAreasCfg () {
        return getMobileAreasCfg(this.mobileAreaCodes)
      },
      filterList() {
        if (!this.searchVal) return this.mobileAreasCfg
        return this.mobileAreasCfg.filter(v => {
          return v.countryName.includes(this.searchVal) || v.mobileAreaCode.includes(this.searchVal)
        })
      }
    },
    watch: {
      mobileAreasCfg: {
        deep: true,
        immediate: true,
        handler (value) {
          if (value && value.length) {
            this.$emit('input', value[0].mobileAreaCode)
          }
        }
      },
    },
    methods: {
      handleSelect(v) {
        this.$emit('input', v.mobileAreaCode)
        this.$nextTick(() => {
          this.visible = false
          this.$emit('select')
        })
      },
    },
  }
</script>

<style lang="scss">
  .mobileArea-select .el-popover__reference {
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #FFFFFF;
    background: #C9B9AA;
    opacity: 0.8;
    z-index: 999;
    cursor: pointer;
    i {
      margin-left: 3px;
      transition: transform .3s;
      transform: rotate(0);
      &.arrow-up {
        transform: rotate(180deg);
      }
    }
  }
  .mobileArea-select-popper {
    margin-top: 0 !important;
    box-sizing: border-box;
    width: 320px;
    border-radius: 4px;
    background: #FCF9F7;
    box-shadow: 8px 8px 12px rgba(97, 29, 0, 0.06), inset -1px -1px 0px #FFFFFF, inset 1px 1px 0px #FFFFFF;
    border: none;
    padding: 14px 7px;
    text-align: center;
    .mobileArea-select-search {
      margin: 0 7px 12px;
      padding: 0 15px;
      width: calc(100% - 44px);
      height: 35px;
      background: rgba(255, 255, 255, 0.8);
      border: 0.5px solid #A58A70;
      border-radius: 4px;
    }
    .mobileArea-select-list {
      padding: 0 7px;
      height: 185px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 3px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #E0E0E0;
        border-radius: 5px;
      }
      li {
        padding: 10px 7px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #815B39;
        cursor: pointer;
        &:last-child {
          margin-bottom: 0;
        }
        &.active {
          background: #C9B9AA;
        }
      }
    }
  }
</style>
