<template>
  <div class="ma-2 pa-2">
    <h1 id="proyectos">Proyectos</h1>
    <v-row style="flex: none">
      <v-row style="justify-content: end">
        <v-subheader> Elementos por página </v-subheader>
        <div style="width: 100px">
          <v-select
            :items="limitOptions"
            label="Elementos por página"
            solo
            v-model="limit"
            hide-details
          ></v-select>
        </div>
      </v-row>
    </v-row>
    <div class="project-list-container" v-if="loading">
      <div class="project-card-container">
        <v-sheet
          class="pa-0"
          v-for="i in [1, 2, 3, 4, 5, 6]"
          :key="i"
          :color="`grey ${isDark ? 'darken-2' : 'lighten-4'}`"
          max-width="340"
          style="margin: 10px !important"
        >
          <v-skeleton-loader
            class="mx-auto"
            max-width="340"
            type="card"
          ></v-skeleton-loader>
        </v-sheet>
      </div>
    </div>
    <div class="project-list-container" v-if="!loading && projects.length > 0">
      <v-flex class="project-card-container">
        <project-card
          v-for="(project, i) in projects"
          :key="i"
          :project="project"
        ></project-card>
      </v-flex>
    </div>
    <v-pagination
      v-model="page"
      :length="totalPages"
      :total-visible="4"
      :disabled="loading"
    ></v-pagination>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import SeldonService from "../services/seldon.service";
import * as default1 from "../assets/default1.jpeg";
import Project from "@/models/project.model";
import FileUtils from "@/utils/file.utils";
import ProjectCard from "@/components/ProjectCard.vue";

export default Vue.extend({
  name: "ProjectsList",
  components: { ProjectCard },
  data() {
    return {
      projects: [] as Project[],
      loading: true,
      page: 1,
      limit: 6,
      default1,
      limitOptions: [3, 6, 9, 12],
      totalPages: 0,
    };
  },
  mounted() {
    this.getProjects();
  },
  computed: {
    isDark(): boolean {
      return this.$vuetify.theme.dark;
    },
  },
  watch: {
    page() {
      this.getProjects();
    },
    limit() {
      this.getProjects();
    },
  },
  methods: {
    async getProjects() {
      this.loading = true;
      const res = await SeldonService.getProjects(this.page, this.limit);
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
      this.totalPages = Math.ceil(res.totalItems / this.limit);
      this.loading = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.project-list-container {
  margin: auto;
  .project-card-container {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    margin-left: -10px;
    margin-right: -10px;
    justify-content: space-around;
  }
}
</style>