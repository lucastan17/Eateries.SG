<template>
  <div class="container">
    <h4>You currently have:</h4>
    <ul style="list-style-type: none;">
      <li v-for="item in uniqueItemsSelected" v-bind:key="item.name">{{item.quantity}} x {{ item.name }} - ${{item.price}}</li>
    </ul>
    <h5>The total amount payable is: ${{total.toFixed(2)}} </h5>
    <ul class="menuList">
      <li v-for="item in itemsList" v-bind:key="item.name" class="menuItem">
        <h5>{{ item.name }}</h5>
        <img v-bind:src="item.imageURL" />
        <p>${{ item.price }}</p>
        <button v-on:click="decrease(item)" style="background-color:#f0bcbc;border-radius: 2em;" class="countButton">-</button>
        {{ item.quantity }}
        <button v-on:click="add(item)" style="background-color:#f0bcbc;border-radius: 2em;" class="countButton">+</button>
      </li>
    </ul>
    <button v-on:click.prevent="onCounter()" class="button">Confirm Menu Selection</button>

  </div>
</template>


<script>

export default {
  props: {
    itemsList: {
      type: Array,
    },
    AmountTotal: {
      type: Number
    },
    selectionList: {
      type: Array
    }
  },
  data() {
    return {
      itemsSelected: [],
      selectionList2: [],
      priceList: [],
      quantityList: [],
      Amount: 0,
      total: 0,
      tempItem: {
        foodItem: '',
        quantity: 0
      }
    };
  },
  components: {
  },
  methods: {
    togglePrice: function (item) {
      item.show = !item.show;
      if (item.show) {
        event.srcElement.innerHTML = "Hide Price";
      } else {
        event.srcElement.innerHTML = "Show Price";
      }
    },
    onCounter: function () {
      this.AmountTotal = this.total;
      this.selectionList = this.itemsSelected;
      this.$emit('updateAmount', this.AmountTotal);
      this.$emit('updateSelections', this.selectionList);
      alert("Menu items selected have been confirmed!")
    },
    totalAmount: function() {
      this.Amount = 0;
      for(var i=0; i < this.quantityList.length; i++) {
        this.Amount += this.quantityList[i] * this.priceList[i]
      }
    },
    add: function(item) {
      if (this.itemsSelected.indexOf(item) == -1){
        this.itemsSelected.push(item);
      }
      item.quantity+=1;
      this.total += item.price;
    },
    decrease: function(item) {
      if(item.quantity > 1){
        item.quantity-=1;
        this.total -= item.price;
      }
      else if(item.quantity == 1) {
        item.quantity-=1;
        this.total -= item.price;
        this.remove(item.id);
      }
    },
    remove: function(itemID) {
      this.itemsSelected = this.itemsSelected.filter((item)=>{
        return  item.id !== itemID;
      });
    },
  },
  computed: {
    totals: function() {
      return this.itemsSelected.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    },
    uniqueItemsSelected: function() {
      return [...new Set(this.itemsSelected)]
    },
  }

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
.menuList {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
.menuItem {
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
.countButton {
  background-color:#f0bcbc;
  border-radius: 2em;
}

</style>