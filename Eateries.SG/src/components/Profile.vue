<template>
<body>
    <div data-collapse="medium" data-animation="default" data-duration="400" id="Navigation">
        <div class="navigation-container">
            <div class="navigation-left"><img src="..\assets\EateriesSG.svg" loading="lazy" width="83" height="auto">
                <div class="logo-text">EATERIES.SG</div>
            </div>
            <div class="navigation-right">
                <router-link class = "link" to="/home" exact>Home</router-link>
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
    <div class ="container">
      <form id="wf-form-Email-Form" name="wf-form-Email-Form" data-name="Email Form">
        <label for="name">Old Password:</label>
        <input type="password" class="w-input" v-model.lazy="userDetail.oldPass" required>
        <label for="email">New Password:</label>

        <input type="text" class="w-input" v-model.lazy="userDetail.newPass" required>
        <button class="button1" v-on:click.prevent="updatePassword()">Change my Password</button>        
      </form>
      <br>
      <button id="toggler" class="button1" v-on:click="toggleShow()">Show your current Particulars</button>
    </div>
      <!--<button id="toggler" class="button1" v-on:click="toggleShow()">Show your current Particulars</button>-->
      <div id="currentProfile" v-if="showProfile == true">
        <table>
          <thead><samp></samp>
              <tr>
                  <!--<th>Username</th>-->
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
              </tr>
          </thead>
          <tbody>      
            <tr v-for="user in profile" :key="user">
              <!--<td>{{user.Username}}</td>-->
              <td>{{user.name}}</td>
              <td>{{user.phoneNumber}}</td>
              <td>{{user.email}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    <h4 class="heading-4">Update your particulars</h4>
    <div class="container">
      <form id="email-form" name="email-form" data-name="Email Form" class="form">
        <label for="name-2">Name</label>
        <input type="text" class="w-input" v-model.lazy="userDetail.newName" required>
        <label>Phone Number</label>
        <input type="text" class="w-input" v-model="userDetail.newPhone" required>
        <label for="email-3">Email Address</label>
        <input type="text" class="w-input" v-model="userDetail.newEmail" required>
        <button class="button1" v-on:click.prevent="updateProfile()">Update Records</button>

      </form>
    </div>
  </div>

</body>  
</template>

<script>
import database from '../firebase.js'
import fb from 'firebase';

export default {
    name: 'Profile',
    data(){
        return{
            profile:[],
            showProfile:false,
            userDetail: {
              newName: "",
              newPhone: "",
              newEmail: "",
              oldEmail:"",
              oldPass: "",
              myoldPass: "",
              newPass: ""
            }
        }
    },  
    methods:{
        loadProfile: function(){
            database.collection('Users').doc(fb.auth().currentUser.uid).get().then(x => {
                this.profile.pop();
                this.profile.push(x.data());
                this.userDetail.newName = x.data().name;
                this.userDetail.newPhone = x.data().phoneNumber;
                this.userDetail.newEmail = x.data().email;
                this.userDetail.oldEmail = x.data().email;
                this.userDetail.myoldPass = x.data().password;
            })
        },

        toggleShow: function() {
          this.loadProfile();
          if (this.showProfile == true) {
            this.showProfile = false;
            document.getElementById("toggler").innerHTML = "Show your current Particulars";
          } else {
            this.showProfile = true;
            document.getElementById("toggler").innerHTML = "Hide your current Particulars";
          }
        },

        validPhoneNum: function() {
          var phoneno = /^[89]\d{7}$/;
            if (!this.userDetail.newPhone.match(phoneno)) {
                return false;
            }
            else {
                return true;
            }
        },
        
        IsvalidEmail: function(){
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return (this.userDetail.newEmail=="")? "" : (re.test(this.userDetail.newEmail)) ? true: false;
        },

        updateProfile: function() {
          if(!this.validPhoneNum()){
            alert("Invalid phone number given! Please enter a valid phone number.")
          }
          else if(!this.IsvalidEmail()){
            alert("Invalid email address given! Please enter a valid email address")
          }
          else{
            database.collection('Users').doc(fb.auth().currentUser.uid).update( {
              name: this.userDetail.newName,
              phoneNumber: this.userDetail.newPhone,
              email: this.userDetail.newEmail
            });
            if(this.userDetail.newEmail != this.userDetail.oldEmail){
               this.changeEmail(this.userDetail.myoldPass,this.userDetail.newEmail)
            }
            alert("Successfully updated details!")
          }
          this.userDetail.newName = "";
          this.userDetail.newPhone = "";
          //this.userDetail.newEmail = "";
          this.refreshProfile();
          this.refreshProfile();
          this.refreshProfile();
          this.refreshProfile();

        },

        refreshProfile: function() {
          this.loadProfile();
          if (this.showProfile == true) {
            this.showProfile = false;
          } else {
            this.showProfile = true;
          }
        },

        updatePassword: function() {
          //this.getOldPass();
          console.log(this.userDetail.myoldPass)
          /*this.profile.forEach(user =>
            this.userDetail.myoldPass = user.password
          )*/
          if(this.userDetail.myoldPass == this.userDetail.oldPass && this.userDetail.myoldPass != this.userDetail.newPass){
            database.collection('Users').doc(fb.auth().currentUser.uid).update( {
              password: this.userDetail.newPass
            })
            /*fb.auth().currentUser.updatePassword(this.userDetail.newPass).then(console.log("Updated pw"))*/
            this.changePassword(this.userDetail.myoldPass,this.userDetail.newPass)
            alert("Password Updated Successfully");
          } else if(this.userDetail.myoldPass == this.userDetail.newPass) {
            alert("New password cannot be the same as the old password")
          } else {
            alert("Old Password entered incorrectly! Please try again")
          }
          //this.userDetail.oldPass = "";
          //this.userDetail.newPass = "";
          this.loadProfile();
        },

        getOldPass: function() {
          database.collection('Users').doc(fb.auth().currentUser.uid).get().then(x => {
            this.userDetail.myoldPass = x.data().password
          })
        },

        reauthenticate: function(currentPassword){
          var user = fb.auth().currentUser;
          var cred = fb.auth.EmailAuthProvider.credential(this.userDetail.oldEmail, currentPassword);
            return user.reauthenticateWithCredential(cred);
        },

        changePassword: function(currentPassword, newPassword){
          this.reauthenticate(currentPassword).then(() => {
          var user = fb.auth().currentUser;
          user.updatePassword(newPassword).then(() => {console.log("Password updated!");
            }).catch((error) => { console.log(error); });
          }).catch((error) => { console.log(error); });
        },

        changeEmail: function(currentPassword, newEmail){
          this.reauthenticate(currentPassword).then(() => {
          var user = fb.auth().currentUser;
          user.updateEmail(newEmail).then(() => {
          console.log("Email updated!");
          }).catch((error) => { console.log(error); });
          }).catch((error) => { console.log(error); });
        }
    },
    created(){
        this.loadProfile();
    }
}
</script>

<style>
@import '../assets/basic_style.css';

table {
  font-family: 'Lato';
  margin: 25px auto;
  width: 1000px;
  border-collapse: collapse;
}

th, td {
  color: #000000;
  border: 5px solid #b1b2d8;
  padding: 35px 30px;
  border-collapse: collapse;
}

th {
  background: #b1b2d8;
  color: #ffffff;
  text-transform: uppercase;
  font-size: 22px;
}

.button1 {
  display: flex;
    min-height: 60px;
    margin-right: 30px;
    margin-left: 0px;
    padding: 5px 30px;
    align-items: center;
    border-radius: 20px;
    background-color: #f0bcbc;
    font-family: Montserrat, sans-serif;
    color: #f9f9f9;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    background-clip: border-box;
}
</style>