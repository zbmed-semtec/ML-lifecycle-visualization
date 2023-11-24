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
            </div>
        </div>
    </div>
</template>

<script setup>
import app from '../app.vue'
import { Modal } from 'bootstrap'

const props = defineProps({
    modalData: Array,
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
    margin-top: 250px;
    margin-right: 150px;
    width: 500px;
    height: 100%;
    -webkit-transform: translate3d(0%, 0, 0);
    -ms-transform: translate3d(0%, 0, 0);
    -o-transform: translate3d(0%, 0, 0);
    transform: translate3d(0%, 0, 0);
}
</style>