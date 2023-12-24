<template>
  <el-popover
    placement="bottom-start"
    class="mobileArea-select"
    :popper-class="['mobileArea-select-popper', site]"
    trigger="click"
    :visible-arrow="false"
    transition="el-zoom-in-top"
    :visible="visible">
    <template #reference>
      <div class="select_list" @click="visible = !visible">
        <span>{{ `+${value}` }}</span>
        <el-icon>
          <ArrowDown v-if="!visible" />
          <ArrowUp v-else />
        </el-icon>
      </div>
    </template>
    <input v-model="searchVal" class="mobileArea-select-search" type="text" :placeholder="$t_c('搜索')" />
    <ul v-if="filterList.length" class="mobileArea-select-list">
      <li
        @click="handleSelect(item)"
        v-for="item in filterList"
        :key="item.id"
        :class="{ active: value === item.mobileAreaCode }">
        <span>{{ item.countryName }}</span>
        <span>(+{{ item.mobileAreaCode }})</span>
      </li>
    </ul>
    <p v-else>{{ $t_c('无匹配数据') }}</p>
  </el-popover>
</template>

<script setup lang="ts">
import useRuleHook from '@/hook/userRuleHook';
import { useSite } from '@/hook/usePath';
// import { useNormalState, useGlobalState } from '@/stores';

const site = useSite();
const normalState = useNormalState();
const { mobileAreasCfg } = useRuleHook();
const visible = ref(false);
const searchVal = ref('');
const value = ref(normalState.mobileAreaCode);
const emits = defineEmits(['input', 'select']);
const globalState = useGlobalState();

const props = defineProps<{
  closeSelect?: boolean;
}>();

watch(
  () => props.closeSelect,
  v => {
    if (v) visible.value = false;
  }
);

watch(
  () => mobileAreasCfg,
  val => {
    if (val && val.length) {
      const { mobileAreaCode } = normalState;
      value.value = mobileAreaCode;
      globalState.set_mobileAreaCode(mobileAreaCode);
    }
  },
  { deep: true, immediate: true }
);

const filterList = computed(() => {
  if (!searchVal.value) return normalState.mobileAreaCodes;
  return mobileAreasCfg.filter(v => {
    return v.countryName.includes(searchVal.value) || v.mobileAreaCode.includes(searchVal.value);
  });
});

const handleSelect = (v: any) => {
  value.value = v.mobileAreaCode;
  globalState.set_mobileAreaCode(v.mobileAreaCode);
  visible.value = false;
  emits('select', v.mobileAreaCode);
};
</script>

<style lang="scss">
.mobile-select {
  .el-form-item__content {
    position: relative;

    .el-tooltip__trigger {
      position: absolute;
      left: 61px;
      z-index: 1000;
      bottom: 0px;
      height: 50px;
      line-height: 50px;
      background: var(--l_32);
      color: #fff;
      width: 80px;
      text-align: center;
      opacity: 0.8;
      top: 0px;
      cursor: pointer;
      i {
        margin-left: 5px;
        transition: transform 0.3s;
        transform: rotate(0);
        transform: translateY(2px);
      }
    }
  }

  &.forgetpsw-mobile-input {
    .el-form-item__content {
      .el-tooltip__trigger {
        left: 0px !important;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
    }
  }
}

.mobileArea-select-popper {
  margin-top: 0 !important;
  box-sizing: border-box;
  width: 320px !important;
  border-radius: 4px;
  background: red;
  box-shadow: 8px 8px 12px rgba(97, 29, 0, 0.06), inset -1px -1px 0px #ffffff, inset 1px 1px 0px #ffffff;
  border: none;
  padding: 14px 7px;
  text-align: center;

  .mobileArea-select-search {
    margin: 0 7px 12px;
    padding: 0 15px;
    width: calc(100% - 10px);
    height: 35px;
    background: rgba(255, 255, 255, 0.8);
    border: 0.5px solid #adb2c8;
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
      background-color: #e0e0e0;
      border-radius: 5px;
    }

    li {
      padding: 10px 7px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #404469;
      cursor: pointer;

      &:last-child {
        margin-bottom: 0;
      }

      &.active {
        color: #fff;
        background: var(--l_33);
      }
    }
  }
}

//002
.mobileArea-select-popper {
  &.template_2_002 {
    background: linear-gradient(180deg, #202837 0%, #441844 100%);
    border: 1px solid #ff00f3;
    .el-tooltip__trigger {
      background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%) !important;
    }
    .el-popper__arrow {
      display: none !important;
    }
    .mobileArea-select-list {
      li {
        color: #fff !important;
      }
      &::-webkit-scrollbar {
        width: 3px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #23a8ff;
        border-radius: 5px;
      }
    }
  }
}

.mobile-select {
  &.template_2_002 {
    .el-tooltip__trigger {
      background: transparent !important;
    }
  }
}
</style>
