<!--template>
  <div>
    <h4>You currently have:</h4>
    <div id="item">
      <ul>
        <li v-for="item in itemsSelected" :key="item">{{item}}</li>
      </ul>
    </div>
    <div id="quantity">
      <ul>
        <li v-for="(quantity, index) in quantityList" :key="index">x {{quantity}}</li>
      </ul>
    </div>
    <h5>Please make your selection below: </h5>
  </div>
</template>

<script>
export default {
  props: {
    itemsSelected: {
      type: Array,
    },
    quantityList : {
      type: Array,
    }
  },
  data() {
    return {
      quantity : []
    }
  },
  computed: {
    total() {
      return this.itemsSelected.reduce((acc, item) => acc + Number(item.price), 0);
    }
  }
};
</script>

<style scoped>
#item {
  float: left;
  width: 50%;
  text-align: right;
}
#quantity {
  float: right;
  width: 50%;
  text-align: left;
}

</style>