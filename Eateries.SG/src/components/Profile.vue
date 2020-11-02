<template>
<body>
    <div data-collapse="medium" data-animation="default" data-duration="400" id="Navigation">
        <div class="navigation-container">
            <div class="navigation-left"><img src="../assets/EateriesSG.png" loading="lazy" width="83" height="auto">
                <div class="logo-text">EATERIES.SG</div>
            </div>
            <div class="navigation-right">
                <router-link class = "link" to="/" exact>Home</router-link>
                <router-link class = "current"  to="/profile" exact>Profile</router-link>
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
                <h1>Profile</h1>
                <p>Update your personal particulars</p>
            </div>
        </div>
    </div>
    <div class="content-section">
    <div>
      <h4>Change your password</h4>
    </div>
    <div>
      <form id="wf-form-Email-Form" name="wf-form-Email-Form" data-name="Email Form">
        <label for="name">Old Password:</label>
        <input type="text" class="w-input" maxlength="256" name="name" data-name="Name" placeholder="" id="name">
        <label for="email">New Password:</label><input type="text" maxlength="256" name="email-2" data-name="Email 2" placeholder="" id="email-2" class="w-input">
        <input type="submit" value="Update Password" class="button w-button">
      </form>
    </div>
      <button id="toggler" class="button" v-on:click="toggleShow()">Show my Profile</button>
      <div id="currentProfile" v-if="showProfile == true">
        <table>
          <thead><samp></samp>
              <tr>
                  <th>Username</th>
                  <th>Name</th>
                  <th>PhoneNumber</th>
                  <th>Email</th>
              </tr>
          </thead>
          <tbody>      
            <tr v-for="user in profile" :key="user">
              <td>{{user.Username}}</td>
              <td>{{user.Name}}</td>
              <td>{{user.Phone}}</td>
              <td>{{user.Email}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    <h4 class="heading-4">Update your particulars</h4>
    <div>
      <form id="email-form" name="email-form" data-name="Email Form" class="form">
        <label for="name-2">Name</label>
        <input type="text" class="w-input" maxlength="256" name="name-2" data-name="Name 2" placeholder="" id="name-2">
        <label>Phone Number</label>
        <input type="text" class="w-input" maxlength="256" name="field" data-name="Field" id="field" required="">
        <label for="email-3">Email Address</label>
        <input type="email" class="w-input" maxlength="256" name="email-3" data-name="Email 3" placeholder="" id="email-3" required="">
        <input type="submit"  class="button w-button">
      </form>
    </div>
  </div>

</body>  
</template>

<script>
import database from '../firebase.js'

export default {
    name: 'Profile',
    data(){
        return{
            profile:[],
            showProfile:true
        }
    },  
    methods:{
        loadProfile(){
            database.collection('stuff').doc('gmJX3VpOcpE8MF8cgANo').get().then(x => {
                this.profile.pop();
                this.profile.push(x.data());
            })
        },
        toggleShow() {
          this.loadProfile();
          if (this.showProfile == true) {
            this.showProfile = false;
            document.getElementById("toggler").innerHTML = "Show my Profile";
          } else {
            this.showProfile = true;
            document.getElementById("toggler").innerHTML = "Hide my Profile";
          }
        }
    },
    created(){
        this.loadProfile();
    }
}
</script>

<style>
@import '../assets/basic_style.css';

</style>