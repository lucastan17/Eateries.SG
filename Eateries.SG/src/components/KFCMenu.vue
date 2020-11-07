<template>
  <div>
    <h4>You currently have:</h4>
    <ul style="list-style-type: none;">
      <li v-for="item in uniqueItemsSelected" :key="item.id">{{item.quantity}} x {{ item.name }} - ${{item.price}}</li>
    </ul>
    <h5>The total amount payable is: ${{total.toFixed(2)}} </h5>
    <ul class="menuList">
      <li v-for="item in itemsList" v-bind:key="item.id" class="menuItem">
        <h5>{{ item.name }}</h5>
        <img v-bind:src="item.imageURL" />
        <p>${{ item.price }}</p>
        <button v-on:click="decrease(item)" style="background-color:#f0bcbc" class="countButton">-</button>
        {{ item.quantity }}
        <button v-on:click="add(item)" style="background-color:#f0bcbc" class="countButton">+</button>
        <!-- <QtyCounter v-bind:item="item" v-on:counter="onCounter"></QtyCounter> -->
      </li>
    </ul>
    <button class="button" v-on:click.prevent="checkValidity()">Submit order</button>
  </div>
</template>


<script>
import QuantityCounter from "../components/QuantityCounter.vue";
import Basket from "../components/Basket.vue";

export default {
  // props: {
  //   itemsList: {
  //     type: Array,
  //   },
  // },
  data() {
    return {
      itemsSelected: [],
      total: 0,
      itemsList: [
        {
          id: 1,
          name: "Popcorn Chicken",
          imageURL:
            "https://imageresizer.static9.net.au/H0-EojH18a5tt7gHiNAJ9Ijb2hI=/320x0/https%3A%2F%2Fprod.static9.net.au%2Ffs%2F778a806d-30cf-4eef-9ad9-8df47a56ac81",
          price: 3.8,
          quantity: 0,
        },
        {
          id: 2,
          name: "Zinger Burger",
          imageURL:
            "https://cdn.greatdeals.com.sg/wp-content/uploads/2019/04/30165256/kfc-zinger-burger-628x427.jpg.webp",
          price: 4.5,
          quantity: 0,
        },
        {
          id: 3,
          name: "BBQ Bandito Pockett",
          imageURL:
            "https://cdn.singpromos.com/wp-content/uploads/2018/05/BBQ-Nachos-Pockett-Bandito.jpg",
          price: 4.9,
          quantity: 0,
        },
        {
          id: 4,
          name: "Cheesy Turkey Bacon Bandito Pockett",
          imageURL:
            "https://cdn.singpromos.com/wp-content/uploads/2018/05/Cheesy-Turkey-Bacon-Pockett-Bandito.jpg",
          price: 4.9,
          quantity: 0,
        },
        {
          id: 5,
          name: "Chessy Poppers",
          imageURL:
            "https://cdn.singpromos.com/wp-content/uploads/2018/05/Cheese-Poppers.jpg",
          price: 2.0,
          quantity: 0,
        },
        {
          id: 6,
          name: "Strawberry Kiwi Sjora",
          imageURL:
            "https://cdn.singpromos.com/wp-content/uploads/2018/05/Strawberry-Kiwi-SJORA.jpg",
          price: 2.0,
          quantity: 0,
        },
        {
          id: 7,
          name: "Mashed Potato",
          imageURL:
            "https://assets.change.org/photos/6/bi/ix/JzBIIXiToVCWUQW-800x450-noPad.jpg?1513277933",
          price: 1.8,
          quantity: 0,
        },
        {
          id: 8,
          name: "Coleslaw",
          imageURL:
            "https://qph.fs.quoracdn.net/main-qimg-d617742ea38a65c1dc13ec43b4d9ec62",
          price: 1.8,
          quantity: 0,
        },
        {
          id: 9,
          name: "Cheese Fries",
          imageURL:
            "https://www.kfc.com.sg//Content/OnlineOrderingImages/Menu/Items/Sides_CheeseFries_1.jpg",
          price: 2.95,
          quantity: 0,
        },
      ],
      content: {
        Date: new Date(),
        Time: 0,
        Items: [],
        Amount: 0,
        Eatery: 'KFC',
      },
    };
  },
  components: {
    // 'QtyCounter': QuantityCounter,
    // 'basket': Basket,
  },
  methods: {
    // onCounter: function (item, count) {
    //   if (count > 0 && this.itemsSelected.indexOf(item) == -1) {
    //     this.itemsSelected.push(item);
    //   } else if (count == 0 && this.itemsSelected.indexOf(item) != -1) {
    //     this.itemsSelected.splice(this.itemsSelected.indexOf(item), 1);
    //   }
    // },
    add: function(item) {
      this.itemsSelected.push(item);
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
    checkValidity: function() {
      if (this.itemsSelected.length==0) {
        alert("Your order is empty! Please select your items.");
        } else {
          this.saveOrder();
          alert("Order has been sent successfully!")
        }
      },
    saveOrder: function() {
      database.collection('Users').doc(fb.auth().currentUser.uid).collection('Transactions').add(this.content);
      database.collection('Eateries').doc('KFC').collection('Transactions').add(this.content);
      this.content.Date = new Date();
      this.content.Time = 0;
      this.content.Items = [];
      this.content.Amount = 0;
    }
  },
  computed: {
    total: function() {
      return this.itemsSelected.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    },
    uniqueItemsSelected: function() {
      return [...new Set(this.itemsSelected)]
    }
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
.countButton {
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
.countButton:hover {
  border-color: rgba(255, 255, 255, 1);
}
</style>
