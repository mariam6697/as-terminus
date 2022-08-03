<template>
  <div>
    <v-chip
      v-for="category in categories"
      :key="category.id"
      class="ma-2"
      small
      :style="`background-color: #${category.backgroundHexColor}; color: #${category.textHexColor}`"
    >
      {{ category.label }}
    </v-chip>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CategoriesChips",
  props: ["categories"],
  data: () => ({}),
});
</script>
