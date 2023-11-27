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
                  <tr v-if="edge['Start_node'] == modelValue">
                    <!-- TODO: Replace End_node with the corresponding node name -->
                    <td :style="{ backgroundColor: bgAltColor }">{{ edge['End_node'] }}</td>
                    <td :style="{ backgroundColor: bgAltColor }"> {{ edge['Comment'] }}</td>
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
  backgroundColor: string
}>()


const bgColor = props.backgroundColor
let bgAltColorHsl = convert.hex.hsl(bgColor)
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
const bgAltColor = "#" + convert.hsl.hex(bgAltColorHsl)
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

</script>

<style scoped>
.come-from-modal.left .modal-dialog {
  margin-top: 10%;
  margin-right: 5%;
  margin-left: 52%;
  height: 100%;
  transform: translate3d(0%, 0, 0);
}

.table-wrapper {
  max-width: 100%;
  overflow-x: auto;
}
</style>