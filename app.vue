<template>
  <Selector v-model="selectedStep" />
  <p>Selected step: {{ selectedStep }}</p>
  <div class="toppane">
    <h1 class="font">MACHINE LEARNING LIFECYCLE</h1><br><br>
  </div>
  <div>
  <!-- <MetadataModal /> -->
  <!-- <StepNode /> -->
  <lifecycle />
  </div><br><br><br><br>
  <Table v-if="data_lifecycle_info" :data="table" />
  <p v-else>loading</p>

<!-- <Table :data="table" /> -->
  <!-- <input type="file" @change="handleTxtFileUpload" accept=".tsv" /> -->
</template>

<script setup>
//Library for parsing the .csv file
import Papa from "papaparse";

import Selector from "~/components/Selector.vue";
import MetadataModal from "~/components/MetadataModal.vue";
import StepNode from "~/components/StepNode.vue";
import lifecycle from "../static/img/ML_lifecycle.svg";
import Table from "~/components/Table.vue";

const table = [[1,2,3,4,5,6,7,8],['a','b','c','d','e','f','g','h']];
const selectedStep = ref(2)

//Library for parsing the .csv file
import Papa from "papaparse";

const fetchData = async () => {
  try {
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSD-IZNefqzcbHEDEvDQWSxClCuPeAhP6Jh0RwVBuSi8DdmRYsQs8UrPUv62__T9bgk0I1GhCSEY6Gn/pub?output=tsv');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    // console.log(data);
    return data; // Assuming your API response has a 'values' property
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    return [];
  }
};


const parseText = (textData) => {
  const rows = Papa.parse(textData.trim(), {
    header: true,
    skipEmptyLines: true,
  }).data;
  // console.log(rows);
  return rows;
};

async function fetchDataAndParse() {
  const data = await fetchData();
  if (data) {
    const rows= parseText(data);
    return rows
  } else {
    console.error('Error fetching or parsing data');
  }
  
}

const data_lifecycle_info = ref(null)
data_lifecycle_info.value = await fetchDataAndParse();

</script>

<style scoped>
html {
  font-family: "helvetica neue", helvetica, arial, sans-serif;
}
<<<<<<< Updated upstream
=======

table ,th, td{
  border: 1px solid;
  font-size: 15px;
  width: 80;
  border-collapse: collapse;
  
}

th
    {
      background-color:lightblue;
      color:black;
    }

td {
  text-align: center;
  font-size: 15px
}
tr
{
  background-color:lightgray;
  color:black;
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

>>>>>>> Stashed changes
</style>

