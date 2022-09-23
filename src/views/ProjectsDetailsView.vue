<template>
  <v-container>
    <div class="ma-2 pa-2">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
      <div v-if="loading">
        <v-col>
          <v-skeleton-loader type="heading"></v-skeleton-loader>
        </v-col>
        <v-row class="main-info">
          <v-col cols="6"
            ><v-skeleton-loader type="text@10"></v-skeleton-loader>
          </v-col>
          <v-col cols="6"
            ><v-skeleton-loader
              style="height: 300px"
              type="image"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </div>
      <div v-if="!loading">
        <v-col>
          <h1 class="project-name">{{ project.name }}</h1>
          <categories-chips :categories="project.categories"></categories-chips>
        </v-col>
        <v-row class="main-info">
          <v-col cols="6"
            ><div
              v-if="project.description"
              v-dompurify-html="parsedDesc()"
            ></div>
          </v-col>
          <v-col cols="6"
            ><v-img
              width="100%"
              :src="
                project.mainImage
                  ? project.mainImage.fileString
                  : default2.default
              "
            ></v-img>
          </v-col>
        </v-row>

        <v-col v-if="project.extraImages && project.extraImages.length > 0">
          <h1>Imágenes</h1>
          <v-row style="cursor: pointer" @click="openGallery()">
            <v-col
              v-for="n in project.extraImages.length < 3
                ? project.extraImages.length
                : 3"
              :key="n"
              class="d-flex child-flex"
              cols="4"
            >
              <v-img
                v-if="project.extraImages[n - 1]"
                :src="project.extraImages[n - 1].fileString"
                aspect-ratio="1"
                class="grey lighten-2"
              >
              </v-img>
            </v-col>
          </v-row>
        </v-col>
        <v-row> </v-row>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Project from "@/models/project.model";
import Vue from "vue";
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";
import VueDOMPurifyHTML from "vue-dompurify-html";
import * as default2 from "../assets/default2.jpeg";
import SeldonService from "../services/seldon.service";
import MarkdownIt from "markdown-it";
import markdownitEmoji from "markdown-it-emoji";
import CategoriesChips from "@/components/CategoriesChips.vue";
import FileUtils from "@/utils/file.utils";

Vue.use(VueViewer);
Vue.use(VueDOMPurifyHTML);
export default Vue.extend({
  name: "ProjectsDetailsView",
  created() {
    document.title = "Detalles | Proyectos Aprendizaje + Servicio";
  },
  components: { CategoriesChips },
  data() {
    return {
      default2,
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
    const projectId: string = this.$route.params.projectId;
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
        const project: Project = await SeldonService.getProjectById(id);
        if (project.mainImage) {
          const fileString = FileUtils.fromBase64ToFile(project.mainImage);
          project.mainImage.fileString = fileString;
        }
        if (project.extraImages && project.extraImages.length > 0) {
          let extraImages = [];
          for (let image of project.extraImages) {
            let extraFileString = FileUtils.fromBase64ToFile(image);
            image.fileString = extraFileString;
            extraImages.push(image);
          }

          project.extraImages = extraImages;
          console.log(
            project.extraImages.length < 3 ? project.extraImages.length : 3
          );
        }
        this.project = project;
        document.title = `${this.project.name} | Proyectos Aprendizaje + Servicio`;
        this.items[1].text = this.project.name;
      } catch (error: any) {
        // handle error
        this.$router.push({ path: "/no-encontrado" });
      } finally {
        this.loading = false;
      }
    },

    openGallery() {
      if (this.project.extraImages) {
        let images: any[] = this.project.extraImages.map((image) => {
          return image.fileString;
        });
        this.$viewerApi({
          images: images,
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.project-name {
  font-size: 2.5em;
}

.main-info {
  display: flex;
  flex-direction: row;
}

@media only screen and (max-width: 700px) {
  .main-info {
    flex-direction: column-reverse;

    .col {
      max-width: 100% !important;
    }
  }
}
</style>