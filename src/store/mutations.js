/***
 **                                                          _ooOoo_
 **                                                         o8888888o
 **                                                         88" . "88
 **                                                         (| -_- |)
 **                                                          O\ = /O
 **                                                      ____/`---'\____
 **                                                    .   ' \\| |// `.
 **                                                     / \\||| : |||// \
 **                                                   / _||||| -:- |||||- \
 **                                                     | | \\\ - /// | |
 **                                                   | \_| ''\---/'' | |
 **                                                    \ .-\__ `-` ___/-. /
 **                                                 ___`. .' /--.--\ `. . __
 **                                              ."" '< `.___\_<|>_/___.' >'"".
 **                                             | | : `- \`.;`\ _ /`;.`/ - ` : | |
 **                                               \ \ `-. \_ __\ /__ _/ .-` / /
 **                                       ======`-.____`-.___\_____/___.-`____.-'======
 **                                                          `=---='
 **
 **                                       .............................................
 **                                              佛祖保佑             永无BUG
 **                                      佛曰:
 **                                              写字楼里写字间，写字间里程序员；
 **                                              程序人员写程序，又拿程序换酒钱。
 **                                              酒醒只在网上坐，酒醉还来网下眠；
 **                                              酒醉酒醒日复日，网上网下年复年。
 **                                              但愿老死电脑间，不愿鞠躬老板前；
 **                                              奔驰宝马贵者趣，公交自行程序员。
 **                                              别人笑我忒疯癫，我笑自己命太贱；
 **                                              不见满街漂亮妹，哪个归得程序员？
 */
/**
 * Created by liangshan on 2017/7/13.
 */

import store from './'
import * as types from './mutation-types'
import router from '../router'

const navigator = weex.requireModule('navigator')
const storage = weex.requireModule('storage')
// const Stack = new BroadcastChannel('Avengers')

export const mutations = {
  [types.SHOW_POPUP] (state, data) {
    state.popup = Object.assign({}, state.popup, data, {
      shown: true
    })
  },
  [types.HIDE_POPUP] (state) {
    state.popup.shown = false
  },
  [types.INIT_LOGIN_INFO] (state, data) {
    state.isLogin = true
    state.userInfo = data.userInfo
  },
  [types.RESET_LOGIN_INFO] (state) {
    state.isLogin = false
    state.userInfo = {}
  },
  [types.LOGIN] (state, data) {
    storage.setItem(state.storageKey.login, JSON.stringify(data.userInfo), event => {
      state.isLogin = true
      state.userInfo = data.userInfo
      // if (state.platform.toLowerCase() === 'web') {
      //   router.back()
      // } else {
      //   navigator.pop({
      //     animated: "true"
      //   }, event => {
      //   })
      // }
      // Stack.postMessage('login-state-changed', {
      //   isLogin: true
      // })
      store.commit(types.NAVIGATE_BACK)
    })
  },
  [types.LOGOUT] (state) {
    storage.removeItem(state.storageKey.login, event => {
      state.isLogin = false
      state.userInfo = {}

      // Stack.postMessage('login-state-changed', {
      //   isLogin: false
      // })
    })
  },
  [types.NAVIGATE_BACK] (state) {
    if (state.platform.toLowerCase() === 'web') {
      router.back()
    } else {
      navigator.pop({
        animated: "true"
      }, event => {

      })
    }
  },
  [types.NAVIGATE_TO] (state, data) {
    if (state.platform.toLowerCase() === 'web') {
      if (router) {
        router.push(data.to.replace(/.*\/([a-zA-Z0-9_-]*)\.js$/,'$1').toLowerCase())
      }
    } else {
      navigator.push({
        url: weex.config.bundleUrl.replace(/^(.*bundlejs).*$/, '$1') + data.to,
        animated: "true"
      }, event => {
      })
    }
  },
  [types.SET_HEADER_TITLE] (state, data) {
    // 修改header中的title
    data.hasOwnProperty('title') && (state.appHeader.title = data.title)
  }
}
