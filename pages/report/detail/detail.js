// pages/report/detail/detail.js
const api = require('../../services/api');
const wxCharts = require('../../node_modules/wechat-charts/dist/wxcharts.js');

Page({
  data: {
    report: null // 报告详情
  },

  // 页面加载
  onLoad(options) {
    if (options.id) {
      this.loadReportDetail(options.id);
    }
  },

  // 加载报告详情
  loadReportDetail(id) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });

    api.report.getDetail(id)
      .then(res => {
        wx.hideLoading();
        this.setData({
          report: res.data
        }, () => {
          this.drawChart();
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

  // 绘制图表
  drawChart() {
    const { trendData } = this.data.report;
    const categories = trendData.map(item => item.date);
    const series = trendData.map(item => item.value);

    new wxCharts({
      canvasId: 'trendChart',
      type: 'line',
      categories: categories,
      series: [{
        name: '健康指数',
        data: series,
        format: function (val) {
          return val.toFixed(2);
        }
      }],
      yAxis: {
        format: function (val) {
          return val.toFixed(2);
        }
      },
      width: wx.getSystemInfoSync().windowWidth - 40,
      height: 400,
      dataLabel: false,
      dataPointShape: true,
      enableScroll: true
    });
  }
});
