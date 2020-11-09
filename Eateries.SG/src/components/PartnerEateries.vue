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
                <router-link class = "current" to="/partnereateries" exact>Partner Eateries</router-link>
                <router-link class = "link" to="/currentbookings" exact>Current Bookings</router-link>
                <router-link class = "link" to="/declaration" exact>Declaration</router-link>
            </div>
        </div>
    </div>
    <div id="Header" class="header">
        <div id="container-flex">
            <div class="head-content">
                <h1>Partner Eateries</h1>
                <p>Treat your taste buds and satisfy your cravings with our wide selection of partner eateries!</p>
            </div>
        </div>
    </div>
    <div class="content-section">
    <div class="sort-by-buttons w-container">
      <div class="sort">Sort by:</div>
      <a href="#" class="button" v-on:click.prevent="alpahbetical()">Alphabetical Order</a>
      <a href="#" class="button" v-on:click.prevent="rating()">Ratings</a>
      </div>
    </div>

    <div>
        <tbody>
            <tr v-for="eatery in eats" :key = "eatery">
                <td><img :src="getImg(eatery.src)" width="270" height="200" alt="" class="step-image">
                    <router-link :to=eatery.link exact><h5>{{eatery.Name}}</h5></router-link>
                    <p><strong>Location:</strong> {{eatery.Location}} </p>
                    <p><strong>Opening Hours:</strong> {{eatery.OpeningHours}} </p>
                    <p><strong>Phone Number:</strong> {{eatery.PhoneNumber}} </p>
                    <p><strong>Rating:</strong> {{eatery.Rating}} / 5.0</p>
                </td>
            </tr>
        </tbody>
    </div>
    <br>
</body>  
</template>

<script>
import database from "../firebase.js";
//import fb from "firebase";

export default {
  name: "PartnerEateries",
  data() {
    return {
      kfcDetails: [],
      breadyardDetails: [],
      sushiteiDetails: [],
      eateries: [],
      content: {
        location: "",
        openingHours: "",
        phoneNum: "",
        rating: 0,
      },
      eats: [],
      eats2: []
    };
  },
  methods: {
    fetchEatery: function () {
      database.collection("Eateries").orderBy("PhoneNumber").get().then((querySnapshot) =>{
        querySnapshot.forEach((doc)=>{
          this.eats.push(doc.data());
        })
      })
      this.eats2 = this.eats.reverse();
    },
    alpahbetical: function() {
      this.eats = [];
      database.collection("Eateries").orderBy("Name").get().then((querySnapshot) =>{
        querySnapshot.forEach((doc)=>{
          this.eats.push(doc.data());
        })
      })
    },
    rating: function() {
      this.eats = [];
      var retrieve = database.collection("Eateries").orderBy("Rating","desc").get().then((querySnapshot) =>{
        querySnapshot.forEach((doc)=>{
          this.eats.push(doc.data());
        })
      })
/*      while(this.eats.length != 3) {
        setTimeout(() => {console.log("waiting");}, 2000)
      }
*/
      retrieve.onsuccess = function() {
        alert(this.eats.length)
        this.eats.reverse();
      };
/*      this.eats2 = [];
      alert(this.eats.length)
      for(var i = 0; i < this.eats.length; i++) {
        this.eats2[i] = this.eats[this.eats.length-1-i];
      }
      this.eats = [];
      this.eats = this.eats2;
*/
    },
    getImg: function(name) {
      return require('../assets/'+ name + ".jpg")
    }
  },
  created() {
      this.fetchEatery();
  },
};
</script>

<style scoped>
@import "../assets/basic_style.css";

.sort-by-buttons {
  display: flex;
  margin-bottom: 40px;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.sort {
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 20px;
}

.content-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.step-image {
  margin-bottom: 24px;
}

.content-wrapper {
  padding-right: 40px;
  padding-left: 40px;
}

.line-column {
  padding-bottom: 0px;
  flex-direction: column;
}

.line {
  width: 1px;
  height: 100%;
  min-height: 100px;
  border-style: none dashed none none;
}

.content-grid {
  grid-column-gap: 0px;
  -ms-grid-columns: 1fr 0.3fr 1fr 0.3fr 1fr;
  grid-template-columns: 1fr 0.3fr 1fr 0.3fr 1fr;
  -ms-grid-rows: auto;
  grid-template-rows: auto;
}

th, td {
  border: 0px;
}

tr {
  float: left;
  width: 30%;
}
</style>