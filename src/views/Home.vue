<template>
  <div class='home'>
    <div id="subheader">
      <div class="subheader-item">
        <div>
          <h3>Worldwide</h3>
          <h4>Total Cases: <span>{{ data.Global.All.confirmed }}</span></h4>
        </div>
        <div>
          <h4>Active Cases: <span> {{ data.Global.All.confirmed
            - (data.Global.All.recovered
        + data.Global.All.deaths) }}</span></h4>
        </div>
        <div>
          <h4>Total Recoveries: <span>{{ data.Global.All.recovered }}</span></h4>
        </div>
        <div>
          <h4>Total Deaths: <span>{{ data.Global.All.deaths }}</span></h4>
        </div>
      </div>
      <div class="subheader-item">
        <div>
          <button @click="affected"><h5>
          Click to check current top 3 affected countries
        </h5></button>
          <p>1. {{ topThree[0][0] }} : {{ topThree[0][1] }}</p>
          <p>2. {{ topThree[1][0] }} : {{ topThree[1][1] }}</p>
          <p>3. {{ topThree[2][0] }} : {{ topThree[2][1] }}</p>
        </div>
      </div>
    </div>

    <div>
      <div id="tab">
        <div>
          <h2>Check data by continent</h2>
        </div>
       <div id="tab-items">
          <span
          :class='{ active: selectedTab === continent }'
          v-for='(continent, index) in continents'
          :key='index'
          @click='selectedTab = continent'
        >
          {{ continent }}</span
        >
       </div>
      </div>
      <div id="result">
        <div v-if="selectedTab === 'Europe'">
          <p>{{ cases[0] }} Total confirmed cases</p>
        </div>
        <div v-if="selectedTab === 'Americas'">
          <p>{{ cases[1] }} Total confirmed cases</p>
        </div>
        <div v-if="selectedTab === 'Asia'">
          <p>{{ cases[2] }} Total confirmed cases</p>
        </div>
        <div v-if="selectedTab === 'Africa'">
          <p>{{ cases[3] }} Total confirmed cases</p>
        </div>
        <div v-if="selectedTab === 'Oceania'">
          <p>{{ cases[4] }} Total confirmed cases</p>
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
  background-color: #17a2b8;
}
</style>
