<template>
  <div class="home">
    <h1>kimbaba's study log</h1>
    <div class="relations">
      <font-awesome-icon :icon="['fab', 'github']"/>
    </div>
    <div class="year-studies">
      <div class="year-studies-header">
        <h2 class="total-studies">{{ studyCount }} learnings in 2019</h2>
        <b-dropdown id="dropdown-1" right size="sm" variant="outline-secondary"
        :text="selectedYear">
          <b-dropdown-item :disabled="yearOption.selected"
          v-for="(yearOption, key) in yearOptions" :key="key">
            {{ yearOption.year }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="year-studies-body">
        <CalendarHeatmap :values="dailyStudyList" :end-date="endDate" :tooltip-unit="tooltipUnit"/>
      </div>
    </div>
    <div class="studies-activity">
      <h2 class="studies-activity-header">Learning activity</h2>
      <div class="studies-activity-body">
        <study v-for="(study, key) in dailyStudyList" :key="key" :daily-study="study"/>
      </div>
      <div class="studies-activity-footer">
        <b-button block variant="primary">Show more</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { CalendarHeatmap } from 'vue-calendar-heatmap';
import Study from '../components/Study.vue';

export default {
  name: 'home',
  components: {
    CalendarHeatmap,
    Study,
  },
  data() {
    return {
      tooltipUnit: 'learnings',
    };
  },
  computed: {
    ...mapState([
      'dailyStudyList',
      'yearOptions',
    ]),
    ...mapGetters([
      'studyCount',
      'selectedYear',
      'endDate',
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
.year-studies-header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-end;
}
.year-studies-body {
  border: 1px solid black;
  padding: 25px;
}
</style>
