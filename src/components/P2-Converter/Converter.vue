<template>
  <div class="content">
    <div class="allListInf">
      <div v-show="isWait">
        <Krutilka/>
      </div>
      <h1> Complete list of foreign currencies: </h1>
      <MyInput v-model="searchQuery" placeholder="Поиск"/>
      <div class="select">
        <MySelectSort v-model="selectedSort"
                  title="Complete list of foreign currencies: "
                  :options="sortOptions"/>
      </div>
      <div class="pageWrapper">
        <div v-for="pageNumber in totalPages"
             @click="onChangePage(pageNumber)"
             :key="pageNumber" class="page"
             :class="{'current-page': page === pageNumber}"
        >
          {{ pageNumber }}
        </div>
        <ModalAlert v-bind:isShow="isShowModal"
                    v-bind:closeModal="closeModal"
                    title="Не реализовано"
        />
      </div>
      <transition-group name="list" tag="div">
        <div v-if="listAllRates.isListError" class="error"> ¯\_(ツ)_/¯ {{ listAllRates.errorMessageList }} </div>
        <div v-else v-for="rate in sortedAndSearchRate" :key="rate.Cur_Code">
          <div class="list">
            <span> {{ rate.Cur_Name }} : </span>
            <span> {{ rate.Cur_QuotName }} </span>
          </div>
        </div>
      </transition-group>
      <div class="allList">
        <h1> Daily exchange rate of the Belarusian ruble against foreign currencies: </h1>
        <div v-if="listRateOfBel.isListError" class="error"> ¯\_(ツ)_/¯ {{ listRateOfBel.errorMessageList }} </div>
        <div v-else v-for="rate in listRateOfBel.allRates">
          <div :key="rate.Cur_ID">
            <div class="listItem"> <b>{{ rate.Cur_OfficialRate }}</b> Белорусских рублей ( BYN ) --> </div>
            <div class="listItem"> <b>{{ rate.Cur_Scale }}</b> {{ rate.Cur_Name }} {{ rate.Cur_Abbreviation }} </div>
          </div>
        </div>
      </div>
    </div>
      <div v-if="initRateList.length > 1" class="converter">
        <transition-group name="rate-list">
          <div v-for="rate in initRateList" :key="rate.id" class="rate-list-item">
            <MyInputRate v-model="rate.value"
                         :rate="rate.name"
                         :abbreviation="rate.abbreviation"
                         :key="rate.id"
                         :onChangeValue="onChangeValue"
                         :onRemoveRate="onRemoveRate"
            />
          </div>
        </transition-group>
        <MySelectRate v-model="selectedRate"
                      title="Добавить валюту "
                      :options="listRateOfBel.allRates"/>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import Krutilka from "../../commons/Krutilka";
import MyInputRate from "../../commons/myComponents/MyInputRate";
import MySelectSort from "../../commons/myComponents/MySelectSort";
import MySelectRate from "../../commons/myComponents/MySelectRate";
import MyInput from "../../commons/myComponents/MyInput";
import ModalAlert from "../../commons/modals/ModalAlert";

export default {
  name: "Converter",
  components: {
    MyInput,
    MySelectSort,
    MySelectRate,
    MyInputRate,
    Krutilka,
    ModalAlert
  },
  data() {
    return {
      isShowModal: false,
      currentRate: {},
      selectedSort: '',
      selectedRate: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'Cur_Name', name: 'по названию'},
        {value: 'Cur_QuotName', name: 'по содержанию'}
      ],
      listAllRates: {
        allRates: [],
        errorMessageList: '',
        isListError: false
      },
      listRateOfBel: {
        allRates: [],
        errorMessageList: '',
        isListError: false
      },
      initRateList: [
        {
          id: 1,
          abbreviation: "BYN",
          scale: 1,
          name: "Белорусских рублей",
          officialRate: 1,
          value: 1
        }
      ],
      initRateListAbbr: ["USD", "EUR", "UAH", "PLN", "RUB"],
      isWait: false,
    }
  },
  mounted() {
    this.currentRate = this.initRateList[0]
    this.fetchListCurs()
    this.fetchRateOfBel()
  },
  watch: {
    selectedRate(newValue) {
      this.initRateListAbbr.push(newValue)
      this.createNewRate(this.listRateOfBel.allRates, newValue)
    },
    page() {
      this.fetchListCurs()
    }
  },
  computed: {
    sortedRates() { // передается как переменная !
      return [...this.listAllRates.allRates].sort((prev, curr) => {
        return prev[this.selectedSort]?.localeCompare(curr[this.selectedSort])
      })
    },
    sortedAndSearchRate() {
      return this.sortedRates.filter(rate => rate.Cur_Name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  methods: {
    closeModal(value) {
      this.isShowModal = value
    },
    onChangeValue(abbreviation, curValue) {
      this.currentRate = this.initRateList.find(rate => rate.abbreviation === abbreviation)
      this.initRateList.map(rate => {
        if (rate !== this.currentRate) {
          rate.value = (curValue / rate.officialRate * this.currentRate.officialRate / this.currentRate.scale * rate.scale).toFixed(4)
        } else {
          return rate
        }
      })
      this.currentRate = {}
    },
    onChangePage(pageNumber) {
      this.page = pageNumber
      this.isShowModal = true
    },
    ratesFilter(array) {
      this.listAllRates.allRates = array.filter(rate => parseInt(rate.Cur_DateEnd.substring(4, -4)) > 2021)
    },
    initRatesFilter(array) {
      for (let el of this.initRateListAbbr) {
        this.createNewRate(array, el)
      }
    },
    createNewRate(array, el) {
      let rate = array.find(rate => rate.Cur_Abbreviation === el)
      let value = (this.initRateList[0].value / rate.Cur_OfficialRate * this.initRateList[0].officialRate / this.initRateList[0].scale * rate.Cur_Scale).toFixed(4)
      const newRate = {
        id: rate.Cur_ID,
        abbreviation: rate.Cur_Abbreviation,
        scale: rate.Cur_Scale,
        name: rate.Cur_Name,
        officialRate: rate.Cur_OfficialRate,
        value: value
      }
      this.initRateList.push(newRate)
    },
    onRemoveRate(abbreviation) {
      this.initRateList = this.initRateList.filter(rate => rate.abbreviation !== abbreviation)
    },
    async fetchListCurs() {
      this.isWait = true
      try {
        const response = await axios.get(`https://www.nbrb.by/api/exrates/currencies`)
        this.ratesFilter(response.data)
        this.totalPages = Math.ceil(this.listAllRates.allRates.length / this.limit)
      } catch (e) {
        this.listAllRates.isListError = true
        this.listAllRates.errorMessageList = e
      } finally {
        this.isWait = false
      }
    },
    async fetchRateOfBel() {
      this.isWait = true
      try {
        const response = await axios.get('https://www.nbrb.by/api/exrates/rates?periodicity=0')
        this.listRateOfBel.allRates = response.data
        this.initRatesFilter(response.data)
      } catch (e) {
        this.listRateOfBel.isListError = true
        this.listRateOfBel.errorMessageList = e
      } finally {
        this.isWait = false
      }
    }
  }
}
</script>

<style scoped>
.content {
  padding: 4rem 0 0 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
}

.error {
  color: brown;
}

.allListInf {
  flex: 1;
  text-align: initial;
}

.allListInf .listItem {
  font-size: 0.7rem;
}

.allListInf h1 {
  text-align: center;
}

.pageWrapper {
  margin-top: 0.15rem;
  display: flex;
  gap: 0.7rem;
}

.page {
  padding: 0.1rem 0.4rem;
  border: 0.02rem solid rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.current-page {
  border: 0.05rem solid rgba(23, 86, 8, 1);
  font-weight: bold;
  color: #00015e;
}

.converter {
  flex: 4;
  padding-top: 2.6rem;
}

.list {
  gap: 1rem
}

.list span {
  font-size: 0.7rem;
}

.select {
  display: flex;
  justify-content: space-between;
}

.rate-list-item {
  display: inline-block;
  margin-right: 10px;
}
.rate-list-enter-active,
.rate-list-leave-active {
  transition: all 1s ease;
}

.rate-list-enter-from,
.rate-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-move {
  transition: transform 1s ease;
}
</style>
