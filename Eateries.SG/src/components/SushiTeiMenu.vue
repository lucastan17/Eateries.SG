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
          name: "Yakitori Don",
          imageURL:
            "https://www.sushitei.co.id/admin/images/menu/Yakitoro-Don.jpg",
          price: 12.00,
          quantity: 0,
        },
        {
          id: 2,
          name: "Salmon Mentai Sushi",
          imageURL:
            "https://www.sushitei.co.id/admin/images/menu/Salmon-Mentai.jpg",
          price: 3.00,
          quantity: 0,
        },
        {
          id: 3,
          name: "Ebi Mentai Mayo Sushi",
          imageURL:
            "https://www.sushitei.co.id/admin/images/menu/Ebi-Mentai-Mayo-Sushi.jpg",
          price: 3.00,
          quantity: 0,
        },
        {
          id: 4,
          name: "Crispy Cheese Roll Sushi",
          imageURL:
            "https://www.sushitei.co.id/admin/images/menu/Crispy-Cheese-Roll.jpg",
          price: 3.00,
          quantity: 0,
        },
        {
          id: 5,
          name: "Salmon Don",
          imageURL:
            "https://www.sushitei.co.id/admin/images/menu/Salmon-Don.jpg",
          price: 14.00,
          quantity: 0,
        },
        {
          id: 6,
          name: "Dragon Roll Sushi",
          imageURL:
            "https://static.wixstatic.com/media/9fc90b_d5caa5106976483f86fb7a5ca5373643~mv2_d_1654_1236_s_2.jpg/v1/fill/w_232,h_232,usm_1.20_1.00_0.01/file.jpg",
          price: 10.00,
          quantity: 0,
        },
        {
          id: 7,
          name: "Salmon Miso Nabe",
          imageURL:
            "https://scontent.fsin8-2.fna.fbcdn.net/v/t1.0-0/cp0/e15/q65/p320x320/22851776_1562637603802517_7285309164642454890_n.jpg?_nc_cat=107&ccb=2&_nc_sid=8024bb&efg=eyJpIjoibyJ9&_nc_ohc=q-7v7MZ_jWkAX_L1Btz&_nc_ht=scontent.fsin8-2.fna&tp=3&oh=48f488f11e89b7184ccc3108628c727e&oe=5FC4E8A9",
          price: 16.00,
          quantity: 0,
        },
        {
          id: 8,
          name: "Kaisen King Nabe",
          imageURL:
            "https://scontent.fsin8-2.fna.fbcdn.net/v/t1.0-9/24232610_1595028780563399_6867387327556287343_n.jpg?_nc_cat=106&ccb=2&_nc_sid=730e14&_nc_ohc=viOrczXeQ6YAX_8MlZ3&_nc_ht=scontent.fsin8-2.fna&oh=4e6ede5c69927896dd2ddada21757971&oe=5FC2BFCA",
          price: 20.00,
          quantity: 0,
        },
        {
          id: 9,
          name: "Chawanmushi",
          imageURL:
            "https://lh5.ggpht.com/NKp6uw5otzbmaZboKxE4FPvIAyr2h5HePuiqStRYoAlgGJ3a5JKlqGR1AG1RSrQE9J-IRYQ7mUj0xtoh9NUUZC0f=s800",
          price: 3.00,
          quantity: 0,
        },
      ],
      content: {
        Date: new Date(),
        Time: 0,
        Items: [],
        Amount: 0,
        Eatery: 'Sushi Tei',
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
