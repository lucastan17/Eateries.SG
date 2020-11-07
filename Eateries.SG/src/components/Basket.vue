<template>
  <div>
    <h4>You currently have:</h4>
    <ul>
      <li v-for="item in itemsSelected" :key="item.name">{{ item.name }} - ${{item.price}}</li>
    </ul>
    <h5>The total amount payable is: ${{total}} </h5>
  </div>
</template>

<script>
export default {
  props: {
    itemsSelected: {
      type: Array,
    },
  },
  computed: {
    total() {
      return this.itemsSelected.reduce((acc, item) => acc + Number(item.price), 0);
    }
  }
};
</script>

<style scoped>

</style>