import Vue from 'vue'
import dragBall from 'vue-drag-ball'
import infiniteScroll from 'vue-infinite-scroll'
import { Swipe, SwipeItem, Lazyload, Icon, NoticeBar, Grid, GridItem, Field, CellGroup, Button, Toast, Loading, Dialog, Popup, Tab, Tabs, ActionSheet, Cell, Uploader, Divider, PullRefresh, DatetimePicker, Rate, List, RadioGroup, Radio, PasswordInput, NumberKeyboard, NavBar, Row, Col, Overlay, ImagePreview, CountDown, Collapse, CollapseItem, Notify, DropdownMenu, DropdownItem, Checkbox, CheckboxGroup, Form, Image as VanImage, Step, Steps, Picker } from 'vant'
// 第三方拖拽
Vue.use(dragBall)
// 第三方上拉加载
Vue.use(infiniteScroll)
// 轮播
Vue.use(Swipe).use(SwipeItem)
// 懒加载
Vue.use(Lazyload)
// 图标
Vue.use(Icon)
// 通知栏
Vue.use(NoticeBar)
// 九宫格
Vue.use(Grid).use(GridItem)
// 输入框
Vue.use(Field)
// 单元格
Vue.use(Cell)
// 容器
Vue.use(CellGroup)
// 按钮
Vue.use(Button)
// 轻提示
Vue.use(Toast)
// loading
Vue.use(Loading)
// popup 弹出层
Vue.use(Popup)
// Dialog 弹出框
Vue.use(Dialog)
// Tab 标签页
Vue.use(Tab).use(Tabs)
// ActionSheet 上拉菜单
Vue.use(ActionSheet)
// 图片上传
Vue.use(Uploader)
// 分割线
Vue.use(Divider)
// 上拉刷新
Vue.use(PullRefresh)
// 时间菜单
Vue.use(DatetimePicker)
// 星级
Vue.use(Rate)
// 下拉加载
Vue.use(List)
// radio单选框
Vue.use(RadioGroup)


Vue.use(Radio)
// 密码输入和键盘显示
Vue.use(PasswordInput).use(NumberKeyboard)
// NavBar 导航栏
Vue.use(NavBar)
// 布局组件
Vue.use(Row).use(Col)
// 遮罩层
Vue.use(Overlay)
// 图片预览
Vue.use(ImagePreview)
// 倒计时
Vue.use(CountDown)
// Collapse 折叠面板
Vue.use(Collapse).use(CollapseItem)
// 消息提示
Vue.use(Notify)
// 下拉菜单
Vue.use(DropdownMenu).use(DropdownItem)
// 单选框
Vue.use(Checkbox).use(CheckboxGroup)
// from表单
Vue.use(Form)
// img
Vue.use(VanImage)
// 步骤条
Vue.use(Step)
Vue.use(Steps)
// 选择器
Vue.use(Picker)
