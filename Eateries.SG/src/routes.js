import CurrentBookings from './components/CurrentBookings.vue'
import PartnerEateries from  './components/PartnerEateries.vue'
import Home from './components/Home.vue'
import Profile from './components/Profile.vue'
import Declaration from './components/Declaration.vue'
import KFC from './components/KFC.vue'
import SushiTei from './components/SushiTei.vue'
import BreadYard from './components/BreadYard.vue'

export default[
    {path:'/currentbookings',component:CurrentBookings},
    {path:'/partnereateries',component:PartnerEateries},
    {path:'/',component:Home},
    {path:'/profile',component:Profile},
    {path:'/declaration',component:Declaration},
    {path:'/KFC',component:KFC},
    {path:'/SushiTei',component:SushiTei},
    {path:'/BreadYard',component:BreadYard}
]