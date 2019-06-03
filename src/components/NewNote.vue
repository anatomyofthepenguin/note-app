<template>
  <div class="new-note">
    <div class="note-top">
      <div class="note-group">
        <label>Title</label>
        <input v-model="note.title" type="text"> 
      </div>
      <div class="note-group">
        <label>Priority</label>
        <select v-model="note.priority">
          <option v-for="(priority, index) in priorities" :key="index">{{priority}}</option>
        </select>
      </div>
      </div>
    <label>Description</label>
    <textarea v-model="note.descr"></textarea>
    <button class="btn btnPrimary" @click="addNote">New Note</button>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    },
    priorities: {
      type: Array,
      required: true
    }
   
  },
  methods: {
    addNote(){
      this.$emit('addNote', this.note);
    }
  }
}
</script>

<style lang="scss">
.new-note {
  text-align: center;
  margin-bottom: 40px;
  & > button {
    margin-top: 15px;
  }
  .note-top {
    display: flex;
    justify-content: space-between;
  }
  .note-group:first-child{
    width: 70%;
  }
  select {
    padding: 16px 26px;
    margin-bottom: 30px;
    border-radius: 20px;
  }
}

</style>
