// pages/health/edit/edit.js
const api = require('../../services/api');

Page({
  data: {
    healthTypes: [
      { name: '血压', value: 'bloodPressure' },
      { name: '血糖', value: 'bloodSugar' },
      { name: '心率', value: 'heartRate' },
      { name: '体温', value: 'temperature' }
    ],
    selectedType: {},
    date: '',
    isEdit: false,
    healthDataId: null
  },

  // 页面加载
  onLoad(options) {
    if (options.id) {
      this.setData({
        isEdit: true,
        healthDataId: options.id
      });
      this.loadHealthData(options.id);
    }
  },

  // 加载健康数据
  loadHealthData(id) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });

    api.health.getDetail(id)
      .then(res => {
        wx.hideLoading();
        this.setData({
          selectedType: this.data.healthTypes.find(
            type => type.value === res.data.type
          ),
          date: res.data.time
        });
      })
      .catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: err.message || '加载失败',
          icon: 'none'
        });
      });
  },

  // 类型选择
  onTypeChange(e) {
    const index = e.detail.value;
    this.setData({
      selectedType: this.data.healthTypes[index]
    });
  },

  // 日期选择
  onDateChange(e) {
    this.setData({
      date: e.detail.value
    });
  },

  // 表单提交
  onSubmit(e) {
    const { value } = e.detail.value;
    const { selectedType, date } = this.data;

    // 输入验证
    if (!selectedType.value || !value || !date) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    // 准备数据
    const healthData = {
      type: selectedType.value,
      value: Number(value),
      time: date
    };

    // 显示加载中
    wx.showLoading({
      title: '保存中...',
      mask: true
    });

    // 保存数据
    const savePromise = this.data.isEdit
      ? api.health.update(this.data.healthDataId, healthData)
      : api.health.add(healthData);

    savePromise
      .then(() => {
        wx.hideLoading();
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      })
      .catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: err.message || '保存失败',
          icon: 'none'
        });
      });
  }
});
