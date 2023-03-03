<template>
  <div class="flex rounded-2xl shadow mt-4 h-12 items-center transition hover:shadow-2xl">
    <input type="checkbox" class="ml-4">
    <span class="pl-4" :class="done">
      {{ todo.todo }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type {todoData} from "../types/home";
import {computed} from "vue";

const props = defineProps<{
  todo: todoData,
  is_done: boolean
}>()

const done = computed(() => {
  return props.is_done ? 'line-through' : 'no-underline'
})
</script>

<style scoped>

</style>