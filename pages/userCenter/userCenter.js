// pages/userCenter/userCenter.js
const api = require('../../services/api');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      username: '未登录',
      role: '普通用户'
    },
    hasLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const app = getApp()
    this.setData({
      hasLogin: app.globalData.hasLogin,
      userInfo: app.globalData.userInfo || {}
    })
  },

  /**
   * 跳转登录页面
   */
  navigateToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  
  /**
   * 修改资料
   */
  editProfile() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
    // 后续可以实现跳转到修改资料页面
    // wx.navigateTo({
    //   url: '/pages/userProfile/userProfile'
    // })
  },
  
  /**
   * 修改密码
   */
  changePassword() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
    // 后续可以实现跳转到修改密码页面
    // wx.navigateTo({
    //   url: '/pages/changePassword/changePassword'
    // })
  },
  
  /**
   * 使用规则
   */
  showUsageRules() {
    wx.showModal({
      title: '使用规则',
      content: '1. 请遵守相关法律法规\n2. 请保护个人隐私信息\n3. 请勿恶意使用本应用\n4. 如有问题请联系客服',
      showCancel: false
    })
  },
  
  /**
   * 常见问题
   */
  showFAQ() {
    wx.showModal({
      title: '常见问题',
      content: 'Q: 如何添加老人信息？\nA: 在首页点击添加按钮。\n\nQ: 如何查看健康数据？\nA: 在健康管理页面可查看。\n\nQ: 忘记密码怎么办？\nA: 请联系管理员重置。',
      showCancel: false
    })
  },
  
  /**
   * 退出登录
   */
  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除登录状态
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          
          // 更新全局数据
          const app = getApp();
          app.globalData.hasLogin = false;
          app.globalData.userInfo = null;
          
          // 更新页面数据
          this.setData({
            hasLogin: false,
            userInfo: {
              username: '未登录',
              role: '普通用户'
            }
          });
          
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})