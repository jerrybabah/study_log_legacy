<template>
  <div class="home">
    <h1>kimbaba's study log</h1>
    <div class="relations">
      <font-awesome-icon :icon="['fab', 'github']"/>
    </div>
    <study-summary/>
    <learning-activity/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import StudySummary from '../components/StudySummary.vue';
import LearningActivity from '../components/LearningActivity.vue';

export default {
  name: 'home',
  components: {
    StudySummary,
    LearningActivity,
  },
  data() {
    return {
      tooltipUnit: 'learnings',
    };
  },
  computed: {
    ...mapGetters([
      'dailyStudyList',
    ]),
  },
};
</script>

<style scoped>
.home {
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
}
h1 {
  text-align: center;
}
.relations {
  display: flex;
  justify-content: center;
}
</style>
