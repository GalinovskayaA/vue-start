import axios from "axios";

export const weatherModule = {
  state: () => ({
    isWait: false,
    isShowHourWeather: false,
    isError: false,
    errorMessage: '',
    selectedCity: 'Минск',
    listCity: ['Минск', 'Брест', 'Gomel', 'Гродно', 'Mogilev (Belarus)', 'Vitebsk (Belarus)','Москва', 'Saint Petersburg',
      'Омск', 'Калининград', 'Шарм Эль Шейх', 'Хургада', 'Прага', 'Варшава', 'Вильнюс', 'Рига', 'Киев', 'Таллин', 'Париж',
      'Рим', 'Мадрид', 'Нью Йорк', 'Лондон', 'София', 'Пекин', 'Токио'],
    alerts: [],
    days: 3,
    totalDays: 3,
    forecastDays: [],
    currentWeatherCity: {
      country: '',
      region: '',
      tz_id: '',
      text: '',
      icon: '',
      feelslike_c: 0,
      feelslike_f: 0,
      gust_kph: 0, // порыв ветра
      humidity: 0, // влажность
      last_updated: '',
      precip_mm: 0,
      pressure_mb: 0, // давление
      temp_c: 0,
      temp_f: 0,
      uv: 0,
      wind_mps: 0, // сила ветра
      wind_dir: '',
    },
  }),
  getters: {
/*    selectedCity(state, newValue) {
      state.selectedCity = newValue
    //  action('fetchCurrentWeather')
    //  action('fetchForecast')
    //  this.fetchCurrentWeather()
    //  this.fetchForecast()
    },*/
    alertsFilter(state) {
      let array = []
      state.alerts.forEach(item => {
        array.push(item.desc)
      })
      state.alerts = [...new Set(array)]
      console.log(state.alerts)
    },
  },
  mutations: {
    setWait(state, boolean) {
      state.isWait = boolean
    },
    setShowHourWeather(state, boolean) {
      state.isShowHourWeather = boolean
    },
    setError(state, boolean) {
      state.isError = boolean
    },
    setErrorMessage(state, message) {
      state.errorMessage = message
    },
    setSelectedCity(state, city) {
      state.selectedCity = city
    },
    setAlerts(state, alerts) {
      state.alerts = alerts
    },
    setDays(state, days) {
      state.days = days
    },
    setTotalDays(state, days) {
      state.totalDays = days
    },
    setForecastDays(state, forecastDays) {
      state.forecastDays = forecastDays
    },
    /*setCurrentWeatherCityLocation(state, location) {
      state.currentWeatherCity.location = location
    },
    setCurrentWeatherCityCurrent(state, current) {
      state.currentWeatherCity.current = current
    },*/
    setCurrentWeatherCityWinter(state, winter) {
      state.currentWeatherCity.wind_mps = winter // сила ветра
    },
    setCurrentWeatherCity(state, city) {
      state.currentWeatherCity.country = city.location.country
      state.currentWeatherCity.region = city.location.name
      state.currentWeatherCity.tz_id = city.location.tz_id
      state.currentWeatherCity.text = city.current.condition.text
      state.currentWeatherCity.icon = city.current.condition.icon
      state.currentWeatherCity.feelslike_c = city.current.feelslike_c
      state.currentWeatherCity.feelslike_f = city.current.feelslike_f
      state.currentWeatherCity.gust_kph = city.current.gust_kph // порыв ветра
      state.currentWeatherCity.humidity = city.current.humidity // влажность
      state.currentWeatherCity.last_updated = city.current.last_updated
      state.currentWeatherCity.precip_mm = city.current.precip_mm
      state.currentWeatherCity.pressure_mb = city.current.pressure_mb // давление
      state.currentWeatherCity.temp_c = city.current.temp_c
      state.currentWeatherCity.temp_f = city.current.temp_f
      state.currentWeatherCity.uv = city.current.uv
      state.currentWeatherCity.wind_mps = (city.current.wind_kph / 3.6).toFixed(1) // сила ветра
      state.currentWeatherCity.wind_dir = city.current.wind_dir
    },
  },
  actions: {
    async fetchCurrentWeather({state, commit}) {
      commit('setWait', true)
 /*     this.isWait = true*/
      try {
        const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
          params: {
            key: '5761c9c6f44e4889a0f91838220601',
            q: state.selectedCity,
            aqi: 'no',
            lang: 'ru'
          }
        })
      //  console.log(response.data)
        commit('setCurrentWeatherCity', response.data)
     //   commit('setCurrentWeatherCityCurrent', response.data.current)
        commit('setCurrentWeatherCityWinter', (response.data.current.wind_kph / 3.6).toFixed(1))
      } catch (e) {
        commit('setError', true)
        /*this.isError = true*/
        commit('setErrorMessage', e)
        /*this.errorMessage = e*/
      } finally {
        commit('setWait', false)
        /*this.isWait = false*/
      }
    },
    async fetchForecast({state, commit}) {
      commit('setWait', true)
      /*this.isWait = true*/
      try {
        const response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
          params: {
            key: '5761c9c6f44e4889a0f91838220601',
            q: state.selectedCity,
            days: state.days,
            aqi: 'no',
            lang: 'ru',
            alerts: 'yes'
          }
        })
        console.log(response.data.alerts)
        commit('setAlerts', response.data.alerts.alert)
        // this.alertsFilter(response.data.alerts.alert)
        commit('setForecastDays', response.data.forecast.forecastday)
        // state.forecastDays = response.data.forecast.forecastday
      } catch (e) {
        commit('setError', true)
        /*this.isError = true*/
        commit('setErrorMessage', e)
        /*this.errorMessage = e*/
      } finally {
        commit('setWait', false)
        /*this.isWait = false*/
      }
    },
  },
  namespaced: true
}
