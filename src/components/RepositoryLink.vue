<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-icon class="grey" dark v-text="'mdi-code-tags'"></v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title style="font-weight: bold">{{
        repo.label
      }}</v-list-item-title>
      <v-list-item-subtitle
        ><a
          :href="sanitizeUrl(repo.url)"
          target="_blank"
          rel="noopener noreferrer"
          >{{ repo.name }}</a
        ></v-list-item-subtitle
      >
    </v-list-item-content>
    <v-list-item-action>
      <v-btn
        :href="sanitizeUrl(repo.url)"
        target="_blank"
        rel="noopener noreferrer"
        icon
      >
        <v-icon color="grey lighten-1">mdi-open-in-new</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";
import { sanitizeUrl } from "@braintree/sanitize-url";

export default Vue.extend({
  name: "RepositoryLink",
  props: ["repo"],
  data() {
    return { sanitizeUrl };
  },
});
</script>