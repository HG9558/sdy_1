/* 全局过滤器定义 */
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import rTime from 'dayjs/plugin/relativeTime'
import { lang } from "@/i18n"

dayjs.locale('zh-cn')
dayjs.extend(rTime)

//- 格式化日期
export const formatDate = (time, type = "YYYY-MM-DDTHH:mm:ss") => {
  const currentTime = new Date(time).getTime()
  return dayjs(currentTime).format(type)
}

//- 格式化优惠活动日期
export const formatDiscountTime = item => {
  let timeOne = item.useStart.split(" ")[0];
  let timeTwo = item.useEnd.split(" ")[0];

  let backTimetwo = timeTwo
  let endTime = new Date(timeTwo);
  endTime = endTime.setDate(endTime.getDate() - 1);
  endTime = new Date(endTime);
  const nowtime = new Date().valueOf();
  const yearDate = 365 * 24 * 60 * 60 * 1000;
  let date2 = new Date(timeTwo);
  timeTwo = endTime.toLocaleDateString();
  timeTwo = timeTwo.replace(/\//g, "-");
  let time2 = date2.getTime();
  if (time2 - nowtime >= yearDate) {
    item.flag = 'exits';
    return lang('长期有效');

  } else if (Date.parse(backTimetwo) - Date.parse(new Date()) <= 0) {
    item.flag = 'previous';
		return lang('已过期');
	} else {
    item.flag = 'around'
    return timeOne + lang('至') + timeTwo;
  }
}

//- 获取。。。天前时间
export const getPreviousTime = item => {
  var a = dayjs()
  var b = dayjs(item)
  return a.to(b)
}

export const regMobile = mobile => {
  if (mobile.length > 7) {
    var new_mobile = mobile.substr(0, 3) + "****" + mobile.substr(7);
  }
  return new_mobile;
}

// 替换邮箱字符
export const regEmail = email => {
  if (String(email).indexOf("@") > 0) {
    var str = email.split("@"),
      _s = "";
    if (str[0].length > 3) {
      for (var i = 0; i < str[0].length - 3; i++) {
        _s += "*";
      }
    }
    var new_email = str[0].substr(0, 3) + _s + "@" + str[1];
  }
  return new_email;
}

export const handleRealName = str => {
  if (null != str && str != undefined && str != '') {
    if (str.length <= 3) {
      return str.substring(0, str.length - 1) + "*";
    } else if (str.length > 3 && str.length <= 6) {
      return str.substring(0, str.length - 2) + "**";
    } else if (str.length > 6) {
      return str.substring(0, 2) + "****" + str.substring(6, str.length);
    }
  } else {
    return "";
  }
}

export default {
  formatDate,
  formatDiscountTime,
  regMobile,
  regEmail,
  getPreviousTime,
  handleRealName
}
