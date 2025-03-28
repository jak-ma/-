// pages/login/login.js
const api = require('../../services/api');

Page({
  data: {
    username: '',
    password: ''
  },

  // 用户名输入
  onUsernameInput(e) {
    this.setData({
      username: e.detail.value
    });
  },

  // 密码输入
  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  // 登录按钮点击
  onLogin() {
    const { username, password } = this.data;

    // 输入验证
    if (!username || !password) {
      wx.showToast({
        title: '请输入用户名和密码',
        icon: 'none'
      });
      return;
    }

    // 显示加载中
    wx.showLoading({
      title: '登录中...',
      mask: true
    });

    // 管理员账户验证
    if (username === 'admin' && password === '123456') {
      wx.hideLoading();
      wx.setStorageSync('token', 'admin_token');
      
      // 存储管理员用户信息
      const adminUserInfo = {
        id: 0,
        username: 'admin',
        name: '管理员',
        role: 'admin'
      };
      wx.setStorageSync('userInfo', adminUserInfo);
      
      // 更新全局数据
      const app = getApp();
      app.globalData.userInfo = adminUserInfo;
      app.globalData.hasLogin = true;
      
      wx.reLaunch({
        url: '/pages/index/index'
      });
      return;
    }

    // 调用登录API
    api.user.login(username, password)
      .then(res => {
        // 登录成功
        wx.hideLoading();
        wx.setStorageSync('token', res.token);
        
        // 存储用户信息到本地
        const userInfo = res.userInfo || {};
        wx.setStorageSync('userInfo', userInfo);
        
        // 更新全局数据
        const app = getApp();
        app.globalData.userInfo = userInfo;
        app.globalData.hasLogin = true;
        
        wx.reLaunch({
          url: '/pages/index/index'
        });
      })
      .catch(err => {
        // 登录失败
        wx.hideLoading();
        wx.showToast({
          title: err.message || '登录失败',
          icon: 'none'
        });
      });
  }
});
