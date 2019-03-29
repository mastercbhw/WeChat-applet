//index.js
var api = require('../../libs/api.js')

//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    citySelected: {},
    weatherData: {},
    topCity: {}
  },
  onLoad: function () {
    const defaultCityCode = "__location__";
    const citySelected = wx.getStorageSync('citySelected')
    const weatherData = wx.getStorageSync('weatherData')
    console.log('222')
    if(citySelected.length === 0 || weatherData.length === 0) {
      api.loadWeatherData(defaultCityCode, (cityCode, data) => {
        const weatherData = {}
        weatherData[cityCode] = data
        this.setHomeData([cityCode], weatherData)
      })
    }else {
      this.setHomeData(citySelected, weatherData)
    }
  },

  setHomeData: function(citySelected, weatherData){
    console.log('1111')
    var topCity = {
      left: "",
      center: "",
      right: "",
    }
    try { topCity.center = weatherData[citySelected[0]].realtime.city_name; } catch (e) { }
    try { topCity.right = weatherData[citySelected[1]].realtime.city_name; } catch (e) { }

    this.setData({
      userInfo: app.globalData.userInfo,
      weatherData: weatherData,
      topCity: topCity,
      citySelected: citySelected,
    })
    console.log(this.data)
  },

})
