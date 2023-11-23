<template>
 <lifecycle @click="onClick"/>
</template>

<script setup>
import lifecycle from "../static/img/ML_lifecycle.svg";
defineProps(['modelValue'])
const emits=defineEmits(['update:modelValue'])

// onMounted(() => {

// })

function onClick(event) {
   const step_id= event.target.closest('[data-step]')?.dataset.step
   if (step_id){
      emits('update:modelValue', step_id)
   }
}
</script>

<style scoped>
</style>