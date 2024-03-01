
import type { color } from 'echarts/core';
<template>
  <div class="text-center pa-4">
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        max-width="400"
      >
      <slot></slot>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ text }}</v-card-text>

      
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            color="indigo"
            @click="dialog = false"
          >OK</v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
const props = defineProps({
    open: Boolean,
    text: String,
    title: String,
})
const dialog = ref(props.open)
</script>