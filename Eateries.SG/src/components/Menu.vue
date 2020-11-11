<template>
  <div class="container">
    <!-- <basket v-bind:itemsSelected="itemsSelected" v-bind:quantityList="quantityList"></basket> -->
    <!-- <ul>
      <li v-for="item in itemsList" v-bind:key="item.name">
        <h5>{{item.name}}</h5>
        <img v-bind:src="item.imageURL" />
        <p>${{item.price}}</p>
        <QtyCounter v-bind:item="item" v-on:counter="onCounter"></QtyCounter>
      </li>
    </ul> -->
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
        <button v-on:click="decrease(item)" style="background-color:#f0bcbc" class="countButton">-</button>
        {{ item.quantity }}
        <button v-on:click="add(item)" style="background-color:#f0bcbc" class="countButton">+</button>
      </li>
    </ul>
    <button v-on:click.prevent="onCounter()" class="button">Confirm Menu Selection</button>

  </div>
</template>


<script>
// import QuantityCounter from "../components/QuantityCounter.vue";
// import Basket from "../components/Basket.vue";

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
    // 'QtyCounter':QuantityCounter,
    // 'basket':Basket,
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
      /*
      if (count > 0 && this.itemsSelected.indexOf(item.name) == -1) {
        this.itemsSelected.push(item.name);
        this.priceList.push(item.price);
        this.quantityList.push(count);
      } else if (count == 0 && this.itemsSelected.indexOf(item.name) != -1) {
        this.itemsSelected.splice(this.itemsSelected.indexOf(item.name), 1);
        this.priceList.splice(this.itemsSelected.indexOf(item.name), 1);
        this.quantityList.splice(this.itemsSelected.indexOf(item.name), 1);
      } else if (count > 0) { //update the quantity array
        var ind = this.itemsSelected.indexOf(item.name);
        this.quantityList[ind] = count;
      }
      this.totalAmount();
      
      var count = this.itemsSelected.length
      for (var i = 0; i < count; i++){
        var it = this.itemsSelected[i];
        this.tempItem.foodItem = it.name;
        this.tempItem.quantity = it.quantity;
        this.selectionList2.push(this.tempItem);
        this.tempItem.foodItem = '';
        this.tempItem.quantity = 0;
      }

      */
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