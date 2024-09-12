<template>
  <div class="modal right fade  come-from-modal left" id="metadataModal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content" :style="{ backgroundColor: bgColor }">
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
          <div class="table-wrapper" :style="{ backgroundColor: bgAltColor }">
            <Table v-if="tableData" :data="tableData" :selectedStep="modelValue" :overrideColor="bgAltColor" />
          </div>
          <div class="table-wrapper">
            <p class="fw-bold" style="margin-top: 1rem">Next steps:</p>
            <table class="table" :overrideColor="bgAltColor">
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
import { onMounted, onUnmounted } from 'vue'
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

onMounted(() => {
  const modalEl = document.getElementById('metadataModal')
  if (!modalEl) return

  modal = new Modal(modalEl)
  modal.show()
  modalEl.addEventListener("hidden.bs.modal", hide)
})

onUnmounted(() => {
  if (modal)
    modal.hide()
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
      return '#FFF2CC';
    case 2:
    case 3:
      return '#D5E8D4';
    case 4:
    case 5:
    case 6:
      return '#DAE8FC';
    case 7:
      return '#A9C4EB';
    case 8:
      return '#E1D5E7';
    case 9:
      return '#FFE6CC';
    case 10:
      return 'r#F0A30A';

    // Add more cases for other NodeID values as needed
    default:
      return ''; // Default or fallback class
  }
}
</script>

<style scoped>
.come-from-modal.left .modal-dialog {
  margin-top: 5%;
  margin-right: 5%;
  margin-left: 52%;
  height: 100%;
  transform: translate3d(0%, 0, 0);
  /* padding: 3%; */
}

/* tr:hover {
  border: 1px;
  background-image: linear-gradient(rgb(0 0 0/5%) 0 0);
  font-weight: bold;
} */

tr:hover td#next-steps{
  cursor: pointer;
  background-image: linear-gradient(rgb(0 0 0/2%) 0 0);
  border-top: 3px solid #8a8a8a;
  border-bottom: 3px solid #8a8a8a;
}

tr:hover td#next-steps:first-child {
  border-left: 3px solid #8a8a8a;
}

tr:hover td#next-steps:last-child {
  border-right: 3px solid #8a8a8a;
}

.table-wrapper {
  max-width: 100%;
  overflow-x: auto;
}
</style>