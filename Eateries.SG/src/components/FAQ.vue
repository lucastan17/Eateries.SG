<template>
<body>
    <div data-collapse="medium" data-animation="default" data-duration="400" id="Navigation">
        <div class="navigation-container">
            <div class="navigation-left"><img src="..\assets\EateriesSG.svg" loading="lazy" width="83" height="auto">
                <div class="logo-text">EATERIES.SG</div>
            </div>
            <div class="navigation-right" v-if="signedIn()">
                <router-link class = "link" to="/home" exact>Home</router-link>
                <router-link class = "link" to="/profile" exact>Profile</router-link>
                <router-link class = "link" to="/history" exact>History</router-link>
                <router-link class = "link" to="/partnereateries" exact>Partner Eateries</router-link>
                <router-link class = "link" to="/currentbookings" exact>Current Bookings</router-link>
                <router-link class = "link" to="/declaration" exact>Declaration</router-link>
                <button class="SObutton" @click ="signOut()"><img src="..\assets\logout.svg" style="width:24px; height:22px; float:left">Logout</button>
            </div>
            <div class="navigation-right" v-else>
                <router-link class ="current" to="/" exact>Login</router-link>
                <router-link class = "link" to="/signup" exact>Sign up</router-link>
            </div>

        </div>
    </div>
    <div id="Header" class="header">
        <div id="container-flex">
            <div class="head-content">
                <h1>Frequently Asked Questions</h1>
            </div>
        </div>
    </div>
    <div class="content-section">
    <div class="container">
        <div class="w-layout-grid content-grid">
        <div class="content-block">
            <div class="navigation-left">
                <img src="..\assets\FAQ.svg" loading="lazy" width="80" alt="" />
              <div class="logo-text"><h2> Got questions about our web app? Check out some of our Frequently Asked Questions!</h2></div>
            </div>
            <ul style="list-style-type:none">
                <p style="font-weight: bold">1. How do I get started?</p> 
                <li>You can sign up <a1 @click="toSignup()" onmouseover="color='blue'"><u>here</u></a1> with your name, phone number, email and password.</li>
                <p style="font-weight: bold">2. How do I make a reservation?</p> 
                <li>a. Go to our Partner Eateries page and pick your preferred eatery. <br> b. Select the items you want to order, number of pax, date and the time you want to visit the restaurant. <br> c. You will receive a confirmation of your booking.</li>
                <p style="font-weight: bold">3. How do I change my password or other personal particulars?</p> 
                <li>After logging in, you can change your password and other personal particulars such as your name, phone number and email on the <b>Profile</b> page.</li>
                <p style="font-weight: bold">4. How long will my booking be held in the event I am late?</p> 
                <li>Your booking will be held for 15 minutes. If you fail to show up or contact the eatery before the 15 minutes are up, your booking will be cancelled.</li>
                <p style="font-weight: bold">5. What do I have to do before turning up for my booking?</p> 
                <li>Since additional measures are taken for COVID-19, you have to fill up your temperature and answer the questions on our Declaration page. If you are not dining alone, the rest of your group have to follow the usual procedure of checking in using SafeEntry.</li>
                <p style="font-weight: bold">6. Do I need to provide my credit card details?</p> 
                <li>No, the booking does not require upfront payment. You can pay normally at the restaurant after dining there.</li>
                <p style="font-weight: bold">7. When are our orders sent to the kitchen for preparation?</p> 
                <li>Your orders are released to the kitchen to be prepared after you have checked in to the restaurant for your dining reservation.</li>
                <p style="font-weight: bold">8. Where can I view my current and past bookings?</p> 
                <li>You can view your past and upcoming bookings on the <b>Current Bookings</b> page.</li>
                <p style="font-weight: bold">9. Where can I view my spendings and eateries visited?</p> 
                <li>You can view the eateries where you dined at and the amount spent over the past 1, 3 or 6 month(s) on the <b>History</b> page.</li>
                <p style="font-weight: bold">10. Can I use a foreign phone number?</p> 
                <li>Yes, you can use a foreign phone number by including the correct country code in front of phone number.</li>
                <br><br><br><br>
                <p>Still have questions for us?</p>
                <a1 @click="toContact()" onmouseover="color='blue'"><u>Contact Us</u></a1>
            </ul> 
        </div>
        </div>
    </div>
    </div>

</body>
</template>

<script>
    import fb from 'firebase'
    export default{
        methods:{
            signOut(){
                fb.auth().signOut().then(() => {
                    this.$router.replace('/')
                })
                .catch(err =>{
                    this.error = err.message;
                })
            },
            
            signedIn(){
                return fb.auth().currentUser != null
            },
            
            toContact(){
                return this.$router.replace('/contactus')
            },
            toSignup(){
                return this.$router.replace('/signup')
            }
        }
    }   
    
</script>

<style scoped>
@import "../assets/basic_style.css";
.SObutton {
    margin-left:10px;
    background-color:whitesmoke;
    font-size: 18px;
    border-radius: 12px;
    border: 2px solid #990000;
    width: 120px;
    font-family: sans-serif;
    padding-right: 15px;
}
a1 {
    margin-bottom: 10px; 
    color: #000000;
    font-size: 20px;
    line-height: 1.5;
    letter-spacing: -0.02em;
    font-family: Inter, sans-serif;
}
a1:hover{
    color:blue;
}
li {
    font-size: 16px;
}
</style>