<template>
  <v-container>
    <div class="ma-2 pa-2">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
      <div v-if="project.description" v-html="parsedDesc()"></div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Project from "@/models/project.model";
import Vue from "vue";
import SeldonService from "../services/seldon.service";
import MarkdownIt from "markdown-it";
import markdownitEmoji from "markdown-it-emoji";

export default Vue.extend({
  name: "ProjectsDetailsView",
  created() {
    document.title = "Detalles | Proyectos Aprendizaje + Servicio";
  },
  components: {},
  data() {
    return {
      project: {} as Project,
      loading: true,
      error: false,
      errorMessage: "",
      items: [
        {
          text: "Inicio",
          disabled: false,
          href: "/",
        },
        {
          text: "Detalles",
          disabled: true,
          href: "/",
        },
      ],
    };
  },
  beforeMount() {
    const projectId: string = this.$route.params.projectId; // outputs 'yay'
    if (projectId) {
      this.getProjectData(projectId);
    }
  },
  methods: {
    parsedDesc() {
      const md = new MarkdownIt();
      md.use(markdownitEmoji);
      return md.render(this.project.description!);
    },
    async getProjectData(id: string) {
      try {
        this.loading = true;
        const res: Project = await SeldonService.getProjectById(id);
        this.project = res;
        document.title = `${this.project.name} | Proyectos Aprendizaje + Servicio`;
        this.items[1].text = this.project.name;
      } catch (error: any) {
        // handle error
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>