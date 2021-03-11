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
  background-color: #0d1924;
  color: silver;
}
#subheader {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  padding: 30px;
  align-items: center;
  font-size: 32px;
  .subheader-item {
    width: 50%;
    button {
      width: 100%;
      background-color: silver;
      border: 3px solid#17a2b8;
      outline: none;
      display: flex;
      text-align: center;
      margin-bottom: 10px;
      font-weight: bold;
      justify-content: center;
      align-items: center;
      align-content: center;
    }
    p {
      font-size: 20px;
    }
  }
}
#tab {
  display: flex;
  flex-flow: column nowrap;
  row-gap: 10px;
  justify-content: center;
  align-items: center;
  background-color: silver;
  color: #02101d;
  font-size: 20px;
  #tab-items {
    width: 100%;
    display: grid;
    justify-content: center;
    align-content: center;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    padding: 10px 0;
    font-size: 24px;
    font-weight: bold;
  }
}

#result {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-size: 22px;
  margin-bottom: 10px;
}
table {
  margin-top: 10px;
  width: 100%;
  border: 5px solid silver;
  tr, td, th {
    border: 2px rgb(231, 157, 157);
    padding: 10px;
  }
}
</style>
