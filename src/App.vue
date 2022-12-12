<script setup>
import { RouterView } from "vue-router";
import { onMounted, reactive } from "vue";
import { axiosReq } from "./axios/axios";

let id = [];
const state = reactive({
  cryptoData: [],
  cryptoIcons: [],
});
const fetchCrypto = async () => {
  try {
    const { data } = await axiosReq.get();
    state.cryptoData = data.data;
    id = data.data.map((c) => c.id);
    fetchCryptoInfo();
  } catch (err) {
    console.log(err);
  }
};

const fetchCryptoInfo = async () => {
  try {
    const { data } = await axiosReq.get(`/info/${id}`);
    state.cryptoIcons = Object.entries(data.data).map((o) => ({
      [o[0]]: o[1].logo,
    }));
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  fetchCrypto();
});
</script>

<template>
  <RouterView :data="state" />
</template>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>
