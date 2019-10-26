<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('initializeYearOptions');
    this.$store.dispatch('rebuildDailyStudyList');
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 10px 0;
}
#home {
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
  padding: 40px 20px;
}
</style>
