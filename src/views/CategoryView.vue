<template>
  <v-container>
    <div class="ma-2 pa-2">
      <div v-if="!loading && category">
        <categories-chips :categories="[category]"></categories-chips>
        <h1>{{ category.name }}</h1>
        <p>{{ category.description }}</p>
        <v-flex class="project-card-container">
          <projects-basic-list
            v-if="category.label"
            :catLabel="category.label"
          ></projects-basic-list>
        </v-flex>
      </div>
    </div>
  </v-container>
</template>


<script lang="ts">
import Vue from "vue";
import SeldonService from "../services/seldon.service";
import * as default1 from "../assets/default1.jpeg";
import CategoriesChips from "@/components/CategoriesChips.vue";
import Category from "@/models/category.model";
import ProjectsBasicList from "@/components/ProjectsBasicList.vue";

export default Vue.extend({
  name: "CategoryView",
  components: { CategoriesChips, ProjectsBasicList },
  data() {
    return {
      category: {} as Category,
      loading: true,
      loadingProjects: true,
      page: 1,
      limit: 10,
      default1,
    };
  },
  beforeMount() {
    const catLabel: string = this.$route.params.catLabel;
    if (catLabel) {
      this.getCategory(catLabel);
    }
  },
  computed: {
    isDark(): boolean {
      return this.$vuetify.theme.dark;
    },
  },
  methods: {
    async getCategory(label: string) {
      try {
        this.loading = true;
        const res = await SeldonService.getCategory(label);
        this.category = res;
      } catch (error: any) {
        // Handle error
        this.$router.push({ path: "/no-encontrado" });
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>