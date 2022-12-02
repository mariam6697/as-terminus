<template>
  <div class="ma-2 pa-2">
    <v-sheet
      :color="`grey ${isDark ? 'darken-2' : 'lighten-4'}`"
      class="pa-0"
      style="height: 500px"
      v-if="loading"
    >
      <v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
    </v-sheet>
    <v-carousel v-if="!loading && projects.length > 0" hide-delimiters cycle>
      <v-carousel-item
        v-for="(project, i) in projects"
        :key="i"
        :src="
          project.mainImage ? project.mainImage.fileString : default1.default
        "
        :to="`/proyectos/${project.id}`"
        ><div class="as-carousel-container">
          <div class="as-carousel">
            <div class="as-carousel-title">{{ project.name }}</div>
            <div class="as-carousel-desc">{{ project.shortDescription }}</div>
            <categories-chips
              :categories="project.categories"
            ></categories-chips>
          </div></div
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import SeldonService from "../services/seldon.service";
import * as default1 from "../assets/default1.jpeg";
import * as default2 from "../assets/default2.jpeg";
import * as default3 from "../assets/default3.jpeg";
import * as default4 from "../assets/default4.jpeg";
import Project from "@/models/project.model";
import FileUtils from "@/utils/file.utils";
import CategoriesChips from "@/components/CategoriesChips.vue";

export default Vue.extend({
  name: "HighlightsView",
  components: { CategoriesChips },
  data() {
    return {
      projects: [] as Project[],
      loading: true,
      default1,
      default2,
      default3,
      default4,
    };
  },
  mounted() {
    this.getHightlightedProjects();
  },
  computed: {
    isDark(): boolean {
      return this.$vuetify.theme.dark;
    },
  },
  methods: {
    async getHightlightedProjects() {
      this.loading = true;
      const res = await SeldonService.getProjects(1, 5, { highlighted: true });
      const projects: Project[] = res.projects;
      this.projects = projects.map((project: any) => {
        project.id = project.nanoId;
        delete project.nanoId;
        if (project.mainImage) {
          const fileString = FileUtils.fromBase64ToFile(project.mainImage);
          project.mainImage.fileString = fileString;
        }
        return project;
      });
      this.loading = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.as-carousel-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;

  .as-carousel {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0 1rem;
    text-align: right;

    .as-carousel-title {
      color: white;
      font-size: 1.55em;
      font-weight: bold;
    }

    .as-carousel-desc {
      color: white;
      font-size: 1.05em;
    }
  }
}
</style>