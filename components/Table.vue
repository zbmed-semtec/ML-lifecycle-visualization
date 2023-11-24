<template>
  <table>
    <thead>
      <tr>
        <th v-if="!selectedStep">Node ID</th>
        <th>FAIR Principle</th>
        <th>Best Practices</th>
        <th>Metadata schemas</th>
        <th>Services</th>
        <th>Best Practices</th>
        <th>Resources affected by FAIR</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="row of data" :key="row.id">
        <tr v-if="!selectedStep || selectedStep == row['NodeID']" :class="getRowColorClass(row)">
          <Cell v-if="!selectedStep" :cellData="row['NodeID']" />
          <Cell :cellData="row['FAIR Principles']" />
          <Cell :cellData="row['Best Practices']" />
          <Cell :cellData="row['Metadata schemas']" />
          <Cell :cellData="row['Services']" />
          <Cell :cellData="row['What do you need to do here']" />
          <Cell :cellData="row['Resources affected by FAIR']" />
          <Cell :cellData="row['Notes']" />
        </tr>
      </template>
    </tbody>
  </table>
</template>
 
<script setup>
defineProps(['data', 'selectedStep'])

function getRowColorClass(row) {
  switch (row.NodeID) {
    case '1':
      return 'row-color-1';
    case '2':
    case '3':
      return 'row-color-2';
    case '4':
    case '5':
    case '6':
      return 'row-color-3';
    case '7':
      return 'row-color-4';
    case '8':
      return 'row-color-5';
    case '9':
      return 'row-color-6';
    case '10':
      return 'row-color-7';

    // Add more cases for other NodeID values as needed
    default:
      return ''; // Default or fallback class
  }
}


</script>

<style scoped>
 
table ,th, td{
  border: 1px solid;
  font-size: 18px;
  border-collapse: collapse;
  margin: 0 auto;
}

/*
table{
  width: 80%;
  margin-top: 20px;
  margin-bottom: 20px;
}

th
    {
      background-color:lightblue;
      color:black;
      
    }

td {
  text-align: center;
  font-size: 15px
  
} */

/* tr {
  background-color: lightgray;
  color: black;
} */

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

tr:hover {
  cursor: pointer;
  border: 2px solid #555;
  background-image: linear-gradient(rgb(0 0 0/5%) 0 0);
}

td {
  text-align: center;
}
</style>