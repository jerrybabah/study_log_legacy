<template>
  <div class="home">
    <CalendarHeatmap :values="values" :end-date="endDate" :tooltip-unit="tooltipUnit"/>
  </div>
</template>

<script>
// @ is an alias to /src
import { CalendarHeatmap } from 'vue-calendar-heatmap';

export default {
  name: 'home',
  components: {
    CalendarHeatmap,
  },
  data() {
    return {
      values: [
        {
          date: '2019-10-01',
          count: 3,
          temp: 'hello',
        },
        {
          date: '2019-09-24',
          count: 2,
        },
      ],
      endDate: '2019-10-04',
      tooltipUnit: 'learnings',
    };
  },
};
</script>
