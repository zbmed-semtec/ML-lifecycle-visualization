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
  background-color: #eaedf0;
  color: #2c3e50;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 600;
  padding: 12px 15px;
  font-size: 0.9rem;
  border: 1px solid #dee2e6;
}

table {
  width: 85%;
  margin: 2rem auto;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  border: 1px solid #dee2e6;
}

td, th {
  border: 1px solid #dee2e6;
  padding: 12px 15px;
}

thead {
  position: sticky;
  top: 0;
  z-index: 10;
}

thead tr {
  border-bottom: 2px solid #dee2e6;
  background-color: #e9ecef;
}

tbody tr:last-child td {
  border-bottom: 1px solid #dee2e6;
}

tr:hover td {
  background-color: rgba(0, 0, 0, 0.02);
}

td {
  text-align: left;
  font-size: 0.95rem;
  color: #495057;
  vertical-align: middle;
  transition: background-color 0.15s ease-in-out;
}

/* Update color palette to match the new SVG colors */
.row-id-1 {
  background-color: #f9efe4;
}

.row-id-2 {
  background-color: #e9f5e9;
}

.row-id-3 {
  background-color: #e1f0fa;
}

.row-id-4 {
  background-color: #c9e2f3;
}

.row-id-5 {
  background-color: #eadef4;
}

.row-id-6 {
  background-color: #fce5d4;
}

.row-id-7 {
  background-color: #f5d1af;
}

/* Add responsive adjustments */
@media (max-width: 768px) {
  table {
    width: 95%;
  }
  
  th, td {
    padding: 8px 10px;
    font-size: 0.85rem;
  }
}
</style>