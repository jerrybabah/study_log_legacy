<template>
  <div class="study">
    <div class="study-date"><span>{{studyDate}}</span></div>
    <div class="study-contents">
      <div v-if="createdNotes.length > 0" class="notes created-notes">
        <div class="notes-count created-notes-count">
          <i><font-awesome-icon :icon="['fa', 'pen']"></font-awesome-icon></i>
          <span>Created {{createdNotes.length}} </span>
          <span v-if="createdNotes.length === 1">note</span>
          <span v-else>notes</span>
        </div>
        <div v-for="(cNote, key) in createdNotes" :key="key" class="note created-note">
          <span class="note-title created-note-title">
            {{ cNote.title }}
          </span>
          <span v-if="cNote.tagNames.length > 0">/ </span>
          <b-badge v-for="(tag, key) in cNote.tagNames" :key="key" class="tag created-note-tag">
            {{ tag }}
          </b-badge>
        </div>
      </div>
      <div v-if="updatedNotes.length > 0" class="notes updated-notes">
        <div class="notes-count updated-notes-count">
          <i><font-awesome-icon :icon="['fas', 'redo']"></font-awesome-icon></i>
          <span>Updated {{updatedNotes.length}} </span>
          <span v-if="updatedNotes.length === 1">note</span>
          <span v-else>notes</span>
        </div>
        <div v-for="(uNote, key) in updatedNotes" :key="key" class="note updated-note">
          <span class="note-title updated-note-title">
            {{ uNote.title }}
          </span>
          <span v-if="uNote.tagNames.length > 0">/ </span>
          <b-badge v-for="(tag, key) in uNote.tagNames" :key="key" class="tag updated-note-tag">
            {{ tag }}
          </b-badge>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'study',
  props: {
    dailyStudy: {
      type: Object,
    },
  },
  computed: {
    studyDate() {
      return this.dailyStudy.date;
    },
    createdNotes() {
      return this.dailyStudy.contents.filter(note => note.status === 'created');
    },
    updatedNotes() {
      return this.dailyStudy.contents.filter(note => note.status === 'updated');
    },
  },
};
</script>

<style scoped>
.study-date {
  position: relative;
}
.study-date span {
  background-color: white;
  padding: 4px 0;
  padding-right: 8px;
  font-size: 16px;
  color: gray;
}
.study-date::after {
  position: absolute;
  top: 11px;
  bottom: 0;
  left: 0;
  z-index: -1;
  display: block;
  width: 100%;
  height: 2px;
  content: "";
  background-color: #e1e4e8;
}
.study-contents {
  margin-left: 15px;
  padding-left: 24px;
}
.notes {
  margin: 25px 0;
}
/* .notes-count.updated-notes-count {
  color: blue;
}
.notes-count.created-notes-count {
  color: red;
} */
.notes-count {
  margin-bottom: 6px;
  font-size: 1.2rem;
}
.notes-count i {
  display: inline-block;
  width: 24px;
}
.notes-count .svg-inline--fa {
  color: #ee6184;
}
.note {
  margin-left: 25px;
  line-height: 23px;
}
.note .badge {
  background-color: #9acd32;
  margin-right: 2px;
}
</style>
