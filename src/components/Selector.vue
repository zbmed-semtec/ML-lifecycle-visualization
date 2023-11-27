<template>
   <div>
      <label>
         Select a step:
         <select @change="onChange">
            <option v-for="option of options" :value="option" :selected="option === modelValue ? true : false">
               {{ option }}
            </option>
         </select>
      </label>
   </div>
</template>

<script setup lang="ts">
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const options = Array.from({ length: 10 }, (_, index) => `${index + 1}`);


function onChange(ev: Event) {
   const target = ev.target as HTMLSelectElement
   emit('update:modelValue', target.value)
}
</script>

<style scoped></style>