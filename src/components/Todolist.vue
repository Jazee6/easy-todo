<template>
  <div class="flex rounded-2xl shadow mt-4 h-12 items-center transition hover:shadow-2xl">
    <input type="checkbox" class="ml-4">
    <span class="pl-4">
      {{ todo.todo }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type {todoData} from "../types/home";

defineProps<{
  todo: todoData,
}>()

</script>