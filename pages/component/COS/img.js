// pages/component/COS/img.js
var COS = require('../../../utils/cos-wx-sdk-v5');
var config = require('./config')
const URL = getApp().globalData.URL;
var cos = new COS({
  getSTS: function (options, callback) {
    // 异步获取签名

    wx.request({
      url: URL+'/sign', //仅为示例，并非真实的接口地址
      method:"GET",
      responseType:"text",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var authorization = res.data;
        callback({
          SecretId: config.SecretId,
          SecretKey: config.SecretKey,
          XCosSecurityToken: authorization.XCosSecurityToken,
          ExpiredTime: authorization.ExpiredTime,
        });
      }
    });
  }
});
var upCount = null; //计时器


Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    title: {
      zh: "腾讯云COS上传",
      en: ""
    },
    upCount:null,
    Key_t:'',
    Size:0,
    afterSize:0,
    loading:false,
    timeOver:0,//存储桶上传时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //上传图片
  upImg(){
    this.setData({
      loading:true
    });
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          Size: (res.tempFiles[0].size / 1024).toFixed(2)
        });
        that.upImgToServer(res.tempFilePaths[0]);
      }
    })
  },
  upImgToServer(filePath){
    var Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
    var Key_t = config.Base + "ex/" + Key;

    // this.setData({
    //   Key_t: Key_t
    // });
    let that = this;
    setTimeout(function(){
      that.setData({
        Key_t: Key_t
      });
    },2000);
    this.count();
    cos.postObject({
      Bucket: config.Bucket,  // 存储桶
      Region: config.Region,  // 地域
      Key: "ex/" + Key,
      FilePath: filePath,     // 本地文件临时地址
      onProgress: function (info) {   // 上传时基本信息
        console.log(JSON.stringify(info));
      }
    }, this.requestCallback);
  },
  readImg(e){
    this.setData({
      afterSize: e.detail.width + " X " + e.detail.height
    });
  },
  count(){
    //计时开始
    let that = this;
    this.data.upCount = setInterval(function(){
      that.setData({
        timeOver: that.data.timeOver+1
      });
    },1);
  },
  getSize(){
    let that = this;
    wx.downloadFile({
      url: that.data.Key_t,
      success: function (res) {
        console.log(res)
      }
    })

  },
  requestCallback(err, data){
    clearInterval(this.data.upCount);
    this.getSize(); //获取图片上传后的大小
    this.setData({
      loading: false
    });
      let that = this;
      console.log(config.Base + this.data.Key_t);
      if (err && err.error) {
        wx.showModal({ title: '返回错误', content: '请求失败：' + err.error.Message + '；状态码：' + err.statusCode, showCancel: false });
      } else if (err) {
        wx.showModal({ title: '请求出错', content: '请求出错：' + err + '；状态码：' + err.statusCode, showCancel: false });
      } else {
        wx.showToast({ title: '请求成功', icon: 'success', duration: 3000 });
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