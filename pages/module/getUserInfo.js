// pages/module/getUserInfo.js
const URL = getApp().globalData.URL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: {
      zh: "获取用户关键信息",
      en: "wx.getUserInfo"
    },
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  getUserInfo(res){
    console.log(res);
  this.getUnionId(res.detail);
  },
  getUnionId(res){
    let that = this;
    wx.request({
      url: URL+'/wxLogin/unionId',
      method:"POST",
      data:{
        iv:res.iv,
        encryptedData: res.encryptedData,
        session_key: getApp().globalData.session_key
      },
      success:function(res){
        that.setData({
          userInfo:res.data
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
  onShareAppMessage: function () {
  
  }
})