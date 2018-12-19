
/**
 ** 封装axios方法，利于复用 **
 **/

import Qs from 'qs' //POST时 将参数转换为query参数
import axios from 'axios';
import store from '../store'
import router from '../router'
import {Message} from 'iview';
// 弹窗函数 *******************
const showTip = function (msg, time) {
  Message.destroy()
  Message.warning({
    content: msg,
    duration: time ? time : 0
  });
  Message.destroy()

};

// 设置初始参数 ****************
axios.defaults.timeout = 10000;
axios.defaults.baseURL = 'http://api.#####.com';
axios.defaults.withCredentials = true;
 // axios.defaults.baseURL = '/api_base';
function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    let contentType = 'application/json;charset=UTF-8';
    if(url == '/login'){
      data = Qs.stringify(data);
      contentType = 'application/x-www-form-urlencoded'
    }
    let head ={
      headers: {'Content-Type': contentType, 'X-CSRF-TOKEN': store.state.token}
    }
    axios.post(url, data, head)
      .then(response => {
        const resData = response.data;
        if(resData.code == 200){
          resolve(resData.data);
        }else if(resData.code == 302){
         showTip('请重新登录');  
        }else if(resData.code == 303){
          showTip('账号异常')
        }
      }, reject => {
        showTip('网络错误,请稍后重试')
      })
  })
}
function filtName(txt) {
  if(txt == null){
    return ' '
  }
  if(txt.length < 4 ){
    return txt
  }
  return txt.slice(0,4) + '...'
}
function filtNunm(num) {
  if(num >= 10000){
    return (num / 10000).toFixed(1) + 'W'
  }
  return num
}
function setAutoSize() {
  let deviceWidth = document.documentElement.clientWidth;
  if (deviceWidth > 750) {
    deviceWidth = 750;
  };
  document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
};
// 返回模块 *****************



function getTimestamp(dateTimeStamp) { //数据时间戳 int
 /* let newDate = new Date();
  let timestamp = Date.parse(new Date());
  old_time = parseInt(old_time / 1000);
  timestamp = timestamp / 1000;
  let year = newDate.getFullYear();
  let timer = timestamp - old_time;
  let htmlTime = '';
  newDate.setTime(old_time * 1000);
  let y = newDate.getFullYear();
  let m = newDate.getMonth();
  let d = newDate.getDate();
  d = d < 10 ? '0' + d : d;
  m = m < 9 ? '0' + (m + 1) : m;
  let all_time = y + '/ ' + (m + 1) + '/' + d;

  if (timer >= 3600 * 24 * 365) {
    htmlTime =  all_time;
  } else if (timer >= 3600 * 24) {
    htmlTime = year == y ? m  + '/' + d : all_time;
  } else if (timer >= 3600) {
    htmlTime = parseInt(timer / 3600);
    htmlTime = htmlTime + ' h' + ' 前'
  } else if (timer >= 60) {
    htmlTime =  parseInt(timer / 60);
    htmlTime =  htmlTime + ' min' + ' 前'
  } else if (timer >= 0) {
    htmlTime = timer
    htmlTime =  htmlTime + ' s' + ' 前'
  } else {
    htmlTime = '0';
    htmlTime =  htmlTime + ' s' + ' 前'
  }
  return htmlTime;
}*/
 let minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
   let hour = minute * 60;
   let day = hour * 24;
   let week = day * 7;
   //let halfamonth = day * 15;
   let month = day * 30;
   let now = new Date().getTime(); //获取当前时间毫秒 console.log(now)
   let diffValue = now - dateTimeStamp;//时间差
   if(diffValue < 0){ return "刚刚"; }
   let minC = diffValue/minute;//计算时间差的分，时，天，周，月
   let hourC = diffValue/hour;
   let dayC = diffValue/day;
   let weekC = diffValue/week;
   let monthC = diffValue/month;
   if(monthC >= 1 && monthC <= 3){
     return  " " + parseInt(monthC) + "月前"
   }else if(weekC >= 1 && weekC <= 3){
     return  " " + parseInt(weekC) + "周前"
   }else if(dayC >= 1 && dayC <= 6){
     return " " + parseInt(dayC) + "天前"
   }else if(hourC >= 1 && hourC <= 23){
     return " " + parseInt(hourC) + "小时前"
   }else if(minC >= 1 && minC <= 59){
     return " " + parseInt(minC) + "分钟前"
   }else if(diffValue >= 0 && diffValue <= minute){
     return  "刚刚"
   }else {
     let datetime = new Date();
     datetime.setTime(dateTimeStamp);
     let Nyear = datetime.getFullYear();
     let Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
     let Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
     let Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
     let Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
     let Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
     return  Nyear + "-" + Nmonth + "-" + Ndate+' '+Nhour + ":" +Nminute + ":" + Nsecond
   }
}


export default {
  get,
  post,
  setAutoSize,
  filtName,
  filtNunm,
  getTimestamp
};
