<script>
import db from '../firebase.js'
export default {
    data(){
        return{
            itemsList: []
        }
    },
    components:{
    },
    methods:{
        fetchItems:function(){
            db.collection('bookings').get().then((querySnapShot)=>{
            let item={}
            querySnapShot.forEach(doc=>{
                item=doc.data()
                item.show=false
                this.itemsList.push(item)
            }) 
            }) 
        } 
    },
    created(){this.fetchItems()}}
</script>