import { createStore } from 'vuex'
import axios from '../services/axios'
import router from '../router/router'

export default createStore({
  state: {
    token: null,
    userName: null,
    userRole: 0
  },
  getters: {
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUser (state, { name, role }) {
      state.userName = name
      state.userRole = role
    }
  },
  actions: {
    async login ({ commit }, payload) {
      try {
        const { data } = await axios.post('/login', payload)
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', data.role)
        // calculate expiration time
        const expirationTimeInSeconds = 60 * 60 * data.expirationTimeInHours
        const tokenExpirationTimeInUnixEpoch = Math.floor(Date.now() / 1000) + expirationTimeInSeconds
        localStorage.setItem('tokenExpirationTime', tokenExpirationTimeInUnixEpoch)
        // commit new data.
        commit('setToken', data.token)
        commit('setUser', { name: data.userName, role: data.role })
        router.push({ name: 'flowerList' })
        return Promise.resolve()
      } catch (error) {
        console.error(error)
      }
    },
    async getFlower (_, payload) {
      try {
        const { data } = await axios.get('/flower/' + payload.id)
        return data.flower
      } catch (error) {
        console.error(error)
      }
    },
    async getFlowers (_, payload) {
      try {
        const { limit, text, offset } = payload
        const { data } = await axios.post('/flower/search', { offset, limit, text })
        return data
      } catch (error) {
        console.error(error)
      }
    },
    async createOrUpdateFlowerTracker (_, payload) {
      await axios.post('/flower/tracker', payload)
      return Promise.resolve()
    }
  }
})
