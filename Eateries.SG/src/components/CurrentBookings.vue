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
                <h1>Current Bookingsss</h1>
                <p>Testing! Current Bookings displayed here</p>
            </div>
        </div>
    </div>

    <div class="container">
    <h3>Upcoming Bookingss</h3>
    <table>
        <thead><samp></samp>
            <tr>
                <th>Eatery</th>
                <th>Name</th>
                <th>Pax</th>
                <th>Time</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="booking in bookings" :key = "booking">
                <td>{{booking.Eatery}}</td>
                <td>{{this.name}}</td>
                <td>{{booking.Amount}}</td>
                <td>{{booking.Date}},{{expiredbk.Time}}</td>
            </tr>
        </tbody>
    </table>
    <br>
    <br>
    <h3>Expired Bookings</h3>
    <table>
        <thead><samp></samp>
            <tr>
                <th>Eatery</th>
                <th>Name</th>
                <th>Pax</th>
                <th>Time</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="expiredbk in expired" :key = "expiredbk">
                <td>{{expiredbk.Eatery}}</td>
                <td>{{this.name}}</td>
                <td>{{expiredbk.Amount}}</td>
                <td>{{expiredbk.Date}},{{expiredbk.Time}}</td>
            </tr>
        </tbody>
    </table>
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
        }
    },  
    methods:{
        readAllData(){
            db.collection("Users").doc(fb.auth().currentUser.uid).get().then((doc) =>{
                this.name = doc.data().name
                console.log(this.name)
            })
            /*db.collection("Users").doc(fb.auth().currentUser.uid).collection("Transactions").get().then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    if(doc.data().Date <= new Date().getDate()){
                        this.expired.push(doc.data())
                    } else {
                        if(doc.data().Time < new Date().getTime()){
                            this.bookings.push(doc.data())
                        } else {
                            this.expired.push(doc.data())
                        }
                    }
                })
            })*/
        },
        readExpiredBookings(){
            db.collection("bookings").where('Time','>=', new Date()).get().then((querySnapshot) =>{
            querySnapshot.forEach((doc)=>{
                this.bookings.push(doc.data());
            })
        })
        },

        readCurrentBookings(){
            db.collection("bookings").where('Time','<', new Date()).get().then((querySnapshot) =>{
            querySnapshot.forEach((doc)=>{
                this.expired.push(doc.data());
            })
        })
        }
    },
    created(){
        //this.readExpiredBookings();
        //this.readCurrentBookings();
        this.readAllData();
    }
}

</script>

<style>
@import '../assets/basic_style.css';

</style>