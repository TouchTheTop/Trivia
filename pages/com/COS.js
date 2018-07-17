var COS = require('../../utils/cos-wx-sdk-v5.js');
var config = require('../../pages/component/COS/config.js')
const URL = getApp().globalData.URL;

var cos = new COS({
  getSTS: function (options, callback) {
    // 异步获取签名

    wx.request({
      url: URL + '/sign', //仅为示例，并非真实的接口地址
      method: "GET",
      responseType: "text",
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

cos.upImgToServer=function(filePath,callback) {
  var Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
  var Key_t = config.Base + "ex/" + Key;
  let that = this;
  console.log('上传中');
  var requestCallback= function(err, data) {
    let that = this;
    if (err && err.error) {
      wx.showModal({ title: '返回错误', content: '请求失败：' + err.error.Message + '；状态码：' + err.statusCode, showCancel: false });
    } else if (err) {
      wx.showModal({ title: '请求出错', content: '请求出错：' + err + '；状态码：' + err.statusCode, showCancel: false });
    } else {
      callback && callback(Key_t)
    }
  }

  cos.postObject({
    Bucket: config.Bucket,  // 存储桶
    Region: config.Region,  // 地域
    Key: "ex/" + Key,
    FilePath: filePath,     // 本地文件临时地址
    onProgress: function (info) {   // 上传时基本信息
      let data = JSON.stringify(info);
      console.log('上传中');
      console.log(info)
    }
  }, requestCallback);
  
}



module.exports = cos;