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
                                    <th scope="col" :style="{ backgroundColor: bgAltColor }"
                                        v-if="props.modalData[3].length > 0">
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
                        <Table v-if="tableData" :data="tableData" :selected-step="modelValue" :overrideColor="bgAltColor" />
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
                                    <tr v-bind:key="edge" v-if="edge['Start_node'] == modelValue">
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

<script setup>
import app from '../app.vue'
import { Modal } from 'bootstrap'
import Table from '~/components/Table.vue'
import convert from 'color-convert'

const props = defineProps({
    modalData: Array,
    tableData: Array,
    edgesData: Array,
    modelValue: String,
    backgroundColor: String
})

const bgColor = props.backgroundColor
let bgAltColor = convert.hex.hsl(bgColor)
if (bgAltColor[2] > 90) {
    bgAltColor[2] -= 5
}
else {
    bgAltColor[2] += 5
}

if (bgAltColor[1] < 10) {
    bgAltColor[1] += 5
}
else {
    bgAltColor[1] -= 5
}
bgAltColor = "#" + convert.hsl.hex(bgAltColor)
const emits = defineEmits(['update:modelValue'])

let modal

onMounted(() => {
    modal = new Modal(document.getElementById('metadataModal'))
    modal.show()
    document.getElementById('metadataModal').addEventListener("hidden.bs.modal", hide)
})

onUnmounted(() => {
    modal.hide()
})

function hide() {
    emits('update:modelValue', -1)
}

function getRowColorClass(info) {
  switch (info.End_node) {
    case '1':
      return 'row-color-1';
    case '2':
    case '3':
      return 'row-color-2';
    case '4':
    case '5':
    case '6':
      return 'row-color-3';
    case '7':
      return 'row-color-4';
    case '8':
      return 'row-color-5';
    case '9':
      return 'row-color-6';
    case '10':
      return 'row-color-7';

    // Add more cases for other NodeID values as needed
    default:
      return ''; // Default or fallback class
  }
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

.row-color-1 {
  background-color: #FFF2CC;
}

.row-color-2 {
  background-color: #D5E8D4;
}

.row-color-3 {
  background-color: #DAE8FC;
}

.row-color-4 {
  background-color: #A9C4EB;
}

.row-color-5 {
  background-color: #E1D5E7;
}

.row-color-6 {
  background-color: #FFE6CC;
}

.row-color-7 {
  background-color: #F0A30A;
}

.table-wrapper {
    max-width: 100%;
    overflow-x: auto;
}
</style>