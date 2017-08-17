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
// import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'
import * as types from './mutation-types'

const env = weex.config.env || WXEnvironment
if (env.platform !== 'Web') {
  Vue.use(Vuex)
}

function isEmptyObj (obj) {
  var t;
  for (t in obj)
    return !1
  return !0
}

const store = new Vuex.Store({
  actions,
  mutations: mutations.mutations,
  getters,
  state: {
    // baseRequestUrl: 'https://127.0.0.1:3002/index/',
    baseRequestUrl: 'https://talkapi.dei2.com/index/',
    storageKey: {
      login: 'weexUserInfo',
      city: 'weexCity'
    },
    startPage: {    // 启动屏幕
      shown: true,
      resources: [
        'https://static.dei2.com/app/full/01.jpg',
        'https://static.dei2.com/app/full/02.jpg',
        'https://static.dei2.com/app/full/03.jpg',
        'https://static.dei2.com/app/full/04.jpg',
        'https://static.dei2.com/app/full/05.jpg'
      ]
    },
    geolocation: {
      shown: true,  // 是否显示定位
      finished: true,    // 定位是否完成
      city: '',     // 定位城市名称
      lat: 39.991579,
      lng: 116.46798089999999
    },
    isLogin: false, // 是否为登录状态
    userInfo: {},   // 登录用户信息
    banner: {
      shown: true
    },
    topMenu: {
      shown: true
    },
    hotRecruitment: {
      shown: true
    },
    hotIndustry: {
      shown: true
    },
    hotSubject: {
      shown: true
    },
    feedback: {
      shown: true
    },
    app: {
      name: env.appName || '',
      version: env.appVersion || '0.0.1',
    },
    device: {
      model: env.deviceModel || '',
      width: env.deviceWidth || 750,
      height: env.deviceHeight || 1334,
      dpr: env.platform.toLowerCase() === 'web' ? env.dpr : env.scale
    },
    appHeader: {
      title: env.appName || '',
      theme: '#4fc08d',
      color: '#ffffff'
    },
    platform: env.platform && env.platform.toLowerCase() || '',
    location: {
      name: ''
    },
    popup: {
      title: '弹出窗口',
      type: 0,    // 1: 定位
      shown: false
    },
    pageParams: {},
    history: [],
    tabItems: [
      {
        index: 0,
        title: '百思不得姐',
        titleColor: '#aaaaaa',
        icon: '',
        image: 'https://static.dei2.com/app/ti/bdj_unselect.png',
        selectedImage: 'https://static.dei2.com/app/ti/bdj_selected.png',
        src: '/tabA',
        visibility: 'visible',
      },
      {
        index: 1,
        title: '今日头条',
        titleColor: '#ff0000',
        icon: '',
        image: 'https://static.dei2.com/app/ti/tt_unselect.png',
        selectedImage: 'https://static.dei2.com/app/ti/tt_selected.png',
        src: '/tabB',
        visibility: 'hidden',
      },
      {
        index: 2,
        title: '找工作',
        titleColor: '#aaaaaa',
        icon: '',
        image: 'https://static.dei2.com/app/ti/job_unselect.png',
        selectedImage: 'https://static.dei2.com/app/ti/job_selected.png',
        src: '/tabC',
        visibility: 'hidden'
      },
      {
        index: 3,
        title: '我',
        titleColor: '#aaaaaa',
        icon: '',
        image: 'https://static.dei2.com/app/ti/m_unselect.png',
        selectedImage: 'https://static.dei2.com/app/ti/m_selected.png',
        src: '/tabD',
        visibility: 'hidden',
      }
    ],
    job: {
      encryptInfo: {
        c: 'wxxiaochengxu',
        k: '135486906272855',
        s: '5D80A834519X4F44ADCC7F1D5X90B269',
        d: 'AF377B8B-3550-5433-86F0-D5F4F95FFF2E',
        v: '1.0',
        // payPoint: 'b7ccb3b53abe46988df5a639fba980e4',       // QA
        // payPoint: 'f21c4f14fc974494bec822fb46fd1a6e',           // 线上一分钱
        payPoint: '34a95223a071419da275719ea2a55daf',        // 线上
        appPlat: 12,
        payType: 12
      },
      baseUrl: 'https://mi.zhaopin.com',
      requestUrl: {
        resume: {
          create: '/WechatSmall/Resume/Create',             // 创建简历
          integrity: '/WechatSmall/Resume/Integrity',           // 获取简历完整度
          refresh: '/WechatSmall/Resume/Refresh',             // 简历一键刷新
          modifyName: '/WechatSmall/Resume/ModifyName',         // 更新简历名称
          updateUserInfo: '/WechatSmall/My/UpdateUserInfo',        // 更新用户的基本信息
          operate: '/WechatSmall/Resume/Operate',                 // 设置简历，0-刷新简历，1-设置默认，4-公开个人简历，5-委托智联，6-保密个人简历，8-取消默认
          getJobTarget: '/WechatSmall/Resume/JobTarget',            // 获取某份简历的求职意向
          saveJobTarget: '/WechatSmall/Resume/SaveJobTarget',    // 保存某份简历的求职意向
          getEducationExperiences: '/WechatSmall/Resume/EducationExperiences',   // 获取某份简历的教育经历
          saveEducationExperience: '/WechatSmall/Resume/SaveEducationExperience',   // 保存教育经历
          getWorkExperiences: '/WechatSmall/Resume/WorkExperiences',             // 获取某份简历的工作经历
          saveWorkExperience: '/WechatSmall/Resume/SaveWorkExperience',             // 保存某份简历的工作经历
          getProjectExperiences: '/WechatSmall/Resume/GetProjectExperiences',        // 获取项目经验
          saveProjectExperience: '/WechatSmall/Resume/SaveProjectExperience',       // 保存项目经验
          getSelfEvaluation: '/WechatSmall/Resume/SelfEvaluation',                   // 获取自我评价
          saveSelfEvaluation: '/WechatSmall/Resume/SaveSelfEvaluation',               // 保存自我评价
          deleteResumeInfo: '/WechatSmall/Resume/DeleteResumeInfo'                   // 删除教育背景或工作经验或项目经验。resumeOperate: 	0-删除工作经验，1-删除教育背景, 2是删除项目经验
        },
        position: {
          jobList: '/WechatSmall/my/Recommend', // 未登录状态下，职位列表接口
          getSimilarPositions: '/WechatSmall/Position/SimilarPositions',      // 获取相似职位
          operate: '/WechatSmall/Position/Operate',           // 职位申请
          search: '/WechatSmall/Position/Search',             // 职位搜索
          jobDetail: '/WechatSmall/Position/Detail'    // 职位详情列表
        },
        my: {
          getUserDetail: '/WechatSmall/My/GetUserDetail',      // 获取我的个人信息
          getVerification: '/WechatSmall/My/GetMobileVerification',  // 获取手机验证码
          checkVerification: '/WechatSmall/My/CheckMobileVerification',  // 检验手机验证码
          getCode: '/WechatSmall/My/ForgetPwdGetCode',       // 忘记密码页，获取短信验证码
          checkCode: '/WechatSmall/My/ForgetPwdCheckCode',   // 忘记密码页，检验短信验证码
          checkUsername: '/WechatSmall/My/CheckRegisterNameExist',           // 检测手机号、邮箱是否被注册过
          login: '/WechatSmall/My/Login',    // 登录接口
          logout: '/WechatSmall/My/logout',       // 账号退出
          register: '/WechatSmall/My/Register',      // 账号注册
          forgetPwd: '/WechatSmall/My/ForgetPwd',     // 忘记密码页，修改密码
          bindMobile: '/WechatSmall/My/MobileBinding',   // 绑定手机号
          getMobileBindingVerification: '/WechatSmall/My/GetMobileBindingVerification'    // 获取手机绑定验证码
        },
        more: {
          searchByKeyword: '/WechatSmall/more/SearchByKeyword',  // 热词联想
          loginLog: '/WechatSmall/more/LoginLog'                // 启动用户log 6.43
        }
      }
    }
  }
})

const storage = weex.requireModule('storage')
storage.getItem('weexUserInfo', event => {
  let _data = ''
  try {
    _data = JSON.parse(event.data)
  } catch (err) {
    _data = event.data
  }
  if (!isEmptyObj(_data) && _data !== 'undefined') {
    store.commit(types.INIT_LOGIN_INFO, {
      userInfo: _data
    })
  } else {
    store.commit(types.RESET_LOGIN_INFO)
  }
})

export default store

if (env.platform.toLowerCase() !== 'web') {
  global.store = store
}