

export function getUrlQueryString(names, urls) {
  urls = urls || window.location.href;
  urls && urls.indexOf("?") > -1 ? urls = urls.substring(urls.indexOf("?") + 1) : "";
  let reg = new RegExp("(^|&)" + names + "=([^&]*)(&|$)", "i");
  let r = urls ? urls.match(reg) : window.location.search.substr(1).match(reg);
  if (r != null && r[2] !== "") return unescape(r[2]);
  return "";
}
// 判断访问终端
export function browserVersion() {
  var u = navigator.userAgent;
  return {
    trident: u.indexOf("Trident") > -1, //IE内核
    presto: u.indexOf("Presto") > -1, //opera内核
    webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
    gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf("Android") > -1 || u.indexOf("Adr") > -1, //android终端
    iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
    iPad: u.indexOf("iPad") > -1, //是否iPad
    webApp: u.indexOf("Safari") == -1, //是否web应该程序，没有头部与底部
    weixin: u.indexOf("MicroMessenger") > -1, //是否微信 （2015-01-22新增）
    qq: u.match(/\sQQ/i) == " qq", //是否QQ
  };
}

export function browserVersion1() {
  var u = navigator.userAgent;
  return {
    trident: u.indexOf("Trident") > -1, //IE内核
    presto: u.indexOf("Presto") > -1, //opera内核
    webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
    gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    ios: u.indexOf("clientType=ios") > -1, //ios终端
    android: u.indexOf("clientType=android") > -1 || u.indexOf("Adr") > -1, //android终端
    iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
    iPad: u.indexOf("iPad") > -1, //是否iPad
    webApp: u.indexOf("Safari") == -1, //是否web应该程序，没有头部与底部
    weixin: u.indexOf("MicroMessenger") > -1, //是否微信 （2015-01-22新增）
    qq: u.match(/\sQQ/i) == " qq", //是否QQ
  };
}

// 安卓支付
export function androidPay(params) {
  window?.android?.pay(params);
}

// ios支付
function iosPay(params) {
  var url = "jsbridge://getShare?params=" + params;
  var iframe = document.createElement("iframe");
  iframe.style.width = "1px";
  iframe.style.height = "1px";
  iframe.style.display = "none";
  iframe.src = url;
  document.body.appendChild(iframe);
  setTimeout(function () {
    iframe.remove();
  }, 100);
}

// 支付
export function pay(params) {
  if (browserVersion1().android) {
    androidPay(params);
  }
  if (browserVersion1().ios) {
    iosPay(params);
  }
}
