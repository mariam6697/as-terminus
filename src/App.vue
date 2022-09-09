<template>
  <v-app :style="`font-size: ${fontSize}px; font-family: ${fontFamily}`">
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <a style="color: white" href="/">Proyectos Aprendizaje + Servicio</a>
      </div>

      <v-spacer></v-spacer>

      <v-menu bottom left :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>

        <v-card class="pa-4" width="400px">
          <!-- Menu content start -->
          <v-col cols="12">
            <v-subheader class="pa-0">Tamaño fuente</v-subheader>
            <v-slider
              step="2"
              max="24"
              min="12"
              v-model="fontSize"
              :thumb-label="true"
            >
              <template v-slot:thumb-label="{ value }">
                {{ value }}px
              </template></v-slider
            >
            <v-select
              :items="fonts"
              v-model="fontFamily"
              label="Fuente"
            ></v-select>
            <div style="width: 100%">
              <v-switch
                v-model="darkMode"
                :label="`Modo oscuro ${darkMode ? 'activado' : 'desactivado'}`"
              ></v-switch>
            </div>
          </v-col>
          <!-- Menu content end -->
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.link"
            link
          >
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-list-item-icon v-bind="attrs" v-on="on">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
              </template>
              <span>{{ item.title }}</span>
            </v-tooltip>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
    <v-footer color="primary" dark padless>
      <v-card flat tile color="secondary" class="text-center">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="1.5rem">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0" style="font-size: 0.75em">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
          iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum
          tempor vel ut orci. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text" style="font-size: 1em">
          2022 — <strong>UTEM</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import LocalStorageUtils from "./utils/local-storage.utils";

export default Vue.extend({
  name: "App",
  created() {
    document.title = "Proyectos Aprendizaje + Servicio";
  },
  data: () => ({
    drawer: false,
    group: null,
    fontSize: 16,
    darkMode: true,
    fontFamily: "Raleway",
    fonts: ["Helvetica", "Raleway", "Roboto", "Times New Roman"],
    items: [
      {
        title: "Inicio",
        icon: "mdi-home",
        link: "/",
      },
      {
        title: "Acerca de",
        icon: "mdi-account",
        link: "/acerca-de",
      },
    ],
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    //
  }),
  beforeMount() {
    this.initDarkMode();
    this.initFontFamily();
    this.initFontSize();
  },
  watch: {
    darkMode() {
      this.$vuetify.theme.dark = this.darkMode;
      LocalStorageUtils.write("darkMode", this.darkMode);
    },
    fontFamily() {
      LocalStorageUtils.write("fontFamily", this.fontFamily);
    },
    fontSize() {
      LocalStorageUtils.write("fontSize", this.fontSize);
    },
  },
  methods: {
    toggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    initDarkMode() {
      const darkMode: boolean = LocalStorageUtils.read("darkMode")
        ? LocalStorageUtils.read("darkMode")
        : false;
      this.darkMode = darkMode;
      this.$vuetify.theme.dark = this.darkMode;
    },
    initFontFamily() {
      const fontFamily: string = LocalStorageUtils.read("fontFamily")
        ? LocalStorageUtils.read("fontFamily")
        : "Roboto";
      this.fontFamily = fontFamily;
    },
    initFontSize() {
      const fontSize: number = LocalStorageUtils.read("fontSize")
        ? LocalStorageUtils.read("fontSize")
        : 16;
      this.fontSize = fontSize;
    },
  },
});
</script>

<style lang="scss">
.v-main__wrap {
  background-image: url("../src/assets/jigsaw.svg");
  background-repeat: repeat;
}
.row {
  margin: unset !important;
}

.v-slider--horizontal {
  margin-left: 0px !important;
  margin-right: 0px !important;
}

.v-navigation-drawer {
  position: fixed !important;
  height: 100vh !important;

  .v-navigation-drawer__content {
    height: 100vh !important;
  }
}

.v-overlay__scrim {
  position: fixed !important;
  height: 100vh !important;
}

.loader-container {
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 1200px !important;
}

.v-app-bar-title__content {
  width: 100%;
}

.v-card__title {
  font-size: 1.25em !important;
}

.v-breadcrumbs {
  li {
    font-size: 1em !important;
    font-weight: 500 !important;
  }
}

a {
  text-decoration: none;
}

.v-skeleton-loader__image {
  height: 500px !important;
}

.v-skeleton-loader__card {
  width: 340px !important;
  .v-skeleton-loader__image {
    height: 200px !important;
    width: 340px !important;
  }
}
</style>