// pages/component/cover/view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: {
      zh: "覆盖原生组件",
      en: "cover-"
    },
    str:"<cover-view /> <cover-image />",
    str1:"<cover-image />",
    content:"可滚动可滚动可滚动可滚动可滚动可滚动可滚动可滚动可滚动可滚动可滚动可滚动可滚动可滚动可滚动可滚动可滚动可滚动可滚动可滚动"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  coverIt(){
    console.log("点击视频");
  },
  play() {
    this.videoCtx.play()
  },
  pause() {
    this.videoCtx.pause()
  },
  imgload(){
    this.setData({
      content:"图片已加载图片已加载图片已加载图片已加载图片已加载图片已加载图片已加载图片已加载图片已加载图片已加载图片已加载图片已加载图片已加载"
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoCtx = wx.createVideoContext('myVideo')
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