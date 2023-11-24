<template>
   <div class="transition" :class="{transform: modelValue >0}">
   <lifecycle @click="onClick" @mouseover="mouseOver"  @mouseout= "mouseOut" :class="{ cursor: isMouseOver }"/>
   </div>
</template>

<script setup>
import lifecycle from "../static/img/ML_lifecycle.svg";
defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])
const isMouseOver = ref(false);


function onClick(event) {
   const step_id = event.target.closest('[data-step]')?.dataset.step
   if (step_id) {
      emits('update:modelValue', step_id)
   }
}

function mouseOver(event) {
   const step = event.target.closest('[data-step]')?.dataset.step
   const rectElement = event.target.closest('rect');
   if (step) {
      isMouseOver.value = true;
      const targetElement = event.target;
      if (rectElement) {
         rectElement.dataset.originalFillColor = rectElement.style.fill;
         rectElement.style.fill = '#a0a0a0';
      }
   }
}

function mouseOut() {
  isMouseOver.value = false;
  const rectElement = event.target.closest('rect');
  if (rectElement) {
         rectElement.style.fill = rectElement.dataset.originalFillColor;
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

.cursor {
   cursor: pointer;
}
</style>