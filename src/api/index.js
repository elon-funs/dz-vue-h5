import { get, post } from './axios'

// 登录接口
export const login = (params) => post({ url: 'app/login', params })
// 注册接口
export const register = (params) => post({ url: 'app/register', needLoadingValue: true, params })
// 获取短信邀请码
export const sendSmsCode = (params) => post({ url: 'app/sendSmsCode', params })

// 获取邮箱邀请码
export const sendMailCode = (params) => post({ url: 'app/sendMailCode', params })


export const CaptchaImage = (params) => get({ url: '/getCaptchaImage', params })

// 验证码
// export const getCaptchaImage = () => get({ url: 'getCaptchaImage' })
// 验证短信邀请码
// export const verificationSmsCode = (params) => post({ url: 'app/verificationSmsCode', params })
// 个人信息获取
// export const getUserInfo = () => get({ url: 'app/person/getUserInfo' })
// 退出登录
// export const loginOut = (params) => post({ url: 'app/person/loginout' }, params)
// 获取语言版本
export const paramGetChildBypcode = (params) => get({ url: 'param/getChildBypcode', params })
// 公告
export const getSysNotice = (params) => get({ url: '/user/getSysNotice', params })
// 查询会员等级配置
export const levelConfig = () => get({ url: 'member/levelConfig', cacheType: 'ss' })
// 当前会员等级
export const memberLevel = () => get({ url: 'member/memberLevel', needLoadingValue: true, cacheType: 'ss' })
// 任务导航
export const categoryList = (params) => get({ url: 'taskApp/categoryList', params, needLoadingValue: true, cacheType: 'ss' })
// 任务列表
export const taskList = (params) => get({ url: 'taskApp/taskList', params })
// 任务详情
export const taskDetail = (params) => get({ url: 'taskApp/taskDetail', params })
// 领取任务
export const receiveTask = (params) => post({ url: 'taskApp/receiveTask', needLoadingValue: true, params })
// 任务清单-进行中
export const memOrderList = (params) => get({ url: 'taskApp/memOrderList', params })
// 商家发布任务
export const pubTask = (params) => post({ url: 'taskApp/pubTask', params, header: 'json' })
// 审核任务
export const waitReceiveList = (params) => get({ url: 'taskApp/waitReceiveList', params })
// 审核详情
export const verifyTask = (params) => get({ url: 'taskApp/verifyTask', params })
// 发布管理
// export const waitReceiveList = (params) => get({ url: 'waitReceiveList', needLoadingValue: true, params })
// 第三方充值
export const paySetInfo = (params) => get({ url: 'recharge/paySetInfo', needLoadingValue: true, params })
// 第三方——网银充值
export const wy_topup = (params) => post({ url: 'http://pay.chatsystemapp.com:5860/payment/paymentRequestByUser.json', needLoadingValue: true, params, header: 'json' })
// 获取人工充值列表
export const getBankList = () => get({ url: 'recharge/getBankList', needLoadingValue: true })
// 人工充值——网银
export const doAgentPay = (params) => post({ url: 'recharge/v3/doAgentPay', needLoadingValue: true, params })
// 充值提现记录
export const myIncomeAndExpensesList = (params) => get({ url: 'money/myIncomeAndExpensesList', params })
// 线下充值审核
export const orderList = (params) => get({ url: 'memberorder/orderList', params })
// 提现审核
export const withdrawalorderList = (params) => get({ url: 'memberorder/withdrawalorderList', params })
// 银行卡列表
export const banklist = (params) => get({ url: 'param/getChild', needLoadingValue: true, params })
// 钱包地址绑定
export const doSetAnchorBank = (params) => post({ url: 'incarnate/doSetAnchorBank', needLoadingValue: true, params })
// 钱包地址修改
export const resetAnchorBank = (params) => post({ url: 'incarnate/resetAnchorBank', needLoadingValue: true, params })
// 修改登录密码
export const updatePassword = (params) => post({ url: 'app/updatePassword', needLoadingValue: true, params })
// 查询是否绑卡和设置资金密码
export const findPayPassAndAccount = () => get({ url: 'person/findPayPassAndAccount' })
// 设置资金密码
export const savePayPassword = (params) => post({ url: 'person/savePayPassword', needLoadingValue: true, params })
// 修改资金密码
export const updatePayPassword = (params) => post({ url: 'person/updatePayPassword', needLoadingValue: true, params })
// 用户余额
export const doReflushGoldnumBalance = () => get({ url: 'person/doReflushGoldnumBalance' })
// 查询各类任务账号是否绑定
export const bindCategoryName = (params) => get({ url: 'member/bindCategoryName', params })
// 绑定各类任务账号
export const bindRelated = (params) => post({ url: 'member/bindRelated', needLoadingValue: true, params })
// 申请提现
export const doIncarnate = (params) => post({ url: 'incarnate/v2/doIncarnate', needLoadingValue: true, params })
// 公告
export const InfSysnoticeList = (params) => get({ url: 'msg/InfSysnoticeList', params })
// 个人中心数据统计
export const myPageCount = (params) => get({ url: 'money/myPageCount', params })
// 收入支出
export const getAccountRecord = (params) => get({ url: 'money/getAccountRecord', params })

//获取币种类型
export const coinList = (params) => post({ url: 'pay/coinList', needLoadingValue: true, params })
// 获取充值地址
export const moneyAddress = (params) => post({ url: 'pay/moneyAddress', needLoadingValue: true, params })
// 充值接口
export const submitRecharge = (params) => post({ url: 'pay/submitRecharge', needLoadingValue: true, params })



// 提现记录
export const withdrawalOrderList = (params) => get({ url: 'memberorder/withdrawalOrderList', params })
// 充值记录
export const rechargeOrderList = (params) => get({ url: 'memberorder/rechargeOrderList', params })
// 充值会员
export const topupVip = (params) => post({ url: 'member/buyVip', needLoadingValue: true, params })
// 上传图片
export const uploadsImg = (params) => post({ url: 'uploadFiles', params, header: 'fromData' })
// 排行榜
export const ranking = () => get({ url: 'member/ranking' })
// 提交完成任务
export const submitTask = (params) => post({ url: 'taskApp/submitTask', needLoadingValue: true, params })
// 轮播图
export const lunboList = (params) => get({ url: 'ad/adList', params })
// 删除任务
export const editTaskOrder = (params) => post({ url: 'taskApp/editTaskOrder', needLoadingValue: true, params })
// 信用说明
export const xyshuoming = () => get({ url: 'param/getNote', needLoadingValue: true })
// 获取各种配置
export const systemConfig = (params) => get({ url: 'param/getChildBypcode', params })
// 信用流水
export const memberCreditDetailLst = (params) => get({ url: 'member/memberCreditDetailLst', needLoadingValue: true, params })
// 会员当前信用
export const getMemberCredit = () => get({ url: 'member/getMemberCredit', needLoadingValue: true })
// 团队报表
export const getTeamReport = (params) => get({ url: 'member/appTeamReport', needLoadingValue: true, params })
// 审核任务-编辑
// export const editTask = (params) => post({ url: 'taskApp/editTask', needLoadingValue: true, params })
// 应用参数
// export const getChild = (params) => get({ url: 'param/getChild', needLoadingValue: true, params })
// 调用接口统计注册人数
export const buryingPointTransform = (params) => get({ url: 'buryingPoint/transform', params })
// 日结报表
export const todayReport = () => get({ url: 'member/MemberDayReport', needLoadingValue: true })
// 我的团队
export const myTuandui = (params) => get({ url: 'member/getTeamReport', params })
// 帮助手册
export const helpManual = (params) => get({ url: 'helpManual/list', needLoadingValue: true, cacheType: 'ss', params })
// 获取充值金额
export const getVipAmount = (params) => get({ url: 'member/getVipAmount', needLoadingValue: true, params })
// 订单任务接口
export const openLink = (params) => get({ url: 'taskApp/openLink', params })

// 充值地址
export function getMoneyAddress(params) {
    return get({ url: 'money/moneyAddress', params })
}

// 退出
export function logout(params) {
    return post({ url: 'app/logout', params })
}
