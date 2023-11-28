<template>
  <table>
    <thead>
      <tr v-if="!overrideColor">
        <th v-if="!selectedStep">Node ID</th>
        <th>FAIR Principle</th>
        <th>Best Practices</th>
        <th>Metadata schemas</th>
        <th>Services</th>
        <th>Best Practices</th>
        <th>Resources affected by FAIR</th>
        <th>Notes</th>
      </tr>
      <tr v-if="overrideColor">
        <th :style="{ backgroundColor: overrideColor }" v-if="!selectedStep">Node ID</th>
        <th :style="{ backgroundColor: overrideColor }">FAIR Principle</th>
        <th :style="{ backgroundColor: overrideColor }">Best Practices</th>
        <th :style="{ backgroundColor: overrideColor }">Metadata schemas</th>
        <th :style="{ backgroundColor: overrideColor }">Services</th>
        <th :style="{ backgroundColor: overrideColor }">Best Practices</th>
        <th :style="{ backgroundColor: overrideColor }">Resources affected by FAIR</th>
        <th :style="{ backgroundColor: overrideColor }">Notes</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="row of data" :key="row.id">
        <tr v-if="(!selectedStep || selectedStep == row['NodeID']) && !overrideColor" :class="getRowColorClass(row)">
          <Cell v-if="!selectedStep" :cellData="row['NodeID']" />
          <Cell :cellData="row['FAIR Principles']" />
          <Cell :cellData="row['Best Practices']" />
          <Cell :cellData="row['Metadata schemas']" />
          <Cell :cellData="row['Services']" />
          <Cell :cellData="row['What do you need to do here']" />
          <Cell :cellData="row['Resources affected by FAIR']" />
          <Cell :cellData="row['Notes']" />
        </tr>
        <tr v-if="(!selectedStep || selectedStep == row['NodeID']) && overrideColor" :class="getRowColorClass(row)">
          <Cell :style="{ backgroundColor: overrideColor }" v-if="!selectedStep" :cellData="row['NodeID']" />
          <Cell :style="{ backgroundColor: overrideColor }" :cellData="row['FAIR Principles']" />
          <Cell :style="{ backgroundColor: overrideColor }" :cellData="row['Best Practices']" />
          <Cell :style="{ backgroundColor: overrideColor }" :cellData="row['Metadata schemas']" />
          <Cell :style="{ backgroundColor: overrideColor }" :cellData="row['Services']" />
          <Cell :style="{ backgroundColor: overrideColor }" :cellData="row['What do you need to do here']" />
          <Cell :style="{ backgroundColor: overrideColor }" :cellData="row['Resources affected by FAIR']" />
          <Cell :style="{ backgroundColor: overrideColor }" :cellData="row['Notes']" />
        </tr>
      </template>
    </tbody>
  </table>
</template>
 
<script setup lang="ts">
import Cell from './Cell.vue'

defineProps<{
  data: any[],
  selectedStep?: number,
  overrideColor?: string
}>()

function getRowColorClass(row: any) {
  switch (row.NodeID) {
    case '1':
      return 'row-id-1';
    case '2':
    case '3':
      return 'row-id-2';
    case '4':
    case '5':
    case '6':
      return 'row-id-3';
    case '7':
      return 'row-id-4';
    case '8':
      return 'row-id-5';
    case '9':
      return 'row-id-6';
    case '10':
      return 'row-id-7';

    // Add more cases for other NodeID values as needed
    default:
      return ''; // Default or fallback class
  }
}

</script>

<style scoped>
th {
  background-color: lightgrey;
  color: black;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
}

table {
  width: 80%;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.row-id-1 {
  background-color: #FFF2CC;
}

.row-id-2 {
  background-color: #D5E8D4;
}

.row-id-3 {
  background-color: #DAE8FC;
}

.row-id-4 {
  background-color: #A9C4EB;
}

.row-id-5 {
  background-color: #E1D5E7;
}

.row-id-6 {
  background-color: #FFE6CC;
}

.row-id-7 {
  background-color: #F0A30A;
}

tr:hover {
  cursor: pointer;
  border: 1px solid #555;
  background-image: linear-gradient(rgb(0 0 0/5%) 0 0);
  font-weight: bold;
}

td {
  text-align: center;
}
</style>