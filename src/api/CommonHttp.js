/**
 * Created by lenovo on 2017/9/29.
 */
import axios from 'axios'

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  console.log(response)
  // loading
  // 如果http状态码正常，则直接返回数据
  // if (response && response.data && (response.data.code === 200 || response.data.code === 304)) {
  //   return response.data
  //   // 如果不需要除了data之外的数据，可以直接 return response.data
  // }
  if(response && !!response.config && response.config.url.indexOf('api-aps')>-1 && response.data.code!=200){
    // this.$message.error('请求失败，请稍候再试!');
    //console.log('失败')
    return response.data;
  }
  // 异常状态下，把错误信息返回去
  return response.data
}

function checkCode (res) {
  // 如果resCode异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.resCode === '500' || res.resCode === '403') {
    // alert(res.message)
  }
  if (res.data && (!res.data.success)) {
    // alert(res.data.error_msg)
  }
  return res
}

export default {

  post (url, data) {
    return axios({
      method: 'post',
      url,
      data: data,
      timeout: 10000,
      contentType: 'application/json;charset=UTF-8'
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).catch(
      (res) => {
        return checkCode(res)
      }
    )
  },

  get (url, params) {
    return axios({
      method: 'get',
      url,
      params, // get 请求时带的参数
      timeout: 10000,
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).catch(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
