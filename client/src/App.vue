<template>
  <div id="app">
    <header>
    <div class="inner">Watch Next</div>
    </header>
    <search-by></search-by>
  </div>
</template>

<script>
import search from './components/Search.vue'
import Vue from 'vue'
Vue.component('search-by', search)
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
header {
  width: 100%;
  text-align: center;
  position: fixed;
  z-index: 999;
  box-sizing: border-box;
  margin: 0 auto;
}
</style>
