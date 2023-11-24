<template>
    <div class="modal right fade  come-from-modal left" id="metadataModal">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="metadataTitle">{{ props.modalData[0] }}</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal">
                    </button>
                </div>

                <div class="modal-body">
                    <p class="text-start">{{ props.modalData[1] }}</p>
                    <div class="table-wrapper">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Outcome</th>
                                    <th scope="col" v-if="props.modalData[3].length > 0">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ props.modalData[2] }}</td>
                                    <td v-if="props.modalData[3].length > 0">{{ props.modalData[3] }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="table-wrapper">
                        <Table v-if="tableData" :data="tableData" :selected-step="modelValue" />
                    </div>
                    <div class="table-wrapper">
                        Next steps:
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">To</th>
                                    <th scope="col">Comment</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="edge of edgesData">
                                    <tr v-if="edge['Start_node'] == modelValue">
                                    <!-- TODO: Replace End_node with the corresponding node name -->
                                    <td>{{ edge['End_node'] }}</td>
                                    <td>{{ edge['Comment'] }}</td>
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

const props = defineProps({
    modalData: Array,
    tableData: Array,
    edgesData: Array,
    modelValue: String,
})

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