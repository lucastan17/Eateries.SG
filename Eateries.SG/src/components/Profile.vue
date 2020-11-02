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
        <input type="text" class="w-input" v-model.lazy="userDetail.oldPass" required>
        <label for="email">New Password:</label>
        <input type="text" class="w-input" v-model.lazy="userDetail.newPass" required>
        <button class="button" v-on:click.prevent="updatePassword()">Change my Password</button>        
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
        <input type="text" class="w-input" v-model.lazy="userDetail.newName" required>
        <label>Phone Number</label>
        <input type="text" class="w-input" v-model.lazy="userDetail.newPhone" required>
        <label for="email-3">Email Address</label>
        <input type="text" class="w-input" v-model.lazy="userDetail.newEmail" required>
        <button class="button" v-on:click.prevent="updateProfile()">Update Records</button>
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
            showProfile:true,
            userDetail: {
              newName: "",
              newPhone: "",
              newEmail: "",
              oldPass: "",
              myoldPass: "",
              newPass: ""
            }
        }
    },  
    methods:{
        loadProfile: function(){
            database.collection('stuff').doc('gmJX3VpOcpE8MF8cgANo').get().then(x => {
                this.profile.pop();
                this.profile.push(x.data());
            })
        },
        toggleShow: function() {
          this.loadProfile();
          if (this.showProfile == true) {
            this.showProfile = false;
            document.getElementById("toggler").innerHTML = "Show my Profile";
          } else {
            this.showProfile = true;
            document.getElementById("toggler").innerHTML = "Hide my Profile";
          }
        },
        updateProfile: function() {
          database.collection('stuff').doc('gmJX3VpOcpE8MF8cgANo').update( {
            Name: this.userDetail.newName,
            Phone: this.userDetail.newPhone,
            Email: this.userDetail.newEmail
          });
          this.userDetail.newName = "";
          this.userDetail.newPhone = "";
          this.userDetail.newEmail = "";
          if(this.showProfile == true) {
            this.toggleShow();
          }
        },
        updatePassword: function() {
          this.getOldPass();
          alert(this.userDetail.myoldPass)
          alert(this.userDetail.oldPass)
          if(this.userDetail.myoldPass === this.userDetail.oldPass){
            database.collection('stuff').doc('gmJX3VpOcpE8MF8cgANo').update( {
              Password: this.userDetail.newPass
            })
            alert("Password Updated Successfully");
          } else {
            alert("Old Password enterd incorrectly! Please try again")
          }
          this.userDetail.oldPass = "";
          this.userDetail.newPass = "";
        },

        getOldPass: function() {
          database.collection('stuff').doc('gmJX3VpOcpE8MF8cgANo').get().then(x => {
            this.userDetail.myoldPass = x.doc().Password
          })
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