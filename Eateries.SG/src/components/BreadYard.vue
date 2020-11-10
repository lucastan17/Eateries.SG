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
      <h2>Bread Yard Menu</h2>
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
            <input type="date" class="w-input" v-model.lazy="this.content.Date">
            <br>
            <label for="time">Chosen Time</label>
            <br>
            <input type="time" min="10:00" max = "23:00" class="w-input" v-model.lazy="this.content.Time">
            <br>
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
            <button class="button" v-on:click.prevent="addDetails()">Submit</button> 
        </form>
    </div>
  </body>
</template>

<script>
import database from '../firebase.js'
import fb from 'firebase';
import menu from "./Menu.vue";
import demand from "./BreadYarn.js";

export default {
  name: "Bread Yard",
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
        Date: '',
        Time: 0,
        Items: [],
        Amount: 0,
        Eatery: "Bread Yard",
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
        if (bookingtime - timeNow > 0 && this.content.Amount != 0) { //booking date is in the future
          database.collection('Users').doc(fb.auth().currentUser.uid).collection('Transactions').add(this.content);
          database.collection('Eateries').doc('Bread Yard').collection('Transactions').add(this.content);
          this.content.Date = "";
          this.content.Time = "";
          this.content.Items = [];
          this.content.Amount = 0;
          this.total = 0;
          this.content.Pax = '';
          alert("You have successfully placed an order!")
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