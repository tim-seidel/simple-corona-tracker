<template>
  <v-container style="background: #fff">
    <v-row>
      <v-col cols="12">
        <v-card class="fill-height" :loading="isLoading" :color="colorCard" dark>
          <v-card-title :style="'background:' + colorTitle">
            <v-icon color="white" left>mdi-map-marker</v-icon>
            Ausgewählte Region
          </v-card-title>
          <v-container class="pt-6 pb-6">
            <v-row>
              <v-col cols="12">
                <v-select outlined
                          hide-details
                          label="Region"
                          :items="districts"
                          item-text="name"
                          item-value="code"
                          v-model="selectedDistrict"
                          @change="districtChanged"/>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="!district">
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
            Keine Daten zur Region
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

    <v-row v-if="district">
      <v-col cols="12" md="6">
        <v-card class="fill-height" :loading="isLoading" :color="colorCard" dark>
          <v-card-title :style="'background:' + colorTitle">
            <v-icon color="white" left>mdi-chart-line</v-icon>
            Aktuell - {{ district.county }}
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
                <strong>{{ Number(district.weekIncidence).toFixed(1) }} </strong>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9" class="pl-6">
                <v-icon color="white" left>mdi-emoticon-sick-outline</v-icon>
                Fälle pro Woche
              </v-col>
              <v-col cols="3" class="text-end pr-6">
                {{ district.casesPerWeek }}
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
                {{ district.delta.cases }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9" class="pl-6">
                <v-icon color="white" left>mdi-skull-outline</v-icon>
                Todesfälle
              </v-col>
              <v-col cols="3" class="text-end pr-6">
                {{ district.delta.deaths }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9" class="pl-6">
                <v-icon color="white" left>mdi-heart-plus</v-icon>
                Genesene
              </v-col>
              <v-col cols="3" class="text-end pr-6">
                {{ district.delta.recovered }}
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="fill-height" :loading="isLoading" :color="colorCard" dark>
          <v-card-title :style="'background:' + colorTitle">
            <v-icon color="white" left>mdi-chart-pie</v-icon>
            Seit Pandemiebeginn
          </v-card-title>
          <v-container class="pt-6 pb-6">
            <v-row>
              <v-col cols="9" class="pl-6">
                <v-icon color="white" left>mdi-account-multiple</v-icon>
                Einwohner
              </v-col>
              <v-col cols="3" class="text-end pr-6">
                {{ district.population }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9" class="pl-6">
                <v-icon color="white" left>mdi-emoticon-sick-outline</v-icon>
                Infizierte
              </v-col>
              <v-col cols="3" class="text-end pr-6">
                {{ district.cases }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9" class="pl-6">
                <v-icon color="white" left>mdi-skull-outline</v-icon>
                Todesfälle
              </v-col>
              <v-col cols="3" class="text-end pr-6">
                {{ district.deaths }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9" class="pl-6">
                <v-icon color="white" left>mdi-heart-plus</v-icon>
                Genesene
              </v-col>
              <v-col cols="3" class="text-end pr-6">
                {{ district.recovered }}
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="fill-height" :loading="isLoading" :color="colorCard" dark>
          <v-card-title :style="'background:' + colorTitle">
            <v-icon color="white" left>mdi-information-outline</v-icon>
            Herkunft der Daten
          </v-card-title>
          <v-container class="pt-6 pb-6">
            <v-row v-if="district && district.meta">
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
import {fetchDistrictData} from "@/services/CoronaApi";
import config from "@/config"

export default {
  name: 'Corona',
  beforeMount() {
    this.getDistrictData(this.selectedDistrict)
  },
  methods: {
    async getDistrictData(id) {
      this.isLoading = true
      const district = await fetchDistrictData(id)
      this.district = district

      this.isLoading = false
      if (district) {
        this.isShowMessage = true
        this.message = district.updated ? "Die Inzidenzzahlen von " + district.county + " wurden aktualisiert." : "Die Inzidenzzahlen von " + district.county + " sind aktuell."
      }
    },
    districtChanged() {
      this.getDistrictData(this.selectedDistrict)
    }
  },
  computed: {
    lastUpdate() {
      return this.district?.meta ? moment(this.district.meta.lastUpdate).format('DD.MM.YYYY') : "-/-"
    },
  },
  data() {
    return {
      colorCard: "#57a0d3 ", //41BBD9 //00A7E1 //5BC0EB //22AED1 //1597bb //8ab6d6 //57a0d3 //73c2fb //008ecc
      colorTitle: "#124E78", //383B53
      districts: config.districts,
      selectedDistrict: config.districts[0].code,
      district: undefined,
      isLoading: false,
      isShowMessage: false,
      message: ""
    }
  }
}
</script>

