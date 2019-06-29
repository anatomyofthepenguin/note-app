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
    },
    updateNote(state, payload) {
      const {index, field, text} = payload;
      state.notes[index][field] = text;
    }
  },
  actions: {
    removeNote({commit}, payload) {
      commit('removeNote', payload)
    },
    addNote({commit}, payload) {
      commit('addNote', payload)
    },
    updateNote({commit}, payload) {
      commit('updateNote', payload)
    }
  },
  getters: {
    getNotes: state => {
      return state.notes;
    }
  }
}