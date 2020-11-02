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
    <div class="form-block w-form">
      <form id="wf-form-Email-Form" name="wf-form-Email-Form" data-name="Email Form"><label for="name">Old Password:</label><input type="text" class="w-input" maxlength="256" name="name" data-name="Name" placeholder="" id="name"><label for="email">New Password:</label><input type="text" maxlength="256" name="email-2" data-name="Email 2" placeholder="" id="email-2" class="w-input"><input type="submit" value="Update Password" data-wait="Please wait..." class="button w-button"></form>
      <div class="w-form-done">
        <div>Thank you! Your submission has been received!</div> <!-- can change to alert -->
      </div>
      <div class="w-form-fail">
        <div>Oops! Something went wrong while submitting the form.</div>
      </div>
    </div>
    <h4 class="heading-4">Update your particulars</h4>
    <div class="w-form">
      <form id="email-form" name="email-form" data-name="Email Form" class="form"><label for="name-2">Name</label><input type="text" class="w-input" maxlength="256" name="name-2" data-name="Name 2" placeholder="" id="name-2"><label>Phone Number</label><input type="text" class="w-input" maxlength="256" name="field" data-name="Field" id="field" required=""><label for="email-3">Email Address</label><input type="email" class="w-input" maxlength="256" name="email-3" data-name="Email 3" placeholder="" id="email-3" required=""><input type="submit" value="Save" data-wait="Please wait..." class="button w-button"></form>
      <div class="w-form-done">
        <div>Thank you! Your submission has been received!</div>
      </div>
      <div class="w-form-fail">
        <div>Oops! Something went wrong while submitting the form.</div>
      </div>
    </div>
  </div>

</body>  
</template>

<script>
    export default {
        name: 'Profile',
    }

</script>

<style>
@import '../assets/basic_style.css';

</style>