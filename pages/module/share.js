// pages/module/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: {
      zh: "转发",
      en: "onShareAppMessage"
    },
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData);
    this.getUser();
    wx.updateShareMenu({
      withShareTicket: true,
      success() {
      }
    })
  },
  getUser(){
    let that = this;
    wx.getUserInfo({
      success: function (res) {console.log(res.userInfo);
        that.setData({
          userInfo: res.userInfo
        });
      }
    })
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
  onShareAppMessage: function (res) {
    let btn = "按钮";
    if (res.from !== 'button') {
      btn = "右上角";
    }
    return {
      title: '来自' + getApp().globalData.userInfo.nickName+"点击"+btn+'的分享,赶紧看看Ta的分享吧！',
      path: '/pages/index/index?nickName=this.data.userInfo.nickName',
      imageUrl: "https://resource.aijiatui.com/13632945694/company/moments/a7dbd0b9905a05981ed4aa348a1e0b65.jpeg"
    }
  }
})