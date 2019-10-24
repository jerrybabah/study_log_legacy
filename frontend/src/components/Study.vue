<template>
  <div class="study">
    <div class="study-date">{{studyDate}}</div>
    <div class="study-contents">
      <div v-if="updatedNotes.length > 0" class="notes updated-notes">
        <div class="notes-count updated-notes-count">updated {{updatedNotes.length}} notes</div>
        <div v-for="(uNote, key) in updatedNotes" :key="key" class="note updated-note">
          <span class="note-title updated-note-title">
            {{ uNote.title }}
          </span>
          /
          <b-badge v-for="(tag, key) in uNote.tagNames" :key="key" class="tag updated-note-tag">
            {{ tag }}
          </b-badge>
        </div>
      </div>
      <div v-if="createdNotes.length > 0" class="notes created-notes">
        <div class="notes-count created-notes-count">created {{createdNotes.length}} notes</div>
        <div v-for="(cNote, key) in createdNotes" :key="key" class="note created-note">
          <span class="note-title created-note-title">
            {{ cNote.title }}
          </span>
          /
          <b-badge v-for="(tag, key) in cNote.tagNames" :key="key" class="tag created-note-tag">
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
  border-left: 10px solid black;
  font-size: large;
}
.study-contents {
  margin-left: 15px;
}
.notes-count.updated-notes-count {
  color: blue;
}
.notes-count.created-notes-count {
  color: red;
}
.note {
  margin-left: 10px;
}
</style>
