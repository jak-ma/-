// pages/index/index.js
const app = getApp();
const api = require('../../services/api');
const util = require('../../utils/util');

Page({
  data: {
    userInfo: null,
    hasLogin: false,
    loading: true,
    errorMsg: '',
    elderList: [],
    selectedElder: null,
    healthData: {
      bloodPressure: null,
      bloodSugar: null,
      heartRate: null,
      weight: null
    },
    recentMedications: [],
    upcomingAppointments: []
  },

  onLoad: function() {
    this.checkLoginStatus();
  },
  
  // 检查登录状态
  checkLoginStatus: function() {
    const userInfo = app.globalData.userInfo;
    if (userInfo) {
      this.setData({
        userInfo,
        hasLogin: true
      });
      this.fetchElderList();
    } else {
      this.setData({
        loading: false,
        errorMsg: '请先登录'
      });
    }
  },

  // 获取老人列表
  fetchElderList: function() {
    this.setData({
      loading: true,
      errorMsg: ''
    });

    api.elder.getList()
      .then(res => {
        const elderList = res.data || [];
        const selectedElder = elderList.length > 0 ? elderList[0] : null;
        
        this.setData({
          elderList,
          selectedElder,
          loading: false
        });

        if (selectedElder) {
          this.fetchHealthData(selectedElder.id);
          this.fetchRecentMedications(selectedElder.id);
          this.fetchUpcomingAppointments(selectedElder.id);
        }
      })
      .catch(err => {
        console.error('获取老人列表失败', err);
        this.setData({
          loading: false,
          errorMsg: err.message || '获取老人列表失败'
        });
      });
  },

  // 获取健康数据
  fetchHealthData: function(elderId) {
    api.health.getList(elderId)
      .then(res => {
        const healthData = res.data[0] || {};
        this.setData({
          healthData
        });
      })
      .catch(err => {
        console.error('获取健康数据失败', err);
      });
  },

  // 获取最近用药提醒
  fetchRecentMedications: function(elderId) {
    api.medication.getList(elderId)
      .then(res => {
        const recentMedications = res.data.slice(0, 3) || [];
        this.setData({
          recentMedications
        });
      })
      .catch(err => {
        console.error('获取用药提醒失败', err);
      });
  },

  // 获取即将到来的就诊记录
  fetchUpcomingAppointments: function(elderId) {
    api.medicalRecord.getList(elderId)
      .then(res => {
        const upcomingAppointments = res.data.slice(0, 3) || [];
        this.setData({
          upcomingAppointments
        });
      })
      .catch(err => {
        console.error('获取就诊记录失败', err);
      });
  },

  // 处理老人选择
  handleElderChange: function(e) {
    const index = e.detail.value;
    const selectedElder = this.data.elderList[index];
    this.setData({
      selectedElder
    });
    this.fetchHealthData(selectedElder.id);
    this.fetchRecentMedications(selectedElder.id);
    this.fetchUpcomingAppointments(selectedElder.id);
  },

  // 跳转到健康数据页面
  navigateToHealthData: function() {
    wx.navigateTo({
      url: '/pages/healthData/healthData'
    });
  },

  // 跳转到健康报告页面
  navigateToHealthReport: function() {
    wx.navigateTo({
      url: '/pages/report/report'
    });
  },

  // 跳转到用药提醒页面
  navigateToMedication: function() {
    wx.navigateTo({
      url: '/pages/medication/medication'
    });
  },

  // 跳转到就诊记录页面
  navigateToMedicalRecord: function() {
    wx.navigateTo({
      url: '/pages/medicalRecord/medicalRecord'
    });
  },

  // 添加老人信息
  addElderInfo: function() {
    wx.navigateTo({
      url: '/pages/elderInfo/elderInfo'
    });
  }
});
