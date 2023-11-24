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
                    <p class="text-start">{{ props.modalData[1]}}</p>
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
                                    <tr v-bind:key="edge" v-if="edge['Start_node'] == modelValue" @click="moveToNextStep(edge['End_node'])" class="selection">
                                        <!-- TODO: Replace End_node with the corresponding node name -->
                                        <td :style="{ backgroundColor: create_bgAltColor(getRowColorClass(edge['End_node'])) }" >{{ nodeNames[parseInt(edge['End_node'])-1] }}</td>
                                        <td :style="{ backgroundColor: create_bgAltColor(getRowColorClass(edge['End_node'])) }"> {{ edge['Comment'] }}</td>
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
    backgroundColor: String,
    nodeNames: String
})

function create_bgAltColor(org_color){
    let bgAltColor_tmp = convert.hex.hsl(org_color)
    if (bgAltColor_tmp[2] > 90) {
        bgAltColor_tmp[2] -= 5
    }
    else {
        bgAltColor_tmp[2] += 5
    }

    if (bgAltColor_tmp[1] < 10) {
        bgAltColor_tmp[1] += 5
    }
    else {
        bgAltColor_tmp[1] -= 5
    }
    bgAltColor_tmp = "#" + convert.hsl.hex(bgAltColor_tmp)
    return bgAltColor_tmp
}

let bgColor = props.backgroundColor
let bgAltColor = create_bgAltColor(bgColor)

const emits = defineEmits(['update:modelValue', 'update:backgroundColor'])

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

function moveToNextStep(step) {
    emits('update:modelValue', step)
    const class_color = getRowColorClass(step);
    bgColor = class_color;
    bgAltColor = create_bgAltColor(class_color);
}

function getRowColorClass(id) {
  switch (id) {
    case '1':
      return '#FFF2CC';
    case '2':
    case '3':
      return '#D5E8D4';
    case '4':
    case '5':
    case '6':
      return '#DAE8FC';
    case '7':
      return '#A9C4EB';
    case '8':
      return '#E1D5E7';
    case '9':
      return '#FFE6CC';
    case '10':
      return 'r#F0A30A';

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

.selection:hover {
  cursor: pointer;
  font-weight: bold; 
}
.table-wrapper {
    max-width: 100%;
    overflow-x: auto;
}
</style>