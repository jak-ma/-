// pages/healthData/healthData.js
const api = require('../../services/api');

Page({
  data: {
    healthDataList: [], // 健康数据列表
    isLoading: false, // 加载状态
    errorMsg: '' // 错误信息
  },

  // 页面加载
  onLoad() {
    this.loadHealthData();
  },

  // 加载健康数据
  loadHealthData() {
    const app = getApp();
    this.setData({
      isLoading: true,
      errorMsg: '',
      healthDataList: [] // 确保初始化为数组
    });

    api.health.getList(app.globalData.selectedElderId || '1')
      .then(res => {
        this.setData({
          healthDataList: res?.data || [], // 处理可能的undefined情况
          isLoading: false
        });
      })
      .catch(err => {
        this.setData({
          isLoading: false,
          errorMsg: err.message || '加载失败'
        });
      });
  },

  // 添加健康数据
  onAdd() {
    wx.navigateTo({
      url: '/pages/healthData/edit'
    });
  },

  // 编辑健康数据
  onEdit(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/healthData/edit?id=${id}`
    });
  },

  // 删除健康数据
  onDelete(e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '提示',
      content: '确定要删除该健康数据吗？',
      success: res => {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中...',
            mask: true
          });

          api.health.delete(id)
            .then(() => {
              wx.hideLoading();
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              });
              this.loadHealthData();
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
