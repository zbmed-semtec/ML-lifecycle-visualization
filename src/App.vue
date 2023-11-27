<template>
  <div class="toppane">
    <h1 class="font">MACHINE LEARNING LIFECYCLE</h1>
    <br /><br />
  </div>
  <div>
    <!-- <client-only> -->
    <!-- <MetadataModal /> -->
    <Card v-model:backgroundColor="modal.backgroundColor" v-model="selectedStep" />
    <!-- <template #fallback>
        <div class="whitespace" />
      </template> -->
    <!-- </client-only> -->
  </div>
  <br /><br /><br /><br />

  <div class="centered-table border">
    <Table v-if="data_lifecycle_info_sheet1" :data="data_lifecycle_info_sheet1" />
    <p v-else>loading</p>
  </div>

  <!-- <Table :data="table" /> -->
  <!-- <input type="file" @change="handleTxtFileUpload" accept=".tsv" /> -->
  <div>
    <MetadataModal v-if="selectedStep >= 0" v-model="selectedStep" :modalData="getMetadataById(selectedStep)"
      :tableData="data_lifecycle_info_sheet1" :edgesData="data_lifecycle_info_sheet3"
      :backgroundColor="modal.backgroundColor" />
  </div>
  <!-- <button class="btn" @click="toggleModal()">OPEN MODAL</button> -->
</template>

<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import MetadataModal from "./components/MetadataModal.vue";
import Card from "./components/Card.vue";
import Table from "./components/Table.vue";
import { reactive, ref } from 'vue'
import type { Ref } from 'vue'

//Library for parsing the .csv file
import Papa from "papaparse";

const selectedStep = ref(-1);

const modal = reactive({ showModal: false, backgroundColor: "#FFF" });

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSD-IZNefqzcbHEDEvDQWSxClCuPeAhP6Jh0RwVBuSi8DdmRYsQs8UrPUv62__T9bgk0I1GhCSEY6Gn/pub?output=tsv&gid=0"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    return [];
  }
};

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

function toggleModal() {
  modal.showModal = !modal.showModal;
}

const parseText = (textData: any) => {
  const rows = Papa.parse(textData.toString().trim(), {
    header: true,
    skipEmptyLines: true,
    delimiter: "\t",
  }).data;
  return rows as Record<string, string>[];
};

async function fetchDataAndParse() {
  const data = await fetchData();
  if (data) {
    const rows = parseText(data);
    return rows;
  } else {
    console.error("Error fetching or parsing data");
  }
}

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
</script>

<style scoped>
html {
  font-family: "helvetica neue", helvetica, arial, sans-serif;
}

table {
  margin-left: 4%;
  margin-right: 4%;
}

th,
td {
  border: 1px solid;
  font-size: 15px;
  width: 80;
  border-collapse: collapse;
}

th {
  background-color: lightblue;
  color: black;
}

td {
  text-align: center;
  font-size: 15px;
}

tr {
  /* background-color: lightgray; */
  color: black;
}

.font {
  text-align: center;
  color: rgb(31, 83, 157);
}

.toppane {
  width: 100%;
  height: 100px;
  /* background-color: #fbfbfb; */
}

.leftpane {
  width: 50%;
  height: 100px;
  background-color: rgb(255, 238, 238);
}

.rightpane {
  width: 50%;
  height: 100vh;
  background-color: rgb(222, 252, 209);
}

.whitespace {
  height: 1020px;
}
</style>
