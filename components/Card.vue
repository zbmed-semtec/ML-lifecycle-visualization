<template>
   <div class="transition" :class="{transform: modelValue >0}">
   <lifecycle @click="onClick" />
   </div>
</template>

<script setup>
import lifecycle from "../static/img/ML_lifecycle.svg";
defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

// onMounted(() => {

// })

function onClick(event) {
   const step_id = event.target.closest('[data-step]')?.dataset.step
   if (step_id) {
      emits('update:modelValue', step_id)
   }
}
</script>

<style scoped>
.transform {
    transform: translateX(-350px);
}

.transition {
   display: grid;
    place-items: center;
    transition: transform ease-in-out 500ms;
}
</style>