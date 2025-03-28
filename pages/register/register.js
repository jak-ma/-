// pages/register/register.js
const app = getApp();
const db = wx.cloud.database();

Page({
  data: {
    username: '',
    password: '',
    confirmPassword: ''
  },

  // 输入处理
  handleInputChange: function(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [field]: e.detail.value
    });
  },

  // 注册提交
  onRegister: function() {
    const { username, password, confirmPassword } = this.data;

    // 输入验证
    if (!username || !password || !confirmPassword) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    if (password !== confirmPassword) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none'
      });
      return;
    }

    if (password.length < 6) {
      wx.showToast({
        title: '密码至少6位',
        icon: 'none'
      });
      return;
    }

    // 显示加载中
    wx.showLoading({
      title: '注册中...',
      mask: true
    });

    // 检查用户名是否已存在
    db.collection('users').where({
      username: username
    }).count().then(res => {
      if (res.total > 0) {
        wx.hideLoading();
        wx.showToast({
          title: '用户名已存在',
          icon: 'none'
        });
        return Promise.reject('用户名已存在');
      }

      // 注册新用户
      return db.collection('users').add({
        data: {
          username: username,
          password: password, // 实际项目中应该加密存储
          createdAt: db.serverDate()
        }
      });
    }).then(res => {
      wx.hideLoading();
      
      // 注册成功
      wx.showToast({
        title: '注册成功',
        icon: 'success'
      });

      // 自动登录
      const userInfo = {
        id: res._id,
        username: username
      };
      wx.setStorageSync('token', 'mock_token');
      wx.setStorageSync('userInfo', userInfo);
      app.globalData.userInfo = userInfo;
      app.globalData.hasLogin = true;

      // 跳转到首页
      wx.reLaunch({
        url: '/pages/index/index'
      });
    }).catch(err => {
      wx.hideLoading();
      console.error('注册失败', err);
      wx.showToast({
        title: '注册失败',
        icon: 'none'
      });
    });
  }
});