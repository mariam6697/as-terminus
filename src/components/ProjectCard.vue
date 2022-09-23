<template>
  <v-card class="mx-auto project-card">
    <v-img
      :src="project.mainImage ? project.mainImage.fileString : default2.default"
      height="200px"
    ></v-img>

    <v-card-title> {{ project.name }} </v-card-title>

    <v-card-text
      ><categories-chips :categories="project.categories"></categories-chips
    ></v-card-text>

    <v-card-actions>
      <v-btn color="primary" text :to="`/proyectos/${project.id}`">
        Ver más
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show" :disabled="!project.shortDescription">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ project.shortDescription }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import * as default2 from "../assets/default2.jpeg";
import CategoriesChips from "@/components/CategoriesChips.vue";

export default Vue.extend({
  name: "ProjectCard",
  props: ["project"],
  components: { CategoriesChips },
  data: () => ({
    default2,
    show: false,
  }),
});
</script>

<style lang="scss" scoped>
.project-card {
  margin: 10px !important;
  max-width: 340px;
  height: 100%;
  display: inline-block;
}
</style>