// pages/component/WXML/getClass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: {
      zh: "获取节点样式信息",
      en: "wx.createSelectorQuery"
    },
    res:{}
  },
  getStyle(){
    let that = this;
    wx.createSelectorQuery().select('#dom').fields({
      dataset: true,
      size: true, //是否返回节点尺寸
      scrollOffset: true,
      properties: ['scrollX', 'scrollY'], //指定返回的属性
      computedStyle: ['margin', 'backgroundColor','padding']  //指定返回的样式
    }, function (res) {
      that.setData({
        res:{
          padding:res.padding,
          backgroundColor: res.backgroundColor
        }
      });
    }).exec()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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