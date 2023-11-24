<template>
  <Selector v-model="selectedStep" />
  <p>Selected step: {{ selectedStep }}</p>
  <div class="toppane">
    <h1 class="font">MACHINE LEARNING LIFECYCLE</h1><br><br>
  </div>
  <div>
    <!-- <MetadataModal /> -->
    <client-only>
      <Card v-model="selectedStep" />
      <template #fallback>
        <div class="whitespace" />
      </template>
    </client-only>
  </div><br><br><br><br>
  <Table v-if="data_lifecycle_info" :data="data_lifecycle_info_sheet1" />
  <p v-else>loading</p>

  <!-- <Table :data="table" /> -->
  <!-- <input type="file" @change="handleTxtFileUpload" accept=".tsv" /> -->
  <div>
    <client-only>
      <MetadataModal v-if="selectedStep >= 0" v-model="selectedStep" :modalData="getMetadataById(selectedStep)" />
    </client-only>
  </div>
  <!-- <button class="btn" @click="toggleModal()">OPEN MODAL</button> -->
</template>

<script setup>
import Selector from "~/components/Selector.vue";
import MetadataModal from "~/components/MetadataModal.vue";
// import lifecycle from "../static/img/ML_lifecycle.svg";
import Card from "~/components/Card.vue";
import Table from "~/components/Table.vue";

//Library for parsing the .csv file
import Papa from "papaparse";

const selectedStep = ref("-1")

const modal = reactive({ showModal: false })

const fetchData = async () => {
  try {
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSD-IZNefqzcbHEDEvDQWSxClCuPeAhP6Jh0RwVBuSi8DdmRYsQs8UrPUv62__T9bgk0I1GhCSEY6Gn/pub?output=tsv&gid=0');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    return data; // Assuming your API response has a 'values' property
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    return [];
  }
};

const fetchData_by_page = async (page_id) => {
  try {
    console.log(page_id);
    const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vSD-IZNefqzcbHEDEvDQWSxClCuPeAhP6Jh0RwVBuSi8DdmRYsQs8UrPUv62__T9bgk0I1GhCSEY6Gn/pub?output=tsv&gid=${page_id}`
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    // console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    return [];
  }
};

function toggleModal() {
  modal.showModal = !modal.showModal
}


const parseText = (textData) => {
  const rows = Papa.parse(textData.toString().trim(), {
    header: true,
    skipEmptyLines: true,
    delimiter: "\t"
  }).data;
  console.log(rows);
  return rows;
};

async function fetchDataAndParse() {
  const data = await fetchData();
  if (data) {
    const rows = parseText(data);
    return rows
  } else {
    console.error('Error fetching or parsing data');
  }
}

async function fetchDataAndParse_batched() {
  let ids = [0, 1021772098, 1947282418]
  // let ids =  [0, 1, 2]
  let results = [];
  for (let i = 0; i < ids.length; i++) {
    // console.log(ids[i]);
    const data = await fetchData_by_page(ids[i]);

    if (data) {
      const rows = parseText(data);
      results.push(rows);
    } else {
      console.error(`Error fetching or parsing data of sheet`);
    }
  }

  return results;
}

const data_lifecycle_info = ref(null)
const data_lifecycle_info_sheet1 = ref(null)
const data_lifecycle_info_sheet2 = ref(null)
const data_lifecycle_info_sheet3 = ref(null)
data_lifecycle_info.value = await fetchDataAndParse_batched();
data_lifecycle_info_sheet1.value = data_lifecycle_info.value[0];
data_lifecycle_info_sheet2.value = data_lifecycle_info.value[1];
data_lifecycle_info_sheet3.value = data_lifecycle_info.value[2];

function getMetadataById(id) {
  let output = ["Title", "Description", "Outcome", "Notes"]
  if (id > 0) {
    const dataString = data_lifecycle_info_sheet2.value[id - 1]
    output[0] = dataString["Name"]
    output[1] = dataString["Description"]
    output[2] = dataString["Outcome"]
    if (dataString["Notes"]) {
      output[3] = dataString["Notes"]
    }
  }
  return output
}
</script>

<style scoped>
html {
  font-family: "helvetica neue", helvetica, arial, sans-serif;
}

table,
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
  font-size: 15px
}

tr {
  background-color: lightgray;
  color: black;
}

.font {
  text-align: center;
  color: rgb(31, 83, 157);
}

.toppane {
  width: 100%;
  height: 100px;
  background-color: #fbfbfb;
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

