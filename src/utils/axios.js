import axios from 'axios'

const instance = axios.create({
  timeout: 5000,
  validateStatus(status) {
    // return status >= 200 && status < 300; // default
    return status === 200
  }
})

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const { status } = response.data
    // 请求成功时进行响应处理
    switch (status) {
      case 'success':
        return response.data
      default:
        return Promise.reject(response)
    }
  },
  function (error) {
    // 对响应错误做点什么
    switch (error.status) {
      case 401:
        break
      default:
        break
    }
    return Promise.reject(error)
  }
)

export default instance
