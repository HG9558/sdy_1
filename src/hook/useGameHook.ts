import { api } from '@/api';
// import { useGlobalState, useUserState } from '@/stores';
import { useRouter } from 'vue-router';
import useDialog from "./useDialog";
import useProxy from "@/hook/useCurrentInstance"
import { lang, _lang } from '@/i18n';

type checkErrorType = (code: number, msg: string, tryPlayFlag?: boolean, errMsg?: string) => Promise<void>;

export default () => {
  const { messageTip } = useDialog();
  const userState = useUserState();
  const globalState = useGlobalState();
  const normalState = useNormalState()
  const router = useRouter();
  const proxy = useProxy();

  const _enterGame = async (data: API.normalGameType) => {
    const { availableWh, id, depotName, isTry, titleTag } = data;
    switch (true) {
      case availableWh === 2:
        return messageTip({ message: lang('该场馆正在维护，请先娱乐其他场馆游戏') });
      case !userState.token && isTry !== 1:
        return router.push('/login');
    }
    if (data.isMicroGame) return router.push(`/micro_page/${data.depotCode}`)

    if (data.depotCode === 'WGB') return router.push(`/specialGamePage/cockfighting`) // WGB斗鸡专属页面

    const newWindow = window.open(`https://download.injiepor.com/jumploading/template_2/index.html`) as Window;

    try {
      const res = await (userState.token ? api.game.getTransitList({ gameId: id }) : api.game.getTryAddress({ gameId: id }))
      await checkError(res.code, res.msg, res.tryPlayFlag, res.errMsg);
      newWindow.location.href = res.msg;
      _getRecover(depotName || titleTag, isTry, res.msg);
    } catch (err) {
      newWindow.close()
    }
  }

  //- 回收游戏钱包
  const _getRecover = (content: string, isTry: number, msg: string) => {
    if (msg.indexOf('http') !== -1 && isTry !== 1) {
      proxy.$_dialog.show({
        isShow: true,
        content: _lang('transferTips', { msg: content }),
        dialogTitle: lang('转账提示'),
        confirmTxt: lang('一键转回'),
        showCancel: false,
        async clickCallback(): Promise<any> {
          const res = await api.game.getRecover()
          if (res.code) return
          globalState.set_recover_dialog(false)
          userState._getCenterMoney()
        },
        isBtnLoading: true
      })
    }
  };

  //- 进入游戏后检测
  const checkError: checkErrorType = (code, msg, tryPlayFlag, errMsg) => {
    return new Promise<void>((resolve, reject) => {
      switch (true) {
        case code !== 0:
          reject();
          break;
        case !userState.token && !tryPlayFlag:
          messageTip({ message: errMsg as string });
          reject();
          break;
        case msg.indexOf('http') === -1:
          messageTip({ message: lang('该平台暂未开放，请尝试其他游戏，请先娱乐其他平台游戏') });
          reject();
          break;
        default:
          resolve();
      }
    })
  }
  return { _enterGame, _getRecover };
}
