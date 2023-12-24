import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import viLocale from 'element-ui/lib/locale/lang/vi'
import msLocale from 'element-ui/lib/locale/lang/ms'
import zhJson from './json/zh.json'
import enJson from './json/en.json'
import viJson from './json/vi.json'
import msJson from './json/ms.json'
import { currencyMap, appTitle, appText } from './constants'
import termsMessages from './termsMessages'


const zh = {
  ...zhJson,
  ...zhLocale,
  countTime: '{msg}秒后重新发送',
  transferTips: '您的余额已转入{msg}，是否结束游戏并一键转回至中心钱包？',
  loginName: '请输入6~{0}位数字或字母组合的密码', // 登录密码
  alipayAccount: '请输入{0}~{1}位字母或数字组合的支付宝账号', // 支付宝账号
  unReadCount: '{count}条未读', // 未读消息
  accountLevel: '尊敬的 {level} 级VIP会员',
  multipleWater: '{multiple}倍流水即可提现',
  withdrawWater: `提现所需有效投注总流水为{depositValidBet}${currencyMap.value}，已完成{depositResidueValidBet}${currencyMap.value}。请继续加油!`,
  canBeWithdrawn: `可提现金额：{count}${currencyMap.value}，不包括游戏平台未转出余额`,

  currencyLabel: currencyMap.label,
  currencyValue: currencyMap.value,
  currencySymbol: currencyMap.symbol,
  lotteryGameInner: `超过百种彩票玩法任您赢！${appTitle}为全球各彩票玩家提供了丰富多样的游戏内容，致力为玩家打造高品质的娱乐环境，安心乐享游戏空间，只为公平、公正的开奖结果。`,
  hotGameSubText: `您想要的${appText}都有，带给您丰富的游戏体验`,
  serviceSubText: `${appText}全心全意为您提供最优质的服务`,

  xxx权威认证: `${appText}权威认证`,
  '2020年，xxx正式签约赞助巴黎圣日耳曼足球俱乐部， 成为巴黎圣日耳曼足球俱乐部亚洲区独家合作伙伴。': `2020年，${appText}正式签约赞助巴黎圣日耳曼足球俱乐部， 成为巴黎圣日耳曼足球俱乐部亚洲区独家合作伙伴。`,
  '致力于将自己打造成为具备专业服务的国际顶尖综合型体育投注平台，正如这个从硝烟中不断过关斩将的蓝黑军团，xxx势必破茧成竹，成为全球范围内引领顾客体验新风潮的坚石。': `致力于将自己打造成为具备专业服务的国际顶尖综合型体育投注平台，正如这个从硝烟中不断过关斩将的蓝黑军团，${appText}势必破茧成竹，成为全球范围内引领顾客体验新风潮的坚石。`,

  x元礼金x倍流水: `${currencyMap.symbol}{count}礼金({multiple}倍流水)`,
  'xxxx主打的24小时运营的直播在线视频类游戏，让玩家拥有身临其境的感觉，独创的网络金臂百家乐，更是取代了真人荷官发牌，让玩家耳目一新。除了百家乐，xxxx还提供真钱德州扑克，温州牌九，轮盘，番摊和骰宝等多款热门游戏，保证玩家获取的投注信息公平公正公开实时，让玩家可以随时随地享受游戏的快感。': `{name}主打的24小时运营的直播在线视频类游戏，让玩家拥有身临其境的感觉，独创的网络金臂百家乐，更是取代了真人荷官发牌，让玩家耳目一新。除了百家乐，{name}还提供真钱德州扑克，温州牌九，轮盘，番摊和骰宝等多款热门游戏，保证玩家获取的投注信息公平公正公开实时，让玩家可以随时随地享受游戏的快感。`,
  剩余x次抽奖机会: `剩余{remainingTimes}次抽奖机会`,
  '恭喜您获得：xxx, 请联系客服进行领取': `恭喜您获得：{title}, 请联系客服进行领取`,
  'xx真人平台抢攻高端真人视讯市场，以丰厚的市场资源及独家的研发技术作为强力后盾，更远赴美洲，遴选不同国籍具备超模等级的性感佳丽担任荷官，更不惜赤资重金打造千万等级并且高度还原真实赌场的摄影棚，提供玩家身历其境的游戏体验。': `{name}真人平台抢攻高端真人视讯市场，以丰厚的市场资源及独家的研发技术作为强力后盾，更远赴美洲，遴选不同国籍具备超模等级的性感佳丽担任荷官，更不惜赤资重金打造千万等级并且高度还原真实赌场的摄影棚，提供玩家身历其境的游戏体验。`,
  'xx真人视讯为亚洲最具潜力的真人视讯品牌，提供百家乐、极速百家乐、共咪百家乐、多彩百家乐、龙虎、骰宝、轮盘、牛牛、炸金花等多样真人视讯游戏。xx真人视讯采用国际标准的真人游戏摄影棚，全场严密监控，流程公正公开，提供最公平的游戏环境。超低延迟高清视频，即时呈现！': `{name}真人视讯为亚洲最具潜力的真人视讯品牌，提供百家乐、极速百家乐、共咪百家乐、多彩百家乐、龙虎、骰宝、轮盘、牛牛、炸金花等多样真人视讯游戏。{name}真人视讯采用国际标准的真人游戏摄影棚，全场严密监控，流程公正公开，提供最公平的游戏环境。超低延迟高清视频，即时呈现！`,
  'xx自2012年成立以来即致力创造富游戏性与创意兼具的移动娱乐平台，不仅提供专业的技术支持和稳定的顶级设备，并支持多项平台和荣获多项国际许可认证，提供玩家最值得信任的娱乐环境。另外，数百位受过专业培训的荷官和仿真的赌场环境，更可让玩家尽享博彩乐趣。': `{name}自2012年成立以来即致力创造富游戏性与创意兼具的移动娱乐平台，不仅提供专业的技术支持和稳定的顶级设备，并支持多项平台和荣获多项国际许可认证，提供玩家最值得信任的娱乐环境。另外，数百位受过专业培训的荷官和仿真的赌场环境，更可让玩家尽享博彩乐趣。`,
  appTitle,
  appText,

  ...termsMessages.zh,
};

const en = {
  ...enJson,
  ...enLocale,
  countTime: 'Resend after {msg} seconds',
  transferTips:
    'Your balance has been transferred to {msg}, do you want to end the game and transfer it back to the central wallet with one click?',
  loginName: 'Please enter a password with 6~{0} digits or a combination of letters', // 登录密码
  alipayAccount: 'Please enter an Alipay account with a combination of {0}~{1} letters or numbers', // 支付宝账号
  unReadCount: '{count} unread', // 未读消息
  accountLevel: 'Dear Level {level} VIP Member',
  multipleWater: '{multiple} times the turnover can be withdrawn',
  withdrawWater: `The total turnover of valid bets required for withdrawal is {depositValidBet} ${currencyMap.value}, and {depositResidueValidBet} ${currencyMap.value} has been completed. Please keep going!`,
  canBeWithdrawn: `Amount that can be withdrawn: {count} ${currencyMap.value}, excluding the balance that has not been transferred out of the game platform`,

  currencyLabel: currencyMap.label,
  currencyValue: currencyMap.value,
  currencySymbol: currencyMap.symbol,
  lotteryGameInner: `Over a hundred lottery games to win! ${appTitle} provides a rich and diverse game content for all lottery players around the world, and is committed to creating a high-quality entertainment environment for players to enjoy the game space with peace of mind, only for fair and just lottery results.`,
  hotGameSubText: `${appText} bringing you a rich gaming experience`,
  serviceSubText: `${appText} served you the best quality`,

  xxx权威认证: `${appText} Official Certification`,
  '2020年，xxx正式签约赞助巴黎圣日耳曼足球俱乐部， 成为巴黎圣日耳曼足球俱乐部亚洲区独家合作伙伴。': `In 2020, ${appText} officially signed a sponsorship agreement with Paris Saint-Germain Football Club, becoming the exclusive partner of PSG in Asia.`,
  '致力于将自己打造成为具备专业服务的国际顶尖综合型体育投注平台，正如这个从硝烟中不断过关斩将的蓝黑军团，xxx势必破茧成竹，成为全球范围内引领顾客体验新风潮的坚石。': `Committed to becoming a top international comprehensive sports betting platform with professional services, just like this blue-and-black army that constantly fights through difficulties, ${appText} is bound to break through and become a solid rock that leads the new trend of customer experience worldwide.`,

  x元礼金x倍流水: `${currencyMap.symbol}{count} reward({multiple}x Turnover)`,
  'xxxx主打的24小时运营的直播在线视频类游戏，让玩家拥有身临其境的感觉，独创的网络金臂百家乐，更是取代了真人荷官发牌，让玩家耳目一新。除了百家乐，xxxx还提供真钱德州扑克，温州牌九，轮盘，番摊和骰宝等多款热门游戏，保证玩家获取的投注信息公平公正公开实时，让玩家可以随时随地享受游戏的快感。': `{name} 24-hour live online video games give players an immersive experience, and the original online golden arm baccarat, which replaces live dealers, is a breath of fresh air for players. In addition to baccarat, {name} also offers a variety of popular games such as real money Texas Hold'em, Wenzhou Pai Gow, roulette, pachinko and Sic Bo, ensuring that players get fair and open betting information in real time, allowing players to enjoy the thrill of the game anytime, anywhere.`,
  剩余x次抽奖机会: `{remainingTimes} Lucky Draw Chance`,
  '恭喜您获得：xxx, 请联系客服进行领取': `Congratulations on obtaining: {title}. Please contact customer service to collect it`,
  'xx真人平台抢攻高端真人视讯市场，以丰厚的市场资源及独家的研发技术作为强力后盾，更远赴美洲，遴选不同国籍具备超模等级的性感佳丽担任荷官，更不惜赤资重金打造千万等级并且高度还原真实赌场的摄影棚，提供玩家身历其境的游戏体验。': `{name} Live Casino platform aggressively enters the high-end live casino market, with abundant market resources and exclusive research and development technology as a strong support. It has even ventured to  Americas to select sexy beauties with supermodel-level qualifications from different nationalities to serve as live dealers. They spare no expense in building a multimillion-dollar studio that faithfully recreates the atmosphere of a real casino, providing players with an immersive gaming experience.`,
  'xx真人视讯为亚洲最具潜力的真人视讯品牌，提供百家乐、极速百家乐、共咪百家乐、多彩百家乐、龙虎、骰宝、轮盘、牛牛、炸金花等多样真人视讯游戏。xx真人视讯采用国际标准的真人游戏摄影棚，全场严密监控，流程公正公开，提供最公平的游戏环境。超低延迟高清视频，即时呈现！': `{name} Live Casino is the most promising live video gaming brand in Asia, offering a diverse range of live video games such as Baccarat, Speed Baccarat, Common Draw Baccarat, Colorful Baccarat, Dragon Tiger, Sic Bo, Roulette, Bull Bull, and Golden Flower. {name} Live Casino utilizes internationally standardized live gaming studios with rigorous monitoring and transparent processes, providing the fairest gaming environment. With ultra-low latency and high-definition video, the games are presented in real-time!`,
  'xx自2012年成立以来即致力创造富游戏性与创意兼具的移动娱乐平台，不仅提供专业的技术支持和稳定的顶级设备，并支持多项平台和荣获多项国际许可认证，提供玩家最值得信任的娱乐环境。另外，数百位受过专业培训的荷官和仿真的赌场环境，更可让玩家尽享博彩乐趣。': `Since its establishment in 2012, {name} has been committed to creating a mobile entertainment platform that combines rich gameplay and creativity. They not only provide professional technical support and stable top-notch equipment but also support multiple platforms and have obtained several international licenses and certifications, ensuring a trusted gaming environment for players. Additionally, with hundreds of professionally trained live dealers and realistic casino environments, players can fully enjoy the excitement of gambling.`,

  appTitle,
  appText,

  ...termsMessages.en,
};

const vi = {
  ...viJson,
  ...viLocale,
  countTime: 'Gửi lại mã sau {msg}s',
  transferTips:
    'Số dư của bạn đã chuyển vào {msg}. Có muốn kết thúc trò chơi và chuyển về ví trung tâm với một phiếm nhấp không?',
  loginName: '6 ~ {0} chữ cái hoặc số', // 登录密码
  alipayAccount: 'Vui lòng nhập tài khoản Alipay với sự kết hợp của {0} ~ {1} chữ cái hoặc chữ số', // 支付宝账号
  unReadCount: '{count} tin chưa đọc', // 未读消息
  accountLevel: 'Quý Thành Viên VIP {level}',
  multipleWater: 'Hoàn thành {multiple} vòng cược trước khi rút tiền ngay',
  withdrawWater: `Để được rút tiền cần tổng số cược hiệu quả là {depositValidBet} ${currencyMap.value}, đã hoàn thành {depositResidueValidBet} ${currencyMap.value}.  Hãy tiếp tục cố gắng!`,
  canBeWithdrawn: `Số tiền có thể rút: {count}${currencyMap.value}, không bao gồm số dư chưa chuyển ra từ nền tảng trò chơi`,

  currencyLabel: currencyMap.label,
  currencyValue: currencyMap.value,
  currencySymbol: currencyMap.symbol,
  lotteryGameInner: `Over a hundred lottery games to win! ${appTitle} provides a rich and diverse game content for all lottery players around the world, and is committed to creating a high-quality entertainment environment for players to enjoy the game space with peace of mind, only for fair and just lottery results.`,
  hotGameSubText: `Mọi thứ Quý Khách muốn đều có tại ${appText}, mang đến cho Quý Khách trải nghiệm giải trí phong phú`,
  serviceSubText: `${appText} cung cấp cho Quý Khách chất lượng dịch vụ tốt nhất`,

  xxx权威认证: `${appText} Official Certification`,
  '2020年，xxx正式签约赞助巴黎圣日耳曼足球俱乐部， 成为巴黎圣日耳曼足球俱乐部亚洲区独家合作伙伴。': `In 2020, ${appText} officially signed a sponsorship agreement with Paris Saint-Germain Football Club, becoming the exclusive partner of PSG in Asia.`,
  '致力于将自己打造成为具备专业服务的国际顶尖综合型体育投注平台，正如这个从硝烟中不断过关斩将的蓝黑军团，xxx势必破茧成竹，成为全球范围内引领顾客体验新风潮的坚石。': `Committed to becoming a top international comprehensive sports betting platform with professional services, just like this blue-and-black army that constantly fights through difficulties, ${appText} is bound to break through and become a solid rock that leads the new trend of customer experience worldwide.`,

  x元礼金x倍流水: `${currencyMap.symbol}{count} tiền quà tặng({multiple}x nước chảy)`,
  'xxxx主打的24小时运营的直播在线视频类游戏，让玩家拥有身临其境的感觉，独创的网络金臂百家乐，更是取代了真人荷官发牌，让玩家耳目一新。除了百家乐，xxxx还提供真钱德州扑克，温州牌九，轮盘，番摊和骰宝等多款热门游戏，保证玩家获取的投注信息公平公正公开实时，让玩家可以随时随地享受游戏的快感。': `Trò chơi điện tử trực tuyến trực tiếp 24/24 của {name} mang đến cho người chơi cảm giác nhập vai. Bài baccarat trực tuyến cánh tay vàng ban đầu đã thay thế người chia bài thật để chia bài, giúp người chơi sảng khoái. Bên cạnh baccarat, {name} còn cung cấp game Texas holdem,Bài cửu Ôn châu,Roulette,Fantan,Tài Xỉu và nhiều trò chơi phổ biến khác đảm bảo rằng thông tin cá cược mà người chơi thu được là công bằng, chính xác, công khai và theo thời gian thực, để người chơi có thể tận hưởng cảm giác hồi hộp của trò chơi mọi lúc, mọi nơi.`,
  剩余x次抽奖机会: `{remainingTimes} cơ hội còn lại`,
  '恭喜您获得：xxx, 请联系客服进行领取': `Chúc mừng bạn đã nhận được: {title}, vui lòng liên hệ bộ phận chăm sóc khách hàng để nhận`,
  'xx真人平台抢攻高端真人视讯市场，以丰厚的市场资源及独家的研发技术作为强力后盾，更远赴美洲，遴选不同国籍具备超模等级的性感佳丽担任荷官，更不惜赤资重金打造千万等级并且高度还原真实赌场的摄影棚，提供玩家身历其境的游戏体验。': `Nền tảng live-action {name} đang tấn công mạnh mẽ vào thị trường video live-action cao cấp, được hỗ trợ bởi nguồn tài nguyên thị trường dồi dào và công nghệ R&D độc quyền, nó thậm chí đã đi đến Châu Mỹ để tuyển chọn những người đẹp gợi cảm cấp siêu mẫu từ các quốc tịch khác nhau làm đại lý. hàng nghìn cấp độ và các studio sòng bạc thực được khôi phục cao, mang đến cho người chơi trải nghiệm chơi trò chơi nhập vai.`,
  'xx真人视讯为亚洲最具潜力的真人视讯品牌，提供百家乐、极速百家乐、共咪百家乐、多彩百家乐、龙虎、骰宝、轮盘、牛牛、炸金花等多样真人视讯游戏。xx真人视讯采用国际标准的真人游戏摄影棚，全场严密监控，流程公正公开，提供最公平的游戏环境。超低延迟高清视频，即时呈现！': `Video trực tiếp của {name} là thương hiệu video trực tiếp tiềm năng nhất ở châu Á, cung cấp baccarat, baccarat siêu tốc , baccarat Gongmi, baccarat màu sắc, long hổ, sic bo, roulette, Niuniu, v.v. Trò chơi video trực tiếp. Video hành động trực tiếp {name} thông qua các studio trò chơi ngoài đời thực tiêu chuẩn quốc tế, khán giả được giám sát chặt chẽ, quy trình công bằng và cởi mở, đồng thời cung cấp môi trường trò chơi công bằng nhất. Video độ nét cao độ trễ cực thấp, trình chiếu tức thì`,
  'xx自2012年成立以来即致力创造富游戏性与创意兼具的移动娱乐平台，不仅提供专业的技术支持和稳定的顶级设备，并支持多项平台和荣获多项国际许可认证，提供玩家最值得信任的娱乐环境。另外，数百位受过专业培训的荷官和仿真的赌场环境，更可让玩家尽享博彩乐趣。': `Kể từ khi thành lập vào năm 2012, {name} đã cam kết tạo ra một nền tảng giải trí di động với lối chơi phong phú và sáng tạo, không chỉ cung cấp hỗ trợ kỹ thuật chuyên nghiệp và thiết bị ổn định hàng đầu mà còn hỗ trợ nhiều nền tảng và đã giành được nhiều giấy phép quốc tế, cung cấp người chơi có môi trường giải trí đáng tin cậy nhất. Ngoài ra, hàng trăm người chia bài được đào tạo chuyên nghiệp và môi trường sòng bạc mô phỏng cho phép người chơi tận hưởng niềm vui đánh bạc`,
  appTitle,
  appText,

  ...termsMessages.vi,
};

const ms = {
  ...msJson,
  ...msLocale,
  countTime: '{msg} Hantar semula selepas saat',
  transferTips:
    'Baki anda telah dipindahkan ke {msg}, adakah anda ingin menamatkan permainan dan memindahkan kembali ke dompet pusat dengan satu klik?',
  loginName: 'Sila masukkan kata laluan dengan digit 6~{0} atau gabungan huruf', // 登录密码
  alipayAccount: 'Sila masukkan nombor akaun Alipay bagi huruf atau nombor {0}~{1}', // 支付宝账号
  unReadCount: '{count} belum dibaca', // 未读消息
  accountLevel: 'Ahli VIP Tahap {level} yang dihormati',
  multipleWater: 'Pengeluaran boleh dilakukan dengan turnover {multiple} kali',
  withdrawWater: `Jumlah Turnover pertaruhan berkesan yang diperlukan untuk pengeluaran tunai ialah {depositValidBet}${currencyMap.value}, dan {depositResidueValidBet}${currencyMap.value} telah selesai. Sila teruskan!`,
  canBeWithdrawn: `Amaun yang boleh dikeluarkan: {count}${currencyMap.value}, tidak termasuk baki platform permainan yang belum dipindahkan`,

  currencyLabel: currencyMap.label,
  currencyValue: currencyMap.value,
  currencySymbol: currencyMap.symbol,
  lotteryGameInner: `"Lebih daripada 100 jenis permainan loteri untuk anda menangi! ${appTitle} menyediakan pelbagai kandungan permainan untuk pemain loteri di seluruh dunia, dan komited untuk mewujudkan persekitaran hiburan berkualiti tinggi untuk pemain menikmati ruang permainan dengan ketenangan fikiran, hanya untuk keputusan loteri yang adil dan saksama."`,
  hotGameSubText: `${appText} mempunyai semua yang anda inginkan, memberikan anda pengalaman permainan yang kaya`,
  serviceSubText: `${appText} sepenuh hati memberikan anda perkhidmatan terbaik`,

  xxx权威认证: `Pengesahan Rasmi ${appText}`,
  '2020年，xxx正式签约赞助巴黎圣日耳曼足球俱乐部， 成为巴黎圣日耳曼足球俱乐部亚洲区独家合作伙伴。': `Pada tahun 2020, ${appText} secara rasmi menandatangani perjanjian penajaan dengan Kelab Bola Sepak Paris Saint-Germain, menjadi rakan tunggal PSG di Asia.`,
  '致力于将自己打造成为具备专业服务的国际顶尖综合型体育投注平台，正如这个从硝烟中不断过关斩将的蓝黑军团，xxx势必破茧成竹，成为全球范围内引领顾客体验新风潮的坚石。': `Berpegang kepada cita-citanya untuk menjadi platform pertaruhan sukan komprehensif antarabangsa terbaik dengan perkhidmatan profesional, sama seperti pasukan biru-hitam ini yang sentiasa berjuang melalui kesukaran,  ${appText} pasti akan melangkah ke hadapan dan menjadi batu kukuh yang memimpin trend baru pengalaman pelanggan di seluruh dunia.`,

  x元礼金x倍流水: `${currencyMap.symbol}{count} ({multiple} kali turnover)`,
  'xxxx主打的24小时运营的直播在线视频类游戏，让玩家拥有身临其境的感觉，独创的网络金臂百家乐，更是取代了真人荷官发牌，让玩家耳目一新。除了百家乐，xxxx还提供真钱德州扑克，温州牌九，轮盘，番摊和骰宝等多款热门游戏，保证玩家获取的投注信息公平公正公开实时，让玩家可以随时随地享受游戏的快感。': `Permainan video dalam talian langsung 24 jam {name} memberikan pemain pengalaman yang mengasyikkan, dan bakarat lengan emas dalam talian yang asli menggantikan peniaga sebenar untuk berurusan dengan kad, menjadikan pemain berasa segar dan baharu. Selain bakarat, {name} juga menyediakan wang sebenar Texas Hold'em, Wenzhou Pai Gow, Roulette, Fantan dan Sic Bo serta permainan popular lain untuk memastikan maklumat pertaruhan yang diperoleh oleh pemain adalah adil, saksama, terbuka dan masa nyata, jadi bahawa pemain boleh menikmati keseronokan permainan pada bila-bila masa, di mana sahaja .`,
  剩余x次抽奖机会: `{remainingTimes} Peluang Undian`,
  '恭喜您获得：xxx, 请联系客服进行领取': `Tahniah kerana mendapat: {title}, sila hubungi khidmat pelanggan untuk mengumpul`,
  'xx真人平台抢攻高端真人视讯市场，以丰厚的市场资源及独家的研发技术作为强力后盾，更远赴美洲，遴选不同国籍具备超模等级的性感佳丽担任荷官，更不惜赤资重金打造千万等级并且高度还原真实赌场的摄影棚，提供玩家身历其境的游戏体验。': `Platform {name} Live Casino sedang agresif menargetkan pasaran permainan langsung video premium, dengan sumber pasaran yang mencukupi dan teknologi penyelidikan dan pembangunan eksklusif sebagai sokongan yang kuat. Mereka telah pergi sejauh Amerika untuk memilih individu yang seksi dan cantik dari pelbagai negara dengan kelayakan model super untuk bertugas sebagai pengedar langsung. Mereka tidak segan mengeluarkan wang yang banyak untuk membina studio berjenjang jutaan dolar yang menghidupkan suasana kasino sebenar, memberikan pengalaman bermain yang benar-benar menyelami pemain.`,
  'xx真人视讯为亚洲最具潜力的真人视讯品牌，提供百家乐、极速百家乐、共咪百家乐、多彩百家乐、龙虎、骰宝、轮盘、牛牛、炸金花等多样真人视讯游戏。xx真人视讯采用国际标准的真人游戏摄影棚，全场严密监控，流程公正公开，提供最公平的游戏环境。超低延迟高清视频，即时呈现！': `{name} Live Casino merupakan jenama permainan video langsung yang paling menjanjikan di Asia, menawarkan pelbagai permainan video langsung seperti Baccarat, Baccarat Cepat, Baccarat Umum, Baccarat Berwarna-warni, Dragon Tiger, Sic Bo, Roulette, Bull Bull, dan Golden Flower. {name} Live Casino menggunakan studio permainan langsung yang mematuhi piawaian antarabangsa, dengan pemantauan ketat dan proses yang telus, menyediakan persekitaran permainan yang paling adil. Dengan video definisi tinggi dan kelewatan yang sangat rendah, permainan disajikan secara langsung!`,
  'xx自2012年成立以来即致力创造富游戏性与创意兼具的移动娱乐平台，不仅提供专业的技术支持和稳定的顶级设备，并支持多项平台和荣获多项国际许可认证，提供玩家最值得信任的娱乐环境。另外，数百位受过专业培训的荷官和仿真的赌场环境，更可让玩家尽享博彩乐趣。': `Sejak penubuhannya pada tahun 2012, {name} telah berkomitmen untuk mencipta platform hiburan mudah alih yang menyediakan permainan yang menarik dan kreatif. Mereka tidak hanya menyediakan sokongan teknikal profesional dan peralatan teratas yang stabil, tetapi juga menyokong pelbagai platform dan memperoleh beberapa lesen dan pengiktirafan antarabangsa, menjaminakan persekitaran hiburan yang dapat dipercayai bagi pemain. Selain itu, dengan ratusan pengedar langsung yang telah menjalani latihan profesional dan persekitaran kasino yang realistik, pemain dapat menikmati keseronokan perjudian sepenuhnya.`,
  appTitle,
  appText,

  ...termsMessages.ms,
};

export default {
	zh,
	en,
	vi,
	ms,
}
