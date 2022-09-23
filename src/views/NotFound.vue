<template>
  <v-container>
    <v-col class="not-found">
      <v-icon>mdi-alert-circle-outline</v-icon>
      <h1>Página no encontrada</h1>
      <div><v-btn color="primary" text to="/"> Volver al inicio </v-btn></div>
    </v-col>
  </v-container>
</template>


<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NotFound",
  created() {
    document.title = "No encontrado | Proyectos Aprendizaje + Servicio";
  },
  components: {},
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  text-align: center;
  i {
    font-size: 15rem;
  }
}
</style>