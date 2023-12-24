import { api } from "@/api";
// import { useUserState } from "@/stores";


export default () => {
  const userState = useUserState();
  //- 获取用户基本信息
  const _getNickNameInfo = async () => {
    const res = await api.user.getNickNameInfo();
    userState.set_nickname_info(res.data);
  };
  //- 获取用户基本信息2
  const _getUserInfo = async () => {
    const res = await api.user.getUserInfo();
    userState.set_user_info(res.userInfo);
  }

  return {
    _getNickNameInfo,
    _getUserInfo
  };
}