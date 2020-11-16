<template>
  <body>
    <div id="Navigation">
      <div class="navigation-container">
        <div class="navigation-left">
          <img src="../assets/EateriesSG.png" loading="lazy" width="83" height="auto"/>
          <div class="logo-text">EATERIES.SG</div>
        </div>
        <div class="navigation-right">
          <router-link class="link" to="/" exact>Home</router-link>
          <router-link class="link" to="/profile" exact>Profile</router-link>
          <router-link class="link" to="/history" exact>History</router-link>
          <router-link class="current" to="/partnereateries" exact>Partner Eateries</router-link>
          <router-link class="link" to="/currentbookings" exact>Current Bookings</router-link>
          <router-link class="link" to="/declaration" exact>Declaration</router-link>
          <button class="SObutton" @click ="signOut()"><img src="..\assets\logout.svg" style="width:24px; height:22px; float:left">Logout</button>
        </div>
      </div>
    </div>
    <div id="Header" class="header">
      <div id="container-flex">
        <div class="head-content">
          <h1>Partner Eateries</h1>
          <h4>
            Treat your taste buds and satisfy your cravings with our wide
            selection of partner eateries!
          </h4>
        </div>
      </div>
    </div>
    <div>
      <h2>Bread Yard Menu</h2>
      <Menu v-bind:itemsList="itemsList2" :AmountTotal="total" :selectionList="content.Items" @updateAmount="total=$event" 
      @updateSelections="content.Items=$event"></Menu>
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
      itemsList2: [],
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
    signOut(){
                fb.auth().signOut().then(() => {
                this.$router.replace('/')
            })
            .catch(err =>{
                this.error = err.message;
            })
        },
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
          database.collection('Eateries').doc('Bread Yard').collection('Transactions').add(this.content);
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
    },
    populateList: function() {
      database.collection('Eateries').doc('Bread Yard').collection('Menu').get().then(snapshot => {
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
.SObutton {
    margin-left:10px;
    background-color:whitesmoke;
    font-size: 18px;
    border-radius: 12px;
    border: 2px solid #990000;
    width: 120px;
    font-family: sans-serif;
    padding-right: 15px;
}
</style>