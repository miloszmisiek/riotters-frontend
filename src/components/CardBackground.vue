<template>
  <div class="card_background">
    <div class="card_title">
      <slot name="title"></slot>
      <button type="btn" class="btn">
        <img :src="ThreeDots" />
      </button>
    </div>
    <div class="card_component">
      <slot name="component"></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script setup>
import ThreeDots from "../assets/icons/three_dots.svg";
</script>

<style scoped>
.card_background {
  background: rgba(247, 247, 249, 1);
  border-radius: 1rem;
  height: 336px;
  max-width: 499px;
  padding: 0 2rem;
}

.card_title {
  font-size: 1.25rem;
  font-weight: 500;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card_component {
  padding: 1.5rem 0;
}

.btn {
  padding: 0;
  margin: 0;
}

@media screen and (max-width: 992px) {
  .card_background {
    max-width: 100%;
  }
}
</style>
