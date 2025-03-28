// pages/medication/edit/edit.js
const api = require('../../services/api');

Page({
  data: {
    id: null, // 用药提醒ID
    time: '', // 用药时间
    isEdit: false // 是否为编辑模式
  },

  // 页面加载
  onLoad(options) {
    if (options.id) {
      this.setData({
        id: options.id,
        isEdit: true
      });
      this.loadMedication(options.id);
    }
  },

  // 加载用药提醒
  loadMedication(id) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });

    api.medication.getDetail(id)
      .then(res => {
        wx.hideLoading();
        this.setData({
          time: res.data.time
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

  // 时间选择
  onTimeChange(e) {
    this.setData({
      time: e.detail.value
    });
  },

  // 表单提交
  onSubmit(e) {
    const { medicineName, dosage } = e.detail.value;
    const { id, time } = this.data;

    // 输入验证
    if (!medicineName || !time || !dosage) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    // 准备数据
    const medicationData = {
      medicineName,
      time,
      dosage: Number(dosage)
    };

    // 显示加载中
    wx.showLoading({
      title: '保存中...',
      mask: true
    });

    // 保存数据
    const savePromise = this.data.isEdit
      ? api.medication.update(id, medicationData)
      : api.medication.add(medicationData);

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
