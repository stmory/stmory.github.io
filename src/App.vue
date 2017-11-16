<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style type="text/scss" lang="scss" scoped>
body{
  #app{
    margin-left: 100px;
    margin-top: 300px;
    background-color: #dfe233;
  }
}
</style>
