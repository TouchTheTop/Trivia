// pages/module/ocrText.js
var cos = require('../com/COS.js');
const URL = getApp().globalData.URL;
const appId = getApp().globalData.appId;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: {
      zh: "文本识别",
      en: "腾讯云",
      img:"../../../imgs/tc_logo.jpg"
    },
    title1: {
      zh: "文本识别",
      en: "百度云"
    },
    upType:1,//上传类型
    loading:false,
    loading1: false,
    url:"https://recognition.image.myqcloud.com/ocr/general",
    BD_url:"https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic",
    img:"",
    img1: "",
    tc_sign:"",
    bd_sign:"",
    upCount:null,//计时器
    timeOver: 0,//识别时间
    timeOver1: 0,//识别时间
    tc_res:{
      tc_content:{}
    },
    bd_res: {
      bd_content: {}
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSign();
    this.getSignBd();
  },
  count() {
    //计时开始
    let that = this, upType = that.data.upType;
    this.data.upCount = setInterval(function () {
      if (upType ==1)
      that.setData({
        timeOver: that.data.timeOver + 1
      });
      else{
        that.setData({
          timeOver1: that.data.timeOver1 + 1
        });
      }
    }, 1);
  },
  //切换加载状态
  changeLoading(){
    let that = this, upType = this.data.upType;
    if (upType==1)
    this.setData({
      loading: !that.data.loading
    });
    else{
      this.setData({
        loading1: !that.data.loading1
      });
    }
  },
  startIt(e){
    let upType = e.currentTarget.dataset.up;
    this.setData({
      upType: upType
    });
    this.getIMG(upType);
  },
  //获取腾讯云签名
  getSign() {
    let that = this;
    wx.request({
      url: URL+"/ocr", //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          tc_sign:res.data
        });
      }
    })
  },
  //获取百度云Access Token
  getSignBd() {
    let that = this;
    wx.request({
      url: URL + "/ocr/bd", //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          bd_sign: res.data
        });
      }
    })
  },
  //获取要识别的图片
  getIMG(upType){
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.changeLoading();
        cos.upImgToServer(res.tempFilePaths[0], function (data) {    
          if (upType==1)
          that.getOCR(data);
          else if (upType == 2){
            that.getOCRByBd(data);
          }
        });
      }
    })
  },
  //识别图片
  getOCR(imageURL){
    this.count();
    let that = this;
    wx.request({
      url: that.data.url, //仅为示例，并非真实的接口地址
      data: {
        appid: appId,
        url: imageURL
      },
      method:'POST',
      header: {
        'host':'recognition.image.myqcloud.com',
        'authorization': that.data.tc_sign,
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let data = res.data;
        that.changeLoading();
        clearInterval(that.data.upCount);
        if(data.code){
          wx.showToast({
            title: data.message,
            icon: 'fail',
            duration: 2000
          })
        }else{
          that.setData({
            tc_res: {tc_content:data.data.items},
            img: imageURL
          });
        }
      }
    })
  },
  //百度云识别图片
  getOCRByBd(imageURL){
    this.count();
    let that = this;
    wx.request({
      url: that.data.BD_url +"?access_token="+that.data.bd_sign, //仅为示例，并非真实的接口地址
      data: {
        url: imageURL
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        let data = res.data;
        that.changeLoading();
        clearInterval(that.data.upCount);
        if (data.code) {
          wx.showToast({
            title: data.message,
            icon: 'fail',
            duration: 2000
          })
        } else {
          that.setData({
            bd_res: { bd_content: data.words_result },
            img1: imageURL
          });
        }
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