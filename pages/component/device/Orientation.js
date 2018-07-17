// pages/component/device/Orientation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: {
      zh: "监听屏幕方向",
      en: "wx.onDeviceOrientationChange"
    },
    res:"竖屏"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.onDeviceOrientationChange){
      console.log("不支持转屏监听");
      this.setData({
        res: "不支持转屏监听"
      });
    }else{
      let that = this;
    wx.onDeviceOrientationChange(function (res) {
      console.log(res.value);
      that.setData({
        res: res.value
      });
    })
    }
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