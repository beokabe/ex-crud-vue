
<template>
  <div id="app">
    <Cabecalho titulo="Página da Loja" />
      <router-view></router-view>
    <Rodape />
  </div>
</template>

<script>
import Cabecalho from "./componentes/Generico/Cabecalho";
import Rodape from "./componentes/Generico/Rodape";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
  name: 'App',
  components: {
    Cabecalho,
    Rodape
  },
  created() {

  },
  data() {
    return {

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
</style>
