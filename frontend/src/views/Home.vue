<template>
  <div id="home">
    <h1>kimbaba's study log</h1>
    <div class="relations">
      <a href="https://github.com/BABAHIRONOBU" target="_blank"><font-awesome-icon :icon="['fab', 'github']"/></a>
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
  computed: {
    ...mapGetters([
      'dailyStudyList',
    ]),
  },
};
</script>

<style scoped>
/* 왜 이거는 빌드했을 때 적용이 안될까? */
#home {
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
  padding: 40px 0;
}
#home h1 {
  text-align: center;
}
.relations {
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin: 0.5rem 0;
}
.relations a {
  all: unset;
  cursor: pointer;
}
</style>
