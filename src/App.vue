<template>
  <v-app :style="`font-size: ${fontSize}px; font-family: ${fontFamily}`">
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-menu bottom left :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-card class="pa-4" width="400px">
          <!-- Menu content start -->
          <v-col cols="12">
            <v-subheader class="pa-0">Tamaño fuente</v-subheader>
            <v-slider step="2" max="28" min="12" v-model="fontSize"></v-slider>
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
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
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

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
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

  data: () => ({
    drawer: false,
    group: null,
    fontSize: 16,
    darkMode: true,
    fontFamily: "Roboto",
    fonts: ["Helvetica", "Roboto", "Times New Roman"],
    items: [
      {
        title: "Home",
        icon: "mdi-home",
        link: "/",
      },
      {
        title: "About",
        icon: "mdi-account",
        link: "/about",
      },
    ],
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    //
  }),
  beforeMount() {
    this.initDarkMode();
    this.initFontFamily();
  },
  watch: {
    darkMode() {
      this.$vuetify.theme.dark = this.darkMode;
      LocalStorageUtils.write("darkMode", this.darkMode);
    },
    fontFamily() {
      LocalStorageUtils.write("fontFamily", this.fontFamily);
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
  },
});
</script>

<style lang="scss">
.row {
  margin: unset !important;
}

.v-slider--horizontal {
  margin-left: 0px !important;
  margin-right: 0px !important;
}
</style>