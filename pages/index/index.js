Page({
  data: {
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
      let initFlag = false, initIndex = -1;
      days_style.forEach((item, index) => {
        if ((cur_day + 4) === item.day && (item.background === '#0ca42c' || item.background === '#0ca42c!important')) {
          initFlag = true;
          initIndex = index;
        }
      });
      if (!!initFlag) {
        // days_style.push({ month: 'current', day: cur_day + 4, color: 'white', background: '#aaaaaa' });
        days_style.splice(initIndex, 1, { month: 'current', day: cur_day + 4, color: 'white', background: '#aaaaaa' });
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
        }
      });
      // 这里需要判断一下其后第四位是停止行驶还是违法行驶，如果是停止行驶则直接显示为默认状态，如果是违法行驶则需要根据违法的后四位来判断是正常行驶还是停止行驶
      days_style.forEach((SItem, SIndex) => {
        if (SItem.day === cur_day + 4) {
          if (SItem.background === '#e25462' || SItem.background === '#e25462!important') {
            // 后第四位为停止行驶
            days_style.splice(SIndex, 1);
          } else if (SItem.background === '#aaaaaa' || SItem.background === '#aaaaaa!important') {
            // 后第四位为违法行驶
            days_style.splice(SIndex, 1, { month: 'current', day: cur_day + 4, color: 'white', background: '#0ca42c' });
          }
        }
      });
      // days_style.push({ month: 'current', day: cur_day, color: '#fff', background: '#0ca42c' });
    } else if (current_item.background === '#e25462' || current_item.background === '#e25462!important') {
      // 状态为停止
      days_style.forEach((TItem, TIndex) => {
        if (TItem.day === cur_day) {
          days_style.splice(TIndex, 1, { month: 'current', day: cur_day, color: 'white', background: '#aaaaaa' });
        }
      });
      let AFlag = false;
      days_style.forEach((AItem, AIndex) => {
        if (AItem.day === cur_day + 4) {
          AFlag = true;
        }
      });
      if (!AFlag) {
        days_style.push({ month: 'current', day: cur_day + 4, color: 'white', background: '#e25462' });
      } else {
        let nextFourDays = [];
        days_style.forEach((BItem, BIndex) => {
          for (let i = cur_day + 4; i < cur_day + 8; i++) {
            if (BItem.day === i && (BItem.background === '#0ca42c' || BItem.background === '#0ca42c!important')) {
              nextFourDays.push(i);
              days_style.splice(BIndex, 1, { month: 'current', day: i, color: 'white', background: '#aaaaaa' });
            }
          }
        });
        for (let j = cur_day + 4; j < cur_day + 8; j++) {
          if (!nextFourDays.includes(j)) {
            days_style.push({ month: 'current', day: j, color: 'white', background: '#e25462' });
          }
        }
      }
    } else if (current_item.background === '#aaaaaa' || current_item.background === '#aaaaaa!important') {
      // 当前为违法行驶
      days_style.forEach((DItem, DIndex) => {
        if (DItem.day === cur_day) {
          days_style.splice(DIndex, 1, { month: 'current', day: cur_day, color: 'white', background: '#e25462' });
        }
      });
      days_style.forEach((EItem, EIndex) => {
        // 如果其第四个为停止行驶，则去掉
        if (EItem.day === cur_day + 4 && (EItem.background === '#e25462' || EItem.background === '#e25462!important')) {
          days_style.splice(EIndex, 1);
        }
      });
    }

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