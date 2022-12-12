<template>
  <div class="data_tabs">
    <ul class="nav">
      <li class="nav-item">
        <RouterLink to="/summary">Summary</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/table">Table</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/charts">Charts</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/reporting">Reporting</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/analysis">Analysis</RouterLink>
      </li>
    </ul>
    <div class="data_tabs--scroll">
      <RouterView :data="props.data" />
    </div>
    <div class="wrapper"></div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";

const props = defineProps(["data"]);
</script>

<style scoped>
.data_tabs {
  position: relative;
  background: rgba(247, 247, 249, 1);
  max-width: 1040px;
  border-radius: 8px;
  padding-left: 2rem;
}

.data_tabs--scroll {
  max-width: 1040px;
  height: 350px;
  overflow-y: auto;
  position: relative;
  padding-top: 2rem;
  padding-right: 2rem;
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
  scrollbar-width: none;
  /* Firefox */
}

.data_tabs--scroll::-webkit-scrollbar {
  display: none;
  /* Safari and Chrome */
}

.wrapper {
  pointer-events: none;
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  background: linear-gradient(
    180deg,
    rgba(139, 167, 32, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  pointer-events: none;
}

.nav {
  border-bottom: 1px solid rgba(235, 235, 243, 1);
  padding-top: 2rem;
  padding-bottom: 1rem;
  gap: 1.5rem;
  color: rgba(152, 150, 161, 1);
  font-weight: 400;
}

.router-link-exact-active {
  cursor: pointer;
  padding-bottom: 0.8rem;
  border-bottom: 4px solid rgba(116, 69, 251, 1);
  color: rgba(10, 4, 28, 1) !important;
  font-weight: 500;
}

@media screen and (max-width: 992px) {
  .wrapper {
    width: 0;
  }
  .data_tabs {
    padding-bottom: 2rem;
  }
}
</style>
