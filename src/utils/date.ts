
/* 全局过滤器定义 */
import { lang, language } from '@/i18n'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import 'dayjs/locale/vi'
import 'dayjs/locale/ms'
import rTime from 'dayjs/plugin/relativeTime'
dayjs.locale(language === 'zh' ? 'zh-cn' : language)
dayjs.extend(rTime)

//- 格式化优惠活动日期
export const formatDiscountTime = (item: DiscountType.ActivityListResPageList) => {
  let timeOne = item.useStart.split(" ")[0];
  let timeTwo = item.useEnd.split(" ")[0];

  let backTimetwo = timeTwo
  let endTime: Date | number = new Date(timeTwo);
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
    return lang("长期有效");

  } else if (Date.parse(backTimetwo) - Date.parse(new Date().toString()) <= 0) {
    item.flag = 'previous';
    return lang("已过期");
  } else {
    item.flag = 'around'
    return timeOne + lang("至") + timeTwo;
  }
}

//- 获取。。。天前时间
export const getPreviousTime = (_: string) => {
  var a = dayjs()
  var b = dayjs(_)
  return a.to(b)
}

//- 格式化日期
export const formatDate = (time: number | string | Date, type = "YYYY-MM-DDTHH:mm:ss") => {
  const currentTime = new Date(time).getTime()
  return dayjs(currentTime).format(type)
}