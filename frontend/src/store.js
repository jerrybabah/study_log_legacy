import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import moment from 'moment-timezone';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    yearOptions: [],

    totalDailyStudyList: [],

    startIndex: 0,
    page: 1,
    offset: 3,
  },


  getters: {
    dailyStudyList(state) {
      const start = state.startIndex;
      const end = start + state.page * state.offset;
      return state.totalDailyStudyList.slice(start, end);
    },

    studyCount(state) {
      return state.totalDailyStudyList.length;
    },

    selectedYear(state) {
      return state.yearOptions.find(v => v.selected).year;
    },

    endDate(_, getters) {
      return `${getters.selectedYear}-12-31`;
    },

    maxPage(state) {
      let maxPage = Math.ceil((state.totalDailyStudyList.length - state.startIndex) / state.offset);

      if (maxPage === 0) {
        maxPage = 1;
      }

      return maxPage;
    },

    cannotShowMore(state, getters) {
      let cannotShowMore = false;

      if (state.page >= getters.maxPage) {
        cannotShowMore = true;
      }

      return cannotShowMore;
    },
  },


  mutations: {
    rebuild(state, studies) {
      state.totalDailyStudyList = studies;
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

    selectYear(state, year) {
      const beforeSelected = state.yearOptions.find(v => v.selected);
      beforeSelected.selected = false;

      const selected = state.yearOptions.find(v => v.year === year);
      selected.selected = true;

      state.startIndex = 0;
      state.page = 1;
    },

    showMore(state) {
      state.page += 1;
    },

    showSpecificDay(state, date) {
      state.page = 1;
      state.startIndex = state.totalDailyStudyList.findIndex(s => s.date === date);
    },
  },


  actions: {
    rebuildDailyStudyList(context) {
      let URL;
      if (process.env.NODE_ENV === 'development') {
        URL = `${process.env.VUE_APP_ROOT_API}/studies/`;
      } else {
        URL = '/studies/';
      }

      const year = context.getters.selectedYear;

      axios.get(`${URL}?year=${year}`)
        .then(dailyStudyList => context.commit('rebuild', dailyStudyList.data))
        .catch(err => console.log(err));
    },
  },
});
