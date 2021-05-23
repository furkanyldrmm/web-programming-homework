import Vue from 'vue'

import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)


 const store = new Vuex.Store(
    {
      plugins: [createPersistedState()],
  
        state: {
            authenticated: false,
            user:""
        },
        mutations: {
            setAuthentication(state, status) {
                state.authenticated = status;
            },
            setUserData(state, status) {
              console.log(status);
              state.user = status;
          },
          logOut(state, status) {
            state.user = "";
            state.authenticated=false;
        },
        }
    });

    export default store
