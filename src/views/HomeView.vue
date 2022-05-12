<template>
  <v-container>
    <div class="ma-2 pa-2">
      <hello-world />
    </div>
  </v-container>
</template>


<script lang="ts">
import Vue from "vue";
import HelloWorld from "../components/HelloWorld.vue";

export default Vue.extend({
  name: "HomeView",

  components: {
    HelloWorld,
  },
});
</script>
