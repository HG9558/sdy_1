import zhJson from './json/zh.json'
import enJson from './json/en.json'
import viJson from './json/vi.json'
import msJson from './json/ms.json'
import twJson from './json/zh_tw.json'
import termsMessagesFn from './termsMessages'


type languageItemType = {
  languageList: { [key: string]: string }[];
  languageType: string;
  [key: string]: any;
}

const currentLanguageType = !sessionStorage.getItem('GLOBALSTATE') ? import.meta.env.VITE_LANGUAGE : JSON.parse(sessionStorage.getItem('GLOBALSTATE') as string).language
const languageList: languageItemType = (sessionStorage.VITE_LANGUAGE_LIST ? JSON.parse(sessionStorage.VITE_LANGUAGE_LIST) : JSON.parse(import.meta.env.VITE_LANGUAGE_LIST)).find((item: languageItemType) => item.languageType === currentLanguageType).languageList;
const currentSite = sessionStorage.VITE_CURRENT_SITE ?? import.meta.env.VITE_CURRENT_SITE;
const appText = languageList[currentSite];
const appTitle = languageList[currentSite];

const termsMessages = termsMessagesFn(appTitle)

const zh = {
  ...zhJson,
  countTime: '{msg}秒后重新发送',
  transferTips: '您的余额已转入{msg}，是否结束游戏并一键转回至中心钱包？',
  loginName: '请输入6~{0}位数字或字母组合的密码', // 登录密码
  password: '请输入6~{0}位数字或字母组合的密码', // 登录密码
  alipayAccount: '请输入{0}~{1}位字母或数字组合的支付宝账号', // 支付宝账号
  unReadCount: '{count}条未读', // 未读消息
  accountLevel: '尊敬的 {level} 级VIP会员',
  multipleWater: '{multiple}倍流水即可提现',
  withdrawWater: '提现所需有效投注总流水为{depositValidBet}元，已完成{depositResidueValidBet}元。请继续加油!',
  canBeWithdrawn: '可提现金额：{count}元，不包括游戏平台未转出余额',
  lotteryGameInner: `超过百种彩票玩法任您赢！${appTitle} 为全球各彩票玩家提供了丰富多样的游戏内容，致力为玩家打造高品质的娱乐环境，安心乐享游戏空间，只为公平、公正的开奖结果。`,
  hotGameSubText: `您想要的${appText}都有，带给您丰富的游戏体验`,
  serviceSubText: `${appText}全心全意为您提供最优质的服务`,
  ...termsMessages.zh,
}

const zh_tw = {
  ...twJson,
  countTime: '{msg}秒後重新發送',
  transferTips: '您的餘額已轉入{msg}，是否結束遊戲並一鍵轉回至中心錢包？ ',
  loginName: '請輸入6~{0}位數字或字母組合的密碼', // 登錄密碼
  password: '請輸入6~{0}位數字或字母組合的密碼', // 登錄密碼
  alipayAccount: '請輸入{0}~{1}位字母或數字組合的支付寶賬號', // 支付寶賬號
  unReadCount: '{count}條未讀', // 未讀消息
  accountLevel: '尊敬的 {level} 級VIP會員',
  multipleWater: '{multiple}倍流水即可提現',
  withdrawWater: '提現所需有效投注總流水為{depositValidBet}元，已完成{depositResidueValidBet}元。請繼續加油!',
  canBeWithdrawn: '可提現金額：{count}元，不包括遊戲平台未轉出餘額',
  lotteryGameInner: `超過百種彩票玩法任您贏！ ${appTitle} 為全球各彩票玩家提供了豐富多樣的遊戲內容，致力為玩家打造高品質的娛樂環境，安心樂享遊戲空間，只為公平、公正的開獎結果。 `,
  hotGameSubText: `您想要的${appText}都有，帶給您豐富的遊戲體驗`,
  serviceSubText: `${appText}全心全意為您提供最優質的服務`,
  ...termsMessages.zh_tw,
}

const en = {
  ...enJson,
  // ...enLocale,
  countTime: 'Resend after {msg} seconds',
  transferTips: 'Your balance has been transferred to {msg}, do you want to end the game and transfer it back to the central wallet with one click?',
  loginName: 'Please enter a password with 6~{0} digits or a combination of letters', // 登录密码
  password: 'Please enter a password with 6~{0} digits or a combination of letters', // 登录密码
  alipayAccount: 'Please enter an Alipay account with a combination of {0}~{1} letters or numbers', // 支付宝账号
  unReadCount: '{count} unread', // 未读消息
  accountLevel: 'Dear Level {level} VIP Member',
  multipleWater: '{multiple} times the turnover can be withdrawn',
  lotteryGameInner: `Over a hundred lottery games to win! ${appTitle} provides a rich and diverse game content for all lottery players around the world, and is committed to creating a high-quality entertainment environment for players to enjoy the game space with peace of mind, only for fair and just lottery results.`,
  hotGameSubText: `${appText} bringing you a rich gaming experience`,
  serviceSubText: `${appText} served you the best quality`,
  ...termsMessages.en,
}

const vi = {
  ...viJson,
  countTime: 'Gửi lại mã sau {msg}s',
  transferTips: 'Số dư của bạn đã chuyển vào {msg}. Có muốn kết thúc trò chơi và chuyển về ví trung tâm với một phiếm nhấp không?',
  loginName: '6 ~ {0} chữ cái hoặc số', // 登录密码
  password: '6 ~ {0} chữ cái hoặc số', // 登录密码
  alipayAccount: 'Vui lòng nhập tài khoản Alipay với sự kết hợp của {0} ~ {1} chữ cái hoặc chữ số', // 支付宝账号
  unReadCount: '{count}条未读', // 未读消息
  accountLevel: '尊敬的 {level} 级VIP会员',
  multipleWater: '{multiple}倍流水即可提现',
  withdrawWater: '提现所需有效投注总流水为{depositValidBet}元，已完成{depositResidueValidBet}元。请继续加油!',
  canBeWithdrawn: '可提现金额：{count}元，不包括游戏平台未转出余额',

  lotteryGameInner: `Over a hundred lottery games to win! ${appTitle} provides a rich and diverse game content for all lottery players around the world, and is committed to creating a high-quality entertainment environment for players to enjoy the game space with peace of mind, only for fair and just lottery results.`,
  hotGameSubText: `Mọi thứ Quý Khách muốn đều có tại ${appText}, mang đến cho Quý Khách trải nghiệm giải trí phong phú`,
  serviceSubText: `${appText} cung cấp cho Quý Khách chất lượng dịch vụ tốt nhất`,
  ...termsMessages.vi,
}

const ms = {
  ...msJson,
  countTime: '{msg} Hantar semula selepas saat',
  transferTips: 'Baki anda telah dipindahkan ke {msg}, adakah anda ingin menamatkan permainan dan memindahkan kembali ke dompet pusat dengan satu klik?',
  loginName: 'Sila masukkan kata laluan dengan digit 6~{0} atau gabungan huruf', // 登录密码
  password: 'Sila masukkan kata laluan dengan digit 6~{0} atau gabungan huruf', // 登录密码
  alipayAccount: 'Sila masukkan nombor akaun Alipay bagi huruf atau nombor {0}~{1}', // 支付宝账号
  unReadCount: '{count} belum dibaca', // 未读消息
  accountLevel: 'Ahli VIP Tahap {level} yang dihormati',
  multipleWater: 'Pengeluaran boleh dilakukan dengan turnover {multiple} kali',
  lotteryGameInner: `"Lebih daripada 100 jenis permainan loteri untuk anda menangi! ${appTitle} menyediakan pelbagai kandungan permainan untuk pemain loteri di seluruh dunia, dan komited untuk mewujudkan persekitaran hiburan berkualiti tinggi untuk pemain menikmati ruang permainan dengan ketenangan fikiran, hanya untuk keputusan loteri yang adil dan saksama."`,
  hotGameSubText: `${appText} mempunyai semua yang anda inginkan, memberikan anda pengalaman permainan yang kaya`,
  serviceSubText: `${appText} sepenuh hati memberikan anda perkhidmatan terbaik`,
  ...termsMessages.ms,
}


export default {
  zh,
  en,
  vi,
  ms,
  zh_tw
}
