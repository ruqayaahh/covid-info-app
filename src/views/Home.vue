<template>
  <div class='home'>
    <!-- <img alt='Vue logo' src='../assets/logo.png' /> -->
    <div>
      <div>
        <h3>Total Cases(worlwide): <p>{{ data.Global.All.confirmed }}</p></h3>
      </div>
      <div>
        <h3>Active Cases(worlwide): <p> {{ data.Global.All.confirmed - (data.Global.All.recovered
      + data.Global.All.deaths) }}</p></h3>
      </div>
      <div>
        <h3>Total Recoveries(worlwide): <p>{{ data.Global.All.recovered }}</p></h3>
      </div>
      <div>
        <h3>Total Deaths(worlwide): <p>{{ data.Global.All.deaths }}</p></h3>
      </div>
    </div>
    <div>
      <div>
        <h1>
        Top 3 affected Countries
      </h1>
      </div>
      <div>
        <button @click="affected">Check top three affected countries</button>
        <p>1. {{ topThree[0][0] }} : {{ topThree[0][1] }}</p>
        <p>2. {{ topThree[1][0] }} : {{ topThree[1][1] }}</p>
        <p>3. {{ topThree[2][0] }} : {{ topThree[2][1] }}</p>
      </div>
    </div>

    <div>
      <div id="tab">
        <h2>Check data by Continent by clicking the continent</h2>
        <span
          :class='{ active: selectedTab === continent }'
          v-for='(continent, index) in continents'
          :key='index'
          @click='selectedTab = continent'
        >
          {{ continent }}</span
        >
      </div>
      <div>
        <div v-if="selectedTab === 'Europe'">
        <h1>{{ continents[0] }}</h1>
        <br>
          <h1>{{ cases[0] }}</h1>
        </div>
        <div v-if="selectedTab === 'Americas'">
        <h1>{{ continents[1] }}</h1>
        <br>
          <h1>{{ cases[1] }}</h1>
        </div>
        <div v-if="selectedTab === 'Asia'">
        <h1>{{ continents[2] }}</h1>
        <br>
          <h1>{{ cases[2] }}</h1>
        </div>
        <div v-if="selectedTab === 'Africa'">
        <h1>{{ continents[3] }}</h1>
        <br>
          <h1>{{ cases[3] }}</h1>
        </div>
        <div v-if="selectedTab === 'Oceania'">
        <h1>{{ continents[4] }}</h1>
        <br>
          <h1>{{ cases[4] }}</h1>
        </div>
      </div>
    </div>

    <div>
      <table>
         <tr>
          <th>S/N</th>
          <th>Countries</th>
          <th>Total Cases</th>
          <th>Recoveries</th>
          <th>Active Cases</th>
          <th>Deaths</th>
          <th>Details</th>
        </tr>
        <tbody>
          <tr v-for="(tableItem, index) in table" :key="index">
          <td>{{ index + 1}}</td>
            <td>{{ tableItem[0] }}</td>
            <td>{{ tableItem[1] }}</td>
            <td>{{ tableItem[2] }}</td>
            <td>{{ tableItem[3] }}</td>
            <td>{{ tableItem[4] }}</td>
            <td><b-button variant='primary'
             @click='$router.push(`/view-country/${index}`)'>View</b-button></td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  // components: {

  // },
  computed: {
    ...mapGetters({
      data: 'getDataReceived',
      topThree: 'getTopAffected',
      continents: 'getContinents',
      cases: 'getContsTotal',
      table: 'getTable',
      id: 'getID',
    }),
  },
  mounted() {
    this.$store.dispatch('getData');
    this.$store.dispatch('sort');
    this.$store.dispatch('contsCases');
    this.$store.dispatch('prepareTable');
  },
  methods: {
    ...mapActions({
      affected: 'sort',
    }),
  },
  data() {
    return {
      selectedTab: '',
    };
  },
};
</script>

<style scoped>
.active {
  background-color: #aaaaaa;
}
</style>
