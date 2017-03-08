import * as types from './mutation-types';

export default {
    [types.NAVIGATE_CHANGE](state, currentView){
        state.currentView = currentView;
    }
}