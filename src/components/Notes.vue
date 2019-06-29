<template>
  <div class="notes">
    <div class="note" :class="{full: !grid}" v-for="(note, index) in notes" :key="index">
      <div class="note-header">
        <div class="note-header-left">
          <input 
            class="note-edit" 
            type="text" 
            v-if="titleEditIndex === index"
            v-model="titleEditText">
          <p class="note-title" @click="noteShowInput(index, note.title, 'title')" v-else>{{note.title}}</p>
          <div class="note-priority" 
              :class="note.priority">
            {{note.priority}}
          </div>
        </div>
        <p class="note-remove" @click="removeNote(index)">X</p>
      </div> 
      <div class="note-body">
        <textarea 
          class="note-edit" 
          type="text"
          v-if="descrEditIndex === index"
          v-model="descrEditText"></textarea>
        <p class="note-descr" @click="noteShowInput(index, note.descr, 'descr')" v-else>{{note.descr}}</p>
        <span>{{note.date}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notes: {
      type: Array,
      required: true
    },
    grid: {
      type: Boolean,
      required: true
    }
  },
  data(){
    return {
      descrEditIndex: null,
      titleEditIndex: null,
      descrEditText: '',
      titleEditText: ''
    }
  },
  methods: {
    removeNote(index) {
      this.$store.dispatch('removeNote', index)
    },
    updateNote() {
      let field = '', 
          text = '',
          index = null;

      if (this.descrEditIndex !== null && this.descrEditText) {
        field = 'descr';
        text = this.descrEditText;
        index = this.descrEditIndex;
        this.$store.dispatch('updateNote', {index, field, text})
      };
  
      if (this.titleEditIndex !== null && this.titleEditText) {
        console.log('not null')
        field = 'title';
        text = this.titleEditText;
        index = this.titleEditIndex;
        this.$store.dispatch('updateNote', {index, field, text})
      };

      this.descrEditIndex = null;
      this.titleEditIndex = null;
      this.descrEditText = '';
      this.titleEditText = '';
    },
    noteShowInput(index, text, field) {
      this[field+'EditIndex'] = index;
      this[field+'EditText'] = text;
    }
  },
  mounted() {
    const closeInputs =  element => {
      const isInput = element.classList.contains('note-edit');
      const isTitle = element.classList.contains('note-title');
      const isDescr = element.classList.contains('note-descr');
      if (isInput || isTitle || isDescr) {
        return false;
      } else {
        this.descrEditIndex = null;
        this.titleEditIndex = null;
      }
    }
    document.body.addEventListener('click', event => {
      closeInputs(event.target);
    })
    document.body.addEventListener('keyup', event => {
      if(event.keyCode === 27){
        closeInputs(event.target);
      }
      if(event.keyCode === 13) {
        this.updateNote();
      }
      
    })
  }
}
</script>

<style lang="scss">
  .notes {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 40px 0;
  }
  .note {
    width: 48%;
    padding: 18px 20px;
    margin-bottom: 20px;
    background: #ffffff;

    &.full {
      width: 100%;
    }
  }
  .note-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    p {
      font-size: 22px;
      color: #402caf;
    }
    svg {
      margin-right: 12px;
      color: #999;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }

      &.active {
        color: #402caf;
      }
    }

    .note-header-left {
      display: flex;
      .note-priority {
        font-size: 14px;
        font-weight: 600;
        background: rgb(207, 201, 201);
        color:#ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        border-radius: 5px;
        margin-left: 10px;
        text-transform: capitalize;
        align-self: flex-start;
        padding: 7px;
        &.critical {
          background: #fc5c65;
        }
        &.important {
          background: #fed330;
        }
      }
    }
  }
  .note-body {
    p {
      margin: 20px 0;
    }

    span {
      font-size: 14px;
      color: #999;
    }
  }
  .note-remove {
    cursor:pointer; 
    align-self:flex-start
  }
  .note-edit {
    padding: 10px;
  }
</style>
