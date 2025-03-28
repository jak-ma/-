// utils/util.js

/**
 * 格式化时间
 * @param {Date} date 日期对象
 * @param {String} format 格式字符串，如'YYYY-MM-DD HH:mm:ss'
 * @return {String} 格式化后的时间字符串
 */
const formatTime = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) {
    date = new Date();
  }
  if (typeof date === 'string') {
    date = new Date(date.replace(/-/g, '/'));
  }
  if (typeof date === 'number') {
    date = new Date(date);
  }
  
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  
  format = format.replace(/YYYY/g, year);
  format = format.replace(/MM/g, formatNumber(month));
  format = format.replace(/DD/g, formatNumber(day));
  format = format.replace(/HH/g, formatNumber(hour));
  format = format.replace(/mm/g, formatNumber(minute));
  format = format.replace(/ss/g, formatNumber(second));
  
  return format;
};

/**
 * 格式化数字
 * @param {Number} n 数字
 * @return {String} 格式化后的字符串，个位数前补0
 */
const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

/**
 * 计算两个日期之间的天数差
 * @param {Date|String|Number} date1 日期1
 * @param {Date|String|Number} date2 日期2
 * @return {Number} 天数差
 */
const daysBetween = (date1, date2) => {
  if (typeof date1 === 'string') {
    date1 = new Date(date1.replace(/-/g, '/'));
  }
  if (typeof date2 === 'string') {
    date2 = new Date(date2.replace(/-/g, '/'));
  }
  if (typeof date1 === 'number') {
    date1 = new Date(date1);
  }
  if (typeof date2 === 'number') {
    date2 = new Date(date2);
  }
  
  // 去除时分秒的影响，只保留日期部分
  date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  
  // 计算差值
  const diff = Math.abs(date1.getTime() - date2.getTime());
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

/**
 * 获取年龄
 * @param {String} birthDate 出生日期，格式：YYYY-MM-DD
 * @return {Number} 年龄
 */
const getAge = (birthDate) => {
  if (!birthDate) return 0;
  
  const birth = new Date(birthDate.replace(/-/g, '/'));
  const now = new Date();
  
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * 检查是否为空值
 * @param {*} value 要检查的值
 * @return {Boolean} 是否为空
 */
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
};

/**
 * 生成UUID
 * @return {String} UUID字符串
 */
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * 深拷贝对象
 * @param {Object} obj 要拷贝的对象
 * @return {Object} 拷贝后的新对象
 */
const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    const arr = [];
    for (let i = 0; i < obj.length; i++) {
      arr[i] = deepClone(obj[i]);
    }
    return arr;
  }
  
  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepClone(obj[key]);
    }
  }
  return newObj;
};

module.exports = {
  formatTime,
  formatNumber,
  daysBetween,
  getAge,
  isEmpty,
  generateUUID,
  deepClone
};
