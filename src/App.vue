<template>
<div class="wrapper">
  <div class="wrapper-content">
    <section>
      <div class="container">
        <message v-if="message" :message="message"/>
        <!-- note add -->
        <newNote :note="note" :priorities="priorities" @addNote="addNote"/>
        <!-- notes list -->

        <div class="note-header">
          <h1>{{title}}</h1>
      
          <search 
            :value="search" 
            placeholder="Finde note"
            @search="search = $event"/>

          <div class="icons">
            <svg :class="{ active: grid }" @click="grid = true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <svg :class="{ active: !grid }" @click="grid = false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
          </div>
        </div>
        
        <notes 
          :grid="grid" 
          :notes="notesFilter" 
          @remove="removeNote"/>
        
      </div>
    </section>
  </div>
</div>
</template>

<script>
import message from '@/components/Message.vue'
import notes from '@/components/Notes.vue'
import search from '@/components/Search.vue'
import newNote from '@/components/NewNote.vue'

export default {
  components: {
    message,
    notes,
    search,
    newNote    
  },
  data() {
    return {
      title: 'Note app',
      message: null,
      grid: true,
      search: '',
      note: {
        title: '',
        priority: 'Common',
        descr: ''
      },
      priorities: [
        "Common",
        "Important",
        "Very important"
      ],
      notes: [
        {
          title:'First node',
          descr: 'Description for note',
          date: new Date(Date.now()).toLocaleString(),
          priority: "Very important"
        },
        {
          title:'Second node',
          descr: 'Description for note',
          date: new Date(Date.now()).toLocaleString(),
          priority: "Common"
        },
        {
          title:'Third node',
          descr: 'Description for note',
          date: new Date(Date.now()).toLocaleString(),
          priority: "Important"
        }
      ]
    }
  },
  methods: {
    addNote() {
      let {title, descr, priority} = this.note;

      if(title === '') {
        this.message = "Title can't be blank";
        return false;
      }

      this.notes.push({
        title,
        descr,
        priority,
        date: new Date(Date.now()).toLocaleString()
      })

      this.message = null;
      this.note.title = '';
      this.note.descr = '';
      this.note.priority = 'Common';
    },
    removeNote(index) {
      this.notes.splice(index, 1);
    },
  },
  computed: {
    notesFilter(){ 
      let array = this.notes,
          search = this.search;
      
      if(!search) return array;
      search = search.trim().toLowerCase();
      //filter
      array = array.filter( item => {
        if(item.title.toLowerCase().indexOf(search) !== -1){
          return item
        }
      })

      return array;

    }
  }
}
</script>
