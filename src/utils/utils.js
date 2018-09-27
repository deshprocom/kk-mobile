import { snakeCase } from 'lodash';
import { stringify } from 'qs';

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
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
