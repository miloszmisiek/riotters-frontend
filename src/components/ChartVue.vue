<template>
  <Line :data="data" :options="options" :plugins="plugins" />
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
  TimeScale,
} from "chart.js";
import { reactive } from "vue";
import { Line } from "vue-chartjs";

const props = defineProps(["data"]);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
);

const data = reactive({
  labels: props.data.chartLabels,
  datasets: [
    {
      label: "This Month",
      borderColor: "rgb(116, 69, 251)",
      pointBackgroundColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointBorderColor: "rgb(116, 69, 251)",
      borderWidth: 3,
      radius: 0,
      fill: true,
      backgroundColor: (ctx) => {
        const canvas = ctx.chart.ctx;
        const gradient = canvas.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "rgba(116,69,251,0.16)");
        gradient.addColorStop(1, "rgba(116, 69, 251, 0)");

        return gradient;
      },
      tension: 0.25,
      data: props.data.chartData1,
    },
    {
      label: "Last Month",
      borderColor: "rgba(133, 133, 133, .3)",
      borderDash: [5, 5],
      pointHoverRadius: 0,
      borderWidth: 2,
      radius: 0,
      fill: false,
      tension: 0.25,
      data: props.data.chartData2,
    },
  ],
});

const plugins = reactive([
  {
    afterDraw: (chart) => {
      if (chart.tooltip?._active?.length) {
        const x = chart.tooltip._active[0].element.x;
        const y = chart.tooltip._active[0].element.y;
        const yAxis = chart.scales.y;
        const ctx = chart.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, yAxis.bottom);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
        ctx.stroke();
        ctx.restore();

        const mousemoveHandler = (mousemove) => {
          const points = chart.getElementsAtEventForMode(
            mousemove,
            "index",
            { intersect: false },
            true
          );
          const colorArray = [];
          if (points[0]) {
            const datapoint = points[0].index;
            for (let i = 0; i < chart.data.labels.length; i++) {
              if (datapoint === i) {
                colorArray.push("rgba(0,0,0,1)");
              } else {
                colorArray.push("rgba(255,255,255,0)");
              }
            }
            chart.config.options.scales.x.ticks.color = colorArray;
          }
        };
        const mouseLeaves = () => {
          chart.config.options.scales.x.ticks.color = ["rgba(255,255,255,0)"];
          chart.update();
        };
        chart.canvas.onmousemove = mousemoveHandler;
        chart.canvas.onmouseleave = mouseLeaves;
      }
    },
  },
]);

const options = reactive({
  onResize: function (chart, size) {
    chart.options.scales.y.ticks.display = size.width >= 350;
  },
  onHover: (ctx) => {
    ctx.chart.update();
  },
  responsive: true,
  interaction: {
    intersect: false,
    mode: "index",
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      filter: function (tooltipItem) {
        return tooltipItem.datasetIndex === 0;
      },
      yAlign: "bottom",
      displayColors: false,
      titleMarginBottom: 10,
      callbacks: {
        title: function () {
          return "";
        },
        label: function (tooltipItem, data) {
          let tooltipText = "";
          if (tooltipItem.dataset.data[tooltipItem.dataIndex] != null)
            tooltipText = tooltipItem.dataset.data[tooltipItem.dataIndex]
              .toFixed(0)
              .toString();

          let value =
            tooltipItem.dataset.data[tooltipItem.dataIndex].toFixed(0);
          return (
            "$" + (value >= 1000 ? (value / 1000).toFixed(1) + "k" : value)
          );
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: ["rgba(255,255,255,0)"],
        autoSkip: false,
      },
      grid: {
        display: false,
        drawTicks: false,
      },
      border: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        drawTicks: false,
      },
      border: {
        display: false,
        dash: [1, 4],
      },
      ticks: {
        callback: function (value, index, ticks) {
          return value >= 1000 ? value / 1000 + "k" : value;
        },
        padding: 10,
        font: {
          size: 10,
          weight: 300,
        },
      },
    },
  },
});
</script>

<style scoped>
canvas {
  max-height: 189px !important;
  max-width: 435px !important;
  font-size: 10px !important;
}

@media screen and (max-width: 992px) {
  canvas {
    max-width: 100% !important;
    height: 100% !important;
  }
}
</style>
