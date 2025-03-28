// pages/report/report.js
const api = require('../../services/api');

Page({
  data: {
    reportList: [] // 健康报告列表
  },

  // 页面加载
  onLoad() {
    this.loadReports();
  },

  // 加载健康报告
  loadReports() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });

    api.report.getList()
      .then(res => {
        wx.hideLoading();
        this.setData({
          reportList: res.data
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

  // 生成健康报告
  onGenerate() {
    wx.showLoading({
      title: '生成中...',
      mask: true
    });

    api.report.generate()
      .then(() => {
        wx.hideLoading();
        wx.showToast({
          title: '生成成功',
          icon: 'success'
        });
        this.loadReports();
      })
      .catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: err.message || '生成失败',
          icon: 'none'
        });
      });
  },

  // 查看报告详情
  onView(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/report/detail?id=${id}`
    });
  }
});
