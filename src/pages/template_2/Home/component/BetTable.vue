<template>
  <div :class="['bet-table-container', site]">
    <CommonTitle
      :title-txt="$t_c('实时投注')"
      :subTxt="$t_c('众多体育赛事，带给您丰富的游戏体验')"
      img-src="bet_title" />
    <table class="bet_table_main">
      <thead>
        <tr>
          <th v-for="(_, index) in thList" :key="index">{{ _ }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(_, index) in tableList" :key="index">
          <td>
            <div>{{ _.gameName }}</div>
          </td>
          <td>
            <div>{{ _.username }}</div>
          </td>
          <td>
            <div>{{ _.betAmount }}</div>
          </td>
          <td>
            <div>{{ _.odds }}</div>
          </td>
          <td>
            <div>{{ _.winAmount }}</div>
          </td>
          <!-- <td>
            <div>{{ _.time }}</div>
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { api } from '@/api';
import { useSite } from '@/hook/usePath';
import { lang } from '@/i18n';
import { onMounted, reactive } from 'vue';
import CommonTitle from './CommonTitle.vue';

const site = useSite();
// const thList = [lang('游戏名'), lang('用户名'), lang('投注额'), lang('赔率'), lang('盈利'), lang('时间')];
const thList = [lang('游戏名'), lang('用户名'), lang('投注额'), lang('赔率'), lang('盈利')];
const tableList = reactive<HOMEAPI.getWinUserListPage[]>([]);

onMounted(async () => {
  const res = await api.home.getWinUserList();
  tableList.push(...res.page);
});
</script>

<style lang="scss" scoped>
.bet-table-container {
  margin-bottom: 50px;

  .bet_table_main {
    width: 100%;
    margin-top: 50px;
    text-align: center;
    border-spacing: 5px 10px;
    thead {
      height: 40px;
      background: var(--home_38);
      border-radius: 6px;

      th {
        text-align: center;
        color: var(--home_39);
        font-weight: 500;
        font-size: 16px;
      }
    }

    tbody {
      tr {
        &:nth-child(odd) {
          div {
            background-color: var(--home_39);
          }
        }

        &:nth-child(even) {
          div {
            background-color: var(--home_40);
          }
        }

        td {
          padding: 4px 0px;
          height: 56px;

          &:first-child,
          &:last-child {
            div {
              border-radius: 6px 0px 0px 6px;
            }
          }
          &:last-child {
            div {
              border-radius: 0px 6px 6px 0px;
            }
          }

          div {
            height: 100%;
            @include flex(center);
          }
        }
      }
    }
  }
}

//002
.bet-table-container.template_2_002 {
  tr:nth-child(odd) div {
    background-color: #273546 !important;
    color: #fff;
  }
  tr:nth-child(even) div {
    background-color: #1d2936 !important;
    color: #fff;
  }
}
//002
.bet-table-container.template_2_003 {
  .bet_table_main {
    border-radius: 6px 6px 0 0;
    overflow: hidden;
  }
  tbody td {
    color: #333;
  }
  thead {
    position: relative;
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 19px;
      top: 0;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0) 15.45%, #c5cdfd 100%);
      left: 0;
      opacity: 0.15;
    }
  }
}
</style>
