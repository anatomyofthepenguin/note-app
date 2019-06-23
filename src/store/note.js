export default {
  state: {
    notes: [
      {
        title:'First node',
        descr: 'Description for note',
        date: new Date(Date.now()).toLocaleString(),
        priority: "important"
      },
      {
        title:'Second node',
        descr: 'Description for note',
        date: new Date(Date.now()).toLocaleString(),
        priority: "common"
      },
      {
        title:'Third node',
        descr: 'Description for note',
        date: new Date(Date.now()).toLocaleString(),
        priority: "critical"
      }
    ]
  },
  mutations: {
    removeNote(state, payload) {
      state.notes.splice(payload, 1)
    },
    addNote(state, payload) {
      state.notes.push(payload)
    }
  },
  actions: {
    removeNote({commit}, payload) {
      commit('removeNote', payload)
    },
    addNote({commit}, payload) {
      commit('addNote', payload)
    }
  },
  getters: {
    getNotes: state => {
      return state.notes;
    }
  }
}