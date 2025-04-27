<template>
  <div class="modal right fade come-from-modal right" id="metadataModal">
    <div class="modal-dialog modal-xl" ref="modalDialogRef" :style="{ width: modalWidth + 'px' }">
      <div class="modal-content" :style="{ backgroundColor: bgColor }">
        <!-- Resize Handle (Left) -->
        <div class="resize-handle" @mousedown="startResize"></div>

        <div class="modal-header">
          <h4 class="modal-title" id="metadataTitle">{{ props.modalData[0] }}</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal">
          </button>
        </div>

        <div class="modal-body">
          <p class="text-start">{{ props.modalData[1] }}</p>
          <div class="table-wrapper">
            <table class="table" :style="{ backgroundColor: bgColor }">
              <thead>
                <tr>
                  <th scope="col" :style="{ backgroundColor: bgAltColor }">Outcome</th>
                  <th scope="col" :style="{ backgroundColor: bgAltColor }" v-if="props.modalData[3].length > 0">
                    Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td :style="{ backgroundColor: bgAltColor }">{{ props.modalData[2] }}</td>
                  <td :style="{ backgroundColor: bgAltColor }" v-if="props.modalData[3].length > 0">
                    {{ props.modalData[3] }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-wrapper fair-principles-wrapper">
            <div class="section-header">
              <div class="section-title">FAIR Principles</div>
              <div class="section-subtitle">Principles and best practices relevant to this stage</div>
            </div>
            <div class="fair-principles-content">
              <div class="two-column-layout">
                <div class="table-column">
                  <Table v-if="tableData" :data="tableData" :selectedStep="modelValue" :overrideColor="bgAltColor" />
                </div>
                <div class="spacer-column"></div>
              </div>
            </div>
          </div>
          <div class="table-wrapper next-steps-wrapper">
            <div class="section-header">
              <div class="section-title">Next steps</div>
              <div class="section-subtitle">Choose where to go next in the ML lifecycle</div>
            </div>
            <table class="table next-steps-table" :overrideColor="bgAltColor">
              <thead>
                <tr>
                  <th scope="col" :style="{ backgroundColor: bgAltColor }">To</th>
                  <th scope="col" :style="{ backgroundColor: bgAltColor }">Comment</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="edge of edgesData">
                  <tr v-bind:key="edge" v-if="edge['Start_node'] == modelValue.toString()"
                    @click="moveToNextStep(edge['End_node'])" class="selection"
                    :id="edge['End_node']">
                    <td :id="'next-steps'" :style="{ backgroundColor: bgAltColor }">{{ nodeNames[parseInt(edge['End_node']) - 1] }}</td>
                    <td :id="'next-steps'" :style="{ backgroundColor: bgAltColor }"> {{ edge['Comment'] }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Modal } from 'bootstrap'
import convert from 'color-convert'
import { onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'
import Table from './Table.vue'

const props = defineProps<{
  modalData: any[],
  tableData: any[],
  edgesData: any[],
  modelValue: number,
  backgroundColor: string,
  nodeNames: string[]
}>()


let bgColor = props.backgroundColor

function create_bgAltColor(org_color: string) {
  let bgAltColorHsl = convert.hex.hsl(org_color)
  if (bgAltColorHsl[2] > 90) {
    bgAltColorHsl[2] -= 5
  }
  else {
    bgAltColorHsl[2] += 5
  }

  if (bgAltColorHsl[1] < 10) {
    bgAltColorHsl[1] += 5
  }
  else {
    bgAltColorHsl[1] -= 5
  }
  let bgAltColor = "#" + convert.hsl.hex(bgAltColorHsl)
  return bgAltColor
}
let bgAltColor = create_bgAltColor(bgColor)
const emit = defineEmits(['update:modelValue'])

let modal: Modal | null = null
const modalDialogRef: Ref<HTMLElement | null> = ref(null)
const modalWidth: Ref<number | null> = ref(800) // Set a larger default width
const isResizing = ref(false)
const startX = ref(-100)
const startWidth = ref(0)

const MIN_MODAL_WIDTH = 500 // Increased minimum width

onMounted(() => {
  const modalEl = document.getElementById('metadataModal')
  if (!modalEl || !modalDialogRef.value) return

  // Ensure initial width respects minimum if set default is too small
  if (modalWidth.value !== null && modalWidth.value < MIN_MODAL_WIDTH) {
    modalWidth.value = MIN_MODAL_WIDTH;
  }

  modal = new Modal(modalEl)
  modal.show()
  modalEl.addEventListener("hidden.bs.modal", hide)
})

onUnmounted(() => {
  if (modal)
    modal.hide()
  // Clean up global listeners if component is destroyed while resizing
  stopResize();
})

function hide() {
  emit('update:modelValue', -1)
}

function moveToNextStep(step: string) {
  emit('update:modelValue', parseInt(step))
  const class_color = getRowColorClass(parseInt(step));
  bgColor = class_color;
  bgAltColor = create_bgAltColor(class_color);
}

function getRowColorClass(id: number) {
  switch (id) {
    case 1:
      return '#f9efe4';
    case 2:
    case 3:
      return '#e9f5e9';
    case 4:
    case 5:
    case 6:
      return '#e1f0fa';
    case 7:
      return '#c9e2f3';
    case 8:
      return '#eadef4';
    case 9:
      return '#fce5d4';
    case 10:
      return '#f5d1af';

    // Add more cases for other NodeID values as needed
    default:
      return ''; // Default or fallback class
  }
}

// --- Resizing Logic ---
function startResize(event: MouseEvent) {
  if (!modalDialogRef.value) return;
  isResizing.value = true;
  startX.value = event.clientX;
  startWidth.value = modalDialogRef.value.offsetWidth;
  document.addEventListener('mousemove', doResize);
  document.addEventListener('mouseup', stopResize);
  document.body.style.userSelect = 'none';
  document.body.style.cursor = 'ew-resize'; // Apply cursor globally
}

function doResize(event: MouseEvent) {
  if (!isResizing.value) return;
  const currentX = event.clientX;
  const deltaX = currentX - startX.value;
  // Invert deltaX for left-side resizing
  let newWidth = startWidth.value - deltaX;

  // Enforce minimum width
  if (newWidth < MIN_MODAL_WIDTH) {
      newWidth = MIN_MODAL_WIDTH;
  }

  modalWidth.value = newWidth;
}

function stopResize() {
  if (isResizing.value) {
    isResizing.value = false;
    document.removeEventListener('mousemove', doResize);
    document.removeEventListener('mouseup', stopResize);
    document.body.style.userSelect = '';
    document.body.style.cursor = ''; // Reset global cursor
  }
}

</script>

<style scoped>
/* Two-column layout */
.two-column-layout {
  display: flex;
  width: 100%;
}

.table-column {
  flex: 1;
  overflow-x: auto;
}

.spacer-column {
  width: 10px; /* Adjust this width as needed */
  min-width: 10px;
}

/* Section styling for both FAIR principles and Next steps */
.section-header {
  margin-bottom: 1rem;
}

.section-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--primary-color, #2c3e50);
  margin-bottom: 0.3rem;
}

.section-subtitle {
  color: #6c757d;
  font-size: 0.85rem;
}

/* FAIR Principles section styling */
.fair-principles-wrapper {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
}

.fair-principles-content {
  margin: 0.5rem;
}

.fair-principles-content :deep(table) {
  margin-bottom: 0;
  background-color: transparent;
  margin-right: 0;
  width: 100%;
}

.fair-principles-content :deep(th) {
  background-color: rgba(0, 0, 0, 0.02);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-color: #e9ecef;
}

.fair-principles-content :deep(td) {
  transition: all 0.2s ease;
}

.fair-principles-content :deep(tr:hover td) {
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* Next steps specific styling */
.next-steps-wrapper {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1.5rem;
}

.next-steps-table {
  margin-bottom: 0.5rem;
}

.next-steps-table thead th {
  background-color: rgba(0, 0, 0, 0.02);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Selection rows styling */
tr.selection {
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
}

tr.selection:hover {
  transform: translateY(-1px);
}

tr.selection:hover td {
  background-color: rgba(0, 0, 0, 0.03);
  box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.1);
}

tr.selection:hover td#next-steps {
  position: relative;
  background-color: rgba(255, 255, 255, 0.9);
  border-color: transparent;
}

tr.selection:hover td#next-steps::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-color, #4a8af4) 0%, var(--primary-color-light, rgba(100, 150, 255, 0.7)) 100%);
}

tr.selection:hover td#next-steps:first-child::before {
  border-top-left-radius: 4px;
}

tr.selection:hover td#next-steps:last-child::before {
  border-top-right-radius: 4px;
}

tr.selection:hover td#next-steps:first-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

tr.selection:hover td#next-steps:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

/* Modal positioning on right side */
.come-from-modal.right .modal-dialog {
  margin-top: 5%;
  margin-right: 5%; /* Distance from right edge */
  margin-left: auto; /* Push to right */
  height: 100%;
  transform: translate3d(0%, 0, 0);
}

/* Remove the old left class styles if any exist */
.come-from-modal.left .modal-dialog {
  /* No specific styles needed here */
}

/* Dialog sizing */
.modal-dialog {
  /* Prevent Bootstrap from limiting the width */
  max-width: none;
  transition: width 0.1s ease-out;
}

/* Content styling */
.modal-content {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border: none;
}

/* Resize handle */
.resize-handle {
  position: absolute;
  left: 0; /* Keep on left to resize from left edge */
  top: 0;
  bottom: 0;
  width: 10px;
  cursor: ew-resize;
  background-color: rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.resize-handle:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

/* Header styling */
.modal-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 1.25rem 1.5rem;
}

.modal-title {
  font-weight: 600;
  font-size: 1.4rem;
  color: #212529;
}

/* Body styling */
.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  max-height: calc(100vh - 150px);
}

.text-start {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

/* Table styling */
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1.5rem;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #dee2e6;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
}

thead th {
  font-weight: 600;
  text-align: left;
  padding: 0.75rem 1rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  background-color: #eaedf0;
  color: #2c3e50;
  border: 1px solid #dee2e6;
}

tbody td {
  padding: 0.75rem 1rem;
  border: 1px solid #dee2e6;
  vertical-align: middle;
}

.fw-bold {
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #2c3e50;
}

.table-wrapper {
  max-width: 100%;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  padding-right: 1rem;
  border-radius: 6px;
}

/* Add a subtle divider after each table wrapper */
.table-wrapper:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding-bottom: 1rem;
}
</style>