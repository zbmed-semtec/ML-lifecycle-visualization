<template>
    <div class="modal fade" id="metadataModal">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="metadataTitle">{{ props.title }}</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal">
                    </button>
                </div>

                <div class="modal-body">
                    <p class="text-start">{{ props.description }}</p>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Outcome</th>
                                <th scope="col">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ props.outcome }}</td>
                                <td>{{ props.notes }}</td>
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
    title: String,
    description: String,
    outcome: String,
    notes: String,
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
    emits('update:modelValue', false)
}

</script>

<style scoped></style>