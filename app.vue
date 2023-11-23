<template>
  <lifecycle />
  <Table :data="table" />
  <input type="file" @change="handleTxtFileUpload" accept=".tsv" />
</template>

<script setup>
import MetadataModal from "~/components/MetadataModal.vue";
import StepNode from "~/components/StepNode.vue";
import lifecycle from "../static/img/ML_lifecycle.svg";
import Table from "~/components/Table.vue";

const table = [[1,2,3,4,5,6,7,8],['a','b','c','d','e','f','g','h']];
</script>


//Library for parsing the .csv file
import Papa from "papaparse";


const handleTxtFileUpload = (event) => {
  const reader = new FileReader();
  reader.onload = () => {
    const textFile = reader.result;
    const rows = Papa.parse(textFile.trim(), {
      header: true,
      skipEmptyLines: true,
    }).data;
    // console.log(rows)
    const textContent = rows.map(row => {
      return {
        node_id: row.NodeID,
        name: row.Name,
        description: row.Description,
        outcome: row.Outcome,
        notes: row.Notes,
      };
  });
  }
  reader.readAsText(event.target.files[0]);
};

</script>

<style scoped>
html {
  font-family: "helvetica neue", helvetica, arial, sans-serif;
}

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
</style>

