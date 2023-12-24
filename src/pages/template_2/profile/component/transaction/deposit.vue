<template>
  <div class="table-wrapper">
    <el-table
      v-show="tableData.length !== 0"
      class="betting-table"
      :data="tableData"
      max-height="500"
      @expand-change="expandChange"
      :row-class-name="expandFun"
      style="width: 100%">
      <el-table-column header-align="center" :label="$t_c('时间')" width="180">
        <template #default="scope">
          <span>
            {{ formateTime(scope.row.createTime) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="depositTypeName" :label="$t_c('充值类型')">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="depositAmount" :label="$t_c('充值金额')">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="status" type="expand">
        <template #default="props">
          <div class="expend-container">
            <div class="expend-container_row">
              <div>
                <span class="label">{{ $t_c('订单号') }}:</span>
                <span>{{ props.row.orderNo }}</span>
              </div>
              <div>
                <span class="label">{{ $t_c('类型') }}:</span>
                <span>{{ $t_c('充值') }}</span>
              </div>
            </div>
            <div class="expend-container_row">
              <div>
                <span class="label">{{ $t_c('充值金额') }}:</span>
                <span>{{ props.row.depositAmount }}</span>
              </div>
              <div>
                <span class="label">{{ $t_c('状态') }}:</span>
                <span :style="{ color: statusColor(props.row.status) }">{{ reward(props.row.status) }}</span>
              </div>
              <div
                class="upload_pic"
                v-if="props.row.status === 2 && props.row.receivedType !== 1"
                @click="openUploadDialog(props.row.id)">
                <span>{{ $t_c('上传凭证') }}</span>
              </div>
              <div class="upload_pic" v-if="props.row.receivedType === 1 && props.row.status !== 1" @click="openUploadInfoDialog(props.row)">
                <span>{{ $t_c('未到账信息') }}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <self-dialog
      v-model:isShow="visible"
      :dialogTitle="$t_c('未到账上传')"
      :confirmTxt="$t_c('完成')"
      :showCancel="false"
      @confirmCallback="uploadFileClick">
      <el-form
        :model="uploadForm"
        label-position="left"
        :rules="pwdFormRules"
        class="upload-dialog-form"
        ref="uploadFormRef"
        size="small">
        <el-form-item prop="accountName">
          <el-input :disabled="true" v-model="uploadForm.accountName">
            <template #prepend>{{ $t_c('会员账号：') }}</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="depositUserAcc">
          <el-input v-model="uploadForm.depositUserAcc" :placeholder="$t_c('请输入存款姓名')">
            <template #prepend>{{ $t_c('入款姓名：') }}</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="pictureList">
          <span class="label">{{ $t_c('账单截图') }}</span>
          <el-upload
            :on-remove="clearImgData"
            ref="uploadRef"
            class="upload-demo"
            drag
            :limit="1"
            action=""
            :show-file-list="true"
            :auto-upload="false"
            :on-change="changeHandle"
            list-type="picture"
            accept=".jpg,.png,.jpeg">
            <div class="upload-container" v-if="!imgData.uid">
              <img class="upload-icon" :src="useImgPath('profile/feedback_upload.png')" alt="" />
              <div class="el-upload__text">
                {{ $t_c('请将文件拖到此处，或') }}<em>{{ $t_c('点击上传') }}</em>
              </div>
              <div>{{ $t_c('（文件格式为PNG或JPG，且大小不超过15MB，目前支持上传一张）') }}</div>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    </self-dialog>

    <self-dialog
      v-model:isShow="visibleUploadInfoDialog"
      :dialogTitle="$t_c('未到账详情')"
      :showCancel="false"
      @confirmCallback="visibleUploadInfoDialog = false">
      <div class="record_item">
        <span class="label">{{ $t_c('上传时间') }}</span>
        <span class="value">{{ currentRecord.cerCreatetime }}</span>
      </div>
      <div class="record_item">
        <span class="label">{{ $t_c('会员账号') }}</span>
        <span class="value">{{ currentRecord.createUser }}</span>
      </div>
      <div class="record_item">
        <span class="label">{{ $t_c('会员账号') }}</span>
        <span class="value">{{ currentRecord.createUser }}</span>
      </div>
      <div class="record_item">
        <span class="label">{{ $t_c('入款姓名') }}</span>
        <span class="value">{{ currentRecord.depositUserAcc }}</span>
      </div>
      <div class="record_item">
        <span class="label">{{ $t_c('存款金额') }}</span>
        <span class="value">{{ currentRecord.depositAmount }}</span>
      </div>
      <div class="record_item">
        <span class="label">{{ $t_c('状态') }}</span>
        <span class="value">{{ reward(currentRecord.status) }}</span>
      </div>
      <div class="record_item">
        <span class="label">{{ $t_c('截图') }}</span>
        <img :src="currentRecord.depositPictures" alt="" />
      </div>
    </self-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useImgPath, useSite } from '@/hook/usePath';
import { lang } from '@/i18n';
import { ref } from 'vue';
import SelfDialog from 'commonComponent/Dialog/Dialog.vue';
import type { imgDataType } from '../../feedback.vue';
import { handleBeforeUpload } from '@/hook/useAuth';
import useDialog from '@/hook/useDialog';
import type { FormInstance } from 'element-plus';

defineProps<{
  tableData: DepositType.requestApiListDataList[];
}>();

const expandArr = ref<number[]>([]);
const visible = ref<boolean>(false);
const visibleUploadInfoDialog = ref<boolean>(false);
const userState = useUserState();
const imgData = reactive({}) as imgDataType;
const { messageTip } = useDialog();
const uploadFormRef = ref<FormInstance>();
const recordId = ref<number>();
const currentRecord = reactive<DepositType.requestApiListDataList>({} as DepositType.requestApiListDataList);
const emits = defineEmits(['reloadTable']);

interface IUploadForm {
  accountName: string | undefined;
  depositUserAcc: string;
  pictureList: string[];
}

const openUploadDialog = (id: number) => {
  recordId.value = id;
  visible.value = true;
};

const openUploadInfoDialog = (data: DepositType.requestApiListDataList) => {
  Object.assign(currentRecord, data);
  visibleUploadInfoDialog.value = true;
};

const uploadForm = reactive<IUploadForm>({
  accountName: userState.userInfo.loginName,
  depositUserAcc: '',
  pictureList: [],
});

const changeHandle = (file: imgDataType) => {
  const textContent = handleBeforeUpload(file);
  if (!textContent) return messageTip({ message: textContent });
  Object.assign(imgData, file);
  let formData = new FormData();
  formData.append('uploadFile', imgData.raw);
  api.contactUs.uploadPic(formData).then(res => {
    if (res.code) return;
    uploadForm.pictureList.push(res.path);
    uploadFormRef.value?.clearValidate('pictureList');
  });
};

const pwdFormRules = {
  depositUserAcc: [{ required: true, message: lang('入款姓名不符合要求'), trigger: 'blur' }],
  pictureList: [{ required: true, type: 'array', min: 1, message: lang('账单截图不能为空'), trigger: 'change' }],
};

const expandFun = (rowData: { row: DepositType.requestApiListDataList; rowIndex: number }) =>
  expandArr.value.includes(rowData.row.id) ? `expanded_row ${useSite()}` : '';

const clearImgData = () => {
  Object.keys(imgData).map(key => delete imgData[key as keyof typeof imgData]);
  uploadForm.pictureList = [];
};

const expandChange = (_row: DepositType.requestApiListDataList, expandList: DepositType.requestApiListDataList[]) =>
  (expandArr.value = expandList.map(_ => _.id));

// 奖补状态 <!-- status :0 拒绝 1 通过 2待处理 -->
const reward = (val: number) => {
  if (val === 0) {
    return lang('拒绝');
  } else if (val === 1) {
    return lang('通过');
  } else {
    return lang('待处理');
  }
};

const uploadFileClick = () => {
  uploadFormRef.value?.validate(async valid => {
    if (!valid) return;

    const params = {
      depositUserAcc: uploadForm.depositUserAcc,
      pictureList: uploadForm.pictureList,
      orderId: recordId.value as number,
    };
    const res = await api.contactUs.depositNotreceived(params);
    if (res.code) return;
    visible.value = false;
    messageTip({ message: lang('上传成功') });
    emits('reloadTable');
  });
};

const formateTime = (val: string) => {
  if (val && val.indexOf('.') !== -1) {
    return val.split('.')[0];
  } else {
    return val;
  }
};

const statusColor = (status: number) => {
  if (status === 0) {
    return '#FF3A3A';
  } else if (status === 1) {
    return '#00AB5D';
  } else {
    return '#F9CB91';
  }
};
</script>

<style lang="scss">
.betting-table {
  :deep(.el-table__header-wrapper) {
    border-radius: 10px;
  }
  .has-gutter {
    background: linear-gradient(90deg, #d9b47d 0%, #fbe7c4 53.02%, #d9b47d 100%) !important;
  }
  .has-gutter tr th {
    color: #393a42 !important;
    font-size: 16px;
    text-align: center;
    // background: $bg-32;
    font-weight: 600;
  }
  .el-table__body-wrapper tr td {
    text-align: center;
    border-bottom: 0;
    background-color: transparent;
  }
}

.table-wrapper {
  border-radius: 10px;
  padding: 20px 0;
  box-sizing: border-box;
}

.upload_pic {
  span {
    background-color: var(--bt_1);
    padding: 0 10px;
    height: 30px;
    border-radius: 5px;
    @include flex(center);
    font-size: 13px;
    color: var(--bt_2);
    cursor: pointer;
  }
}
.notice-dialog-cont {
  color: var(--u_c_5);
  font-weight: 500;
  font-size: 16px;
}

.upload-dialog-form {
  .el-input-group--prepend {
    height: 40px;
    .el-input-group__prepend {
      height: 40px;
      box-shadow: none;
    }
  }
}

.upload-demo {
  flex-grow: 1;
  margin-bottom: 16px;
  .el-upload-list {
    padding: 0;
    list-style: none;
    position: absolute;
    top: -10px;
    margin: 0;
    width: 87%;
  }
  .upload-container {
    .upload-icon {
      width: 50px;
    }
  }
}

.label {
  flex-shrink: 0;
  margin-right: 10px;
}

.record_item {
  @include flex(flex-strat);
  margin-top: 20px;
  .label {
    min-width: 100px;
    text-align: right;
    margin-right: 20px;
  }
  img {
    width: 150px;
  }
}
</style>
