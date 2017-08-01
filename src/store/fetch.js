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

const stream = weex.requireModule('stream')
const baseURL = 'https://hacker-news.firebaseio.com/v0'

// export function fetch (path) {
//   return new Promise((resolve, reject) => {
//     stream.fetch({
//       method: 'GET',
//       url: `${baseURL}/${path}.json`,
//       type: 'json'
//     }, (response) => {
//       if (response.status == 200) {
//         resolve(response.data)
//       }
//       else {
//         reject(response)
//       }
//     }, () => {})
//   })
// }

function isEmptyObj (obj) {
  var t;
  for (t in obj)
    return !1
  return !0
}

export function fetch (opts) {
  // let body = ''
  // if (typeof opts.body !== 'string') {
  //   body = JSON.stringify(opts.body)
  // } else {
  //   body = opts.body
  // }
  let headers = {}
  if (opts.hasOwnProperty('method') && opts.method.toLowerCase() === 'post') {
    headers['Content-Type'] = 'application/json'
  } else {
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  stream.fetch({
    method: opts.method || 'GET',
    url: opts.url,
    headers: Object.assign({}, headers, opts.headers),
    type: opts.type || 'json',
    body: opts.data
  }, (response) => {
    opts.callback && opts.callback(response)
  }, (response) => {
    opts.progress && opts.progress(response)
  })
}

export function fetchIdsByType (type) {
  return fetch(`${type}stories`)
}

export function fetchItem (id) {
  return fetch(`item/${id}`)
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser (id) {
  return fetch(`user/${id}`)
}
