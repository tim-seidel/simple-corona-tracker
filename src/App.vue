<template>
  <v-app>
    <div>
      <v-toolbar color="#124E78"
                 dark flat>
        <v-toolbar-title>Corona-Übersicht</v-toolbar-title>
        <v-spacer></v-spacer>

        <template v-slot:extension>
          <v-tabs v-model="tab" class="ml-0">
            <v-tab>Region</v-tab>
            <v-tab>Deutschland</v-tab>
            <v-tab>Impfungen</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
    </div>

    <v-tabs-items v-model="tab">
      <v-tab-item key="district">
        <corona-district/>
      </v-tab-item>
      <v-tab-item key="country">
        <corona-country/>
      </v-tab-item>
      <v-tab-item key="vaccinations">
        <corona-vaccinations/>
      </v-tab-item>
    </v-tabs-items>
  </v-app>
</template>

<script>
import CoronaDistrict from './components/CoronaDistrict';
import CoronaCountry from "@/components/CoronaCountry";
import CoronaVaccinations from "@/components/CoronaVaccinations";

export default {
  name: 'App',
  components: {
    CoronaVaccinations,
    CoronaCountry,
    CoronaDistrict,
  },
  data: () => ({
    tab: undefined
  }),
};
</script>

<style>
.v-tab {
  margin-left: 0px !important;
}
</style>
