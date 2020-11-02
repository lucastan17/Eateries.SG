<template>
  <body>
    <div data-collapse="medium" data-animation="default" data-duration="400" id="Navigation">
      <div class="navigation-container">
        <div class="navigation-left"><img src="../assets/EateriesSG.png" loading="lazy" width="83" height="auto">
          <div class="logo-text">EATERIES.SG</div>
        </div>
        <div class="navigation-right">
          <router-link class="link" to="/" exact>Home</router-link>
          <router-link class="current" to="/profile" exact>Profile</router-link>
          <router-link class="link" to="/history" exact>History</router-link>
          <router-link class="link" to="/partnereateries" exact>Partner Eateries</router-link>
          <router-link class="link" to="/currentbookings" exact>Current Bookings</router-link>
          <router-link class="link" to="/declaration" exact>Declaration</router-link>
        </div>
      </div>
    </div>
    <div id="Header" class="header">
      <div id="container-flex">
        <div class="head-content">
          <h1>Profile</h1>
          <p>Update your personal particulars</p>
        </div>
      </div>
    </div>
    <div class="content-section">
      <div>
        <h4>Change your password</h4>
      </div>
      <div class="form-block w-form">
        <form id="password-form">
          <label for="oldpass">Old Password:</label>
          <input type="text" class="w-input" v-model.lazy="content.oldpass" />
          <label for="newpass">New Password:</label>
          <input type="text" class="w-input" v-model.lazy="content.newpass" />
          <input type="submit" value="Update Password" data-wait="Please wait..." class="button w-button" v-on:click.prevent="submit_alert"
          />
        </form>
      </div>
      <div>
        <h4>Update your particulars</h4>
      </div>
      <div class="form-block w-form">
        <form id="particulars-form">
          <label for="name">Name</label>
          <input type="text" class="w-input" v-model.lazy="content.name" />
          <label for="phonenum">Phone Number</label>
          <input type="text" class="w-input" v-model.lazy="content.phonenum" />
          <label for="email">Email Address</label>
          <input type="email" class="w-input" v-model.lazy="content.email" />
          <input type="submit" value="Save" data-wait="Please wait..." class="button w-button" v-on:click.prevent="submit_alert"/>
        </form>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  name: "Profile",
   data() {
            return {
                content : {
                    temp : "",
                    q1: "",
                    q2: ""
                }            
            }
        },
  methods: {
    submit_alert: function () {
      alert("Your changes have been successfully made!");
    },
  },
};
</script>

<style>
@import "../assets/basic_style.css";
</style>