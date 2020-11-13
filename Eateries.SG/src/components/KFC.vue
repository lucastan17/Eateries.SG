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
    <div class="content-section">
      <h2>KFC Menu</h2>
      <Menu v-bind:itemsList="itemsList2" :AmountTotal="total" :selectionList="content.Items" @updateAmount="total=$event" 
      @updateSelections="content.Items=$event"></Menu>
      <!--p id="totDisplay">Total Amount Payable: $0</p>
      <button v-on:click.prevent="refresh()" class="button">Refresh</button-->
    </div>
    <div class="container">
        <demand></demand>
    </div>
    <div class="container">
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
            <input type="date" class="w-input" v-model.lazy="content.Date">
            <br>
            <label for="Time">Chosen Time</label>
            <br>
            <input type="time" min="08:00" max = "23:00" class="w-input" v-model.lazy="content.Time">
            <br>
            <button class="button" v-on:click.prevent="addDetails()">Submit</button> 
        </form>
    </div>
  </body>
</template>

<script>
import database from '../firebase.js'
import fb from 'firebase';
import Menu from "./Menu.vue";
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
      itemsList2: [],
/*      itemsList: [
        {
          id: 1,
          name: "Popcorn Chicken",
          imageURL:
            "https://imageresizer.static9.net.au/H0-EojH18a5tt7gHiNAJ9Ijb2hI=/320x0/https%3A%2F%2Fprod.static9.net.au%2Ffs%2F778a806d-30cf-4eef-9ad9-8df47a56ac81",
          price: 3.80,
          quantity: 0,
        },
        {
          id: 2,
          name: "Zinger Burger",
          imageURL:
            "https://cdn.greatdeals.com.sg/wp-content/uploads/2019/04/30165256/kfc-zinger-burger-628x427.jpg.webp",
          price: 4.50,
          quantity: 0,
        },
        {
          id: 3,
          name: "BBQ Bandito Pockett",
          imageURL:
            "https://cdn.singpromos.com/wp-content/uploads/2018/05/BBQ-Nachos-Pockett-Bandito.jpg",
          price: 4.90,
          quantity: 0,
        },
        {
          id: 4,
          name: "Cheesy Turkey Bacon Bandito Pockett",
          imageURL:
            "https://cdn.singpromos.com/wp-content/uploads/2018/05/Cheesy-Turkey-Bacon-Pockett-Bandito.jpg",
          price: 4.90,
          quantity: 0,
        },
        {
          id: 5,
          name: "Chessy Poppers",
          imageURL:
            "https://cdn.singpromos.com/wp-content/uploads/2018/05/Cheese-Poppers.jpg",
          price: 2.00,
          quantity: 0,
        },
        {
          id: 6,
          name: "Strawberry Kiwi Sjora",
          imageURL:
            "https://cdn.singpromos.com/wp-content/uploads/2018/05/Strawberry-Kiwi-SJORA.jpg",
          price: 2.00,
          quantity: 0,
        },
        {
          id: 7,
          name: "Mashed Potato",
          imageURL:
            "https://assets.change.org/photos/6/bi/ix/JzBIIXiToVCWUQW-800x450-noPad.jpg?1513277933",
          price: 1.80,
          quantity: 0,
        },
        {
          id: 8,
          name: "Coleslaw",
          imageURL:
            "https://qph.fs.quoracdn.net/main-qimg-d617742ea38a65c1dc13ec43b4d9ec62",
          price: 1.80,
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
*/
      content: {
        Date: '',
        Time: 0,
        Items: [],
        Amount: 0,
        Eatery: "KFC",
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
        if ( this.content.Amount != 0) { //booking date is in the future   bookingtime - timeNow > 0 &&
          database.collection('Users').doc(fb.auth().currentUser.uid).collection('Transactions').add(this.content);
          database.collection('Eateries').doc('KFC').collection('Transactions').add(this.content);
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
      document.getElementById("totDisplay").innerHTML = "Total Amount Payable: $" + this.total.toFixed(2);
    },
    populateList: function() {
      database.collection('Eateries').doc('KFC').collection('Menu').get().then(snapshot => {
          snapshot.forEach(doc => {
            this.itemsList2.push(doc.data());
          });
      });
    }
  },
  created() {
    this.populateList();
  }
};
</script>

<style>
@import "../assets/basic_style.css";
</style>