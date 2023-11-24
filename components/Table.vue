<template>
  <table border="1">
    <thead>
      <tr>
        <th>Title</th>
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
      <template v-for="row of data">
        <tr v-if="!selectedStep || selectedStep == row['NodeID']">
        <Cell :cellData="row['NodeID']" />
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
</script>

<style scoped>

table ,th, td{
  border: 1px solid;
  font-size: 18px;
  border-collapse: collapse;
  
}
table{
  width: 80%;
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