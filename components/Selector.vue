<template>
   <div>
      <label>
         Select a step:
         <select
            @change="$emit('update:modelValue', $event.target.value)"
         >
            <option
               v-for="option of options"
               :value="option" :selected="option === modelValue ? true : false"
            >
               {{ option }}
            </option>
         </select>
      </label>
   </div>
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
const options = Array.from({length: 10}, (_, index) => index);
</script>

<style scoped>
</style>