<!--Auth 페이지입니다. 개발환경에서 이 페이지에 접속을 시도한다면 localhost:3000으로 리다이렉션 시킵니다.-->
<template>
  <div>리다이렉트 중</div>
</template>

<script>
export default {
  name: 'auth',
  created() {
    window.location.replace('http://localhost:3000/auth');
  },
};
</script>

<style>

</style>
