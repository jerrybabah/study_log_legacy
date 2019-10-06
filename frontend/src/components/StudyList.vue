<template>
  <div class="study-list">
    <div v-for="item in items" :key="item.id">
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dailyStudyList: {
      type: Array,
    },
  },
};
</script>

<style scoped>

</style>
