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
  let halfamonth = day * 15;
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
    result = "" + parseInt(monthC) + '月前';
  }
  else if (weekC >= 1) {
    result = "" + parseInt(weekC) + '周前';
  }
  else if (dayC >= 1) {
    result = "" + parseInt(dayC) + '天前';
  }
  else if (hourC >= 1) {
    result = "" + parseInt(hourC) + '小时前';
  }
  else if (minC >= 1) {
    result = "" + parseInt(minC) + '分钟前';
  } else
    result = '刚刚';
  return result;
}
