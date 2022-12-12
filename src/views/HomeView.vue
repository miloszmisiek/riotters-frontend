<script setup>
import CardBackground from "../components/CardBackground.vue";
import ChartVue from "../components/ChartVue.vue";
import DataTabs from "../components/DataTabs.vue";
import PurpleDot from "../assets/icons/purple_dot.svg";
import GrayDot from "../assets/icons/gray_dot.svg";
import ArrowBalance from "../assets/icons/arrow_balance.svg";
import ArrowBalanceRed from "../assets/icons/arrow_balance_red.svg";
import Hamburger from "../assets/icons/hamburger.svg";
import RedDot from "../assets/icons/red_dot.svg";
import BellIcon from "../assets/icons/bell_icon.svg";
import { reactive } from "vue";

const props = defineProps(["data"]);

const chartLabels = Array.from({ length: 30 }, (_, i) => i + 1);
const chartData = reactive({
  chartLabels: chartLabels,
  chartData1: Array.from(
    { length: chartLabels.length },
    () => Math.random() * (60000 - 5000) + 5000
  ),
  chartData2: Array.from(
    { length: chartLabels.length },
    () => Math.random() * (60000 - 5000) + 5000
  ),
});

const currentBalance = chartData.chartData1.slice(-1)[0].toFixed(2);
const lastMonthBalance = chartData.chartData2.slice(-1)[0].toFixed(2);
const difference = ((currentBalance - lastMonthBalance) / currentBalance) * 100;
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
</script>

<template>
  <main>
    <div class="row mb-4">
      <div class="col-12 order-last order-sm-first mt-4 mt-sm-0 col-sm-6">
        <input type="text" placeholder="Search" />
      </div>
      <div class="col-12 col-sm-6 menu_buttons">
        <button type="button" class="btn btn-menu btn-menu--bell">
          <img class="btn-menu--bell-dot" :src="RedDot" />
          <img :src="BellIcon" />
        </button>
        <button type="button" class="btn btn-menu">
          <img :src="Hamburger" />
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-lg-6">
        <CardBackground>
          <template v-slot:title> Current Balance </template>
          <template v-slot:component>
            <h2 class="current_balance--amaunt">
              <span class="currency_symbol">{{
                formatter.format(currentBalance).charAt(0)
              }}</span>
              {{
                formatter.format(currentBalance).replace(/,/g, " ").substring(1)
              }}
            </h2>
            <div>
              <img
                v-if="difference > 0"
                class="arow_balance"
                :src="ArrowBalance"
              />
              <img
                v-else
                class="arrow_balance arrow_balance--rotate"
                :src="ArrowBalanceRed"
              />
              <span
                :class="
                  'balance_difference ' + (difference > 0 ? 'green' : 'red')
                "
              >
                {{ difference.toFixed(0) }}% vs last month
              </span>
            </div>
            <div class="current_balance--buttons">
              <button type="button" class="btn btn-invest">Quick Invest</button>
              <button type="button" class="btn btn-report">Show Report</button>
            </div>
          </template>
        </CardBackground>
      </div>
      <div class="col-12 order-last col-lg-6 mt-4 mt-lg-0">
        <CardBackground>
          <template v-slot:title> Summary </template>
          <template v-slot:component>
            <ChartVue :data="chartData" />
          </template>
          <template v-slot:footer>
            <div class="card_footer">
              <span
                ><img class="chart_legend--dots" :src="PurpleDot" /> This
                month</span
              >
              <span
                ><img class="chart_legend--dots" :src="GrayDot" /> Last
                month</span
              >
            </div>
          </template>
        </CardBackground>
      </div>
      <div class="col-12 mt-4 order-lg-last">
        <DataTabs :data="props.data" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.chart_legend--dots {
  padding-right: 0.5rem;
}

.red {
  color: #ea4d4d;
}

.green {
  color: #2dc78f;
}

.balance_difference {
  padding-left: 0.5rem;
}

.arrow_balance--rotate {
  transform: rotate(90deg);
  color: red;
}

.current_balance--amaunt {
  font-size: 3.5rem;
}

.currency_symbol {
  color: rgba(152, 150, 161, 1);
  font-weight: 300;
  margin-right: -0.7rem;
}

.card_footer {
  border-top: 1px solid rgba(238, 238, 238, 1);
  margin: 0 -2rem;
  padding: 0.5rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 400;
  color: rgba(152, 150, 161, 1);
  display: flex;
  gap: 0.75rem;
}

.current_balance--buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-top: 4.5rem;
}

.btn-invest {
  background: rgba(116, 69, 251, 1);
  color: white;
}

.btn-invest:hover,
.btn-invest:focus {
  background-color: rgba(116, 69, 209, 1) !important;
  color: white !important;
}

.btn-report {
  color: rgba(116, 69, 251, 1);
  border: 1px solid rgba(235, 235, 243, 1);
  background-color: white;
}

.btn-report:hover,
.btn-report:focus {
  background-color: rgba(235, 235, 243, 0.5) !important;
  color: rgba(116, 69, 251, 1) !important;
  border: 1px solid rgba(235, 235, 243, 1) !important;
}

input {
  display: block;
  max-width: 232px;
  width: 100%;
  padding: 10px 45px;
  background: rgba(247, 247, 249, 1) url("../assets/icons/search_icon.svg")
    no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
}

.menu_buttons {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 1em;
}

.btn-menu {
  background-color: rgba(247, 247, 249, 1);
  border-radius: 8px;
  width: 3rem;
  height: 3rem;
}

.btn-menu:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.btn-menu--bell {
  position: relative;
}

.btn-menu--bell-dot {
  position: absolute;
  top: -5px;
  right: -5px;
}

@media screen and (max-width: 575px) {
  .menu_buttons {
    justify-content: space-between;
  }
  input {
    max-width: 100%;
  }
}

@media screen and (max-width: 500px) {
  .current_balance--amaunt {
    font-size: 2.5rem;
  }

  @media screen and (max-width: 310px) {
    .current_balance--amaunt {
      font-size: 2.2rem;
    }
  }
}
</style>
