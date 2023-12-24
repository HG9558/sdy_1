<template>
  <el-pagination
    small
    background
    layout="->,total, prev, pager, next"
    :total="pagination.total"
    v-model:current-page="pagination.currentPage"
    :page-size="pagination.pageSize"
    :page-sizes="sizeOptions"
    :page-count="Math.ceil(pagination.total / pagination.pageSize)"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :class="['mt-4', site, className]" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSite } from '@/hook/usePath';

const site = useSite();
const emit = defineEmits(['change']);
const sizeOptions = ref([10]);

const props = withDefaults(
  defineProps<{
    pagination: {
      currentPage: number;
      pageSize: number;
      total: number;
    };
    className?: string;
  }>(),
  {
    pagination: () => ({
      currentPage: 1,
      pageSize: 10,
      total: 0,
      className: '',
    }),
  }
);

// pageSize 改变时会触发
const handleSizeChange = (val: number) => {
  emit('change', {
    current: props.pagination.currentPage,
    size: val,
  });
};
// currentPage 改变时会触发
const handleCurrentChange = (val: number) => {
  emit('change', {
    current: val,
    size: props.pagination.pageSize,
  });
};
</script>
<style lang="scss" scoped>
.el-pagination {
  &:deep(.el-pagination__rightwrapper) {
    .el-pagination__total {
      color: var(--u_msg_9);
      font-size: 12px;
    }
    .el-pager {
      .number {
        background: var(--u_msg_8);
        border-radius: 4px;
        color: var(--u_msg_9);
        font-weight: 500;
        width: 35px;
        height: 30px;
        font-size: 14px;

        &.is-active {
          background: var(--u_msg_7);
          color: var(--u_msg_10);
        }
      }
    }
    .btn-next,
    .btn-prev {
      background: var(--u_msg_8);
      width: 35px;
      height: 30px;

      .el-icon {
        font-size: 14px;
        border-radius: 4px;
        color: var(--u_msg_9);
        font-weight: 600;
      }
    }
  }
  &.game_page {
    &:deep(.el-pagination__rightwrapper) {
      .el-pager {
        .number {
          width: 40px;
          height: 24px;
        }
      }
      .btn-next,
      .btn-prev {
        width: 40px;
        height: 24px;
        border-radius: 0 15px 15px 0;
      }
      .btn-prev {
        border-radius: 15px 0 0 15px;
      }
    }
  }
}
//- 2号模板差异
.el-pagination {
  &.template_2_002 {
    &:deep(.el-pager) {
      .more {
        width: 53px;
        height: 30px;
        background: #3d5477;
        color: #878ea6;
      }
    }
  }
}
</style>
