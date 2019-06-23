<template>
<div class="wrapper">
  <div class="wrapper-content">
    <section>
      <div class="container">
        <!-- note add -->
        <newNote />
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
        
        <notes :grid="grid" :notes="notesFilter"/>
        
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
    notes,
    search,
    newNote    
  },
  data() {
    return {
      title: 'Note app',
      grid: true,
      search: '',
      notes: null
    }
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
  },
  
  created: function() {
    this.notes = this.$store.getters.getNotes
  }
}
</script>
