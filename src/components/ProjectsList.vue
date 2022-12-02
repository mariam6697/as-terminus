<template>
  <div class="ma-2 pa-2">
    <h1 id="proyectos">Proyectos</h1>
    <v-row
      class="mb-4"
      style="justify-content: space-between; align-items: center"
    >
      <v-btn v-if="mobile" elevation="2" @click="toggleFilters()"
        ><v-icon :dark="isDark"> mdi-tune-variant </v-icon></v-btn
      >
      <v-btn v-else elevation="2" @click="toggleFilters()"
        ><v-icon left :dark="isDark"> mdi-tune-variant </v-icon> Filtros</v-btn
      >
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

    <v-card class="mb-3" v-bind:class="getCardClasses" elevation="1">
      <v-card-text>
        <v-row class="filter-fields">
          <v-col class="half" cols="4">
            <v-select
              :disabled="loading"
              :items="years"
              label="Año"
              v-model="selectedYear"
              clearable
              outlined
              dense
              hide-details
            ></v-select>
          </v-col>
          <v-col class="half" cols="4">
            <v-select
              :disabled="loading"
              :items="semesters"
              label="Semestre"
              item-text="label"
              item-value="id"
              :return-object="false"
              v-model="selectedSemester"
              clearable
              outlined
              dense
              hide-details
            ></v-select>
          </v-col>
          <v-col class="total" cols="4">
            <v-select
              :disabled="loading || loadingCats"
              :items="cats"
              label="Categorías"
              item-text="label"
              item-value="label"
              :return-object="false"
              v-model="selectedCats"
              multiple
              clearable
              outlined
              dense
              hide-details
            ></v-select>
          </v-col>
        </v-row> </v-card-text
    ></v-card>
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
    <v-card v-if="!loading && projects.length == 0">
      <v-card-text>No hay resultados para la búsqueda</v-card-text>
    </v-card>
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
import Category from "@/models/category.model";

export default Vue.extend({
  name: "ProjectsList",
  components: { ProjectCard },
  data() {
    return {
      projects: [] as Project[],
      loading: true,
      loadingCats: false,
      page: 1,
      limit: 6,
      default1,
      limitOptions: [3, 6, 9, 12],
      totalPages: 0,
      years: [] as string[],
      semesters: [
        { id: 1, label: "Primer" },
        { id: 2, label: "Segundo" },
      ],
      cats: [] as Category[],
      showFilters: false,
      selectedYear: null,
      selectedSemester: null,
      selectedCats: [],
      catsArray: "",
      mobile: true,
      windowWidth: window.innerWidth,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    this.onResize();
    this.getCategories();
    this.setYears();
    this.getProjects();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  computed: {
    isDark(): boolean {
      return this.$vuetify.theme.dark;
    },
    getCardClasses(): string {
      return this.showFilters ? "filters" : "filters hidden";
    },
  },
  watch: {
    page() {
      this.getProjects();
    },
    limit() {
      this.getProjects();
    },
    selectedYear() {
      this.getProjects();
    },
    selectedSemester() {
      this.getProjects();
    },
    selectedCats() {
      this.getProjects();
    },
  },
  methods: {
    async getCategories() {
      this.loadingCats = true;
      try {
        const res = await SeldonService.getCategories();
        this.cats = res.categories;
      } catch (error: any) {
        // Handle error
      } finally {
        this.loadingCats = false;
      }
    },
    async getProjects() {
      this.loading = true;
      let query: any = {};
      if (this.selectedCats.length > 0) {
        query.categories = this.selectedCats;
      }
      if (this.selectedSemester) {
        query.semester = this.selectedSemester;
      }
      if (this.selectedYear) {
        query.year = this.selectedYear;
      }
      const res = await SeldonService.getProjects(this.page, this.limit, query);
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
    setYears() {
      let currentYear: number = new Date().getFullYear();
      let years: string[] = [];
      let startYear: number = 2018;
      while (startYear <= currentYear) {
        let year: number = startYear++;
        years.push(year.toString());
      }
      this.years = years;
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    onResize() {
      this.windowWidth = window.innerWidth;
      this.mobile = this.windowWidth <= 460;
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
    justify-content: space-around;
  }
}

.filters {
  max-height: 500px;
  transition: max-height 0.5s ease-in-out, visibility 0.1s ease-in-out;

  &.hidden {
    visibility: hidden;
    max-height: 0;
    transition: max-height 0.15s ease-in-out, visibility 0.1s ease-out;
  }
}

@media only screen and (max-width: 540px) {
  .filter-fields {
    display: flex;
    flex-basis: auto;
    flex-wrap: wrap !important;
    .half {
      width: 50% !important;
      flex: none !important;
      max-width: 50% !important;
    }

    .total {
      width: 100% !important;
      flex: none !important;
      max-width: 100% !important;
    }
  }
}
</style>