<template>
   <tr v-for="row of data">
      <Cell :data="" />
      <td>{{row["NodeID"]}}</td>
      <td>{{row["FAIR Principles"]}}</td>
      <td>{{row["Best Practices"]}}</td>
      <td>
        <a v-if="row['Metadata schemas'].startsWith('http')" :href="row['Metadata schemas']">{{ row["Metadata schemas"] }}</a>
        <span v-else>{{row["Metadata schemas"]}}</span>
      </td>
      <td>{{row["Services"]}}</td>
      <td>{{row["What do you need to do here"] }}</td>
      <td>{{row["Resources affected by FAIR"] }}</td>
      <td>{{row["Notes"]}}</td>
    </tr>
   
</template>

<script setup>
</script>

<style scoped>
</style>