'use strict'
exports.__esModule = true
// exports.default = void 0
var _default = {
    name: 'tên',
    tel: 'Điện thoại',
    save: 'Bảo tồn',
    confirm: 'Xác nhận',
    cancel: 'Hủy bỏ',
    delete: 'Xoá bỏ',
    complete: 'Hoàn thành',
    loading: 'Đang tải …',
    telEmpty: 'Xin vui lòng điền vào điện thoại',
    nameEmpty: 'Xin vui lòng điền tên',
    nameInvalid: 'Xin nhập đúng tên',
    confirmDelete: 'Chắc chắn bạn muốn xóa',
    telInvalid: 'Vui lòng nhập đúng số điện thoại',
    vanCalendar: {
        end: 'Kết thúc',
        start: 'Bắt đầu',
        title: 'Ngày chọn',
        confirm: 'Chắc chắn',
        startEnd: 'Bắt đầu/kết thúc',
        weekdays: ['Vào ngày', 'một', 'Thứ hai', 'ba', 'bốn', '5', 'sáu'],
        monthTitle: function monthTitle (year, month) {
            return year + '\u5E74' + month + '\u6708'
        },
        rangePrompt: function rangePrompt (maxRange) {
            return '\u9009\u62E9\u5929\u6570\u4E0D\u80FD\u8D85\u8FC7 ' + maxRange + ' \u5929'
        }
    },
    vanContactCard: {
        addText: 'Thêm liên lạc'
    },
    vanContactList: {
        addText: 'Mới liên lạc'
    },
    vanPagination: {
        prev: 'Trang trước',
        next: 'Trang tiếp theo'
    },
    vanPullRefresh: {
        pulling: 'Kéo xuống để cập nhật …',
        loosing: 'Thả và làm mới.'
    },
    vanSubmitBar: {
        label: 'Tất cả:'
    },
    vanCoupon: {
        unlimited: 'Không có ngưỡng cửa',
        discount: function discount (_discount) {
            return _discount + '\u6298'
        },
        condition: function condition (_condition) {
            return '\u6EE1' + _condition + '\u5143\u53EF\u7528'
        }
    },
    vanAddressEdit: {
        area: 'Khu vực',
        postal: 'Mã bưu điện',
        areaEmpty: 'Hãy chọn khu vực',
        addressEmpty: 'Xin điền địa chỉ chi tiết',
        postalEmpty: 'Không đúng định dạng mã bưu điện',
        defaultAddress: 'Đặt địa chỉ nhận hàng mặc định',
        telPlaceholder: 'Người nhận hàng số điện thoại',
        namePlaceholder: 'Người nhận hàng tên',
        areaPlaceholder: 'Chọn tỉnh/thành phố/quận'
    },
    vanAddressEditDetail: {
        label: 'Địa chỉ chi tiết',
        placeholder: 'Biển số nhà trên đường phố, số phòng trên tầng và nhiều thông tin khác'
    },
    vanAddressList: {
        add: 'Địa chỉ mới'
    }
}
exports.default = _default
