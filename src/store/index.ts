import Vue from 'vue'
import Vuex from 'vuex'
import { store } from "@/store/store"
import { contact } from '@/scripts/contact'
import { message } from '@/scripts/message'

Vue.use(Vuex)

const state: store.State = new store.State()

export default new Vuex.Store({
  state,
  mutations: {
    setInit: (state: store.State, payload: boolean) => {
      state.isInited = payload;
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
      const logs = state.chatLogs.get(payload.chatID)
      if (!logs) {
        return
      }
      logs.push(payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
