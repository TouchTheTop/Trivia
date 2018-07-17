// pages/component/camera/toggleTorch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: {
      zh: "切换闪光灯",
      en: "toggleTorch"
    },
    status:"关闭",
    ctx:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  checkLigth:function(){
    let that = this;
    this.ctx.toggleTorch({
      success: res => {
        that.setData({
          status: status == "关闭" ? "已开启" :"关闭"
        });
        console.log('pause success')
      },
      fail: res => {
        that.setData({
          status: "开启失败"
        });
        console.log('pause fail')
      }
    });
  },
  switchCamera: function () {
    this.ctx.switchCamera({
      success: res => {
        console.log('pause success')
      },
      fail: res => {
        console.log('pause fail')
      }
    });
  },
  start(){
    this.ctx.start({
      success: res => {
        console.log('pause success')
      },
      fail: res => {
        console.log('pause fail')
      }
    });
  },
  statechange(e) {
    console.log('live-pusher code:', e.detail.code)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.ctx = wx.createLivePusherContext('pusher')
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