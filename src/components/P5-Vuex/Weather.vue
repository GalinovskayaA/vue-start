<template>
  <div class="center content">
    <div v-for="alert in alerts" :key="alert">
      <div v-if="alert !== ''" class="dangers">
        {{ alert }}
      </div>
    </div>
    <div v-if="isWait">
      <Krutilka/>
    </div>
    <div v-else>
      <div>
        <div>
          <span> Регион: {{ currentWeatherCity.country }} </span>
          <span> / </span>
          <span> {{ currentWeatherCity.region }} </span>
        </div>
        <MySelectCity v-model="selectedCity"
                      title="Выбрать другой город "
                      :options="listCity"
        />
        <div> Последнее обновление: {{ currentWeatherCity.last_updated }} </div>
      </div>
      <div>
        <h1> {{ currentWeatherCity.text }} </h1>
        <div class="currentWeatherCity">
          <div>
            <img :src="currentWeatherCity.icon" alt="">
          </div>
          <div>
            <div> Температура, C°: {{ currentWeatherCity.temp_c }} </div>
            <div> Ощущается: {{ currentWeatherCity.feelslike_c }} </div>
            <div> Влажность: {{ currentWeatherCity.humidity }} </div>
            <div> Осадков, мм: {{ currentWeatherCity.precip_mm }} </div>
            <div> Давление: {{ currentWeatherCity.pressure_mb }} </div>
            <div> Ультрафиолетовый индекс: {{ currentWeatherCity.uv }} </div>
            <div> Скорость ветра, м/с: {{ currentWeatherCity.wind_kph }} </div>
            <div> Направление ветра: {{ windDir(currentWeatherCity.wind_dir) }} </div>
          </div>
        </div>
      </div>
    </div>
    <h1> Прогноз погоды на ближайшие дни </h1>
    <div class="daysWrapper">
      <div v-for="daysNumber in totalDays"
           @click="onChangeDays(daysNumber)"
           :key="daysNumber" class="day"
           :class="{'current-day': days === daysNumber}"
      >
        {{ daysNumber }}
      </div>
    </div>
    <div class="forecastContent">
      <div v-for="forecast in forecastDays" :key="forecast.date_epoch">
        <div class="forecast" :class="{forecastMini: !isShowHourWeather}">
          <h1 class="data"> {{ forecast.date }} </h1>
          <div> Восход солнца: {{ forecast.astro.sunrise }} </div>
          <div> Заход солнца: {{ forecast.astro.sunset }} </div>
          <div> Восход луны: {{ forecast.astro.moonrise }} </div>
          <div> Заход луны: {{ forecast.astro.moonset }} </div>
          <div> Освещение луны: {{ forecast.astro.moon_illumination }} </div>
          <div> Фаза луны: {{ moonPhase(forecast.astro.moon_phase) }} </div>
          <img :src=" forecast.day.condition.icon " alt="" class="forecast-img">
          <h1> Среднесуточные показатели </h1>
          <div> Температура воздуха: {{ forecast.day.avgtemp_c }} </div>
          <div> Максимальная скорость ветра, м/с: {{ (forecast.day.maxwind_kph / 3.6).toFixed(1) }} </div>
          <div> Общее количество осадков, мм: {{ forecast.day.totalprecip_mm }} </div>
          <h1 @click="this.isShowHourWeather = !isShowHourWeather"
              class="cursor"
          >
            По часам {{ !isShowHourWeather ? '(подробнее)' : '(свернуть)' }}
          </h1>
          <div class="hoursWeather" v-show="isShowHourWeather">
            <div v-for="hour in forecast.hour" :key="hour.time_epoch" class="hourWeather">
              <span class="hourWeather-time"> {{ (hour.time).substring(11) }} </span>
              <span class="hourWeather-text"> {{ hour.condition.text }} </span>
              <img :src=" hour.condition.icon " alt="">
              <span class="hourWeather-data"> {{ hour.temp_c }} C° </span>
              <span class="hourWeather-data"> {{ (hour.wind_kph / 3.6).toFixed(1) }} м/с </span>
              <span class="hourWeather-data"> {{ hour.precip_mm }} мм </span>
              <span class="hourWeather-text"> вероятность дождя {{ hour.chance_of_rain }} % </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Krutilka from "../../commons/Krutilka";
import MySelectCity from "../../commons/myComponents/MySelectCity";
export default {
  name: "Weather",
  components: {
    Krutilka,
    MySelectCity
  },
  data() {
    return {
      isWait: false,
      isShowHourWeather: false,
      isError: false,
      errorMessage: '',
      selectedCity: 'Минск',
      listCity: ['Минск', 'Брест', 'Gomel', 'Гродно', 'Mogilev (Belarus)', 'Vitebsk (Belarus)','Москва', 'Saint Petersburg',
        'Омск', 'Калининград', 'Шарм Эль Шейх', 'Хургада', 'Прага', 'Варшава', 'Вильнюс', 'Рига', 'Киев', 'Таллин', 'Париж',
        'Рим', 'Мадрид', 'Нью Йорк', 'Лондон', 'София', 'Пекин', 'Токио'],
      alerts: [],
      days: 2,
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
    }
  },
  mounted() {
    this.fetchCurrentWeather()
    this.fetchForecast()
  },
  watch: {
    selectedCity(newValue) {
      this.selectedCity = newValue
      this.fetchCurrentWeather()
      this.fetchForecast()
    },
  },
  computed: {
  },
  methods: {
    async fetchCurrentWeather() {
      this.isWait = true
      try {
        const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
          params: {
            key: '5761c9c6f44e4889a0f91838220601',
            q: this.selectedCity,
            aqi: 'no',
            lang: 'ru'
          }
        })
        this.currentWeatherCity.country = response.data.location.country
        this.currentWeatherCity.region = response.data.location.region
        this.currentWeatherCity.tz_id = response.data.location.tz_id
        this.currentWeatherCity.text = response.data.current.condition.text
        this.currentWeatherCity.icon = response.data.current.condition.icon
        this.currentWeatherCity.feelslike_c = response.data.current.feelslike_c
        this.currentWeatherCity.feelslike_f = response.data.current.feelslike_f
        this.currentWeatherCity.gust_kph = response.data.current.gust_kph
        this.currentWeatherCity.humidity = response.data.current.humidity
        this.currentWeatherCity.last_updated = response.data.current.last_updated
        this.currentWeatherCity.precip_mm = response.data.current.precip_mm
        this.currentWeatherCity.pressure_mb = response.data.current.pressure_mb
        this.currentWeatherCity.temp_c = response.data.current.temp_c
        this.currentWeatherCity.temp_f = response.data.current.temp_f
        this.currentWeatherCity.uv = response.data.current.uv
        this.currentWeatherCity.wind_kph = (response.data.current.wind_kph / 3.6).toFixed(1)
        this.currentWeatherCity.wind_dir = response.data.current.wind_dir
      } catch (e) {
        this.isError = true
        this.errorMessage = e
      } finally {
        this.isWait = false
      }
    },
    async fetchForecast() {
      this.isWait = true
      try {
        const response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
          params: {
            key: '5761c9c6f44e4889a0f91838220601',
            q: this.selectedCity,
            days: this.days,
            aqi: 'no',
            lang: 'ru',
            alerts: 'yes'
          }
        })
        this.alertsFilter(response.data.alerts.alert)
        this.forecastDays = response.data.forecast.forecastday
      } catch (e) {
        this.isError = true
        this.errorMessage = e
      } finally {
        this.isWait = false
      }
    },
    onChangeDays(daysNumber) {
      this.days = daysNumber
      this.fetchForecast()
    },
    alertsFilter(alerts) {
      let array = []
      alerts.forEach(item => {
          array.push(item.desc)
        })
      this.alerts = [...new Set(array)]
    },
    moonPhase(newValue) {
      let value = {
        'New Moon': 'Новолуние',
        'Waxing Crescent': 'Молодая луна',
        'First Quarter': 'Первая четверть',
        'Waxing Gibbous': 'Прибывающая луна',
        'Full Moon': 'Полнолуние',
        'Waning Gibbous': 'Убывающая луна',
        'Last Quarter': 'Последняя четверть',
        'Waning Crescent': 'Старая луна'
      }
      return value[newValue]
    },
    windDir(newValue) {
      let value = {
        'N': 'северный',
        'E': 'восточный',
        'S': 'южный',
        'W': 'западный',
        'NE': 'северо-восточный',
        'SE': 'юго-восточный',
        'SW': 'юго-западный',
        'NW': 'северо-западный',
        'NNE': 'северо-северо-восточный',
        'ENE': 'восток-северо-восточный',
        'ESE': 'восток-юго-восточный',
        'SSE': 'юго-юго-восточный',
        'SSW': 'юго-юго-западный',
        'WSW': 'запад-юго-западный',
        'WNW': 'запад-северо-западный',
        'NNW': 'северо-северо-западный',
      }
      return value[newValue]
    }
  }
}
</script>

<style scoped>
.content {
  padding: 5rem 0.5rem 3rem;
  flex-direction: column;
  gap: 1rem;
}

.buttons button {
  border-radius: 0.5rem;
}

.cursor {
  cursor: pointer;
}

.data {
  padding-bottom: 0.5rem;
  border-bottom: 0.01rem solid grey;
}

.currentWeatherCity {
  display: flex;
  align-items: center
}

.currentWeatherCity img {
  width: 25vw;
}

.daysWrapper {
  margin-top: 0.15rem;
  display: flex;
  gap: 0.7rem;
}

.day {
  padding: 0.1rem 0.4rem;
  border-bottom: 0.02rem solid rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.current-day {
  border-bottom: 0.08rem solid rgba(0, 0, 0, 0.5);
  font-weight: bold;
}

.forecastContent {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.forecastMini {
  width: 28vw;
  height: 60vw;
  box-shadow: 0 0.15rem 0.3rem 0.05rem rgba(34, 60, 80, 0.5);
}

.forecast {
  display: flex;
  margin-bottom: 1rem;
  padding: 0.4rem;
  flex-direction: column;
  justify-content: space-around;
  align-items: center
}

.forecast-img {
  width: 14vw;
}

.forecast div {
  font-size: 0.8rem;
}

.forecast h1 {
  font-size: 0.8rem;
}

.hoursWeather {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.3rem;
}

.hourWeather {
  width: 4.8rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0.2rem 0.2rem 0.5rem 0.3rem rgba(34, 60, 80, 0.5);
  border-radius: 0.2rem;
}

.hourWeather-time {
  padding-bottom: 0.1rem;
  font-weight: bold;
  font-size: 0.6rem;
  border-bottom: 0.01rem solid rgba(0, 0, 0, 0.5);
}

.hourWeather-text {
  padding-top: 0.1rem;
  font-size: 0.5rem;
}

.hourWeather-data {
  font-size: 0.8rem;
}

.dangers {
  color: #ff7171;
  font-weight: bold;
  font-size: x-large;
}
</style>
