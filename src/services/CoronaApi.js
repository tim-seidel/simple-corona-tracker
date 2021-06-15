import axios from "axios";
import moment from "moment";

const DISTRICT_CACHE_KEY = "DISTRICT_CACHE_KEY_"
const COUNTRY_CACHE_KEY = "COUNTRY_CACHE_KEY_"
const VACCINATIONS_CACHE_KEY = "VACCINATIONS_CACHE_KEY_"
const MIN_DELTA_MILLIS = 1000 * 60 * 60 * 24 //24 hours (caching)

export async function fetchDistrictData(id) {
    const cache_key = DISTRICT_CACHE_KEY + id

    //Check and load cached data
    try {
        const cached = localStorage.getItem(cache_key)
        if (cached) {
            const district = JSON.parse(cached)

            const dt = district.meta ? moment(district.meta.lastUpdate).valueOf() : 0
            const t = moment().valueOf()
            const diff = t - dt

            if (diff > MIN_DELTA_MILLIS) {
                console.log("District data is outdated, fetching new data.", "Age: ~" + Number(diff / 1000 / 60).toFixed(0) + " minutes or ~" + Number(diff / 1000 / 60 / 60).toFixed(2) + " hours.")
                localStorage.removeItem(cache_key)
            } else {
                console.log("District data is recent, returning cached data.", "Age: ~" + Number(diff / 1000 / 60).toFixed(0) + " minutes or ~" + Number(diff / 1000 / 60 / 60).toFixed(2) + " hours.")
                district.updated = false
                return district
            }
        }
    } catch (e) {
        console.log("Error parsing cached district data.", e)
        localStorage.removeItem(cache_key)
    }

    try {
        //Load new data if cached data is to old or not available
        const response = await axios.get('https://api.corona-zahlen.org/districts/' + id)

        const district = response.data.data[id]
        district.meta = response.data.meta

        localStorage.setItem(cache_key, JSON.stringify(district))

        district.updated = true
        return district
    } catch (e) {
        console.log("Error in fetchDistrictData()", e)
        return undefined
    }
}

export async function fetchCountryData() {
    const cache_key = COUNTRY_CACHE_KEY + 'germany'

    //Check and load cached data
    try {
        const cached = localStorage.getItem(cache_key)
        if (cached) {
            const country = JSON.parse(cached)

            const dt = country.meta ? moment(country.meta.lastUpdate).valueOf() : 0
            const t = moment().valueOf()
            const diff = t - dt

            if (diff > MIN_DELTA_MILLIS) {
                console.log("Country data is outdated, fetching new data.", "Age: ~" + Number(diff / 1000 / 60).toFixed(0) + " minutes or ~" + Number(diff / 1000 / 60 / 60).toFixed(2) + " hours.")
                localStorage.removeItem(cache_key)
            } else {
                console.log("Country data is recent, returning cached data.", "Age: ~" + Number(diff / 1000 / 60).toFixed(0) + " minutes or ~" + Number(diff / 1000 / 60 / 60).toFixed(2) + " hours.")
                country.updated = false
                return country
            }
        }
    } catch (e) {
        console.log("Error parsing cached district data.", e)
        localStorage.removeItem(cache_key)
    }

    //Load new data if cached data is to old or not available
    try {
        const response = await axios.get('https://api.corona-zahlen.org/germany/')
        const country = response.data

        localStorage.setItem(cache_key, JSON.stringify(country))

        country.updated = true
        return country
    } catch (e) {
        console.log("Error in fetchCountryData()", e)
        return undefined
    }
}

export async function fetchVaccinationsData() {
    const cache_key = VACCINATIONS_CACHE_KEY + 'germany'

    //Check and load cached data
    try {
        const cached = localStorage.getItem(cache_key)
        if (cached) {
            const vaccinations = JSON.parse(cached)

            const dt = vaccinations.meta ? moment(vaccinations.meta.lastUpdate).valueOf() : 0
            const t = moment().valueOf()
            const diff = t - dt

            if (diff > MIN_DELTA_MILLIS) {
                console.log("Vaccinations data is outdated, fetching new data.", "Age: ~" + Number(diff / 1000 / 60).toFixed(0) + " minutes or ~" + Number(diff / 1000 / 60 / 60).toFixed(2) + " hours.")
                localStorage.removeItem(cache_key)
            } else {
                console.log("Vaccinations data is recent, returning cached data.", "Age: ~" + Number(diff / 1000 / 60).toFixed(0) + " minutes or ~" + Number(diff / 1000 / 60 / 60).toFixed(2) + " hours.")
                vaccinations.updated = false
                return vaccinations
            }
        }
    } catch (e) {
        console.log("Error in fetchVaccinationsData()", e)
        localStorage.removeItem(cache_key)
    }

    //Load new data if cached data is to old or not available
    try {
        const responseVac = await axios.get('https://api.corona-zahlen.org/vaccinations/')
        const responseHist = await axios.get('https://api.corona-zahlen.org/vaccinations/history/7')

        const vaccinations = responseVac.data.data
        const history = responseHist.data.data.history

        vaccinations.meta = responseVac.data.meta
        if (history.length > 0) {
            vaccinations.delta = history[history.length - 1].firstVaccination + history[history.length - 1].secondVaccination
        }

        localStorage.setItem(cache_key, JSON.stringify(vaccinations))

        vaccinations.updated = true
        return vaccinations
    } catch (e) {
        console.log("Error in fetchVaccinationsData()", e)
        return undefined
    }
}
