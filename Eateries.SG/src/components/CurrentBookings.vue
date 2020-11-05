<template>
<body>
    <div data-collapse="medium" data-animation="default" data-duration="400" id="Navigation">
        <div class="navigation-container">
            <div class="navigation-left"><img src="../assets/EateriesSG.png" loading="lazy" width="83" height="auto">
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

    <h3>Upcoming Bookings</h3>
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
                <td>{{booking.Name}}</td>
                <td>{{booking.Pax}}</td>
                <td>{{booking.Time.toDate()}}</td>
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
                <td>{{expiredbk.Name}}</td>
                <td>{{expiredbk.Pax}}</td>
                <td>{{expiredbk.Time.toDate()}}</td>
            </tr>
        </tbody>
    </table>

</body>  
</template>

<script>
import db from '../firebase.js'
export default {
    name: 'CurrentBookings',
    data(){
        return{
            bookings:[],
            expired:[],
        }
    },  
    methods:{
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
        this.readExpiredBookings();
        this.readCurrentBookings();
    }
}

</script>

<style>
@import '../assets/basic_style.css';

</style>