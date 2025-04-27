<template>
  <td>
    <a v-if="cellData.startsWith('http')" :href="cellData" target="_blank" class="cell-link">
      <span class="link-text">{{ formatUrl(cellData) }}</span>
      <span class="link-icon">↗</span>
    </a>
    <span v-else>{{ cellData }}</span>
  </td>
</template>

<script setup lang="ts">
defineProps<{
  cellData: string
}>()

function formatUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname + (urlObj.pathname !== '/' ? urlObj.pathname : '');
  } catch (e) {
    return url;
  }
}
</script>

<style scoped>
.cell-link {
  color: #3b82f6;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  transition: color 0.2s ease;
  max-width: 100%;
  word-break: break-word;
}

.link-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
  display: inline-block;
}

.link-icon {
  display: inline-block;
  margin-left: 4px;
  font-size: 0.8em;
  opacity: 0.7;
}

.cell-link:hover {
  color: #2563eb;
}

.cell-link:hover .link-icon {
  opacity: 1;
}
</style>