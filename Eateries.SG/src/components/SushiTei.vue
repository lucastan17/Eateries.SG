<template>
  <body>
    <div
      data-collapse="medium"
      data-animation="default"
      data-duration="400"
      id="Navigation"
    >
      <div class="navigation-container">
        <div class="navigation-left">
          <img
            src="../assets/EateriesSG.png"
            loading="lazy"
            width="83"
            height="auto"
          />
          <div class="logo-text">EATERIES.SG</div>
        </div>
        <div class="navigation-right">
          <router-link class="link" to="/" exact>Home</router-link>
          <router-link class="link" to="/profile" exact>Profile</router-link>
          <router-link class="link" to="/history" exact>History</router-link>
          <router-link class="current" to="/partnereateries" exact>Partner Eateries</router-link>
          <router-link class="link" to="/currentbookings" exact>Current Bookings</router-link>
          <router-link class="link" to="/declaration" exact>Declaration</router-link>
        </div>
      </div>
    </div>
    <div id="Header" class="header">
      <div id="container-flex">
        <div class="head-content">
          <h1>Partner Eateries</h1>
          <p>
            Treat your taste buds and satisfy your cravings with our wide
            selection of partner eateries!
          </p>
        </div>
      </div>
    </div>
    <div>
      <h2>Sushi Tei Menu</h2>
      <Menu v-bind:itemsList="itemsList" :AmountTotal="total" :selectionList="content.Items" @updateAmount="total=$event" 
      @updateSelections="content.Items=$event"></Menu>
      <p id="totDisplay">Total Amount Payable: $0</p>
      <!--p @updateAmount="updateAmount"></p>
      <button v-on:click.prevent="refresh()" class="button">Refresh</button-->
    </div>
    <div>
        <demand></demand>
    </div>
    <div class="">
        <form id="booking-form">
            <label for="Pax">Number of Pax visiting</label>
            <br>
            <select class="w-input" v-model.lazy="content.Pax">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <br>
            <label for="Day">Chosen Day</label>
            <br>
            <input type="date" class="w-input" v-model.lazy="this.content.Date">
            <br>
            <label for="time">Chosen Time</label>
            <br>
            <input type="time" min="10:00" max = "23:00" class="w-input" v-model.lazy="this.content.Time">
            <br>
            <button class="button" v-on:click.prevent="addDetails()">Submit</button> 
        </form>
    </div>
  </body>
</template>

<script>
import database from '../firebase.js'
import fb from 'firebase';
import menu from "./Menu.vue";
import demand from "./SushiTei.js";

export default {
  name: "Sushi Tei",
  components: {
    'Menu': menu,
     demand: demand
  },
  data() {
    return {
      total : 0,
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
        Date: '',
        Time: 0,
        Items: [],
        Amount: 0,
        Eatery: "Sushi Tei",
        Pax: ''
      }
    };
  },
  methods : {
    addDetails: function() {
        var timeControl = document.querySelector('input[type="time"]');
        this.content.Time = timeControl.value;
        var dateControl = document.querySelector('input[type="date"]');
        this.content.Date = dateControl.value;
        this.content.Amount = this.total;
        //checking if date booked is in the future
        var timeNow = Date.now()/1000
        var chosentime = this.content.Time.split(":");
        var bookingtime = (Date.parse(this.content.Date)/1000) + chosentime[0] * 60 * 60 + chosentime[1] * 60;
        if (this.content.Amount != 0) { //booking date is in the future  bookingtime - timeNow > 0 && 
          database.collection('Users').doc(fb.auth().currentUser.uid).collection('Transactions').add(this.content);
          database.collection('Eateries').doc('Sushi Tei').collection('Transactions').add(this.content);
          this.content.Date = "";
          this.content.Time = "";
          this.content.Items = [];
          this.content.Amount = 0;
          this.total = 0;
          this.content.Pax = '';
          alert("You have successfully placed an order!")
          this.$router.replace('/currentbookings')
        } else if (this.content.Amount == 0) {
          alert("You have not selected any items on the menu. Please try again!")
        } else if (bookingtime - timeNow < 0){
          alert("You have indicated an booking date and/or time in the past. Please try again!")
        }

    },
    updateAmount: function(amt) {
      this.total = amt;
      this.refresh();
    },
    updateSelections: function(lst) {
      this.content.Items = lst;
    },
    refresh: function() {
      document.getElementById("totDisplay").innerHTML = "Total Amount Payable: $" + this.total;
    }
  }
};
</script>

<style>
@import "../assets/basic_style.css";
</style>