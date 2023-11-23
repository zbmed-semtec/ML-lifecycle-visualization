<template>
   <div>
      <label>
         Select a step:
         <select
            :value="value"
            @change="$emit('update:value', $event.target.value)"
         >
            <option v-for="option of options" :value="option">
               {{ option }}
            </option>
         </select>
      </label>
   </div>
</template>

<script setup>
defineProps(['value'])
defineEmits(['update:value'])
const options = Array.from({length: 10}, (_, index) => index);
</script>

<style scoped>
</style>