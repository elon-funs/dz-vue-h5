export default [
    // 个人信息
    {
        path: '/userinfo',
        name: 'Userinfo',
        component: () => import('@/views/userinfo'),
        meta: {
            showBack: true,
            noHeader: true,
            nonavBar: true
        }
    },
    // 账号绑定
    {
        path: '/accountbd',
        name: 'Accountbd',
        component: () => import('@/views/accountbd'),
        meta: {
            title: 'app.account_bd',
            showBack: true,
            nonavBar: true
        }
    },
    {
        path: '/report',
        name: 'Report',
        component: () => import('@/views/report'),
        meta: {
            title: 'app.today_report',
            showBack: true,
            nonavBar: true
        }
    },
    {
        path: '/changebill',
        name: 'Changebill',
        component: () => import('@/views/changebill'),
        meta: {
            title: 'app.changeRecord',
            showBack: true,
            nonavBar: true
        }
    },
    // 邀请好友
    {
        path: '/invitefriends',
        name: 'Invitefriends',
        component: () => import('@/views/invitefriends'),
        meta: {
            title: 'app.yaoqinghy',
            nonavBar: true,
            showBack: true
        }
    },
    {
        path: '/teamreports',
        name: 'Teamreports',
        component: () => import('@/views/teamreports'),
        meta: {
            title: 'app.team_report',
            showBack: true,
            nonavBar: true
        }
    },
    {
        path: '/help',
        name: 'Help',
        component: () => import('@/views/help'),
        meta: {
            title: 'app.help_manual',
            showBack: true,
            nonavBar: true
        }
    },
    {
        path: '/creditcenter',
        name: 'Creditcenter',
        component: () => import('@/views/creditcenter'),
        meta: {
            title: 'app.credit_center',
            showBack: true,
            nonavBar: true
        }
    },
    {
        path: '/appdownload',
        name: 'Appdownload',
        component: () => import('@/views/appdownload'),
        meta: {
            title: 'app.app_download',
            showBack: true,
            nonavBar: true
        }
    },
    // 个人信息-银行卡
    {
        path: '/userinfo/yhkBangding',
        name: 'YhkBangding',
        component: () => import('@/views/userinfo/children/yhkBangding'),
        meta: {
            title: 'app.bank_binding',
            showBack: true,
            nonavBar: true
        }
    },
    // 个人信息-详细信息
    {
        path: '/userinfo/detailMsg',
        name: 'DetailMsg',
        component: () => import('@/views/userinfo/children/detailMsg'),
        meta: {
            title: 'app.detail_message',
            showBack: true,
            nonavBar: true
        }
    },
    // 个人信息-登录密码
    {
        path: '/userinfo/loginPassword',
        name: 'LoginPassword',
        component: () => import('@/views/userinfo/children/loginPassword'),
        meta: {
            title: 'app.update_loginpassword',
            showBack: true,
            nonavBar: true
        }
    },
    // 个人信息-资金密码
    {
        path: '/userinfo/fundPassword',
        name: 'FundPassword',
        component: () => import('@/views/userinfo/children/fundPassword'),
        meta: {
            title: 'app.update_fundpassword',
            showBack: true,
            nonavBar: true
        }
    },
    // 我的钱包
    {
        path: '/wallet',
        name: 'Wallet',
        component: () => import('@/views/wallet'),
        meta: {
            title: 'app.my_wallet',
            showBack: true,
            nonavBar: true
        }
    },
    // 充值详情
    {
        path: '/recharge',
        name: 'Recharge',
        component: () => import('@/views/recharge'),
        meta: {
            title: 'app.recharge_details',
            showBack: true,
            nonavBar: true
        }
    },
    // 充值
    {
        path: '/topup',
        name: 'Topup',
        component: () => import('@/views/topup'),
        meta: {
            title: 'app.topup',
            showBack: true,
            nonavBar: true
        }
    },
    // 提现
    {
        path: '/withdrawal',
        name: 'Withdrawal',
        component: () => import('@/views/withdrawal'),
        meta: {
            title: 'app.withdrawal',
            showBack: true,
            nonavBar: true
        }
    },
    {
        path: '/xinyong',
        name: 'Xinyong',
        component: () => import('@/views/creditcenter/page/xinyong'),
        meta: {
            title: 'app.credit_history',
            showBack: true,
            nonavBar: true
        }
    },
    {
        path: '/vedioCourse',
        name: 'VedioCourse',
        component: () => import('@/views/vedioCourse'),
        meta: {
            title: 'app.vedio_jc',
            requireAuth: true,
            showBack: true,
            nonavBar: true
        }
    },
    // 推广奖励
    {
        path: '/returnBate',
        name: 'ReturnBate',
        component: () => import('@/views/returnBate'),
        meta: {
            requireAuth: true,
            noHeader: true,
            showBack: true,
            nonavBar: true
        }
    },
    // 公司信息
    {
        path: '/companyInformation',
        name: 'CompanyInformation',
        component: () => import('@/views/my/child/companyInformation.vue'),
        meta: {
            title: 'app.companyInfo',
            requireAuth: true,
            showBack: true,
            nonavBar: true
        }
    },
    // 项目简介
    {
        path: '/projectDescription',
        name: 'ProjectDescription',
        component: () => import('@/views/my/child/projectDescription.vue'),
        meta: {
            title: 'app.project',
            requireAuth: true,
            showBack: true,
            nonavBar: true
        }
    }
]
