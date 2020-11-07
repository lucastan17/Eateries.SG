import CurrentBookings from './components/CurrentBookings.vue'
import PartnerEateries from  './components/PartnerEateries.vue'
import Home from './components/Home.vue'
import Profile from './components/Profile.vue'
import Declaration from './components/Declaration.vue'
import KFC from './components/KFC.vue'
import SushiTei from './components/SushiTei.vue'
import BreadYard from './components/BreadYard.vue'
import History from './components/History.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Overall from './components/OverallDemand.vue'
import AboutUs from './components/AboutUs.vue'
import FAQ from './components/FAQ.vue'
import ContactUs from './components/ContactUs.vue'

export default[
    {path:'/currentbookings',component:CurrentBookings},
    {path:'/partnereateries',component:PartnerEateries},
    {path:'/home',component:Home},
    {path:'/profile',component:Profile},
    {path:'/declaration',component:Declaration},
    {path:'/KFC',component:KFC},
    {path:'/SushiTei',component:SushiTei},
    {path:'/BreadYard',component:BreadYard},
    {path:'/History',component:History},
    {path:'/', component:Login},
    {path:'/signup', component:Signup},
    {path:'/overall', component:Overall},
    {path:'/aboutus', component:AboutUs},
    {path:'/faq', component:FAQ},
    {path:'/contactus', component:ContactUs}
]