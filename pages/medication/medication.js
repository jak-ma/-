// pages/medication/medication.js
const api = require('../../services/api');

Page({
  data: {
    medicationList: [] // 用药提醒列表
  },

  // 页面加载
  onLoad() {
    const app = getApp();
    this.loadMedications();
  },

  // 加载用药提醒
  loadMedications() {
    const app = getApp();
    wx.showLoading({
      title: '加载中...',
      mask: true
    });

    api.medication.getList(app.globalData.selectedElderId || '1')
      .then(res => {
        wx.hideLoading();
        this.setData({
          medicationList: res.data
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

  // 添加用药提醒
  onAdd() {
    wx.navigateTo({
      url: '/pages/medication/edit'
    });
  },

  // 编辑用药提醒
  onEdit(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/medication/edit?id=${id}`
    });
  },

  // 删除用药提醒
  onDelete(e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '提示',
      content: '确定要删除该用药提醒吗？',
      success: res => {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中...',
            mask: true
          });

          api.medication.delete(id)
            .then(() => {
              wx.hideLoading();
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              });
              this.loadMedications();
            })
            .catch(err => {
              wx.hideLoading();
              wx.showToast({
                title: err.message || '删除失败',
                icon: 'none'
              });
            });
        }
      }
    });
  }
});
