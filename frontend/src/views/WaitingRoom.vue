<template>
  <div class="container-center">
    <div class="msg">데이터를 갱신하는 중입니다.</div>
    <b-spinner style="width: 3rem; height: 3rem;" label="loading..."></b-spinner>
  </div>
</template>

<script>
export default {
  name: 'waitingRoom',

  created() {
    let URL;
    const data = {};
    if (process.env.NODE_ENV === 'development') {
      URL = `${process.env.VUE_APP_ROOT_API}/studies/`;
      // 아래 코드가 좀 그렇긴 하지만 일단 이렇게 하자.
      data.oauthAccessToken = decodeURIComponent(window.location.search.substr(18));
    } else {
      URL = '/api/studies/';
    }

    this.$http.put(URL, data)
      .then(() => { window.location = './'; })
      .catch(err => console.log(err));
  },
};
</script>

<style>
.container-center {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.msg {
  font-size: 2rem;
  margin-bottom: 20px;
}
</style>
