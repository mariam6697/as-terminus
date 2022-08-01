<template>
  <div class="ma-2 pa-2">
    <v-carousel hide-delimiters cycle>
      <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src"
        ><div class="as-carousel-container">
          <div class="as-carousel">
            <div class="as-carousel-title">{{ item.title }}</div>
            <div class="as-carousel-desc">{{ item.shortDescription }}</div>
          </div>
        </div></v-carousel-item
      >
    </v-carousel>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import SeldonService from "../services/seldon.service";
import * as default1 from "../assets/default1.jpeg";
import * as default2 from "../assets/default2.jpeg";
import * as default3 from "../assets/default3.jpeg";
import * as default4 from "../assets/default4.jpeg";

export default Vue.extend({
  name: "HighlightsView",

  components: {},
  data() {
    return {
      default1,
      default2,
      default3,
      default4,
      items: [
        {
          title: "Proyecto 1",
          shortDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
          src: default1.default,
        },
        {
          title: "Proyecto 2",
          shortDescription:
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
          src: default2.default,
        },
        {
          title: "Proyecto 3",
          shortDescription:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
          src: default3.default,
        },
        {
          title: "Proyecto 4",
          shortDescription:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
          src: default4.default,
        },
      ],
    };
  },
  mounted() {
    // SeldonService.getProjects(1, 99);
  },
});
</script>

<style lang="scss" scoped>
.as-carousel-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;

  .as-carousel {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0 1rem;
    text-align: right;

    .as-carousel-title {
      color: white;
      font-size: 1.55em;
      font-weight: bold;
    }

    .as-carousel-desc {
      color: white;
      font-size: 1.05em;
    }
  }
}
</style>