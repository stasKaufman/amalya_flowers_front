import axios from 'axios'
import router from '../router/router'
import { isTokenValid } from '../helpers/axiosHelper'
// axios.defaults.baseURL = 'http://localhost:3000/api'
// // process.env
axios.defaults.baseURL = 'ec2-3-88-222-81.compute-1.amazonaws.com/api'
axios.interceptors.request.use(config => {
  if (config.url !== '/login') {
    if (isTokenValid()) {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }
    // token not exist or expired.
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpirationTime')
    return router.push({ name: 'login' })
  }
  // send request to login to the system.
  return config
}, null, { synchronous: true })

export default axios
