<template>
  <Line :data="chartData" :options="options" />
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { reactive } from "vue";
import { Line } from "vue-chartjs";

const props = defineProps(["data", "color"]);

const calculatePrice = (newValue, perChange24h, perChange7d, perChange30d) => {
  const value24h = newValue / (1 + perChange24h / 100);
  const value7d = newValue / (1 + perChange7d / 100);
  const value30d = newValue / (1 + perChange30d / 100);
  return [value30d, value7d, value24h, newValue];
};

const newValue = props.data.quote?.USD.price;
const perChange24h = props.data.quote?.USD.percent_change_24h;
const perChange7d = props.data.quote?.USD.percent_change_7d;
const perChange30d = props.data.quote?.USD.percent_change_30d;
const dataPass = calculatePrice(
  newValue,
  perChange24h,
  perChange7d,
  perChange30d
);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const chartData = reactive({
  labels: ["January", "February", "March"],
  datasets: [
    {
      label: "Data Two",
      borderColor:
        props.color === "green"
          ? "rgba(45, 199, 143, 1)"
          : "rgba(234, 77, 77, 1)",
      pointBackgroundColor: "white",
      pointBorderColor: "white",
      borderWidth: 2,
      radius: 0,
      backgroundColor: (ctx) => {
        const canvas = ctx.chart.ctx;
        const gradient = canvas.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(
          0,
          props.color === "green"
            ? "rgba(24, 203, 128, 0.08)"
            : "rgba(234, 77, 77, 0.08)"
        );
        gradient.addColorStop(
          1,
          props.color === "green"
            ? "rgba(24, 203, 128, 0)"
            : "rgba(234, 77, 77, 0)"
        );

        return gradient;
      },
      tension: 0.25,
      data: dataPass,
    },
  ],
});

const options = reactive({
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
});
</script>

<style>
canvas {
  width: 100% !important;
}
</style>
