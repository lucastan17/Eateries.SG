<template>
  <div>
    <h4>You currently have:</h4>
    <ul>
      <li v-for="name in itemsSelected" v-bind:key="name">{{ name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    itemsSelected: {
      type: Array,
    },
  },
};
</script>

<style scoped>

</style>