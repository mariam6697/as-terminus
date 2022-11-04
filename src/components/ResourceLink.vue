<template>

  <v-list-item>
    <v-list-item-avatar>
      <v-icon class="blue" dark v-text="'mdi-clipboard-text'"></v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ link.title }}</v-list-item-title>
      <v-list-item-subtitle>{{ link.description }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn :href="sanitizeUrl(link.url)" target="_blank" icon>
        <v-icon color="grey lighten-1">mdi-open-in-new</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>

</template>

<script lang="ts">
import Vue from "vue";
import { sanitizeUrl } from "@braintree/sanitize-url";

export default Vue.extend({
  name: "ResourceLink",
  props: ["link"],
  data() { return { sanitizeUrl } },
});
</script>