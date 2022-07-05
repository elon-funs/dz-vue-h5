// import errText from './errText.json'
// import errTextvie from './errTextvi'
// import errTextEn from './errTextEn'

import { zhcode } from '@/lang/zh'
import { encode } from '@/lang/en'
import { escode } from '@/lang/es'
import { frcode } from '@/lang/fr'
import { arcode } from '@/lang/ar'

// 0 中文 1 越南文  2 英文
// const list = { 0: errText, 1: errTextvie, 2: errTextEn }
/* zh101状态码：  101-174  zh995 状态码：995-1000  zh1101  状态码：1101-1118
*  zh1130 状态码  1130-1132   zh11000 状态码 11000-11002  zh10003  状态码 10003-10004
*  zh11004状态码  11004-11008
*/
// function getLnguage (list) {
//     const opt = []
//     for (let i = 0; i < 3; i++) {
//         const res = []
//         const arr = list[i]
//         for (const key in arr) {
//             const num = Number(key.substring(2))
//             const codeArr = arr[key].map((info, v) => ({ code: `${v + num}`, info }))
//             res.push(...codeArr)
//         }
//         opt.push(res)
//     }
//     return opt
// }
// const codeList = getLnguage(list)
// const zHcodeMessageList = [
//     { code: '1036', info: '支付失败：平台风控,当前IP不在支持范围' },
//     { code: '162', info: '请按顺序购买会员等级' },
//     { code: '2104', info: '已经增加余额' },
//     { code: '11000', info: '该用户没有设置资金密码' },
//     { code: '401', info: '请重新登录' },
//     { code: '1111', info: '没有设置支付设定' },
//     { code: '1060', info: '操作失败' },
//     { code: '500', info: '服务器开小差，请稍后重试或联系客服人员' },
//     { code: '1120', info: '余额不足' },
//     { code: '11009', info: '存在提现订单' },
//     { code: '130002', info: '未满足单笔最低限额' },
//     { code: '130003', info: '请输入图形验证码' },
//     { code: '130004', info: '图形验证码错误' },
//     { code: '130005', info: '无效验证码' },
//     { code: '130006', info: '验证码错误' },
//     { code: '130007', info: '您的信用积分小于50，已被限制提现' },
//     { code: '1301', info: '上传失败' },
//     { code: '1303', info: '上传失败' },
//     ...codeList[0]
// ]

// const eNcodeMessageList = [
//     { code: '1036', info: '支付失败：平台风控,当前IP不在支持范围' },
//     { code: '162', info: '请按顺序购买会员等级' },
//     { code: '2104', info: 'balance added' },
//     { code: '11000', info: 'The user has not set the fund password' },
//     { code: '401', info: 'please login again' },
//     { code: '1111', info: 'No payment settings' },
//     { code: '1060', info: 'operation failed' },
//     { code: '500', info: 'the server went wrong, please try again later or contact customer service' },
//     { code: '1120', info: 'insufficient balance' },
//     { code: '11009', info: 'Cash withdrawal order exists' },
//     { code: '130002', info: 'Single minimum limit not met' },
//     { code: '130003', info: 'Please enter the graphic verification code' },
//     { code: '130004', info: 'Graphic verification code error' },
//     { code: '130005', info: 'Invalid verification code' },
//     { code: '130006', info: 'Verification code error' },
//     { code: '130007', info: 'Your credit score is less than 50, and cash withdrawal has been restricted' },
//     { code: '1301', info: 'Upload failed' },
//     { code: '1303', info: 'Upload failed' },
//     ...codeList[2]
// ]

// const vieCodeMessageList = [
//     { code: '1036', info: '支付失败：平台风控,当前IP不在支持范围' },
//     { code: '162', info: '请按顺序购买会员等级' },
//     { code: '2104', info: 'Số dư đã thêm' },
//     { code: '11000', info: 'Người dùng chưa đặt mật khẩu của quỹ' },
//     { code: '401', info: 'xin vui lòng đăng nhập lại' },
//     { code: '1111', info: 'Không có cài đặt thanh toán' },
//     { code: '1060', info: 'lỗi hệ thống' },
//     { code: '500', info: 'Máy chủ bị lỗi, vui lòng thử lại sau hoặc liên hệ với dịch vụ khách hàng' },
//     { code: '1120', info: 'thiếu cân bằng' },
//     { code: '11009', info: 'Lệnh rút tiền tồn tại' },
//     { code: '130002', info: 'Chưa đạt giới hạn tối thiểu duy nhất' },
//     { code: '130003', info: 'Vui lòng nhập mã hình ảnh xác minh' },
//     { code: '130004', info: 'Đã nhập sai mã hình ảnh xác minh' },
//     { code: '130005', info: 'Mã xác minh không hợp lý' },
//     { code: '130006', info: 'Mã xác minh bị lỗi' },
//     { code: '1301', info: 'Tải lên không thành công' },
//     { code: '130007', info: 'Thẻ tín dụng của anh ít hơn 50, và rút tiền mặt đã bị hạn chế' },
//     { code: '1303', info: 'Tải lên không thành công' },
//     ...codeList[1]
// ]

export const codeMessage = (code, lang = 'zh') => {
    const list = { zh: zhcode, en: encode, es: escode, fr: frcode, ar: arcode }[lang]
    // const opt = list.filter(items => {
    //     console.log(items.code, code)
    //     if (items.code === code) {
    //         return items
    //     }
    // })
    return list[code]
}
