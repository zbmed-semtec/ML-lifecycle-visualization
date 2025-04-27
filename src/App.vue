<template>
  <div class="app-container">
    <header class="app-header">
      <h1 class="app-title">MACHINE LEARNING LIFECYCLE</h1>
    </header>
    
    <div>
      <Card v-model:backgroundColor="modal.backgroundColor" v-model="selectedStep" ref="cardRef" />
    </div>

    <div class="centered-table">
      <Table v-if="data_lifecycle_info_sheet1" :data="data_lifecycle_info_sheet1" />
      <div v-else class="loading">Loading data...</div>
    </div>

    <div>
      <MetadataModal v-if="selectedStep >= 0 && data_lifecycle_info_sheet2.length > 0" v-model="selectedStep"
        :modalData="getMetadataById(selectedStep)" :tableData="data_lifecycle_info_sheet1"
        :edgesData="data_lifecycle_info_sheet3" :backgroundColor="modal.backgroundColor" :nodeNames="getNodeNames()" 
        @hover-step="handleHoverStep" @leave-hover-step="handleLeaveHoverStep" />
    </div>
  </div>
</template>

<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import MetadataModal from "./components/MetadataModal.vue";
import Card from "./components/Card.vue";
import Table from "./components/Table.vue";
import { reactive, ref } from 'vue'
import type { Ref } from 'vue'
import Papa from "papaparse";

const selectedStep = ref(-1);
const modal = reactive({ showModal: false, backgroundColor: "#FFF" });
const cardRef = ref(null);

const fetchDataByPage = async (pageId: number) => {
  try {
    const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vSD-IZNefqzcbHEDEvDQWSxClCuPeAhP6Jh0RwVBuSi8DdmRYsQs8UrPUv62__T9bgk0I1GhCSEY6Gn/pub?output=tsv&gid=${pageId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    return [];
  }
};

const parseText = (textData: any) => {
  const rows = Papa.parse(textData.toString().trim(), {
    header: true,
    skipEmptyLines: true,
    delimiter: "\t",
  }).data;
  return rows as Record<string, string>[];
};

async function fetchDataAndParseBatched(id: number, ref: Ref) {
  const data = await fetchDataByPage(id);
  if (data) {
    ref.value = parseText(data);
  } else {
    console.error(`Error fetching or parsing data of sheet`);
  }
}

const data_lifecycle_info_sheet1 = ref<any[]>([]);
const data_lifecycle_info_sheet2 = ref<any[]>([]);
const data_lifecycle_info_sheet3 = ref<any[]>([]);
fetchDataAndParseBatched(0, data_lifecycle_info_sheet1);
fetchDataAndParseBatched(1021772098, data_lifecycle_info_sheet2);
fetchDataAndParseBatched(1947282418, data_lifecycle_info_sheet3);

function getMetadataById(id: number) {
  const output = ["Title", "Description", "Outcome", "Notes"];
  if (id > 0) {
    const dataString = data_lifecycle_info_sheet2.value[id - 1];
    output[0] = dataString["Name"];
    output[1] = dataString["Description"];
    output[2] = dataString["Outcome"];
    if (dataString["Notes"]) {
      output[3] = dataString["Notes"];
    }
    else {
      output[3] = ""
    }
  }
  return output;
}

function getNodeNames() {
  const output = [];
  for (let row in data_lifecycle_info_sheet2.value) {
    output.push(data_lifecycle_info_sheet2.value[row]["Name"]);
  }
  return output as string[];
}

// Hover interaction handlers
function handleHoverStep(stepId: number) {
  if (cardRef.value && typeof cardRef.value.temporaryHighlight === 'function') {
    cardRef.value.temporaryHighlight(stepId);
  }
}

function handleLeaveHoverStep() {
  if (cardRef.value && typeof cardRef.value.removeTemporaryHighlight === 'function') {
    cardRef.value.removeTemporaryHighlight();
  }
}
</script>

<style>
:root {
  --primary-color: rgb(31, 83, 157);
  --primary-color-light: rgba(31, 83, 157, 0.7);
  --text-color: #333;
  --background-color: #fff;
  --border-color: #dee2e6;
  --shadow-color: rgba(0, 0, 0, 0.08);
  --header-bg-color: #eaedf0;
  --header-text-color: #2c3e50;
}

body {
  font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: var(--text-color);
  background-color: var(--background-color);
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.app-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.app-header {
  padding: 2rem 0;
  text-align: center;
}

.app-title {
  color: var(--primary-color);
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.5px;
}

.centered-table {
  display: grid;
  place-items: center;
  margin: 2rem auto;
}

.loading {
  padding: 2rem;
  font-size: 1.2rem;
  color: #6c757d;
}

/* Global table styles */
table {
  border-collapse: collapse;
  box-shadow: 0 2px 10px var(--shadow-color);
}

th {
  background-color: var(--header-bg-color);
  color: var(--header-text-color);
  font-weight: 600;
  border: 1px solid var(--border-color);
}

td {
  border: 1px solid var(--border-color);
}

thead {
  position: sticky;
  top: 0;
  z-index: 1;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Transitions */
.transition {
  display: grid;
  place-items: center;
  transition: transform ease-in-out 500ms;
}

.transform {
  transform: translateX(-350px);
}

@media (max-width: 768px) {
  .app-title {
    font-size: 1.8rem;
  }
}
</style>
