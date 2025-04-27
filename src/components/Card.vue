<template>
  <div class="transition" :class="{ transform: modelValue > 0 }">
    <lifecycle @click="onClick" ref="svgRef" />
  </div>
</template>

<script setup lang="ts">
import lifecycle from "../assets/ML_lifecycle.svg";
import { ref, watch, onMounted, nextTick } from 'vue';

const props = defineProps<{
  modelValue: number
}>()

const emit = defineEmits(['update:backgroundColor', 'update:modelValue'])
const svgRef = ref<any>(null);
let activeElement: HTMLElement | null = null;
let tempHighlightElement: HTMLElement | null = null;

// Expose methods to parent component for hover interactions
defineExpose({
  temporaryHighlight,
  removeTemporaryHighlight
});

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

// Temporary highlight for hovering
function temporaryHighlight(stepId: number) {
  // Remove any existing temporary highlight
  removeTemporaryHighlight();
  
  // Don't highlight if it's the already selected card
  if (stepId === props.modelValue) return;
  
  nextTick(() => {
    const svgElement = getSvgElement();
    if (svgElement) {
      const element = svgElement.querySelector(`[data-step="${stepId}"]`) as HTMLElement;
      if (element) {
        const rect = element.querySelector('rect') as SVGRectElement;
        if (rect) {
          // Store for removal
          tempHighlightElement = element;
          
          // Apply a light grey fill
          const originalFill = rect.getAttribute('fill');
          if (!rect.dataset.tempOriginalFill) {
            rect.dataset.tempOriginalFill = originalFill || '';
          }
          rect.setAttribute('fill', '#e0e0e0');
        }
      }
    }
  });
}

function removeTemporaryHighlight() {
  if (tempHighlightElement) {
    const rect = tempHighlightElement.querySelector('rect') as SVGRectElement;
    if (rect && rect.dataset.tempOriginalFill) {
      // Restore original fill
      rect.setAttribute('fill', rect.dataset.tempOriginalFill);
      delete rect.dataset.tempOriginalFill;
    }
    tempHighlightElement = null;
  }
}

// Find SVG element in the component
function getSvgElement() {
  if (!svgRef.value) return null;
  // Access the actual DOM element
  const el = svgRef.value.$el || svgRef.value;
  // If it's an SVG element directly, return it
  if (el.tagName === 'svg') return el;
  // Otherwise, look for the first SVG inside
  return el.querySelector('svg');
}

// Watch for changes in the modelValue to apply highlighting
watch(() => props.modelValue, (newValue) => {
  // Reset any previous highlight
  if (activeElement) {
    removeHighlight(activeElement);
    activeElement = null;
  }
  
  // Apply highlight to newly selected card using nextTick to ensure DOM is updated
  if (newValue > 0) {
    nextTick(() => {
      const svgElement = getSvgElement();
      if (svgElement) {
        const selectedElement = svgElement.querySelector(`[data-step="${newValue}"]`) as HTMLElement;
        if (selectedElement) {
          addHighlight(selectedElement);
          activeElement = selectedElement;
        }
      }
    });
  }
}, { immediate: true });

function addHighlight(element: HTMLElement) {
  const rect = element.querySelector('rect') as SVGRectElement;
  if (rect) {
    const currentFill = rect.getAttribute('fill') || '#ffffff';
    
    // Store original values for later restoration if needed
    if (!rect.dataset.originalFill) {
      rect.dataset.originalFill = currentFill;
      rect.dataset.originalStroke = rect.getAttribute('stroke') || 'none';
      rect.dataset.originalStrokeWidth = rect.getAttribute('stroke-width') || '0';
    }
    
    // Add darker border
    rect.setAttribute('stroke', darkenColor(currentFill));
    rect.setAttribute('stroke-width', '3');
  }
}

function removeHighlight(element: HTMLElement) {
  const rect = element.querySelector('rect') as SVGRectElement;
  if (rect && rect.dataset.originalFill) {
    // Restore original stroke (might be none or another color)
    if (rect.dataset.originalStrokeWidth === '0') {
      // If original stroke width was 0, remove the stroke completely
      rect.setAttribute('stroke', 'none');
      rect.setAttribute('stroke-width', '0');
    } else {
      // Otherwise restore to original or default values
      rect.setAttribute('stroke', rect.dataset.originalStroke || 'none');
      rect.setAttribute('stroke-width', rect.dataset.originalStrokeWidth);
    }
  }
}

// Helper function to darken a color for the border
function darkenColor(color: string): string {
  try {
    // For hex colors
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      
      // Darken by reducing each component by 30%
      const darkerR = Math.max(0, Math.floor(r * 0.7));
      const darkerG = Math.max(0, Math.floor(g * 0.7));
      const darkerB = Math.max(0, Math.floor(b * 0.7));
      
      return `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`;
    }
    // For rgb() colors
    else if (color.startsWith('rgb')) {
      const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);
        
        const darkerR = Math.max(0, Math.floor(r * 0.7));
        const darkerG = Math.max(0, Math.floor(g * 0.7));
        const darkerB = Math.max(0, Math.floor(b * 0.7));
        
        return `rgb(${darkerR}, ${darkerG}, ${darkerB})`;
      }
    }
  } catch (e) {
    console.error("Error darkening color:", e);
  }
  
  // Fallback to a safe dark border
  return '#333333';
}

onMounted(() => {
  // Apply highlight to initially selected card if there is one
  nextTick(() => {
    if (props.modelValue > 0) {
      const svgElement = getSvgElement();
      if (svgElement) {
        const selectedElement = svgElement.querySelector(`[data-step="${props.modelValue}"]`) as HTMLElement;
        if (selectedElement) {
          addHighlight(selectedElement);
          activeElement = selectedElement;
        }
      }
    }
  });
});
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