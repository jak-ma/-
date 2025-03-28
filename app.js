// app.js
const api = require('./services/api');

// 初始化云开发环境
wx.cloud.init({
  env: 'your-env-id', // 替换为你的云环境ID
  traceUser: true
});

App({
  globalData: {
    userInfo: null,
    hasLogin: false
  },

  onLaunch: function() {
    // 检查登录状态
    this.checkLoginStatus();
  },

  // 检查登录状态
  checkLoginStatus: function() {
    const token = wx.getStorageSync('token');
    const cachedUserInfo = wx.getStorageSync('userInfo');
    
    // 首先尝试从本地存储恢复用户信息，确保在页面重新加载时保持登录状态
    if (cachedUserInfo && token && this.isValidToken(token)) {
      this.globalData.userInfo = cachedUserInfo;
      this.globalData.hasLogin = true;
      console.log('从本地存储恢复登录状态成功');
    }
    
    // 检查是否有token以及token是否有效
    if (token && this.isValidToken(token)) {
      // 如果有有效token，获取用户信息
      this.getUserInfo(token);
    } else if (token) {
      // 如果token存在但无效，清除token
      wx.removeStorageSync('token');
      this.globalData.hasLogin = false;
      this.globalData.userInfo = null;
    }
  },
  
  // 验证token是否有效
  isValidToken: function(token) {
    // 这里可以添加token验证逻辑
    // 简单实现：检查token格式是否正确
    // 实际应用中可能需要与服务器验证token
    return token && (token === 'mock_token' || token === 'admin_token');
  },

  // 获取用户信息
  getUserInfo: function(token) {
    const that = this;
    
    // 显示加载中
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    
    // 调用API获取用户信息
    api.user.getInfo()
      .then(res => {
        wx.hideLoading();
        const userInfo = res.userInfo || res;
        that.globalData.userInfo = userInfo;
        that.globalData.hasLogin = true;
        wx.setStorageSync('userInfo', userInfo);
        
        // 显示登录成功提示
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        });
      })
      .catch(err => {
        wx.hideLoading();
        console.error('获取用户信息失败', err);
        // 清除无效token
        wx.removeStorageSync('token');
        that.globalData.hasLogin = false;
        that.globalData.userInfo = null;
        
        // 显示登录失败提示
        wx.showToast({
          title: '登录失败，请重新登录',
          icon: 'none',
          duration: 2000
        });
      });
  }
});
