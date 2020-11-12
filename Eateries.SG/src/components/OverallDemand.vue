<template>
<body>
    <div data-collapse="medium" data-animation="default" data-duration="400" id="Navigation">
        <div class="navigation-container">
            <!-- <div class="navigation-left"><img src="..\assets\EateriesSG.svg" loading="lazy" width="83" height="auto">
                <div class="logo-text">EATERIES.SG</div>
            </div> -->
            <div class="navigation-right">
                <router-link class = "link" to="/home" exact>Home</router-link>
                <router-link class = "link" to="/profile" exact>Profile</router-link>
                <router-link class = "link" to="/history" exact>History</router-link>
                <router-link class = "link" to="/partnereateries" exact>Partner Eateries</router-link>
                <router-link class = "link" to="/currentbookings" exact>Current Bookings</router-link>
                <router-link class = "link" to="/declaration" exact>Declaration</router-link>
            </div>
        </div>
    </div>
    <div id="Header" class="header">
        <div id="container-flex">
            <div class="head-content">
                <h1>Choice of Date and Time</h1>
                <h4>It's now or never!</h4>
            </div>
        </div>
    </div>
    <div>
        <kfc></kfc>
    </div>
    <div class="container">
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
import kfc from "./KFCChart.js";

export default {
    name: 'Store Transactions',
    data() {
        return {
            content: {
                Date: new Date(),
                Time: 0,
                Items: [],
                Amount: 0
            }
        }
    },
    components: {
        kfc: kfc
    },
    methods : {
        addDetails: function() {
            var dateControl = document.querySelector('input[type="time"]');
            this.content.Time = dateControl.value;
            database.collection('Users').doc(fb.auth().currentUser.uid).collection('Transactions').add(this.content);
            database.collection('Eateries').doc('KFC').collection('Transactions').add(this.content);
            this.content.Date = "";
            this.content.Time = "";
            this.content.Items = [];
            this.conetnt.Amount = 0;
        }
    }

}


</script>

<style>
@import '../assets/basic_style.css';
</style>