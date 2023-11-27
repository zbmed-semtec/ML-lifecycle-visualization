<template>
  <td>
    <a v-if="cellData.startsWith('http')" :href="cellData">{{ cellData }}</a>
    <span v-else>{{cellData}}</span>
  </td>
</template>

<script setup lang="ts">
defineProps(['cellData'])
</script>

<style scoped>
</style>