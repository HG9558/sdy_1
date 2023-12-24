import { ElMessage, } from 'element-plus'
import type { EpPropMergeType } from 'element-plus/es/utils';

type messageType = {
  message: string
  duration?: number;
  type?: EpPropMergeType<StringConstructor, "info" | "success" | "warning" | "error", unknown> | undefined;
  onClose?: Function;
}

export default () => {
  const messageTip = ({ message, duration = 1500, type = 'info', onClose }: messageType) => {
    ElMessage({
      customClass: import.meta.env.VITE_THEME,
      dangerouslyUseHTMLString: true,
      message,
      duration,
      type,
      onClose() {
        onClose && onClose()
      }
    })
  }
  return { messageTip };
}