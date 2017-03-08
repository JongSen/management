import * as types from './mutation-types';

export const navigateChange = ({commit}, currentView) => {
    commit(types.NAVIGATE_CHANGE, currentView);
};