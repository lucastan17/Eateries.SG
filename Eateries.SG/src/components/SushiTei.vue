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
          <img src="..\assets\EateriesSG.svg" loading="lazy" width="83" height="auto" />
          <div class="logo-text">EATERIES.SG</div>
        </div>
        <div class="navigation-right">
          <router-link class="link" to="/" exact>Home</router-link>
          <router-link class="link" to="/profile" exact>Profile</router-link>
          <router-link class="link" to="/history" exact>History</router-link>
          <router-link class="current" to="/partnereateries" exact
            >Partner Eateries</router-link
          >
          <router-link class="link" to="/currentbookings" exact
            >Current Bookings</router-link
          >
          <router-link class="link" to="/declaration" exact
            >Declaration</router-link
          >
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
    <div class="container">
      <h2>Sushi Tei Menu</h2>
      <SushiTeiMenu></SushiTeiMenu>
    </div>
  </body>
</template>

<script>
import SushiTeiMenu from "../components/SushiTeiMenu.vue";

export default {
  name: "SushiTei",
  components: {
    'SushiTeiMenu': SushiTeiMenu
  },
  data() {
    return {
      content: {
        Date: new Date(),
        Time: 0,
        Items: [],
        Amount: 0
      }
    };
  },
  methods : {
    addDetails: function() {
        var dateControl = document.querySelector('input[type="time"]');
        this.content.Time = dateControl.value;
       // database.collection('Users').doc(fb.auth().currentUser.uid).collection('Transactions').add(this.content);
       // database.collection('Eateries').doc('Sushi Tei').collection('Transactions').add(this.content);
        this.content.Date = "";
        this.content.Time = "";
        this.content.Items = [];
        this.conetnt.Amount = 0;
    }
  }
};
</script>

<style>
@import "../assets/basic_style.css";
</style>