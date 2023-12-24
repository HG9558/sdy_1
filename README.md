## SDY新模版

1. 该项目旨在创建一个支持多个模板的玩家端系统，主要解决产品需求在多个已知站点进行同步的问题。通过实现一套代码，该项目可以在多个站点（包括全部或定制化站点）上进行部署，实现项目代码与站点的完全解耦，从而实现更高度的独立式开发。
2. 本项目支持创建多个模板，每个模板下面可以有多套定制皮肤，同时支持多种语言，包括中文、英语、越南语和马来语等。此外，该项目还支持多种币种的支付，包括澳币、人民币、马币和越南盾等，满足不同币种支付的定制化和配置化需求。
3. 该项目整体采用 `Vue3` + `TypeScript` + `Vite` 的技术栈进行搭建，以提高开发效率和代码的可维护性和可扩展性。使用 `Vue3` 的 `Composition API` 进行代码开发，使代码具有更好的易用性和可读性，更利于后续的维护和扩展。同时，使用 `Vite` 构建工具进一步加速了开发过程，提高了开发效率。
4. 在当前2号模版基础上，将继续完善本项目，增加更多的模板和定制皮肤，以满足不同行业的用户需求，并且将会支持更多的语言和货币种类，以扩大本项目的适用范围和影响力。

## 技术栈

- Vue3：项目的主要框架，用于构建用户界面；
- TypeScript：代码检测工具，增加代码的可维护性和可读性；
- Vite4：项目的构建工具，及相应打包配置；
- Pinia & Pinia-plugin-persist：状态管理工具，可实现数据持久化存储（sessionStoragte）；
- Axios：数据交互工具，支持响应和请求拦截，能够进行请求中断处理；
- VueRouter & vite-plugin-pages：路由管理工具，用于处理项目的路由；
- wsdy-fastsub：子仓库，保存各模版相应皮肤的图片资源及样式补丁文件。

=========================================================================================================

## 封装插件及公共方法类

### 全局弹窗

可配置属性

```javascript
dialogType = {
   	isShow: boolean;  /*组件是否开启*/
    closeOnClickModal?: boolean; /*是否指定模态框外点击关闭*/
    closeOnPressEscape?: boolean; /*是否可以ESC进行关闭*/
    alignCenter?: boolean; /*是否居中展示*/
    width?: number;/*弹窗宽度*/
    dialogTitle?: string; /*弹窗标题*/
    showCancel?: boolean; /*是否展示取消按钮*/
    showConfirm?: boolean;/*是否展示确认按钮*/
    cancelTxt?: string; //取消文本
    confirmTxt?: string; //确认文本
    content: string; //文本内容
    customClass?: string; //自定义class雷鸣
    isBtnLoading?: boolean; //按钮状态是否为loading
    appendToBody?: boolean; //是否插入为body子元素
    clickCallback?: <T>(val?: T) => void | Promise<T>;  // 确认按钮回调函数
    cancelCallback?: () => void; //取消按钮回调函数
}
```

**支持两种形式调用**

1. 组件形式调用

   ```javascript
   import selfDialog from 'commonComponent/Dialog/Dialog.vue';
   ```

2. vue挂载的`$_dialog`方法调用

   ```javascript
    proxy.$_dialog.show({//配置属性})
   ```

### **全局tip框**

> 使用`elementUI`弹窗进行封装

```javascript
const { messageTip } = useDialog();
const messageTip = ({ message, duration = 1500, type = 'info', onClose }: messageType) => {
    ElMessage({
      customClass: import.meta.env.VITE_THEME,
      message,
      duration,
      type,
      onClose() {
        onClose && onClose()
      }
    })
  }
```

### 倒计时按钮

<img src="https://p.ipic.vip/eyyna5.png" alt="image-20230412152833378" style="zoom:50%;" />

```typescript
import CountTime from 'commonComponent/CountTime/index.vue';
```

### 图片资源加载

> 测试环境，予发布环境，悟空演示站，各个皮肤所有图片资源均进行加载，生产环境只进行当前站点指定皮肤图片加载

- `useImgPath`:src属性指定或backgroundImage使用
- useLogoPath logo图片使用
- useCommonImgPath 各个皮肤公共图片引入
- useSiteImgPath *icon图片*

- 分页插件

  ```javascript
  import PaginationComponent from 'commonComponent/Pagination/index.vue';
  //- prop属性
  {
      pagination: {
        currentPage: number;
        pageSize: number;
        total: number;
      };
      className?: string;
    }
  ```

### 二维码插件

> 可引入带logo的二维码  

- **站点名称获取**

  ```javascript
  useCurrentTitle /*站点中文标题获取*/
  useEnTitle /*站点英文标题获取*/
  ```

=========================================================================================================

### 数据处理

> 数据请求基于axios进行封装，像外暴露api类，组件内使用api类进行各模块方法调用，支持请求参数类型检测，响应数据类型检测

**使用方法：**

1. **api目录 > interface >  模块名称 下进行方法创建例:**

```javascript
import ajax from '../../http.js'
export default {
  //- 获取SToken
  getSiteCode: (params: API.siteCode): Promise<API.ISideCodeRes> => ajax({ url: '/sys/getSiteCode', params }),
}
```

> API.siteCode：请求参数类型定义
>
> API.ISideCodeRes：响应参数类型定义
>
> ajax方法为axios方法扩展，参数
> 	url : 请求地址
> 	method:请求方法，默认get
> 	config：请求自定义配置

2. 组件内使用

   ```javascript
   const res = await api.common.getQueryStationSe()
   ```

3. 遵循重复请求进行响应拦截

### Scss混编方法

- flex定位

  ```css
  @mixin flex($level_style:space-between, $vertical_style:row, $isWrap:nowrap, $align:center) 
  ```

- 文字渐变色处理

  ```css
  @mixin text_clip($color, $fontWeight:bold)
  ```

- 定位处理

  ```css
  @mixin absolute($l:50%, $t:50%, $b:auto, $r:auto)
  ```

  

## 项目目录结构

```html
.
├── README.md	---------------------------- 说明文档
├── auto-imports.d.ts	---------------------------- 
├── beforeBuild.js ---------------------------- 项目运行前构建文件
├── components.d.ts ---------------------------- 
├── config  ---------------------------- 配置文件目录（根据strapi获取内容生成，beforebuild文件中创建）
│   ├── p001_dcs.js  ---------------------------- 001站点配置内容测试环境
│   ├── p101_pre.js  ---------------------------- 101站点配置内容予发布环境
│   ├── p201_rng.js  ---------------------------- 201站点配置内容予生产环境
│   └── tsString.js  ---------------------------- ts.config.json 文件的镜像，beforebuild中根据该文件生成tsconfig.json
├── env.d.ts 
├── index.html
├── package.json
├── public
│   ├── config.json
│   └── ico
│       └── rng
│           ├── 001_logo_2.png
├── src   -------------------------------------------------------- 开发目录
│   ├── App.vue -------------------------------------------------------- 主入口文件
│   ├── api -------------------------------------------------------- 接口请求信息相关文件目录
│   │   ├── http.ts ------------------------------------ 封装的 HTTP 请求工具
│   │   ├── index.ts ------------------------------------ API 接口的入口文件输出api类
│   │   └── interface ------------------------------------ 各模块接口方法文件目录
│   │       ├── bank ------------------------------------ 银行模块的目录
│   │       │   ├── index.ts ----------------------------- 银行模块的 API 接口
│   │       │   └── model.d.ts ---------------------------- 银行模块的数据模型接口
│   │       ├── common ------------------------------------ 公共模块目录
│   │       │ │ ├── index.ts ---------------------------- 公共模块的 API 接口
│   │       │ │ └── model.d.ts ---------------------------- 公共模块的数据模型接口  
│   │       ├── contactUs ---------------------------- 联系目录
│   │           │ ├── index.ts -------------------------- 联系我们模块的 API 接口
│   │           │ └── model.d.ts -------------------------- 联系我们模块的数据模型接口
│   ├── assets  ------------------------------------------ 项目资源目录
│   │   ├── data
│   │   │   └── template_2 ------------------------------------------ 2号模版静态资源目录
│   │   │       ├── game_data_template.ts ------------------------ strapi拉取的游戏配置数据
│   │   │       ├── deposit_data.ts ------------------------ 存款配置数据
│   │   │       ├── game_data.ts  ------------------------ 游戏列表数据
│   │   │       ├── header_data.ts ------------------------ 头部游戏导航数据
│   │   │       └── user_profile_data.ts ------------------------ 用户配置数据
│   │   ├── style ------------------------------------------ 全局样式文件目录（包含scss的mixin方法）
│   │   │   ├── base.scss ------------------------------------------ 基础css
│   │   │   ├── fonts ------------------------------------------ 字体文件目录
│   │   │   │   ├── din.otf
│   │   │   ├── index.scss ------------------------------------------ 入口css文件(main.ts导入)
│   │   │   ├── mixin.scss ------------------------------------------ 样式混合文件
│   │   │   └── reset.scss ------------------------------------ 样式重置文件
│   │   └── wsdy-fastsub ------------------------ 子仓库目录（包含pc图片资源+样式文件）
│   │       ├── README.md ------------------------ 子仓库说明文件
│   │       └── pc   ------------------------ PC端项目资源目录
│   │           └── template_2 
│   │               ├── 001 ------------------------ 001皮肤资源目录
│   │               │   ├── img ------------------------ 001皮肤img文件资源目录
│   │               │   │   ├── base ------------------------ 基础样式图片目录
│   │               │   │   ├── discount ------------------ 折扣样式图片目录
│   │               │   │   ├── electronic ------------------ 电子样式图片目录
│   │               │   │   ├── fish ------------------ 渔场样式图片目录
│   │               │   │   ├── forgetpsw ------------------ 忘记密码样式图片目录
│   │               │   │   ├── forum ------------------ 论坛样式图片目录
│   │               │   │   ├── game_help ------------------ 游戏帮助样式图片目录
│   │               │   │   ├── home ------------------ 首页样式图片目录
│   │               │   │   ├── login ------------------ 登录样式图片目录
│   │               │   │   ├── lottery ------------------ 彩票样式图片目录
│   │               │   │   ├── partner ------------------ 合作伙伴样式图片目录
│   │               │   │   ├── poker ------------------ 扑克样式图片目录
│   │               │   │   ├── profile ------------------ 个人资料样式图片目录
│   │               │   │   ├── redEnvelope ------------------ 红包样式图片目录
│   │               │   │   ├── special ------------------ 特殊样式图片目录
│   │               │   │   ├── sponsor ------------------ 赞助商样式图片目录
│   │               │   │   ├── user ------------------ 用户样式图片目录
│   │               │   │   └── verify ------------------ 验证样式图片目录
│   │               │   └── style  ------------------ 样式文件目录
│   │               │       ├── index.scss ------------------ 001皮肤样式常量差异文件
│   │               │       └── reset_element.scss  ------------------ element样式文件
│   │               ├── 002 ------------------------ 同001目录文件
│   │               │   ├── img
│   │               │   └── style
│   │               │       ├── index.scss
│   │               │       └── reset_element.scss
│   │               ├── 003 ------------------------ 同001目录文件
│   │               │   ├── img
│   │               │   └── style
│   │               │       ├── index.scss
│   │               │       └── reset_element.scss
│   │               ├── 004 ------------------------ 同001目录文件
│   │               │   ├── img
│   │               │   └── style
│   │               │       ├── index.scss
│   │               │       └── reset_element.scss
│   │               ├── 005 ------------------------ 同001目录文件
│   │               │   ├── img
│   │               │   └── style
│   │               │       ├── index.scss
│   │               │       └── reset_element.scss
│   │               ├── 006 ------------------------ 同001目录文件
│   │               │   ├── img
│   │               │   └── style
│   │               │       ├── index.scss
│   │               │       └── reset_element.scss
│   │               ├── common ------------------------ 公共图片目录
│   │               │   ├── header_language_en.png
│   │               │   └── red_envelopes ------------------------ 红包图片目录(各皮肤可复用)
│   │               │       └── successEnvelope.png
│   │               ├── css_import.scss  ------------------------ 差异css入口文件
│   │               └── sites  ------------------------ 站点相关图片目录
│   │                   ├── ico ------------------------ 站点ico图片目录
│   │                   │   ├── rng 
│   │                   │   │   ├── 001_logo_2.png
│   │                   └── logo ------------------------ 站点logo图片目录
│   │                       ├── rng ------------------------ rng指定站点logo图片目录
│   │                       │   ├── 001_logo_1_en.png ------------------------ 001号皮肤英文logo
│   │                       │   ├── 001_logo_1_ms.png ------------------------ 001号皮肤马来logo
│   │                       │   ├── 001_logo_1_vi.png ------------------------ 001号皮肤越南logo
│   │                       │   ├── 001_logo_1_zh.png ------------------------ 001号皮肤越南logo
│   │                       │   ├── 001_logo_1_zh_tw.png ------------------------ 001号皮肤台湾logo
│   │                       │   ├── 001_logo_2.png  ------------------------ 001号皮肤页眉logo
│   │                       │   ├── 001_qr_logo.png ------------------------ 二维码使用图片
│   ├── components ------------------- 组件库目录（多模版按模版名称进行划分）
│   │   └── template_2 ------------------- 二号模版公共组件库
│   │       ├── CountTime ------------------- 倒计时组件目录
│   │       │   └── index.vue
│   │       ├── Dialog ------------------- 弹窗系列组件目录
│   │       │   ├── Dialog.vue ------------------- 对话框组件
│   │       │   ├── Tip.vue ------------------- 轻提示组件
│   │       │   ├── index.ts ------------------- 对话框组件挂在文件
│   │       ├── Footer ------------------- 2号模版页脚组件目录
│   │       │   └── Footer.vue
│   │       ├── GameStatusIcon ------------------- 试玩游戏目录
│   │       │   └── GameStatusIcon.vue
│   │       ├── Header ------------------------- 2号模版头部组件目录
│   │       │   ├── Header.vue
│   │       │   ├── component
│   │       │   │   ├── ChessMenu.vue ------------------------- 棋牌菜单
│   │       │   │   ├── DiscountsMenu.vue  ------------------------- 优惠菜单
│   │       │   │   ├── ElectronicMenu.vue ------------------  电子游戏菜单
│   │       │   │   ├── EsportMenu.vue ------------------  电竞菜单
│   │       │   │   ├── FishMenu.vue ------------------ 捕鱼菜单
│   │       │   │   ├── HeaderNavigator.vue ----------------- 页头导航菜单
│   │       │   │   ├── HomeMenu.vue ----------------- Home页面导航菜单
│   │       │   │   ├── ScrollLayout.vue  ----------------- 游戏滚动容器 
│   │       │   │   ├── LotteryMenu.vue  ----------------- 彩票菜单
│   │       │   │   ├── PartnerMenu.vue  ----------------- 合作伙伴菜单
│   │       │   │   ├── RealMenu.vue ----------------- 真人游戏菜单
│   │       │   │   ├── SportsMenu.vue ----------------- 体育游戏菜单
│   │       │   │   └── UserOperation.vue  ----------------- 用户登录区域下拉菜单
│   │       ├── MobileAreaCodesSelect ----------------- 手机号码搜索
│   │       │   └── index.vue
│   │       ├── Pagination  ----------------- 分页组件
│   │       │   └── index.vue
│   │       ├── QrCode ----------------- 二维码组件
│   │       │   └── qr.vue
│   │       ├── RedEnvelopeEntrance --------------------------- 红包组件
│   │       │   └── RedEnvelopeEntrance.vue
│   │       ├── SelfLoading --------------------------- loading组件
│   │       │   ├── SelfLoading.vue
│   │       ├── SideBar --------------------------- 侧边栏组件
│   │       │   └── sideBar.vue
│   │       ├── SpecialLayout --------------------------- 游戏专题容器组件
│   │       │   └── SpecialLayout.vue
│   │       ├── Verify --------------------------- 验证码滑块组件
│   │       │   ├── components
│   │       │   │   └── VerifySlide.vue
│   │       │   ├── css
│   │       │   │   └── index.scss
│   │       │   ├── index.vue
│   │       │   └── utils
│   │       │       ├── ase.ts
│   │       │       └── util.ts
│   │       └── empty --------------------------- 空白页组件
│   │           └── empty.vue
│   ├── hook
│   │   ├── useAuth.ts --------------------- Vue Composition API Hook: 认证相关
│   │   ├── useCheckForm.ts --------------- Vue Composition API Hook: 表单校验
│   │   ├── useCurrentInstance.ts ---------------  获取当前Vue实例
│   │   ├── useDialog.ts ---------------  element原生提示
│   │   ├── useElementLanguage.ts ---------------  element语言配置
│   │   ├── useGameHook.ts ---------------  三方游戏跳转相关
│   │   ├── useGetUserHook.ts  ---------------  用户信息获取
│   │   ├── usePath.ts  ---------------  图片资源路径相关
│   │   ├── useTitle.ts ---------------  站点标题相关内容获取
│   │   └── userRuleHook.ts ---------------  表单验证
│   ├── i18n ---------------  国际化目录
│   │   ├── excel2Json.js ----------------- 脚本工具：Excel 转 JSON
│   │   ├── i18n.xlsx ----------------- 多语言文本配置文件：Excel 格式
│   │   ├── i18next-scaner.config.js ----------------- 脚本工具：i18next-scan 扫描配置
│   │   ├── index.ts Vue I18n ----------------- 配置文件：主文件
│   │   ├── json ----------------- 多语言文本映射目录
│   │   │   ├── en.json 
│   │   │   ├── ms.json
│   │   │   ├── vi.json
│   │   │   ├── zh.json
│   │   │   └── zh_tw.json
│   │   ├── json2Excel.js ----------------- 脚本工具：JSON 转 Excel
│   │   ├── messages.ts ----------------- 含变量翻译文件
│   │   └── termsMessages.ts ----------------- 含变量翻译文件
│   ├── main.ts ---------------------------- Vue 入口文件：主文件
│   ├── pages ---------------------------- 路由级别（页面组件）目录
│   │   └── template_2
│   │       ├── Home ---------------------------- 首页面目录
│   │       │   ├── component
│   │       │   │   ├── Banner.vue ------------------- Vue 组件：首页轮播图
│   │       │   │   ├── BetTable.vue ---------------- Vue 组件：首页投注表格
│   │       │   │   ├── CommonTitle.vue ----------- 通用标题组件
│   │       │   │   ├── FirstEnterDialog.vue ----------- 首次进入对话框
│   │       │   │   ├── GameTab.vue ----------- 组件：游戏选项卡
│   │       │   │   ├── HotGame.vue ----------------- Vue 组件：热门游戏
│   │       │   │   ├── NoticeSlider.vue   ---------- Vue 组件：通知信息无缝滚动
│   │       │   │   ├── RedEnvelopes.vue   ---------- Vue 组件：红包雨入口icon
│   │       │   │   ├── ServicerDesc.vue   ---------- 客服icon
│   │       │   │   └── SportBanner.vue    ---------- 推荐体育游戏专题
│   │       │   └── index.vue  ---------- 首页界面入口文件
│   │       ├── [...all].vue ---------- （动态路由检索）404界面
│   │       ├── contact_us ---------- 联系我们专题目录
│   │       │   └── index.vue
│   │       ├── discount ---------- 优惠专题目录
│   │       │   ├── component
│   │       │   │   ├── DiscountDetailDialog.vue ---------- 优惠弹窗组件
│   │       │   │   └── ListContent.vue ---------- 优惠列表组件
│   │       │   └── index.vue ---------- 优惠入口
│   │       ├── download ---------- 下载页目录
│   │       │   └── index.vue
│   │       ├── e_sport  ---------- 体育专题目录
│   │       │   └── index.vue
│   │       ├── electronic --------- 电子专题目录
│   │       │   ├── css
│   │       │   │   ├── index.scss
│   │       │   │   └── selectList.scss
│   │       │   ├── index.vue
│   │       │   └── selectList.vue
│   │       ├── electronic.vue
│   │       ├── fish ---------- 捕鱼专题目录
│   │       │   ├── index.vue
│   │       │   └── selectList.vue
│   │       ├── fish.vue 
│   │       ├── forgetpsw ---------- 忘记密码界面目录
│   │       │   └── index.vue 
│   │       ├── forum  ---------- 论坛界面目录
│   │       │   ├── component
│   │       │   │   ├── ForumDetail.vue
│   │       │   │   └── ForumList.vue
│   │       │   └── index.vue
│   │       ├── game_help ----------游戏帮助目录
│   │       │   ├── component
│   │       │   │   ├── GameHelp.vue
│   │       │   │   ├── Privacy.vue
│   │       │   │   ├── Responsibility.vue
│   │       │   │   └── Rule.vue
│   │       │   ├── css
│   │       │   │   └── component.scss
│   │       │   ├── index.vue
│   │       │   └── model.d.ts
│   │       ├── help_center ----------帮助中心目录
│   │       │   └── index.vue
│   │       ├── login ----------登录界面
│   │       │   ├── component
│   │       │   │   └── Layout.vue
│   │       │   ├── index.vue
│   │       │   └── register.vue
│   │       ├── lottery ----------彩票专题目录
│   │       │   ├── index.vue
│   │       │   └── selectList.vue
│   │       ├── lottery.vue
│   │       ├── newRedEnvelopes ----------新版红包雨目录
│   │       │   ├── component
│   │       │   │   └── entry.vue
│   │       │   ├── index.vue
│   │       │   └── record.vue
│   │       ├── partner  --------- 合作专题目录
│   │       │   └── index.vue
│   │       ├── physical --------- 体育专题目录 
│   │       │   └── index.vue
│   │       ├── poker --------- 彩票专题目录
│   │       │   ├── index.vue
│   │       │   └── selectList.vue
│   │       ├── poker.vue --------- 棋牌游戏专题目录
│   │       ├── profile --------- 个人中心目录
│   │       │   ├── baseInfo.vue --------- 个人资料界面
│   │       │   ├── bettingRecord.vue --------- 投注记录界面
│   │       │   ├── component --------- 个人中心组件库
│   │       │   │   ├── CenterWallet.vue
│   │       │   │   ├── SideBar.vue
│   │       │   │   ├── bankCard --------- 银行卡组件目录
│   │       │   │   │   ├── AddBankCard.vue
│   │       │   │   │   ├── AliBank.vue
│   │       │   │   │   ├── BankCardManage.vue
│   │       │   │   │   ├── CryBank.vue
│   │       │   │   │   ├── EcnyBank.vue
│   │       │   │   │   ├── OtherPay.vue
│   │       │   │   │   └── RmbBank.vue
│   │       │   │   ├── baseInfo
│   │       │   │   │   ├── BaseInfo.vue
│   │       │   │   │   ├── EmailSetting.vue
│   │       │   │   │   ├── MobileSetting.vue
│   │       │   │   │   ├── NickNameSetting.vue
│   │       │   │   │   ├── PasswordSetting.vue
│   │       │   │   │   ├── RealInfo.vue
│   │       │   │   │   └── TopInfo.vue
│   │       │   │   ├── deposit
│   │       │   │   │   ├── CrPay.vue
│   │       │   │   │   ├── LargePaymentDialog.vue
│   │       │   │   │   ├── QrDialogContent.vue
│   │       │   │   │   └── RmPay.vue
│   │       │   │   ├── messageCenter
│   │       │   │   │   ├── TypeOne.vue
│   │       │   │   │   ├── TypeThree.vue
│   │       │   │   │   └── TypeTwo.vue
│   │       │   │   ├── recommended
│   │       │   │   │   ├── CommonTable.vue
│   │       │   │   │   ├── GetMore.vue
│   │       │   │   │   ├── MyFriend.vue
│   │       │   │   │   ├── MyFriendDetail.vue
│   │       │   │   │   └── Recommend.vue
│   │       │   │   ├── transaction
│   │       │   │   │   ├── LastRebate.vue
│   │       │   │   │   ├── deposit.vue
│   │       │   │   │   ├── discount.vue
│   │       │   │   │   ├── rebate.vue
│   │       │   │   │   ├── reward.vue
│   │       │   │   │   └── withdrawal.vue
│   │       │   │   ├── vip
│   │       │   │   │   └── VipTable.vue
│   │       │   │   └── withdrawal
│   │       │   │       └── WithdrawalForm.vue
│   │       │   ├── coupons.vue --------- 我的优惠组件
│   │       │   ├── css
│   │       │   │   ├── TypeThree.scss
│   │       │   │   ├── TypeTwo.scss
│   │       │   │   ├── bettingRecord.scss
│   │       │   │   ├── feedback.scss
│   │       │   │   ├── getMore.scss
│   │       │   │   ├── messageCenter.scss
│   │       │   │   ├── myFriend.scss
│   │       │   │   ├── recommended.scss
│   │       │   │   └── table.scss
│   │       │   ├── deposit.vue  --------- 存款组件
│   │       │   ├── feedback.vue --------- 意见反馈组件
│   │       │   ├── messageCenter.vue --------- 消息中心组件
│   │       │   ├── recommended.vue  --------- 好友推荐
│   │       │   ├── shareRecode.vue  --------- 晒单记录组件
│   │       │   ├── transaction.vue  -------- 交易记录组件
│   │       │   ├── vip.vue -------- vip一级界面
│   │       │   ├── vipInfo.vue -------- vip详情界面
│   │       │   ├── wallet.vue -------- 钱包界面
│   │       │   └── withdrawal.vue -------- 提款界面
│   │       ├── profile.vue
│   │       ├── real
│   │       │   └── index.vue
│   │       ├── red_envelope
│   │       │   └── index.vue
│   │       ├── sponsor
│   │       │   └── index.vue
│   │       └── usdt_teach  -------- usdt教学界面
│   │           └── index.vue
│   ├── router  -------- 路由配置文件（包含路由守卫）
│   │   └── index.ts
│   ├── stores  -------- 公共状态管理目录
│   │   ├── discount.ts -------- 状态管理-优惠
│   │   ├── envConfig.ts -------- 状态管理-全局环境变量
│   │   ├── game.ts -------- 状态管理-游戏相关
│   │   ├── global.ts -------- 状态管理-全局
│   │   ├── home.ts -------- 状态管理-首页面
│   │   ├── index.ts -------- 状态管理入口文件
│   │   ├── normal.ts -------- 状态管理非sessionStorage存储的状态
│   │   ├── store-name.ts -------- 个模块常量
│   │   └── user.ts -------- 状态管理-用户
│   ├── types -------- 全局类型声明目录
│   │   ├── envStoreType.d.ts
│   │   ├── index.ts
│   │   └── userStoreType.d.ts
│   └── utils -------- 工具类函数目录
│       ├── crypto.ts -------- 解压码相关
│       ├── date.ts -------- 日期函数类
│       ├── filter.ts -------- 格式化函数
│       ├── index.ts -------- 工具类入口文件
│       ├── matomo-init.ts
│       ├── matomoconfig.ts
│       └── selectLine.ts
├── tsconfig.json -------- ts配置文件
├── types
│   └── auto-imports.d.ts
├── vite.config.ts -------- 项目配置文件
├── viteEnvConfig -------- vite扩展环境变量目录
└── yarn.lock

```

## 使用方法

### strapi(CMS)使用

> 项目中配置信息（皮肤，模版，游戏列表、code、请求地址等）需strapi进行获取，运行项目之前需要保证strapi正确配置。当前只有一套环境的strapi配置，生产、测试、予发布、均为一套环境，根据不同数据表进行数据请求、该项目只对strapi进行查询操作,无`cud`操作，在测试环境、予发布环境、以及悟空演示站中，可以通过修改strapi在不发版的情况下，看到皮肤，语言配置的变化。其他站点生产环境一旦配置打包，不可再进行修改。代码中根据环境的`is_auto_config`字段是否为`true`进行判断；
>
> **pc端strapi请求的接口分别为:**
>
> 1. https://strapi-web.wsdy.net/api/www-dcs-settings?filters[appcode配置信息唯一标识]=p001&populate=*    // 测试布环境配置获取
> 2. https://strapi-web.wsdy.net/api/www-pre-settings?filters[appcode配置信息唯一标识]=p101&populate=*    // 予发布环境配置获取
> 3. https://strapi-web.wsdy.net/api/www-prod-settings?filters[appcode配置信息唯一标识]=p101&populate=*    // 生产境配置获取
> 4. https://stprai.wsdy.net/api/www-game-lists?filters[gameSite=建站的站点标识]=rng&populate=*  // 站点配置游戏列表集合



- 二号模版PC端涉及的数据表

  - fastwww_dcs_seting pc端测试环境配置，字段包含链表信息

    | 字段名           | 可选值                | 说明                                                         |
    | ---------------- | --------------------- | ------------------------------------------------------------ |
    | appcode          | p001～p010            | 配置唯一标识，字段在打包部署时使用                           |
    | sitecode         | dcs                   | 运行环境标识，项目中数据请求配置根据当前的字段进行指定数据获取 |
    | template         | template_1~template_* | 模版标识,现阶段只有template_2 可选，为2号模版                |
    | logo_info        | rng                   | 指定站点标识，如rng 代表rng悟空体育，由产品提供              |
    | theme            | t_001~t_006           | 当前运行工程皮肤，t_001为1号皮肤                             |
    | is_auto_config   | true/false            | 是否可通过strapi获取的数据进行皮肤及其他配置修改             |
    | agt_url          | string                | 代理前端地址,值在建站信息中获取                              |
    | languages        | zh/vi/en/ms           | 站点可配置的语言信息(链表数据)，多选                         |
    | private_settings | showHistorySponsor    | 站点私有化配置                                               |
    | currency_map     | AUD/MY/RMB/VM         | 当前站点支付币种配置，单选                                   |

  

  - fastwww_pre_seting pc端予发布环境配置，字段包含链表信息

    | 字段名           | 可选值                | 说明                                                         |
    | ---------------- | --------------------- | ------------------------------------------------------------ |
    | appcode          | p101～p199            | 配置唯一标识，字段在打包部署时使用                           |
    | sitecode         | pre                   | 运行环境标识，项目中数据请求配置根据当前的字段进行指定数据获取 |
    | template         | template_1~template_* | 模版标识,现阶段只有template_2 可选，为2号模版                |
    | logo_info        | rng                   | 指定站点标识，如rng 代表rng悟空体育，由产品提供              |
    | theme            | t_001~t_006           | 当前运行工程皮肤，t_001为1号皮肤                             |
    | is_auto_config   | true/false            | 是否可通过strapi获取的数据进行皮肤及其他配置修改             |
    | agt_url          | string                | 代理前端地址,值在建站信息中获取                              |
    | languages        | zh/vi/en/ms           | 站点可配置的语言信息(链表数据)，多选                         |
    | private_settings | showHistorySponsor    | 站点私有化配置                                               |
    | currency_map     | AUD/MY/RMB/VM         | 当前站点支付币种配置，单选                                   |

  

  - fastwww_pro_seting pc端予发布环境配置，字段包含链表信息

    | 字段名           | 可选值                | 说明                                                         |
    | ---------------- | --------------------- | ------------------------------------------------------------ |
    | appcode          | p201～p300            | 配置唯一标识，字段在打包部署时使用                           |
    | sitecode         | ysz                   | 运行环境标识，项目中数据请求配置根据当前的字段进行指定数据获取 |
    | template         | template_1~template_* | 模版标识,现阶段只有template_2 可选，为2号模版                |
    | logo_info        | rng                   | 指定站点标识，如rng 代表rng悟空体育，由产品提供，链表        |
    | theme            | t_001~t_006           | 当前运行工程皮肤，t_001为1号皮肤                             |
    | is_auto_config   | true/false            | 是否可通过strapi获取的数据进行皮肤及其他配置修改             |
    | agt_url          | string                | 代理前端地址,值在建站信息中获取                              |
    | languages        | zh/vi/en/ms           | 站点可配置的语言信息(链表数据)，多选                         |
    | private_settings | showHistorySponsor    | 站点私有化配置                                               |
    | currency_map     | AUD/MY/RMB/VM         | 当前站点支付币种配置，单选                                   |

  

  - fastwww_prod_url_list 生产环境token，Stoken请求地址相关相关信息，为关联表，根据 fastwww_pro_seting中的logo_info字段匹配，所有值均在建站信息中获取

    | 字段名            | 可选值           | 说明                                           |
    | ----------------- | ---------------- | ---------------------------------------------- |
    | site              | rng 或任意字符串 | fastwww_pro_seting通过该值进行选择获取配置信息 |
    | default_token     | string           | 工程token                                      |
    | default_domain    | www.q8rwr11.com  | 站点外部访问地址                               |
    | default_sptvtoken | rng_             | sptvtoken配置                                  |
    | url_data          | Array[string]    | 数据请求基础路径集合                           |

  

  - www_api_url_list 测试环境+予发布环境token，Stoken请求地址相关相关信息，使用方法同上

  

  - www_currency_map 币种列表，通过log_info字段匹配获取

    | 字段名       | 可选值        | 说明                      |
    | ------------ | ------------- | ------------------------- |
    | type         | RMB/AUD/VN/MY | 币种类型                  |
    | wap_label    | string        | 移动端使用的币种渲染value |
    | value        | string        | 页面中使用的币种后缀      |
    | symbol       | string        | 页面中使用的币种前缀      |
    | zh_label     | string        | 页面中使用的中文label值   |
    | en_label     | string        | 页面中使用的英文label值   |
    | wap_zh_label | string        | wap端使用的中文label      |
    | ms_label     | string        | 页面中使用的马来语label值 |
    | vi_label     | string        | 页面中使用的越南语label值 |

  

  - www_game_list 当前站点配置的游戏类表，所有游戏通过game_resource集合获取，每个游戏分类可进行多选，项目中通过单独接口进行调用

    | 字段名     | 可选值              | 说明                                                      |
    | ---------- | ------------------- | --------------------------------------------------------- |
    | gameSite   | RMB tpe=string      | 通过logo_info进行匹配的值                                 |
    | sport      | FB体育/OB体育等     | 站点支持的体育游戏集合，多选，获取game_resource的链表信息 |
    | home_game  | OB原生体育/悟空体育 | 首页面推荐的体育游戏配置                                  |
    | e_sprt     | string              | 站点电竞游戏集合                                          |
    | real       | string              | 站点真人游戏集合                                          |
    | lottery    | string              | 站点彩票游戏集合                                          |
    | chess      | string              | 站点棋牌游戏集合                                          |
    | fish       | string              | 站点捕鱼游戏集合                                          |
    | electronic | string              | 站点电子游戏集合                                          |

  

  - www_game_list 当前站点配置的游戏类表，所有游戏通过game_resource集合获取，每个游戏分类可进行多选

    | 字段名       | 可选值            | 说明                           |
    | ------------ | ----------------- | ------------------------------ |
    | languageType | zh/en/vi/ms/zh_tw | 站点语言配置标识               |
    | languageList | Array[string]     | 当前站点显示的语言类型文字描述 |

  

  - www_parivate_setting 当前配置站点私有化信息集合

    | 字段名             | 可选值     | 说明             |
    | ------------------ | ---------- | ---------------- |
    | showHistorySponsor | true/false | 是否显示历史赞助 |
    | showRedEnvelopes   | true/false | 是否显示红包雨   |

​			    

### 项目开发

- 运行命令
  - "dev": "node beforeBuild.js && vite", //本地开发环境运行命令
  - "testBuild": "node beforeBuild.js --appcode=p001 --sitecode=dcs" //测试环境本地打包命令
  - "preBuild": "node beforeBuild.js --appcode=p101 --sitecode=pre" //予发布环境本地打包命令
  -  "type-check": "vue-tsc --noEmit" //ts类型检测
  - "i1n8Scan": "i18next-scanner --config src/i18n/i18next-scaner.config.js" //翻译文件扫描
  -   "i18n2Excel": "node src/i18n/json2Excel.js", //翻译文件转表格
  -  "i18n2Json": "node src/i18n/excel2Json.js", // 表格文件转json
  -  "updateSubModule": "git submodule update --init --recursive && git submodule foreach git pull origin pc_test"。//子仓库更新

- 开发规范
  - 项目中使用typescrpit进行代码检测，变量，尽量使用标注类型注解，函数使用范型规范、或进行类型推导
  - 文本编写采用多语言开发标准，使用`$t_c(文本信息)`的形式进行代码编写
  - 项目中路由采用vite-plugin-pages插件进行动态导入，不需要在进行路由对象定义，所有page下的一级目录或文件默认为路由组件，具体配置，参照vite.config.ts中插件的Pages选项
  - 项目中已配置aoutImport, 涉及到Vue相关属性方法，路由方法，不需要组件内额外进行引入，直接使用即可
  - 组件开发：复用两次以上，纯UI组件，或与组件业务无关内容，存放于components文件夹指定模版下
  - 使用到的全局环境变量，可在全局状态的envStore中获取，例：`envState.vite_currency_map.type`获取站点币种相关
- 开发分支
  - 主工程
    - 生产环境：master分支
    - 测试环境+予发布环境代码：test分支
  - 子仓库
    - 测试环境：pc_test
    - 生产环境：pc_test

### 新皮肤开发

1. 获取指定项目仓库代码即权限并进行下载（主工程 + 子仓库代码）

   - 主工程仓库->wsdy-fastwww
     - 地址：[ssh://git@gitlab.wsdy.net:10022/wsdy/wsdy-fastwww.git](ssh://git@gitlab.wsdy.net:10022/wsdy/wsdy-fastwww.git)
     - 开发分支：test

   - 子仓库->wsdy-fastsub(获取项目运行需要的图片资源及皮肤专有样式文件)
     - 地址：[ssh://git@gitlab.wsdy.net:10022/wsdy/wsdy-fastsub.git](ssh://git@gitlab.wsdy.net:10022/wsdy/wsdy-fastsub.git)
     - 开发分支:pc_test

2. 两种方式进行开发（**<u>兼职人员推荐使用本地配置的形式第二种方式进行开发</u>**）

   1. 查看strapi配置，将当前开发环境下的配置信息中皮肤调整为需要开发的皮肤选项，例如，目前准备测试环境开发2号模版006皮肤，调整strapi配置为下图配置，此时项目运行命令 `npm run dev`,进行指定配置文件获取

   <img src="https://p.ipic.vip/xnc1g5.png" alt="image-20230413144945412" style="zoom: 25%;" />

   2. 通过依赖本地配置的形式进行开发，此方式无需获取strapi配置信息，手动修改配置文件内容即可。运行命令，`npm run skinDev` 

   根据配置，运行生成.env.skin文件，在.env.skin文件中，手动进行开发皮肤字段更改

   ```js
   VITE_THEME=003  值为需要开发的皮肤字段号
   ```

   

3. 项目运行

   1. 运行前保证主工程插件依赖包下载正确

   2. 第一次运行工程，使用 npm run updateSubModule 命令进行子仓库资源获取。获取到子仓库资源后，指定子仓库分支为pc_test分支，保证子仓库资源完整。子仓库目录为 src/assets/wsdy-fastsub ，

      <img src="https://p.ipic.vip/f94a7r.png" alt="image-20230413145608946" style="zoom:50%;" />

      例如现在开发6号皮肤，在子仓库操作如下：

      - 006文件夹下创建style文件夹，包含文件，index.scss,reset_element.scss 文件，参照005文件目录

      - 006文件夹下创建img文件夹，已005文件夹为标准进行指定目录指定图片下载

      - sites文件夹下添加ico图片，及logo图片

      - 在css_import.scss文件中导入创建的样式文件

        <img src="https://p.ipic.vip/vi1bvy.png" alt="image-20230413152445093" style="zoom:50%;" />

   3. 准备工作完成之后，项目运行npm run dev 或`npm run skinDev`（<u>**兼职人员采用此命令于行代码**</u>）通过(beforebuild/skinDevBeforeBuild)拉取站点信息，根据strapi配置进行选择，

   4. 例如，使用strapi的 p001配置，通过选择1来进行strapi的配置信息获取
      ![image-20230413152730854](https://p.ipic.vip/18qait.png)

   5. 手动配置皮肤的情况下，直接使用命令npm run skinDev生成.env.skin文件，在该文件中进行颜色配置

   6. 在index.scss文件中，进行当前开发皮肤的样式定义，及差异化css样式属性编写，具体参照001～005皮肤

   7. 开发过程中可使用的scss混编方法，参照mixin.scss文件

4. 建议开发步骤（所有图片下载尽量在当前模块开发过程中进行下载，文件目录参照已开发完皮肤路径存放）

   1. 首页面开发，包含图片下载，公共header + footer 开发 + 弹窗开发
   2. 登录界面开发，注册 + 登录 + 忘记密码界面 
   3. 侧边栏开发 + 论坛界面开发 + 下载界面开发 
   4. 游戏专题界面（体育，真人，电竞）开发，
   5. 游戏专题界面（电子，棋牌，彩票 ，捕鱼）开发
   6. 优惠专题界面开发 + 优惠弹窗开发
   7. 合营界面 + 联系我们界面 + 历史赞助界面 开发
   8. 游戏帮助界面 + 404界面开发
   9. 个人中心界面-存取款界面开发
   10. 个人中心界面 - 侧边栏各模块依次进行开发

5. 代码开发完成，推送仓库代码到pc_test分支即可（<u>**子仓库代码推送**</u>）

   





​      

​       

​       



​		
