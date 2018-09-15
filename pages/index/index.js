Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    days_style: [],
  },
  dayClick: function (e) {
    const that = this;
    // 当前日期
    const cur_day = e.detail.day;
    // 当前月份
    const cur_month = e.detail.month + '';
    let days_style = that.data.days_style;

    /** 没有状态颜色 #4a4f74 */
    /** 正常行驶状态颜色 #0ca42c */
    /** 停止行驶状态颜色 #e25462 */
    /** 违法行驶状态颜色 #aaaaaa */
    const current_item = e.detail;
    // console.log(e.detail);

    if (current_item.background === 'transparent' || current_item.background === 'transparent!important') {
      // 没有状态
      // console.log("init: " + cur_day, days_style);
      // 显示为正常行驶
      days_style.push({ month: 'current', day: cur_day, color: 'white', background: '#0ca42c' });

      // 判断days_style中是否有当前点击按钮后四位的数
      let initFlag = false;
      days_style.forEach((item, index) => {
        if ((cur_day + 4) === item.day && (item.background === '#0ca42c' || item.background === '#0ca42c!important')) {
          initFlag = true;
        }
      });
      if (!!initFlag) {
        days_style.push({ month: 'current', day: cur_day + 4, color: 'white', background: '#aaaaaa' });
      } else {
        days_style.push({ month: 'current', day: cur_day + 4, color: 'white', background: '#e25462' });
      }
    } else if (current_item.background === '#0ca42c' || current_item.background === '#0ca42c!important') {
      // 状态为正常行驶
      // 显示为默认状态
      days_style.forEach((FItem, FIndex) => {
        // console.log(FItem.day, cur_day, FIndex);
        if (FItem.day === cur_day) {
          days_style.splice(FIndex, 1);
          // if (!!this.findIsExist(days_style, cur_day + 4).flag) {
          //   days_style.splice(this.findIsExist(days_style, cur_day + 4).index, 1);
          // }
          // 这里需要判断一下其后第四位是停止行驶还是违法行驶，如果是停止行驶则直接显示为默认状态，如果是违法行驶则显示为正常行驶
          days_style.forEach((SItem, SIndex) => {
            if (SItem.day === cur_day + 4) {
              console.log(SItem);
              if (SItem.background === '#e25462' || SItem.background === '#e25462!important') {
                // 后第四位为停止行驶
                days_style.splice(SIndex, 1);
              } else if (SItem.background === '#aaaaaa' || SItem.background === '#aaaaaa!important') {
                // 后第四位为违法行驶
                days_style.splice(SIndex, 1, { month: 'current', day: cur_day, color: 'white', background: '#0ca42c' });
              }
            }
          });
        }
      });
      // days_style.push({ month: 'current', day: cur_day, color: '#fff', background: '#0ca42c' });
    }

    // if (!days_style.length) {
    //   days_style.push({ month: 'current', day: cur_day, color: '#e6782b', background: '#9dd6d7' });
    //   days_style.push({ month: 'current', day: cur_day + 4, color: 'white', background: '#d9534f' });
    // } else {
    //   let flag = true; let cur_index = 0;
    //   days_style.forEach(function (item, index) {
    //     if (item.day === cur_day && item.color === 'white') {
    //       // days_style.splice(index, 1);
    //       cur_index = index;
    //       flag = flag && false;
    //     }
    //   });

    //   if (!!flag) {
    //     days_style.push({ month: 'current', day: cur_day, color: '#e6782b', background: '#9dd6d7' });
    //     days_style.push({ month: 'current', day: cur_day + 4, color: 'white', background: '#d9534f' });
    //   } else {
    //     let nextFlag = false;
    //     // 判断当前按钮的颜色，如果是绿色，则颜色由绿变为透明颜色，
    //     // 如果颜色为停止颜色，那么当前按钮颜色变为违法的黄色
    //     // 如果点击违法，那么颜色由黄色变为停止颜色
    //     days_style.forEach(function (cell, idx) {
    //       if (cell.day === cur_day && cell.background === '#f5a8f0') {
    //         days_style.splice(cur_index, 1);
    //         days_style.splice(cur_index + 4, 1);
    //       }
    //     });
    //   }
    //   // flag ? days_style.push({ month: 'current', day: cur_day, color: 'white', background: '#f5a8f0' }) :
    //   //   days_style.splice(cur_index, 1);
    // }



    this.setData({ days_style });
  },

  // 当前元素在days_style中是否存在
  findIsExist: function (days, day) {
    let flag = false, selectIndex = -1;
    !!days.length && days.forEach((item, index) => {
      if (item.day === day) {
        flag = true;
        selectIndex = index;
      }
    });
    return {
      flag,
      index: selectIndex
    };
  },

  // 重置
  reset: function () {
    this.setData({
      days_style: []
    })
  },
  // 跳转至常见问题
  goQuestion: function () {
    wx.navigateTo({
      url: '../question/question',
    });
  },
  //跳转到智能出行页面
  goIntelligent: function () {
    wx.navigateTo({
      url: '../intelligent/intelligent',
    });
  }
});