<template>
  <div>
    <h4>You currently have:</h4>
    <ul style="list-style-type: none;">
      <li v-for="item in uniqueItemsSelected" :key="item.id">{{item.quantity}} x {{ item.name }} - ${{item.price}}</li>
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
        <!-- <QtyCounter v-bind:item="item" v-on:counter="onCounter"></QtyCounter> -->
      </li>
    </ul>
    <button class="button" v-on:click.prevent="checkValidity()">Submit order</button>
  </div>
</template>


<script>
//import QuantityCounter from "../components/QuantityCounter.vue";
//import Basket from "../components/Basket.vue";

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
          name: "Beef Kofta Shakshuka",
          imageURL:
            "https://sethlui.com/wp-content/uploads/2020/10/bread-yard-5.jpg",
          price: 16.0,
          quantity: 0,
        },
        {
          id: 2,
          name: "Mushroom Bacon Truffle Alfredo",
          imageURL:
            "https://sethlui.com/wp-content/uploads/2020/10/bread-yard-2.jpg",
          price: 16.0,
          quantity: 0,
        },
        {
          id: 3,
          name: "Ham & Cheese Croissant",
          imageURL:
            "https://sethlui.com/wp-content/uploads/2020/10/bread-yard-4.jpg",
          price: 14.0,
          quantity: 0,
        },
        {
          id: 4,
          name: "Steak Sandwich",
          imageURL:
            "https://media-cdn.tripadvisor.com/media/photo-s/14/fb/c7/c3/grilled-sriracha-chicken.jpg",
          price: 14.0,
          quantity: 0,
        },
        {
          id: 5,
          name: "Lox & Bagel",
          imageURL:
            "https://d1sag4ddilekf6.cloudfront.net/compressed/items/SGITE20200315152818017140/photo/a54ca349fc1c4ea2b9a3796e86440507_1585210544930879702.jpeg",
          price: 14.0,
          quantity: 0,
        },
        {
          id: 6,
          name: "Pulled Pork Eggs Benedict",
          imageURL:
            "https://burpple-2.imgix.net/foods/2f08bcfa606fc66dc33e1848165_original.?w=645&dpr=1&fit=crop&q=80&auto=format",
          price: 14.0,
          quantity: 0,
        },
        {
          id: 7,
          name: "Bread Yard Big Breakfast",
          imageURL:
            "https://2.bp.blogspot.com/-qMkIsoXqPwM/WXUStpHwkhI/AAAAAAAAJZ4/rVihe-QUbBwEK09lskIYglmKT4rWIJ-qgCLcBGAs/s1600/Bread%2BYard%2BBig%2BBoy%2527s%2Bbreakfast%2Bsignature.jpg",
          price: 14.0,
          quantity: 0,
        },
        {
          id: 8,
          name: "Great Vegan Bowl",
          imageURL:
            "https://i.hungrygowhere.com/rnr/food/192085/7d630200/597a23f74136f076c0772ba67284ee0b_1567838199_800x0_crop_800x0_c765f542f1.jpg",
          price: 18.0,
          quantity: 0,
        },
        {
          id: 9,
          name: "Lychee Cruffin",
          imageURL:
            "https://rubbisheatrubbishgrow.files.wordpress.com/2020/08/lychee-cruffin-01-e1596533982551.jpg",
          price: 5.0,
          quantity: 0,
        },
      ],
      content: {
        Date: new Date(),
        Time: 0,
        Items: [],
        Amount: 0,
      }
    };
  },
  components: {
    // 'QtyCounter':QuantityCounter,
    // 'basket':Basket,
  },
  methods: {
    // onCounter: function (item, count) {
    //   if (count > 0 && this.itemsSelected.indexOf(item.name) == -1) {
    //     this.itemsSelected.push(item.name);
    //   } else if (count == 0 && this.itemsSelected.indexOf(item.name) != -1) {
    //     this.itemsSelected.splice(this.itemsSelected.indexOf(item.name), 1);
    //   }
    //},
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
      //database.collection('Users').doc(fb.auth().currentUser.uid).collection('Transactions').add(this.content);
      //database.collection('Eateries').doc('KFC').collection('Transactions').add(this.content);
      this.content.Date = new Date();
      this.content.Time = 0;
      this.content.Items = [];
      this.content.Amount = 0;
    }
  },
  computed: {
    totals: function() {
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
