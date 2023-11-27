<template>
  <div class="transition" :class="{ transform: modelValue > 0 }">
    <lifecycle @click="onClick" />
  </div>
</template>

<script setup lang="ts">
import lifecycle from "../assets/ML_lifecycle.svg";
defineProps<{
  modelValue: number
}>()

const emit = defineEmits(['update:backgroundColor', 'update:modelValue'])

function onClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target) return
  const group = target.closest('[data-step]') as HTMLElement
  if (!group) return

  const stepId = parseInt(group.dataset.step as string)
  if (stepId) {
    const rect = group.querySelector('rect') as SVGRectElement;
    const backgroundColor = rect.getAttribute('fill')
    emit('update:modelValue', stepId)
    if (backgroundColor) {
      emit('update:backgroundColor', backgroundColor)
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
</style>