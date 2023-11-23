<template>
  <StepNode />
  <lifecycle />
  <input type="file" @change="handleTxtFileUpload" accept=".tsv" />
</template>

<script setup>
import StepNode from "~/components/StepNode.vue";
import lifecycle from "../static/img/ML_lifecycle.svg";

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
</style>

