<template>
  <v-container>
    <highlights-view></highlights-view>
  </v-container>
</template>


<script lang="ts">
import Vue from "vue";
import HighlightsView from "./HighlightsView.vue";

export default Vue.extend({
  name: "LandingView",

  components: { HighlightsView },
  data() {
    return {};
  },
});
</script>
