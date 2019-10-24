<template>
  <div class="studies-activity">
    <h2 class="studies-activity-header">Learning activity</h2>
    <div class="studies-activity-body">
      <study v-for="(study, key) in dailyStudyList" :key="key" :daily-study="study"/>
    </div>
    <div class="studies-activity-footer">
      <b-button @click="showMore" block variant="primary" :disabled="cannotShowMore">Show more</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Study from './Study.vue';

export default {
  name: 'learningActivity',
  components: {
    Study,
  },

  computed: {
    ...mapGetters([
      'dailyStudyList',
      'cannotShowMore',
    ]),
  },

  methods: {
    ...mapMutations([
      'showMore',
    ]),
  },
};
</script>

<style>

</style>
