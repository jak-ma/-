// pages/elderInfo/elderInfo.js
const app = getApp();
const api = require('../../services/api');
const util = require('../../utils/util');

Page({
  data: {
    isEdit: false,
    elderId: '',
    elderInfo: {
      name: '',
      gender: '男',
      birthDate: '',
      phone: '',
      idCard: '',
      address: '',
      emergencyContact: '',
      emergencyPhone: '',
      medicalHistory: '',
      allergies: ''
    },
    genderArray: ['男', '女'],
    genderIndex: 0,
    isLoading: false,
    errorMsg: ''
  },

  onLoad: function(options) {
    // 检查是否是编辑模式
    if (options.id) {
      this.setData({
        isEdit: true,
        elderId: options.id,
        isLoading: true
      });
      
      // 获取老人信息
      this.fetchElderInfo(options.id);
    }
  },

  // 获取老人信息
  fetchElderInfo: function(elderId) {
    const that = this;
    
    api.elder.getDetail(elderId).then(res => {
      const elderInfo = res.data;
      
      // 设置性别索引
      const genderIndex = elderInfo.gender === '女' ? 1 : 0;
      
      that.setData({
        elderInfo,
        genderIndex,
        isLoading: false
      });
    }).catch(err => {
      console.error('获取老人信息失败', err);
      that.setData({
        isLoading: false,
        errorMsg: err.message || '获取老人信息失败'
      });
    });
  },

  // 输入姓名
  inputName: function(e) {
    this.setData({
      'elderInfo.name': e.detail.value,
      errorMsg: ''
    });
  },

  // 选择性别
  bindGenderChange: function(e) {
    this.setData({
      genderIndex: e.detail.value,
      'elderInfo.gender': this.data.genderArray[e.detail.value]
    });
  },

  // 选择出生日期
  bindBirthDateChange: function(e) {
    this.setData({
      'elderInfo.birthDate': e.detail.value
    });
  },

  // 输入手机号
  inputPhone: function(e) {
    this.setData({
      'elderInfo.phone': e.detail.value
    });
  },

  // 输入身份证号
  inputIdCard: function(e) {
    this.setData({
      'elderInfo.idCard': e.detail.value
    });
  },

  // 输入地址
  inputAddress: function(e) {
    this.setData({
      'elderInfo.address': e.detail.value
    });
  },

  // 输入紧急联系人
  inputEmergencyContact: function(e) {
    this.setData({
      'elderInfo.emergencyContact': e.detail.value
    });
  },

  // 输入紧急联系人电话
  inputEmergencyPhone: function(e) {
    this.setData({
      'elderInfo.emergencyPhone': e.detail.value
    });
  },

  // 输入病史
  inputMedicalHistory: function(e) {
    this.setData({
      'elderInfo.medicalHistory': e.detail.value
    });
  },

  // 输入过敏史
  inputAllergies: function(e) {
    this.setData({
      'elderInfo.allergies': e.detail.value
    });
  },

  // 取消表单
  cancelForm: function() {
    wx.navigateBack();
  },

  // 提交表单
  submitForm: function(e) {
    const that = this;
    const elderInfo = this.data.elderInfo;

    // 表单验证
    if (!elderInfo.name || !elderInfo.phone || !elderInfo.idCard) {
      this.setData({
        errorMsg: '请填写必填项'
      });
      return;
    }

    this.setData({
      isLoading: true
    });

    const savePromise = this.data.isEdit
      ? api.elder.update(this.data.elderId, elderInfo)
      : api.elder.add(elderInfo);

    savePromise.then(() => {
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      });
      
      // 获取当前页面栈
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2]; // 上一页是首页
      
      // 如果上一页是首页，刷新老人列表
      if (prevPage && prevPage.route === 'pages/index/index') {
        prevPage.fetchElderList();
      }
      
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }).catch(err => {
      console.error('保存失败', err);
      this.setData({
        isLoading: false,
        errorMsg: err.message || '保存失败'
      });
    });
  }
});
