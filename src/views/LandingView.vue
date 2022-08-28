<template>
  <v-container>
    <highlights-view></highlights-view>
    <projects-list></projects-list>
  </v-container>
</template>


<script lang="ts">
import Vue from "vue";
import HighlightsView from "./HighlightsView.vue";
import ProjectsList from "./ProjectsList.vue";

export default Vue.extend({
  name: "LandingView",

  components: { HighlightsView, ProjectsList },
  data() {
    return {};
  },
});
</script>
