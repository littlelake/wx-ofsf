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
  dayClick: function (event) {
    var that = this;
    // 当前日期
    var cur_day = event.detail.day;
    // 当前月份
    var cur_month = event.detail.month;
    let days_style = that.data.days_style;
    if (!days_style.length) {
      days_style.push({ month: 'current', day: cur_day, color: 'white', background: '#f5a8f0' });
    } else {
      let flag = true; let cur_index = 0;
      days_style.forEach(function (item, index) {
        if (item.day === cur_day && item.color === 'white') {
          // days_style.splice(index, 1);
          cur_index = index;
          flag = flag && false;
        }
      });

      flag ? days_style.push({ month: 'current', day: cur_day, color: 'white', background: '#f5a8f0' }) :
        days_style.splice(cur_index, 1);
    }
    // 如果当前点击的元素为已经选择了的，则恢复到初始状态

    this.setData({ days_style });
  },
  // 重置
  reset: function () {
    this.setData({
      days_style: []
    })
  }
});