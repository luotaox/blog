import Vue from 'vue'
import Vuex from 'vuex'
import { getTimeInterval } from '../utils/index'
import axios from 'axios'
// 持久化
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const runAt = new Date("7/30/2023 8:00:00");
let timer = new Date()
const state = {
    loading: false,
    runTimeInterval: '',
    socials: '',
    websiteInfo: '',
    notice: {}
}
const mutations = {
    SET_LOADING: (state, v) => {
        state.loading = v;
    },
    SET_SOCIALS: (state, v) => {
        state.socials = v;
    },
    SET_SITE_INFO: (state, v) => {
        state.websiteInfo = v;
    },
    GET_RUNTIME_INTERVAL: (state) => {
        if (!timer || !state.runTimeInterval) {
            clearInterval(timer)
            timer = setInterval(() => {
                state.runTimeInterval = getTimeInterval(runAt);
            }, 1000);
        }
    },
    changeNotice: (state, v) => {
        state.notice = v;
    }
}
const actions = {
    setLoading: ({ commit }, v) => {
        commit('SET_LOADING', v);
    },
    initComputeTime: ({ commit }) => {
        commit('GET_RUNTIME_INTERVAL');
    },
    getSiteInfo: ({ commit, state }) => {
        return new Promise(resolve => {
            if (state.websiteInfo) {
                resolve(state.websiteInfo)
            } else {
                axios.get('/webapi/user').then(res => {
                    let data = res.data.data[0] || {}
                    commit('SET_SITE_INFO', data);
                    resolve(data);
                }).catch(err => {
                    resolve({});
                })
            }
        })
    },
    getSocials: ({ commit, state }) => {
        return new Promise((resolve => {
            if (state.socials) {
                resolve(state.socials)
            } else {
                axios.get('/webapi/site').then(res => {
                    let data = res.data.data || []
                    commit('SET_SOCIALS', data);
                    resolve(data);
                }).catch(err => {
                    resolve([]);
                })
            }
        }))
    }
}
const getters = {
    loading: state => state.loading,
    runTimeInterval: state => state.runTimeInterval,
}

const plugins = [createPersistedState({
    //决定谁持久化
    paths: ['notice']
})]
export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {},
    getters,
    plugins
})
