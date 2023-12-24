declare namespace concatUsType {
  type messageSendRes = {
    code: number;
    data: string;
    msg: string;
  }
  type messageSendRes1 = {
    path: string;
  } & Pick<messageSendRes, 'code' | 'msg'>

  type messageSendRes2 = {
    path: string;
  } & Pick<messageSendRes, 'code'>


  type depositNotreceivedParams = {
    orderId: number;
    depositUserAcc: string;
    pictureList: string[];
  }
}
