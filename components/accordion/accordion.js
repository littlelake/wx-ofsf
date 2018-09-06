Component({
  properties: {
    // 标题
    title: {
      type: String,
      value: ''
    }
  },
  data: {
    "upIcon": './up.svg',
    "downIcon": './down.svg',
    status: true
  },
  methods: {
    toggle: function () {
      const _this = this;
      _this.setData({
        status: !_this.data.status
      });
    }
  }
})