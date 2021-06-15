<template>
  <v-container style="background: #fff">
    <v-row v-if="!vaccinations">
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
            Keine Impfdaten
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

    <v-row v-if="vaccinations">
      <v-col cols="12" md="6">
        <v-card class="fill-height" :loading="isLoading" :color="colorCard" dark>
          <v-card-title :style="'background:' + colorTitle">
            <v-icon color="white" left>mdi-needle</v-icon>
            Impfdaten - Deutschland
          </v-card-title>
          <v-container class="pt-6 pb-6">
            <v-row style="background: #63C132; border-radius: 4px; margin-left: 4px; margin-right: 4px;">
              <v-col cols="9" class="pl-2">
                <strong>
                  <v-icon color="white" left>mdi-check-all</v-icon>
                </strong>
                <strong> Impfquote (Vollständig)</strong>
              </v-col>
              <v-col cols="3" class="text-end pr-2">
                <strong>{{ Number(vaccinations.secondVaccination.quote * 100).toFixed(2) + "%" }} </strong>
              </v-col>
            </v-row>
            <v-row class="mt-6" style="background: #9EE37D; border-radius: 4px; margin-left: 4px; margin-right: 4px;">
              <v-col cols="9" class="pl-2">
                <strong>
                  <v-icon color="white" left>mdi-check</v-icon>
                </strong>
                <strong> Impfquote (Erstimpfung)</strong>
              </v-col>
              <v-col cols="3" class="text-end pr-2">
                <strong>{{ Number(vaccinations.quote * 100).toFixed(2) + "%" }} </strong>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9" class="pl-6">
                <v-icon color="white" left>mdi-needle</v-icon>
                Verabreichte Impfdosen
              </v-col>
              <v-col cols="3" class="text-end pr-6">
                {{ Number(vaccinations.administeredVaccinations).toLocaleString() }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9" class="pl-6">
                <v-icon color="white" left>mdi-account-plus</v-icon>
                Am Vortag verabreicht
              </v-col>
              <v-col cols="3" class="text-end pr-6">
                {{ Number(vaccinations.delta).toLocaleString() }}
              </v-col>
            </v-row>

          </v-container>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="fill-height" :loading="isLoading" :color="colorCard" dark>
          <v-card-title :style="'background:' + colorTitle">
            <v-icon color="white" left>mdi-needle</v-icon>
            Impfdaten - Niedersachsen
          </v-card-title>
          <v-container class="pt-6 pb-6">
            <v-row>
              <v-col cols="9" class="pl-6">
                <strong>
                  <v-icon color="white" left>mdi-check-all</v-icon>
                </strong>
                <strong> Impfquote (Vollständig)</strong>
              </v-col>
              <v-col cols="3" class="text-end pr-6">
                <strong>{{ Number(vaccinations.states.NI.secondVaccination.quote * 100).toFixed(2) + "%" }} </strong>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9" class="pl-6">
                <strong>
                  <v-icon color="white" left>mdi-check</v-icon>
                </strong>
                <strong> Impfquote (Erstimpfung)</strong>
              </v-col>
              <v-col cols="3" class="text-end pr-6">
                <strong>{{ Number(vaccinations.states.NI.quote * 100).toFixed(2) + "%" }} </strong>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9" class="pl-6">
                <v-icon color="white" left>mdi-needle</v-icon>
                Verabreichte Impfdosen
              </v-col>
              <v-col cols="3" class="text-end pr-6">
                {{ Number(vaccinations.states.NI.administeredVaccinations).toLocaleString() }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9" class="pl-6">
                <v-icon color="white" left>mdi-account-plus</v-icon>
                Am Vortag verabreicht (*)
              </v-col>
              <v-col cols="3" class="text-end pr-6">
                {{ Number(vaccinations.states.NI.delta).toLocaleString() }}
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
            <v-row v-if="vaccinations && vaccinations.meta">
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
            <v-row>
              <v-col cols="12">
                <v-divider></v-divider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pl-6 pr-6">
                <v-icon color="white" left>mdi-information-outline</v-icon>
                (*) Aufgrund der Datenschnittstelle beinhalten die in Niedersachsen am Vortag verabreichten Impfdosen
                nur
                die Erstimpfungen und nicht die Zweitimpfungen. Alle anderen Angaben beziehen beide Arten mit ein.
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
import {fetchVaccinationsData} from "@/services/CoronaApi";

export default {
  name: 'CoronaCountry',
  beforeMount() {
    this.getVaccinationsData()
  },
  methods: {
    async getVaccinationsData() {
      this.isLoading = true
      const vaccinations = await fetchVaccinationsData()
      this.vaccinations = vaccinations

      this.isLoading = false
      if (vaccinations) {
        this.isShowMessage = true
        this.message = vaccinations.updated ? "Die Impfzahlen wurden aktualisiert." : "Die Impfzahlen sind aktuell."
      }
    },
  },
  computed: {
    lastUpdate() {
      return this.vaccinations?.meta ? moment(this.vaccinations.meta.lastUpdate).format('DD.MM.YYYY') : "-/-"
    },
  },
  data() {
    return {
      colorCard: "#57a0d3 ", //41BBD9 //00A7E1 //5BC0EB //22AED1 //1597bb //8ab6d6 //57a0d3 //73c2fb //008ecc
      colorTitle: "#124E78", //383B53
      vaccinations: undefined,
      isLoading: false,
      isShowMessage: false,
      message: ""
    }
  }
}
</script>
