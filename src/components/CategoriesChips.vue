<template>
  <div>
    <v-chip v-if="semester && year" :key="0" class="ma-2" small>
      {{ getYearAndSemester() }}
    </v-chip>
    <v-chip
      v-for="category in categories"
      :key="category.id"
      class="ma-2"
      small
      :style="`background-color: #${category.backgroundHexColor}; color: #${category.textHexColor}`"
      @click="goToCategory(category)"
    >
      {{ category.label }}
    </v-chip>
  </div>
</template>

<script lang="ts">
import Category from "@/models/category.model";
import MiscUtils from "@/utils/misc.utils";
import Vue from "vue";

export default Vue.extend({
  name: "CategoriesChips",
  props: ["categories", "semester", "year"],
  data: () => ({}),
  methods: {
    goToCategory(category: Category) {
      try {
        const currentRoute = this.$route.path;
        const route = `/categoria/${category.label}`;
        if (currentRoute != route) {
          this.$router.push({ path: route });
        }
      } catch (error: any) {
        // Handle error
      }
    },
    getYearAndSemester() {
      return MiscUtils.getYearAndSemester(this.year, this.semester);
    },
  },
});
</script>
