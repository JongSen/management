import vue from 'vue';
import vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';
console.log(getters)

vue.use(vuex);

const state = {
    currentView: 'loading'
};

const debug = process.env.NODE_ENV !== 'production';

export default new vuex.Store({
    state,
    actions,
    getters,
    modules: {},
    mutations,
  	strict: debug
});	