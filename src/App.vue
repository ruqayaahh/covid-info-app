<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navigation.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #0d1924;
  color: silver;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#tab {
  display: grid;
  justify-content: center;
  background-color: silver;
  color: #02101d;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  align-content: center;
}
table {
  border: 5px solid silver;
  tr, td {
    border: 2px rgb(231, 157, 157);
  }
}
</style>
