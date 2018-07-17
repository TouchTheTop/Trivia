// pages/component/loadFontFace/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:{
      zh:"动态加载网络字体",
      en:"wx.loadFontFace"
    },
    loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (wx.canIUse('loadFontFace')) {
      console.log("支持自定义字体");
      wx.loadFontFace({
        family: 'Bitstream Vera Serif Bold',
        source: 'url("https://developer.mozilla.org/@api/deki/files/2934/=VeraSeBd.ttf")',
        success: function (res) {
          console.log("sdfjusifis");
        },
        fail: function (res) {
          console.log("fail") //  error
        },
        complete: function (res) {
          console.log("sdfjusifis");
        }
      });
    }
    setTimeout(function(){
      that.setData({
        loading:false
      });
    },3000);
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