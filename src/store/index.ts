import Vue from 'vue'
import Vuex from 'vuex'
import { store } from "@/store/store"
import { contact } from '@/scripts/contact'
import { message } from '@/scripts/message'
import { user } from "@/scripts/user";

Vue.use(Vuex)

const state: store.State = new store.State()

export default new Vuex.Store({
  state,
  mutations: {
    setInit: (state: store.State, payload: boolean) => {
      state.isInited = payload;
    },
    setUser: (state: store.State, payload: user.User) => {
      state.user = payload;
    },
    setGroups: (state: store.State, payload: contact.Group[]) => {
      state.groups = payload;
    },
    setPrivates: (state: store.State, payload: contact.Private[]) => {
      state.privates = payload;
    },
    addGroup: (state: store.State, payload: contact.Group) => {
      state.groups.push(payload);
    },
    addPrivate: (state: store.State, payload: contact.Private) => {
      state.privates.push(payload);
    },
    setChatting: (state: store.State, payload: contact.Group | contact.Private) => {
      state.chatting = payload;
    },
    pushMessage: (state: store.State, payload: message.Message) => {
      let logs = state.chatLogs.get(payload.chatID)
      logs ? logs.push(payload) : logs = [payload]
      state.chatLogs.set(payload.chatID, logs)

      const newMap = new Map<string, message.Message[]>()
      for (let [key, value] of state.chatLogs) {
        newMap.set(key, value)
      }
      state.chatLogs = newMap;
    }
  },
  actions: {
  },
  modules: {
  }
})
