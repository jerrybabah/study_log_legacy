<template>
  <div class="year-studies">
    <div class="year-studies-header">
      <h2 class="total-studies">{{ studyCount }} learnings in 2019</h2>
      <b-dropdown id="dropdown-1" right size="sm" variant="outline-secondary"
      :text="String(selectedYear)">
        <b-dropdown-item @click="rebuild(yearOption.year)" :disabled="yearOption.selected"
        v-for="(yearOption, key) in yearOptions" :key="key">
          {{ yearOption.year }}
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="year-studies-body">
      <CalendarHeatmap @day-click="dayClick" :values="totalDailyStudyList" :end-date="endDate" :tooltip-unit="tooltipUnit"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { CalendarHeatmap } from 'vue-calendar-heatmap';
import moment from 'moment-timezone';

export default {
  name: 'studySummary',
  components: {
    CalendarHeatmap,
  },

  data() {
    return {
      tooltipUnit: 'learnings',
    };
  },

  computed: {
    ...mapState([
      'totalDailyStudyList',
      'yearOptions',
    ]),
    ...mapGetters([
      'studyCount',
      'selectedYear',
      'endDate',
    ]),
  },

  methods: {
    ...mapMutations([
      'selectYear',
      'showSpecificDay',
    ]),
    ...mapActions([
      'rebuildDailyStudyList',
    ]),
    rebuild(year) {
      this.selectYear(year);
      this.rebuildDailyStudyList();
    },
    dayClick(event) {
      if (event.count === 0) {
        return;
      }
      const date = moment(event.date.valueOf()).tz('Asia/Seoul').format('YYYY-MM-DD');
      this.showSpecificDay(date);
    },
    test(event) {
      console.log(event.date.valueOf());
    },
  },
};
</script>

<style>
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
