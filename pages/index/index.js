//index.js
//获取应用实例
const app = getApp()
const URL = getApp().globalData.URL;
const openGId = app.globalData.openGId;
var router = require('../router.js')
var catagory = require('../catagory.js')
Page({
  data: {
    catagory: catagory,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    shareInfo:{
      openGId: openGId
    },
    nodes: [{
      name: 'h4',
      attrs: {
        style: 'line-height: 60px'
      },
      children: [{
        type: 'text',
        text: ''
      }]
    }],
    URL:"",
    js_category: router
  },
  //事件处理函数
  navigateTo: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.path
    })
  },
  bindGetUserInfo(res){
    getApp().globalData.userInfo = res.detail.userInfo;
    this.setData({
      userInfo: getApp().globalData.userInfo
    });
    console.log(getApp().globalData.userInfo);
  },
  onLoad: function(options) {
    this.getUser();
    let that = this;
    setTimeout(function () { //延时获取openGId
      that.setData({
        shareInfo:{
          openGId: app.globalData.openGId
        }
      });
    },3000);
    if (options.nickName){
      wx.showModal({
        title: '提示',
        showCancel:false,
        confirmText:"这就去",
        content: '快点查看'+options.nickName+"转发给你的东西吧！",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getUser(){
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  }
})