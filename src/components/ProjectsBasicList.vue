<template>
  <div class="my-2">
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
    <div
      v-if="loading && projects.length == 0"
      class="ma-4"
      style="
        display: flex;
        justify-content: center;
        margin-top: 100px !important;
        margin-bottom: 100px !important;
      "
    >
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div>
      <v-card
        v-for="(project, i) in projects"
        :key="i"
        :project="project"
        elevation="2"
        class="my-2"
        :to="`/proyectos/${project.id}`"
        :disabled="loading"
      >
        <v-card-text>
          <div>{{ getYearAndSemester(project) }}</div>
          <p class="text-h6 text--primary">
            {{ project.name }}
          </p>
          <div class="text--primary">
            {{ project.shortDescription }}
          </div>
        </v-card-text></v-card
      >
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
import Project from "@/models/project.model";
import SeldonService from "@/services/seldon.service";
import MiscUtils from "@/utils/misc.utils";
import Vue from "vue";

export default Vue.extend({
  name: "ProjectsBasicList",
  props: ["catLabel"],
  data() {
    return {
      loading: true,
      page: 1,
      totalPages: 0,
      limit: 10,
      projects: [] as Project[],
      limitOptions: [1, 5, 10, 15],
    };
  },
  beforeMount() {
    if (this.catLabel) {
      this.getProjects(this.catLabel);
    }
  },
  watch: {
    page() {
      this.getProjects(this.catLabel);
    },
    limit() {
      this.getProjects(this.catLabel);
    },
  },
  methods: {
    getYearAndSemester(project: Project) {
      return MiscUtils.getYearAndSemester(project.year!, project.semester!);
    },
    async getProjects(catLabel: string) {
      try {
        this.loading = true;
        const res = await SeldonService.getProjects(this.page, this.limit, {
          categories: [catLabel],
        });
        const projects: Project[] = res.projects;
        this.projects = projects.map((project: any) => {
          project.id = project.nanoId;
          delete project.nanoId;
          return project;
        });
        this.totalPages = Math.ceil(res.totalItems / this.limit);
      } catch (error: any) {
        // Handle error
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>
