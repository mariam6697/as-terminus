<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-icon
        v-if="link.type === 'other'"
        class="blue"
        dark
        v-text="'mdi-link'"
      ></v-icon>
      <v-icon
        v-if="link.type === 'video'"
        class="purple"
        dark
        v-text="'mdi-play'"
      ></v-icon>
      <v-icon
        v-if="link.type === 'document'"
        class="orange"
        dark
        v-text="'mdi-clipboard-text'"
      ></v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title
        ><a
          style="font-weight: bold"
          :href="sanitizeUrl(link.url)"
          target="_blank"
          rel="noopener noreferrer"
          >{{ link.title }}</a
        ></v-list-item-title
      >
      <v-list-item-subtitle>{{ link.description }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn
        :href="sanitizeUrl(link.url)"
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
  name: "ResourceLink",
  props: ["link"],
  data() {
    return { sanitizeUrl };
  },
});
</script>