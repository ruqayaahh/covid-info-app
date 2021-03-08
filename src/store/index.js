import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import axios from 'axios';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'allData',
});

export default new Vuex.Store({
  state: {
    dataReceived: [],
    topAffected: [],
    continents: ['Europe', 'America', 'Asia', 'Africa', 'Oceania'],
    contsTotal: [],
    table: [],
    id: 0,
  },
  getters: {
    getDataReceived: (state) => state.dataReceived,
    getTopAffected: (state) => state.topAffected,
    getContinents: (state) => state.continents,
    getContsTotal: (state) => state.contsTotal,
    getTable: (state) => state.table,
    getID: (state) => (id) => {
      state.dataReceived.find((item) => item.id === id);
    },
  },
  plugins: [vuexLocal.plugin],
  actions: {
    getData({ commit }) {
      axios.get('https://covid-api.mmediagroup.fr/v1/cases').then(({ data }) => commit('setDataReceived', data))
        .catch((error) => console.log(error));
    },
    async contsCases(context) {
      const request = context.state.continents.map((continent) => axios.get(`https://covid-api.mmediagroup.fr/v1/cases?continent=${continent}`));
      const dataList = await Promise.all(request);
      const entry = [];
      dataList.forEach(({ data }) => entry.push(data));
      const [a, b, c, d, e] = entry;
      const europe = Object.entries(a);
      const america = Object.entries(b);
      const asia = Object.entries(c);
      const africa = Object.entries(d);
      const oceania = Object.entries(e);

      // europe
      const euroFilterConfirm = [];
      const euroConfirm = [];
      let euroTotal = 0;
      europe.map((item) => euroFilterConfirm.push([item[1].All.confirmed]));
      euroFilterConfirm.forEach((item) => euroConfirm.push(item[0]));
      euroTotal = euroConfirm.reduce((x, y) => x + y, 0);
      // america
      const dollarFilterConfirm = [];
      const dollarConfirm = [];
      let dollarTotal = 0;
      america.map((item) => dollarFilterConfirm.push([item[1].All.confirmed]));
      dollarFilterConfirm.forEach((item) => dollarConfirm.push(item[0]));
      dollarTotal = dollarConfirm.reduce((w, v) => w + v, 0);

      // asia
      const asiaFilterConfirm = [];
      const asiaConfirm = [];
      let asiaTotal = 0;
      asia.map((item) => asiaFilterConfirm.push([item[1].All.confirmed]));
      asiaFilterConfirm.forEach((item) => asiaConfirm.push(item[0]));
      asiaTotal = asiaConfirm.reduce((s, t) => s + t, 0);
      // africa
      const africaFilterConfirm = [];
      const africaConfirm = [];
      let africaTotal = 0;
      africa.map((item) => africaFilterConfirm.push([item[1].All.confirmed]));
      africaFilterConfirm.forEach((item) => africaConfirm.push(item[0]));
      africaTotal = africaConfirm.reduce((p, q) => p + q, 0);

      // oceania
      const oceanFilterConfirm = [];
      const oceanConfirm = [];
      let oceanTotal = 0;
      oceania.map((item) => oceanFilterConfirm.push([item[1].All.confirmed]));
      oceanFilterConfirm.forEach((item) => oceanConfirm.push(item[0]));
      oceanTotal = oceanConfirm.reduce((r, j) => r + j, 0);
      const total = [euroTotal, dollarTotal, asiaTotal, africaTotal, oceanTotal];
      context.commit('setDatasArray', total);
    },
    prepareTable(context) {
      const entries = Object.entries(context.state.dataReceived);
      console.log(entries);
      // entries.forEach((item) => context.state.id +=1);
      const data = [];
      entries.map((item) => data.push([item[0],
        item[1].All.confirmed, item[1].All.recovered,
        (item[1].All.confirmed - (item[1].All.recovered
        + item[1].All.deaths)), item[1].All.deaths]));
      console.log(data);
      // const Table = [...data, id:]
      context.commit('setTableItems', data);
    },
    sort: (context) => {
      const entries = Object.entries(context.state.dataReceived);
      const sortable = [];
      entries.map((item) => sortable.push([item[0], item[1].All.confirmed]));

      const sorted = sortable.sort((a, b) => b[1] - a[1]);
      const payload = [sorted[1], sorted[2], sorted[3]];
      context.commit('setTopAffected', payload);
    },
  },
  mutations: {
    setDataReceived: (state, data) => {
      state.dataReceived = data;
    },
    setTopAffected: (state, payload) => {
      state.topAffected = payload;
    },
    setDatasArray: (state, val) => {
      state.contsTotal = val;
    },
    setUpdateID: (state) => {
      state.id += 1;
    },
    setTableItems: (state, payload) => {
      state.table = payload;
    },
  },
  modules: {
  },
});
