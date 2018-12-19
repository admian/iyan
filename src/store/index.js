 import Vue from 'vue'
 import vuex from 'vuex'
 import { cookie } from 'vux'
 Vue.use(vuex)


const state = {
  routerPath:'/',
  baseUrl:'https://3333333.com/',
  shareShade:false,
  token:null,
  my_userId:null,
  my_userNick:null,
  my_userHeadPic:null,
  tips:[]
}
const mutations = {
  SHOWTABBAR(state,routerPath) {
    state.routerPath = routerPath;

  },
  /*设置state*/
  SETSTATE(state,payload){
    state[payload.type] = payload.val;
  }
}
const actions = {
  showTabbar(context,obj) {
    context.commit("SHOWTABBAR",obj);
  },

}
const getters = {

}
export default new vuex.Store({
  state,
  mutations,
  actions,
  getters
})
