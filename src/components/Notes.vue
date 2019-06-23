<template>
  <div class="notes">
    <div class="note" :class="{full: !grid}" v-for="(note, index) in notes" :key="index">
      <div class="note-header">
        <div class="note-header-left">
          <p>{{note.title}}</p>
          <div class="note-priority" 
              :class="note.priority">
            {{note.priority}}
          </div>
        </div>
        <p class="note-remove" @click="removeNote(index)">X</p>
      </div> 
      <div class="note-body">
        <p>{{note.descr}}</p>
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
  methods: {
    removeNote(index) {
      this.$store.dispatch('removeNote', index)
    }
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
</style>
