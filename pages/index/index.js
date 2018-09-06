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
    // 常见问题icon
    qIcon: '../../assets/icons/question.svg'
  },
  dayClick: function (event) {
    var that = this;
    // 当前日期
    var cur_day = event.detail.day;
    // 当前月份
    var cur_month = event.detail.month;
    let days_style = that.data.days_style;
    if (!days_style.length) {
      days_style.push({ month: 'current', day: cur_day, color: 'white', background: '#f5a8f0' });
      days_style.push({ month: 'current', day: cur_day + 4, color: 'white', background: '#d9534f' });
    } else {
      let flag = true; let cur_index = 0;
      days_style.forEach(function (item, index) {
        if (item.day === cur_day && item.color === 'white') {
          // days_style.splice(index, 1);
          cur_index = index;
          flag = flag && false;
        }
      });

      if (!!flag) {
        days_style.push({ month: 'current', day: cur_day, color: 'white', background: '#f5a8f0' });
        days_style.push({ month: 'current', day: cur_day + 4, color: 'white', background: '#d9534f' });
      } else {
        let nextFlag = false;
        // 判断当前按钮的颜色，如果是绿色，则颜色由绿变为透明颜色，
        // 如果颜色为停止颜色，那么当前按钮颜色变为违法的黄色
        // 如果点击违法，那么颜色由黄色变为停止颜色
        days_style.forEach(function (cell, idx) {
          if (cell.day === cur_day && cell.background === '#f5a8f0') {
            days_style.splice(cur_index, 1);
            days_style.splice(cur_index + 4, 1);
          }
        });
      }
      // flag ? days_style.push({ month: 'current', day: cur_day, color: 'white', background: '#f5a8f0' }) :
      //   days_style.splice(cur_index, 1);
    }



    this.setData({ days_style });
  },
  // 重置
  reset: function () {
    this.setData({
      days_style: []
    })
  },
  // 跳转至常见问题
  goQuestion: function() {
    wx.navigateTo({
      url: '../question/question',
    });
  },
  //跳转到智能出行页面
  goIntelligent: function() {
    wx.navigateTo({
      url: '../intelligent/intelligent',
    });
  }
});