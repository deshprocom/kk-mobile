import { snakeCase } from 'lodash';
import { stringify } from 'qs';

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}

/**
 * 日志输出
 * @param msgs
 */
export function logMsg(...msgs) {
   console.log(...msgs)
}
export function toSnakeToJson(object) {
  return stringify(objectKeyToSnake(object))
}

export function objectKeyToSnake(oldObject) {
  let newObject;

  if (
    !oldObject ||
    typeof oldObject !== "object" ||
    !Object.keys(oldObject).length
  ) {
    return oldObject;
  }

  if (Array.isArray(oldObject)) {
    newObject = oldObject.map(element =>
      objectKeyToSnake(element, snakeCase)
    );
  } else {
    newObject = {};
    Object.keys(oldObject).forEach(oldKey => {
      const newKey = snakeCase(oldKey);
      newObject[newKey] = objectKeyToSnake(oldObject[oldKey], snakeCase);
    });
  }

  return newObject;
}

export function strNotNull(str) {
  if (str === undefined || str === null || str.length === 0 || str === 'undefined') {
    return false;
  }
  else {
    return true;
  }
}

export function getDateDiff(dateTimeStamp) {

  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  // let halfamonth = day * 15;
  let month = day * 30;
  let now = new Date().getTime();

  let diffValue = now - dateTimeStamp * 1000;
  if (diffValue < 0) {
    return;
  }
  let monthC = diffValue / month;
  let weekC = diffValue / (7 * day);
  let dayC = diffValue / day;
  let hourC = diffValue / hour;
  let minC = diffValue / minute;
  let result = '';
  if (monthC >= 1) {
    result = "" + parseInt(monthC, 10) + '月前';
  }
  else if (weekC >= 1) {
    result = "" + parseInt(weekC, 10) + '周前';
  }
  else if (dayC >= 1) {
    result = "" + parseInt(dayC, 10) + '天前';
  }
  else if (hourC >= 1) {
    result = "" + parseInt(hourC, 10) + '小时前';
  }
  else if (minC >= 1) {
    result = "" + parseInt(minC, 10) + '分钟前';
  } else
    result = '刚刚';
  return result;
}

export function div(a, b) {
  var c, d, e = 0,
    f = 0;
  try {
    e = a.toString().split(".")[1].length;
  } catch (g) {
  }
  try {
    f = b.toString().split(".")[1].length;
  } catch (g) {
  }
  return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}

/**
 * 乘法精度问题
 * @param num1
 * @param num2
 * @returns {number}
 */
export function mul(num1, num2) {
  let m = 0, s1 = num1.toString(), s2 = num2.toString();
  try {
    m += s1.split(".")[1].length
  } catch (e) {
  }
  try {
    m += s2.split(".")[1].length
  } catch (e) {
  }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

export function add(a, b) {
  var c, d, e;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
}

export function sub(a, b) {
  var c, d, e;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
}

Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

export function utcDate(time,formate){
  let date = new Date(mul(time,1000));
  return date.Format(formate);
}

export function formatCurrency(num) {
  console.log("dhsjds",num)
  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num))
    num = "0";
  let sign = (num === (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  let cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10)
    cents = "0" + cents;
  for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num = num.substring(0, num.length - (4 * i + 3)) + ',' +
      num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '-') + num + '.' + cents);
}
/*对象是否为空对象*/
export function isEmptyObject(e) {
  let t;
  for (t in e)
    return !1;
  return !0
}
