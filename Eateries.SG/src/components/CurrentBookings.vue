<template>
<body>
    <div data-collapse="medium" data-animation="default" data-duration="400" id="Navigation">
        <div class="navigation-container">
            <div class="navigation-left"><img src="..\assets\EateriesSG.svg" loading="lazy" width="83" height="auto">
                <div class="logo-text">EATERIES.SG</div>
            </div>
            <div class="navigation-right">
                <router-link class = "link" to="/home" exact>Home</router-link>
                <router-link class = "link" to="/profile" exact>Profile</router-link>
                <router-link class = "link" to="/history" exact>History</router-link>
                <router-link class = "link" to="/partnereateries" exact>Partner Eateries</router-link>
                <router-link class = "current" to="/currentbookings" exact>Current Bookings</router-link>
                <router-link class = "link" to="/declaration" exact>Declaration</router-link>
            </div>
        </div>
    </div>
    <div id="Header" class="header">
        <div id="container-flex">
            <div class="head-content">
                <h1>Current Bookings</h1>
                <p>Testing! Current Bookings displayed here</p>
            </div>
        </div>
    </div>

    <div class="container">
    <h3>Upcoming Bookings</h3>
    <table v-if="this.show === true">
        <thead><samp></samp>
            <tr>
                <th>Eatery</th>
                <th>Amount</th>
                <th>Pax</th>
                <th>Date & Time</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="booking in bookings" :key = "booking">
                <td>{{booking.Eatery}}</td>
                <td>{{booking.Amount}}</td>
                <td>{{booking.Pax}}</td>
                <td>{{booking.Date}} @ {{booking.Time}}</td>
            </tr>
        </tbody>
    </table>
    <button class="button" id="showBooking" v-on:click.prevent="toggle()">Retrieve Booking Records</button>
    <br>
    <br>
    <h3>Expired Bookings</h3>
    <table v-if="this.show2 === true">
        <thead><samp></samp>
            <tr>
                <th>Eatery</th>
                <th>Amount</th>
                <th>Pax</th>
                <th>Date & Time</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="expiredbk in expired" :key = "expiredbk">
                <td>{{expiredbk.Eatery}}</td>
                <td>{{expiredbk.Amount}}</td>
                <td>{{expiredbk.Pax}}</td>
                <td>{{expiredbk.Date}} @ {{expiredbk.Time}}</td>
            </tr>
        </tbody>
    </table>
    <button class="button" id="showPast" v-on:click.prevent="toggle2()">Retrieve Past Records</button>
    </div>
</body>  
</template>

<script>
import db from '../firebase.js'
import fb from 'firebase'
export default {
    name: 'CurrentBookings',
    data(){
        return{
            bookings:[],
            expired:[],
            name:"",
            show: false,
            show2: false
        }
    },  
    methods:{
        readAllData(){
            db.collection("Users").doc(fb.auth().currentUser.uid).get().then((doc) =>{
                this.name = doc.data().name;
            })
        },
        readCurrentBookings(){
            db.collection("Users").doc(fb.auth().currentUser.uid).collection("Transactions").get().then((querySnapshot) =>{
            var timeNow = Date.now()/1000;
            querySnapshot.forEach((doc)=>{
                var chosentime = doc.data().Time.split(":");
                var bookingtime = (Date.parse(doc.data().Date)/1000) + chosentime[0] * 60 * 60 + chosentime[1] * 60;                
                if(bookingtime > timeNow) {
                    this.bookings.push(doc.data());
                }
            })
        })
        },
        readExpiredBookings(){
            db.collection("Users").doc(fb.auth().currentUser.uid).collection("Transactions").get().then((querySnapshot) =>{
            var timeNow = Date.now()/1000;
            querySnapshot.forEach((doc)=>{
                var chosentime = doc.data().Time.split(":");
                var bookingtime = (Date.parse(doc.data().Date)/1000) + chosentime[0] * 60 * 60 + chosentime[1] * 60;                
                if(bookingtime < timeNow) {
                    this.expired.push(doc.data());
                }
            })
        })
        },
        toggle() {
            if (this.bookings.length == []) {
                this.readCurrentBookings();
            }
            this.show = !this.show;
            if (this.show) {
                document.getElementById("showBooking").innerHTML = "Hide Booking Records";
            } else {
                document.getElementById("showBooking").innerHTML = "Retrieve Booking Records";
            }
        },
        toggle2() {
            if (this.expiredbk == []) {
                this.readExpiredBookings();
            }
            this.show2 = !this.show2;
            if (this.show) {
                document.getElementById("showPast").innerHTML = "Hide Past Records";
            } else {
                document.getElementById("showPast").innerHTML = "Retrieve Past Records";
            }
        }
    },
    created(){
/*
        this.readAllData();
        this.readExpiredBookings();
        this.readCurrentBookings();
*/
    }
}

</script>

<style>
@import '../assets/basic_style.css';

</style>