<template>
  <div>
    <div>데이터를 갱신하는 중입니다.</div>
    <div v-if="success">성공!</div>
  </div>
</template>

<script>
export default {
  name: 'waitingRoom',
  data() {
    return {
      success: false,
    };
  },

  created() {
    const BASE_URL = process.env.VUE_APP_ROOT_API;

    this.$http.put(`${BASE_URL}/studies/`)
      .then(msg => console.log(msg))
      .then(() => { this.success = true; })
      .catch(err => console.log(err));
  },
};
</script>

<style>

</style>
