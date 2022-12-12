<template>
  <div class="container main_wrapper">
    <div
      v-for="(icon, i) in props.data.cryptoIcons"
      class="row crypto_elemenet"
      :key="i"
    >
      <div class="col-12 col-sm-6 col-lg-2 crypto_name_logo">
        <div class="crypto_icon_wrapper">
          <div class="crypto_icon">
            <img class="crypto_logo" width="32" :src="Object.values(icon)" />
          </div>
        </div>
        <div class="crypto_name">
          <h4 class="symbol">
            {{
              props.data.cryptoData.find((c) => c.id == Object.keys(icon))
                .symbol
            }}
          </h4>
          <h4 class="name">
            {{
              props.data.cryptoData.find((c) => c.id == Object.keys(icon)).name
            }}
          </h4>
        </div>
      </div>
      <div class="col-6 col-lg-2 crypto_price">
        <h4 class="price_name">Price</h4>
        <h4 class="price_value">
          ${{
            props.data.cryptoData.find((c) => c.id == Object.keys(icon)).quote
              .USD.price < 1
              ? props.data.cryptoData
                  .find((c) => c.id == Object.keys(icon))
                  .quote.USD.price.toFixed(4)
              : props.data.cryptoData
                  .find((c) => c.id == Object.keys(icon))
                  .quote.USD.price.toFixed(2)
          }}
        </h4>
      </div>
      <div class="col-6 col-lg-2 crypto_change">
        <h4 class="change_title">Change</h4>
        <div class="d-flex">
          <h4
            :class="
              'name d-inline me-1 ' +
              (props.data.cryptoData.find((c) => c.id == Object.keys(icon))
                .quote.USD.percent_change_30d < 0
                ? 'red'
                : 'green')
            "
          >
            {{
              props.data.cryptoData
                .find((c) => c.id == Object.keys(icon))
                .quote.USD.percent_change_30d.toFixed(2)
            }}%
          </h4>
          <img
            :src="
              props.data.cryptoData.find((c) => c.id == Object.keys(icon)).quote
                .USD.percent_change_30d < 0
                ? ArrowDown
                : ArrowUp
            "
            class="d-inline"
          />
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-3 thumb-wrapper">
        <LineThumb
          :data="props.data.cryptoData.find((c) => c.id == Object.keys(icon))"
          :color="
            props.data.cryptoData.find((c) => c.id == Object.keys(icon)).quote
              .USD.percent_change_30d < 0
              ? 'red'
              : 'green'
          "
        />
      </div>
      <div class="col-12 col-lg-2 action_buttons">
        <button type="button" class="btn btn-sell">Sell</button>
        <button type="button" class="btn btn-buy">Buy</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import ArrowUp from "../assets/icons/increase.svg";
import ArrowDown from "../assets/icons/drop.svg";
import LineThumb from "./LineThumb.vue";
const props = defineProps(["data"]);
</script>

<style scoped>
.main_wrapper {
  max-width: 1040px;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
}

.green {
  color: rgba(45, 199, 143, 1) !important;
}

.red {
  color: rgba(234, 77, 77, 1) !important;
}

h4 {
  margin: 0;
}

.symbol,
.price_name,
.change_title {
  font-size: 0.875rem;
  font-weight: 400;
  color: #9896a1;
}

.name,
.price_value {
  color: #0a041c;
  font-weight: 600;
  font-size: 0.875rem;
}

.crypto_elemenet {
  min-height: 80px;
  border: 1px solid rgba(235, 235, 243, 1);
  background-color: white;
  border-radius: 8px;

  display: flex;
  align-items: center;

  justify-content: space-between;
}

.crypto_name_logo {
  display: flex;
  align-items: center;
  min-width: 150px;
}

.crypto_name,
.crypto_price {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.crypto_icon {
  width: 48px;
  height: 48px;
  border: 1px solid rgba(235, 235, 243, 1);
  border-radius: 50%;
  position: relative;
  margin-right: 1rem;
}

.crypto_logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

.action_buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.btn-buy {
  background: rgba(116, 69, 251, 1);
  color: white;
}

.btn-buy:hover,
.btn-buy:focus {
  background-color: rgba(116, 69, 209, 1) !important;
  color: white !important;
}

.btn-sell {
  color: rgba(116, 69, 251, 1);
  border: 1px solid rgba(235, 235, 243, 1);
  background-color: white;
}

.btn-sell:hover,
.btn-sell:focus {
  background-color: rgba(235, 235, 243, 0.5) !important;
  color: rgba(116, 69, 251, 1) !important;
  border: 1px solid rgba(235, 235, 243, 1) !important;
}

.thumb-wrapper {
  height: 40px !important;
}

@media screen and (max-width: 992px) {
  .crypto_icon_wrapper,
  .crypto_name {
    width: 50%;
  }

  .crypto_icon {
    margin-left: auto;
  }

  .crypto_name_logo,
  .crypto_price,
  .crypto_change,
  .action_buttons {
    padding: 1rem 0.5rem;
    align-items: center;
    justify-content: center;
  }

  .action_buttons {
    justify-content: space-evenly;
  }

  .crypto_change {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
