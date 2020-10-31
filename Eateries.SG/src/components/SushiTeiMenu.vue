<template>
  <div>
    <basket v-bind:itemsSelected="itemsSelected"></basket>
    <ul>
      <li v-for="item in itemsList" v-bind:key="item.name">
        <h5>{{item.name}}</h5>
        <img v-bind:src="item.imageURL" />
        <p>${{item.price}}</p>
        <QtyCounter v-bind:item="item" v-on:counter="onCounter"></QtyCounter>
      </li>
    </ul>
  </div>
</template>


<script>
import QuantityCounter from "../components/QuantityCounter.vue";
import Basket from "../components/Basket.vue";

export default {
  props: {
    itemsList: {
      type: Array,
    },
  },
  data() {
    return {
      itemsSelected: [],
    };
  },
  components: {
    'QtyCounter':QuantityCounter,
    'basket':Basket,
  },
  methods: {
    onCounter: function (item, count) {
      if (count > 0 && this.itemsSelected.indexOf(item.name) == -1) {
        this.itemsSelected.push(item.name);
      } else if (count == 0 && this.itemsSelected.indexOf(item.name) != -1) {
        this.itemsSelected.splice(this.itemsSelected.indexOf(item.name), 1);
      }
    },
  },
};
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 30px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 150px;
  height: 150px;
}
button {
  box-sizing: border-box;
  border: 0.16em solid rgba(255, 255, 255, 0);
  border-radius: 2em;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: #ffffff;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  text-align: center;
  cursor: pointer;
  background-color: #c38d9e;
}
button:hover {
  border-color: rgba(255, 255, 255, 1);
}
</style>
