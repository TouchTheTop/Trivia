//app.js
App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
   
    
console.log("欧尼");
    // 登录
    wx.login({
      success: res => {
        console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: this.globalData.URL+'/wxlogin?code=' +res.code,
          success:function(result){ 
            that.globalData.openid = result.data.openid;
            that.globalData.access_token = result.data.access_token;
            that.globalData.session_key = result.data.session_key;
            that.getGroup();
          }
        })
      }
    })

  },
  getGroup(){
    let that = this;
    console.log(that.globalData)
    wx.getShareInfo({
      shareTicket: that.globalData.shareTicket,
      success(res) {
        console.log("getShareInfo");
        console.log(res);
        wx.request({
          url: that.globalData.URL + '/wxLogin/unionId',
          method: "POST",
          data: {
            iv: res.iv,
            encryptedData: res.encryptedData,
            session_key: that.globalData.session_key
          },
          success: function (result) {
            console.log("getShareInfo1");
            console.log(result);
            that.globalData.openGId = result.data.openGId;
          },
          fail: function (err) {
            console.log("获取群失败");
            console.log(err);
          }
        })
      }
    })
  },
  onShow(options){

    console.log("shareTicket:" + options.shareTicket);
    this.globalData.shareTicket = options.shareTicket;

    
  },
  globalData: {
    userInfo: null,
    openid:"",
    access_token:"",
    session_key:"",
    openGId:"",
    shareTicket:"",
    URL:"https://beewal.com/bee",
    appId:"1253736812"
  }
})