<template>
   <div class="transition" :class="{ transform: modelValue > 0 }">
      <lifecycle @click="onClick" />
   </div>
</template>

<script setup>
import lifecycle from "../static/img/ML_lifecycle.svg";
defineProps(['modelValue'])
const emits = defineEmits(['update:backgroundColor', 'update:modelValue'])
const isMouseOver = ref(false);


function onClick(event) {
   const group = event.target.closest('[data-step]')
   const step_id = event.target.closest('[data-step]')?.dataset.step
   const backgroundColor = group.querySelector('rect')?.attributes.fill.value;
   if (step_id) {
      emits('update:modelValue', step_id)
      if (backgroundColor) {
         emits('update:backgroundColor', backgroundColor)
      }
   }
}

</script>

<style>
.transform {
   transform: translateX(-350px);
}

.transition {
   display: grid;
   place-items: center;
   transition: transform ease-in-out 500ms;
}

[data-step] {
   cursor: pointer;
}


[data-step]:hover rect {
   fill: rgb(213, 209, 209);
}

/* .cursor {
   cursor: pointer;
} */
</style>