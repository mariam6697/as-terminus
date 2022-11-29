<template>
  <v-container>
    <div class="ma-2 pa-2">
      <h1>Acerca de</h1>
      <p>
        Aprendizaje y Servicio (A+S) es una metodología de enseñanza que busca
        combinar el aprendizaje de los estudiantes junto con el desarrollo de
        servicios para una comunidad particular.
      </p>
      <p>
        Bajo ese paradigma, la
        <a href="https://www.utem.cl/" target="_blank"
          >Universidad Tecnológica Metropolitana</a
        >
        en conjunto con
        <a href="https://mpbconsultorias.cl/" target="_blank"
          >MPB Consultorías</a
        >
        han permitido a estudiantes de pregrado llevar a cabo proyectos
        tecnológicos enfocados a ayudar a emprendedores de nuestro país,
        principalmente mediante el desarrollo de soluciones informáticas.
      </p>
      <p>
        Este portal presenta algunos de los proyectos que fueron llevados a cabo
        en dicho contexto.
      </p>

      <div class="custom-divider"></div>

      <v-row class="reverse">
        <v-col cols="3"
          ><v-img
            height="150"
            contain
            :src="isDark ? logoMpbDark.default : logoMpbLight.default"
          ></v-img
        ></v-col>
        <v-col cols="9" class="pl-0"
          ><h2>MPB Consultorías</h2>
          <p>
            Empresa de consultoría con más de una década de experiencia en el
            área de fomento productivo. MPB ejecuta programas sociales dirigidos
            a emprendedores chilenos en la Región Metropolitana.
          </p>
          <p>
            MPB a nivel organizacional consta de un equipo interdisciplinario
            con múltiples formaciones académicas.
          </p>
        </v-col>
      </v-row>

      <div class="custom-divider"></div>

      <v-row>
        <v-col cols="9" class="pl-0"
          ><h2>Universidad Tecnológica Metropolitana</h2>
          <p>
            La UTEM (Universidad Tecnológica Metropolitana) es una universidad
            del Estado de Chile creada por ley el 30 de agosto de 1993. Forma
            parte tanto del Consorcio de Universidades del Estado de Chile
            (CUECH) como del Consejo de Rectores de las Universiades Chilenas
            (CRUCH). Sus tres campus (Área Central, Providencia y Macul) se
            encuentran en la Región Metropolitana.
          </p>
        </v-col>
        <v-col
          ><v-img
            height="150"
            contain
            :src="isDark ? logoUtemDark.default : logoUtemLight.default"
          ></v-img
        ></v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import * as logoUtemLight from "../assets/utem_logo.svg";
import * as logoUtemDark from "../assets/utem_logo_dark.svg";
import * as logoMpbLight from "../assets/mpb_logo.svg";
import * as logoMpbDark from "../assets/mpb_logo_dark.svg";

export default Vue.extend({
  name: "AboutView",
  data() {
    return {
      logoUtemLight,
      logoUtemDark,
      logoMpbLight,
      logoMpbDark,
    };
  },
  computed: {
    isDark(): boolean {
      return this.$vuetify.theme.dark;
    },
  },
});
</script>

<style lang="scss" scoped>
.custom-divider {
  height: 50px;
}
@media (max-width: 1132px) {
  .col-9,
  .col-3 {
    min-width: 100% !important;
    max-width: 100% !important;
    width: 100% !important;
  }
  .reverse {
    flex-direction: column-reverse;
  }
}
</style>