// pages/component/template/send.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: {
      zh: "发送模版消息",
      en: ""
    },
    msg:''
  },
  getToken(){
    let that = this;
    wx.request({
      url:"https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx5706174450a863f3&secret=795f3a97e674a017fa772b1bc798221c",
      success: function (res) {
        that.setData({
          access_token: res.data.access_token
        });
      }
    });
  },
  formSubmit(e){
    console.log("dddddd")
    console.log(e.detail.formId);
    var that = this;
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + getApp().globalData.access_token, //仅为示例，并非真实的接口地址
      method:"POST",
      data: {
        "touser": getApp().globalData.openid,
        "template_id": "4eDsyBTapGVhM6wxv6_4b1RLF2olECVTMO0vKiuMpws",
        "page": "index/index",
        "form_id": e.detail.formId,
        "data": {
          "keyword1": {
            "value": "2018年06月05日 12:30"
          },
          "keyword2": {
            "value": "已发布"
          },
          "keyword3": {
            "value": "微信小程序API"
          },
          "keyword4": {
            "value": "更新"
          },
          "keyword5": {
            "value": "基础库2.1.0"
          }
        }
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.errmsg){
          that.setData({
            msg: res.data.errmsg
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getToken();
    console.warn(getApp().globalData);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})