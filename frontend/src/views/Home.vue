<template>
  <div class="home">
    <h1>kimbaba's study log</h1>
    <div class="relations">
      <font-awesome-icon :icon="['fab', 'github']"/>
    </div>
    <div class="year-studies">
      <div class="year-studies-header">
        <h2 class="total-studies">10 studies in 2019</h2>
        <b-dropdown id="dropdown-1" right size="sm" variant="outline-secondary" text="2019">
          <b-dropdown-item :disabled="disabled">2019</b-dropdown-item>
          <b-dropdown-item>2018</b-dropdown-item>
          <b-dropdown-item>2017</b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="year-studies-body">
        <CalendarHeatmap :values="values" :end-date="endDate" :tooltip-unit="tooltipUnit"/>
      </div>
    </div>
    <div class="studies-activity">
      <h2 class="studies-activity-header">activity</h2>
      <div class="studies-activity-body">
        <study v-for="(study, key) in values" :key="key" :daily-study="study"/>
      </div>
      <div class="studies-activity-footer">
        <b-button block variant="primary">Show more</b-button>
      </div>
    </div>
  </div>
</template>

<script>
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
      disabled: true,
      values: [
        {
          date: '2019-10-01',
          count: 3,
          contents: [
            {
              guid: 'c3f958f5-c959-46b9-92ef-3b2d7f79f477',
              title: '임시 노트',
              date: 1569907299000,
              tagNames: ['a', 'b'],
              status: 'updated',
            },
            {
              guid: 'c3f958f5-c959-46b9-92ef-3b2d7f79f477',
              title: '제목 없음',
              date: 1569375544000,
              tagNames: ['a', 'b'],
              status: 'updated',
            },
            {
              guid: 'c3f958f5-c959-46b9-92ef-3b2d7f79f477',
              title: '임시 노트',
              date: 1569907299000,
              tagNames: ['c', 'd'],
              status: 'created',
            },
          ],
        },
        {
          date: '2019-09-24',
          count: 2,
          contents: [
            {
              guid: 'c3f958f5-c959-46b9-92ef-3b2d7f79f477',
              title: '임시 노트',
              date: 1569907299000,
              tagNames: ['c', 'd'],
              status: 'updated',
            },
            {
              guid: 'c3f958f5-c959-46b9-92ef-3b2d7f79f477',
              title: '제목 없음',
              date: 1569375544000,
              tagNames: ['x', 'y'],
              status: 'updated',
            },
          ],
        },
      ],
      endDate: '2019-10-05',
      tooltipUnit: 'learnings',
      config: {
        options: [
          {
            value: 'option 1',
          },
          {
            value: 'option 2',
          },
          {
            value: 'option 3',
          },
        ],
        placeholder: 'choose',
        prefix: 'The',
        backgroundColor: 'green',
      },
    };
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
