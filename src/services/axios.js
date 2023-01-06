import axios from 'axios'
import router from '../router/router'
import { isTokenValid } from '../helpers/axiosHelper'
// axios.defaults.baseURL = 'http://localhost:3000/api'
// // process.env
axios.defaults.baseURL = 'http://amalyaflowers-env.eba-39fcp8ra.us-east-1.elasticbeanstalk.com/api'
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
