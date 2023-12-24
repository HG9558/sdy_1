import Vue from 'vue'
import i18n from '../i18n'
import 'element-ui/lib/theme-chalk/index.css'
import ElementLocale from 'element-ui/lib/locale'

import {
  Button,
  ButtonGroup,
  Input,
  Select,
  Option,
  Dialog,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Table,
  TableColumn,
  Pagination,
  Loading,
  Cascader,
  Slider,
  InputNumber,
  MessageBox,
  Message,
  Tooltip,
  Steps,
  Upload,
  Row,
  Col,
  Divider,
  Carousel,
  CarouselItem,
  Progress,
  DatePicker,
  Radio,
  RadioGroup,
  RadioButton,
  Popover,
  Scrollbar,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Backtop,
  Collapse,
  CollapseItem,
  Switch
} from 'element-ui'

Vue.use(Button)
Vue.use(Backtop)
Vue.use(ButtonGroup)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Loading)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Cascader)
Vue.use(Slider)
Vue.use(InputNumber)
Vue.use(Tooltip)
Vue.use(Steps)
Vue.use(Upload)
Vue.use(Row)
Vue.use(Col)
Vue.use(Divider)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Progress)
Vue.use(DatePicker)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Popover)
Vue.use(Scrollbar)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Switch)

ElementLocale.i18n((key, value) => i18n.t(key, value))

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
