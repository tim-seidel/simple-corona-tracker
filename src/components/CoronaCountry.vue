<template>
  <v-container style="background: #fff">
    <v-row v-if="!country">
      <v-col cols="12" v-if="isLoading">
        <v-card class="fill-height" :loading="isLoading" :color="colorCard" dark>
          <v-card-title>
            <v-icon color="white" left>mdi-cloud-download-outline</v-icon>
            Lade...
          </v-card-title>
          <v-card-text>
            <v-skeleton-loader light type="article, article"/>
          </v-card-text>
        </v-card>

      </v-col>
      <v-col cols="12" v-else>
        <v-card class="fill-height" :loading="isLoading" :color="colorCard" dark>
          <v-card-title :style="'background:' + colorTitle">
            <v-icon color="white" left>mdi-emoticon-sad-outline</v-icon>
            Keine Daten für Deutschland
          </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="12">
                <p>
                  Aktuell können die Daten nicht geladen werden. Bitte versuche es später erneut.
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="country">
      <v-col cols="12" md="6">
        <v-card class="fill-height" :loading="isLoading" :color="colorCard" dark>
          <v-card-title :style="'background:' + colorTitle">
            <v-icon color="white" left>mdi-chart-line</v-icon>
            Aktuell - Deutschland
          </v-card-title>
          <v-container class="pt-6 pb-6">
            <v-row style="background: #D63230; border-radius: 4px; margin-left: 4px; margin-right: 4px;">
              <v-col cols="9" class="pl-2">
                <strong>
                  <v-icon color="white" left>mdi-chart-bell-curve</v-icon>
                </strong>
                <strong> 7-Tages-Inzidenz</strong>
              </v-col>
              <v-col cols="3" class="text-end pr-2">
                <strong>{{ Number(country.weekIncidence).toFixed(1) }} </strong>
              </v-col>
            </v-row>
            <v-row class="mt-6" style="background: #D63230  ; border-radius: 4px; margin-left: 4px; margin-right: 4px;">
              <v-col cols="9" class="pl-2">
                <strong>
                  <v-icon color="white" left>mdi-chart-bell-curve</v-icon>
                </strong>
                <strong> R-Wert</strong>
              </v-col>
              <v-col cols="3" class="text-end pr-2">
                <strong>{{ Number(country.r.value).toFixed(2) }} </strong>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9" class="pl-6">
                <v-icon color="white" left>mdi-emoticon-sick-outline</v-icon>
                Fälle pro Woche
              </v-col>
              <v-col cols="3" class="text-end pr-6">
                {{ country.casesPerWeek }}
              </v-col>
            </v-row>

          </v-container>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="fill-height" :loading="isLoading" :color="colorCard" dark>
          <v-card-title :style="'background:' + colorTitle">
            <v-icon color="white" left>mdi-chart-histogram</v-icon>
            Veränderung zum Vortag
          </v-card-title>
          <v-container class="pt-6 pb-6">
            <v-row>
              <v-col cols="9" class="pl-6">
                <v-icon color="white" left>mdi-emoticon-sick-outline</v-icon>
                Fälle
              </v-col>
              <v-col cols="3" class="text-end pr-6">
                {{ country.delta.cases }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9" class="pl-6">
                <v-icon color="white" left>mdi-skull-outline</v-icon>
                Todesfälle
              </v-col>
              <v-col cols="3" class="text-end pr-6">
                {{ country.delta.deaths }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9" class="pl-6">
                <v-icon color="white" left>mdi-heart-plus</v-icon>
                Genesene
              </v-col>
              <v-col cols="3" class="text-end pr-6">
                {{ country.delta.recovered }}
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card class="fill-height" :loading="isLoading" :color="colorCard" dark>
          <v-card-title :style="'background:' + colorTitle">
            <v-icon color="white" left>mdi-information-outline</v-icon>
            Herkunft der Daten
          </v-card-title>
          <v-container class="pt-6 pb-6">
            <v-row v-if="country && country.meta">
              <v-col cols="6" class="pl-6">
                <v-icon color="white" left>mdi-calendar-clock</v-icon>
                Stand
              </v-col>
              <v-col cols="6" class="text-end pr-6">
                {{ lastUpdate }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-divider></v-divider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" class="pl-6">
                <v-icon color="white" left>mdi-clipboard-text-search-outline</v-icon>
                Quelle
              </v-col>
              <v-col cols="6" class="text-end pr-6">
                <a href="https://api.corona-zahlen.org/docs/CoronaDistrict.vue"
                   style="color: white">https://api.corona-zahlen.org/docs/</a>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="isShowMessage" timeout="3000" :color="colorTitle">{{ message }}</v-snackbar>
  </v-container>
</template>

<script>
import moment from "moment-timezone";
import {fetchCountryData} from "@/services/CoronaApi";

export default {
  name: 'CoronaCountry',
  beforeMount() {
    this.getCountryData()
  },
  methods: {
    async getCountryData() {
      this.isLoading = true
      const country = await fetchCountryData()
      this.country = country

      this.isLoading = false
      if (country) {
        this.isShowMessage = true
        this.message = country.updated ? "Die Inzidenzzahlen wurden aktualisiert." : "Die Inzidenzzahlen sind aktuell."
      }
    },
  },
  computed: {
    lastUpdate() {
      return this.country?.meta ? moment(this.country.meta.lastUpdate).format('DD.MM.YYYY') : "-/-"
    },
  },
  data() {
    return {
      colorCard: "#57a0d3 ", //41BBD9 //00A7E1 //5BC0EB //22AED1 //1597bb //8ab6d6 //57a0d3 //73c2fb //008ecc
      colorTitle: "#124E78", //383B53
      country: undefined,
      isLoading: false,
      isShowMessage: false,
      message: ""
    }
  }
}
</script>

