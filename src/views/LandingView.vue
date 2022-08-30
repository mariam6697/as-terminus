<template>
  <v-container>
    <highlights-carousel></highlights-carousel>
    <projects-list></projects-list>
  </v-container>
</template>


<script lang="ts">
import Vue from "vue";
import HighlightsCarousel from "../components/HighlightsCarousel.vue";
import ProjectsList from "../components/ProjectsList.vue";

export default Vue.extend({
  name: "LandingView",

  components: { HighlightsCarousel, ProjectsList },
  data() {
    return {};
  },
});
</script>
