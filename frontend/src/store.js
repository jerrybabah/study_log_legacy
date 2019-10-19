import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import moment from 'moment-timezone';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    yearOptions: [],
    dailyStudyList: [],
  },


  getters: {
    studyCount(state) {
      return state.dailyStudyList.length;
    },

    selectedYear(state) {
      return state.yearOptions.find(v => v.selected).year;
    },

    endDate(_, getters) {
      return `${getters.selectedYear}-12-31`;
    },
  },


  mutations: {
    rebuild(state, studies) {
      state.dailyStudyList = studies;
    },

    initializeYearOptions(state) {
      const minYear = 2019;
      const thisYear = Number(moment().tz('Asia/Seoul').format('YYYY'));

      for (let year = minYear; year <= thisYear; year += 1) {
        let selected = false;
        if (year === thisYear) {
          selected = true;
        }

        const yearOption = {
          year,
          selected,
        };

        state.yearOptions.push(yearOption);
      }
    },
  },

  selectYear(state, year) {
    const beforeSelected = state.yearOptions.find(v => v.selected);
    beforeSelected.selected = false;

    const selected = state.yearOptions.find(v => v.year === year);
    selected.selected = true;
  },


  actions: {
    rebuildDailyStudyList(context) {
      const BASE_URL = process.env.VUE_APP_ROOT_API;
      const year = context.getters.selectedYear;

      axios.get(`${BASE_URL}/studies/?year=${year}`)
        .then(dailyStudyList => context.commit('rebuild', dailyStudyList.data))
        .catch(err => console.log(err));
    },
  },
});
