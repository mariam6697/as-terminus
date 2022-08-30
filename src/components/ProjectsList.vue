<template>
  <div class="ma-2 pa-2">
    <h1>Proyectos</h1>
    <div class="loader-container" v-if="loading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
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
  name: "HighlightsView",
  components: { ProjectCard },
  data() {
    return {
      projects: [] as Project[],
      loading: true,
      page: 1,
      limit: 10,
      default1,
    };
  },
  mounted() {
    this.getProjects();
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
  }
}
</style>