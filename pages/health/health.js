// pages/health/health.js
const api = require('../../services/api');

Page({
  data: {
    healthDataList: [] // 健康数据列表
  },

  // 页面加载
  onLoad() {
    this.loadHealthData();
  },

  // 加载健康数据
  loadHealthData() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });

    api.health.getList()
      .then(res => {
        wx.hideLoading();
        this.setData({
          healthDataList: res.data
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

  // 添加健康数据
  onAdd() {
    wx.navigateTo({
      url: '/pages/health/edit'
    });
  },

  // 编辑健康数据
  onEdit(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/health/edit?id=${id}`
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
