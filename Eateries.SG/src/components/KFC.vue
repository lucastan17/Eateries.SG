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
      <h2>KFC Menu</h2>
      <Menu v-bind:itemsList="itemsList" :AmountTotal="total" :selectionList="content.Items" @updateAmount="total=$event" 
      @updateSelections="content.Items=$event"></Menu>
      <p id="totDisplay">Total Amount Payable: $0</p>
      <p @updateAmount="updateAmount"></p>
      <button v-on:click.prevent="refresh()" class="button">Refresh</button>
    </div>
    <div>
        <demand></demand>
    </div>
    <div class="">
        <form id="booking-form">
            <label for="Day">Chosen Day</label>
            <br>
            <input type="date" class="w-input" v-model="this.content.Date">
            <br>
            <label for="symptoms">Chosen Time</label>
            <br>
            <input type="time" min="10:00" max = "23:00" class="w-input" v-model="this.content.Time">
            <br>
            <button class="button" v-on:click.prevent="addDetails()">Submit</button> 
        </form>
    </div>
  </body>
</template>

<script>
import database from '../firebase.js'
import fb from 'firebase';
import Menu from "./KFCMenu.vue";
import demand from "./KFCChart.js";

export default {
  name: "KFC",
  components: {
    'Menu': Menu,
     demand: demand
  },
  data() {
    return {
      total : 0,
      itemsList: [
        {
          id: "#000",
          name: "Popcorn Chicken",
          imageURL:
            "https://imageresizer.static9.net.au/H0-EojH18a5tt7gHiNAJ9Ijb2hI=/320x0/https%3A%2F%2Fprod.static9.net.au%2Ffs%2F778a806d-30cf-4eef-9ad9-8df47a56ac81",
          price: 3.80,
        },
        {
          id: "#025",
          name: "Zinger Burger",
          imageURL:
            "https://cdn.greatdeals.com.sg/wp-content/uploads/2019/04/30165256/kfc-zinger-burger-628x427.jpg.webp",
          price: 4.50,
        },
        {
          id: "#067",
          name: "BBQ Bandito Pockett",
          imageURL:
            "https://cdn.singpromos.com/wp-content/uploads/2018/05/BBQ-Nachos-Pockett-Bandito.jpg",
          price: 4.90,
        },
        {
          id: "#077",
          name: "Cheesy Turkey Bacon Bandito Pockett",
          imageURL:
            "https://cdn.singpromos.com/wp-content/uploads/2018/05/Cheesy-Turkey-Bacon-Pockett-Bandito.jpg",
          price: 4.90,
        },
        {
          id: "#099",
          name: "Chessy Poppers",
          imageURL:
            "https://cdn.singpromos.com/wp-content/uploads/2018/05/Cheese-Poppers.jpg",
          price: 2.00,
        },
        {
          id: "#200",
          name: "Strawberry Kiwi Sjora",
          imageURL:
            "https://cdn.singpromos.com/wp-content/uploads/2018/05/Strawberry-Kiwi-SJORA.jpg",
          price: 2.00,
        },
        {
          id: "#001",
          name: "Mashed Potato",
          imageURL:
            "https://assets.change.org/photos/6/bi/ix/JzBIIXiToVCWUQW-800x450-noPad.jpg?1513277933",
          price: 1.80,
        },
        {
          id: "#002",
          name: "Coleslaw",
          imageURL:
            "https://qph.fs.quoracdn.net/main-qimg-d617742ea38a65c1dc13ec43b4d9ec62",
          price: 1.80,
        },
        {
          id: "#003",
          name: "Cheese Fries",
          imageURL:
            "https://www.kfc.com.sg//Content/OnlineOrderingImages/Menu/Items/Sides_CheeseFries_1.jpg",
          price: 2.95,
        },
      ],
      content: {
        Date: '',
        Time: 0,
        Items: [],
        Amount: 0,
        Eatery: "KFC"
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
        database.collection('Users').doc(fb.auth().currentUser.uid).collection('Transactions').add(this.content);
        database.collection('Eateries').doc('KFC').collection('Transactions').add(this.content);
        this.content.Date = "";
        this.content.Time = "";
        this.content.Items = [];
        this.conetnt.Amount = 0;
        this.total = 0;
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