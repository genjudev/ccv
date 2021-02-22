import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const getDefaultState = () => {
    return {
        token: '',
        user: {},
        watched: {
            items: [],
        }
    };
};

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        getWatchedItems: state => {
            return state.watched.items;
        },
    },
    mutations: {
        SET_WATCHED_ITEM: (state, item) => {
            if(state.watched.items.indexOf(item) === -1) {
                state.watched.items.push(item);
            }
        },
        REM_WATCHED_ITEM: (state, item) => {
            state.watched.items = state.watched.items.filter(f => f != item);
        },
        RESET: state => {
            Object.assign(state, getDefaultState());
        }
    },
    actions: {
        addWatchedItem: ( { commit }, item) => {
            commit('SET_WATCHED_ITEM', item);
        },
        remWatchedItem: ( { commit }, item ) => {
            commit('REM_WATCHED_ITEM', item)
        },
        reset: ({ commit }) => {
            commit('RESET', '');
        }
    }
})