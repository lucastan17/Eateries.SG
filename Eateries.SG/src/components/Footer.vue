<template>
  <div class="footer">
    <footer>
        <p v-html="copyRtSymbol +title"></p>
    </footer>
    
  </div>
</template>

<script>

export default {
  
  data(){
    return{
        copyRtSymbol:'&copy; ',
        title:'Eateries.SG'
        }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

footer{
    background-color:rgba(107, 167, 223, 0.548);
    padding:5px;
    text-align:center;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    vertical-align: middle;
}
p{
    align-content: center;
    color:ivory;
}
</style>