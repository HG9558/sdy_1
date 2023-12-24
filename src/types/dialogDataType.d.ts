declare namespace DialogData {
  type params = {
    isShow: boolean;
    closeOnClickModal?: boolean;
    closeOnPressEscape?: boolean;
    alignCenter?: boolean;
    width?: number;
    dialogTitle?: string;
    showCancel?: boolean;
    showConfirm?: boolean;
    cancelTxt?: string;
    confirmTxt?: string;
    content: string;
    customClass?: string;
    isBtnLoading?: boolean;
    appendToBody?: boolean;
    clickCallback?: <T>(val?: T) => void | Promise<T>;
    cancelCallback?: () => void;
  }
  type TipParams = {
    iconType?: string;
    mainContent?: string;
    SubContent?: string;
  }
}