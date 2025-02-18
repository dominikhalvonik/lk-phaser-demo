<template>
  <ErrorBoundary>
    <RouterView />
  </ErrorBoundary>
</template>

<script lang="ts" setup>
import ErrorBoundary from "@/components/ErrorBoundary.vue";
import { RouterView } from "vue-router";
</script>

<style lang="scss" scoped>
/* Wrapper pre PiniaReference a select */
.header {
  display: flex;
  justify-content: center; /* Horizontálne vycentrovanie */
  align-items: center; /* Vertikálne zarovnanie (v rámci headeru) */
  gap: 1rem; /* Medzera medzi prvkami */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Jemný tieň pre header */
  background-color: #f8f9fa; /* Jemné pozadie headeru pre odlíšenie */
  padding: 0 1rem; /* Padding okolo obsahu */
  height: 4rem; /* Výška headeru */
}

/* Štýly pre select */
.scene-select {
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  padding: 0.5rem;
  color: #333;
  font-size: 1rem;
}

.scene-select:focus {
  outline: none;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  border-color: #007bff;
}

.scene-select option {
  font-size: 1rem;
}
</style>
