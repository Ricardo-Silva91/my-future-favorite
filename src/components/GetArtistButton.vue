<template>
  <button>Get Artist</button>
</template>

<script>
export default {
  name: 'GetArtistButton',
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  height:10rem;
  width:100%;
  font-size: 3rem;
  cursor: pointer;
  border:none;
  border-radius:50px;
  transition:0.3s;
  background-color: transparent;
  /* box-shadow: 5px 5px 50px rgb(64, 20, 146),-5px -5px 50px rgb(64, 20, 146); */
  filter: drop-shadow(5px 5px 50px rgb(64, 20, 146)) drop-shadow(-5px -5px 50px rgb(64, 20, 146));
  transition:0.5s;
  border: 2px solid rgb(201 201 201 / 5%);
  border-radius: 30px;
  padding: 1rem;
  color: rgba(201, 201, 201, 0.576);
  text-transform: uppercase;
}

button:hover {
  animation: glow 3s infinite ;
}

@keyframes glow{
  0%{
    /* box-shadow: 5px 5px 50px rgb(64, 20, 146),-5px -5px 50px rgb(64, 20, 146); */
    filter: drop-shadow(5px 5px 50px rgb(64, 20, 146)) drop-shadow(-5px -5px 50px rgb(64, 20, 146));
  }
  
  50%{
    /* box-shadow: 5px 5px 50px rgb(140, 69, 182),-5px -5px 50px rgb(140, 69, 182); */
    filter: drop-shadow(5px 5px 50px rgb(140, 69, 182)) drop-shadow(-5px -5px 50px rgb(140, 69, 182));
  }
  100%{
    /* box-shadow: 5px 5px 50px rgb(64, 20, 146),-5px -5px 50px rgb(64, 20, 146); */
    filter: drop-shadow(5px 5px 50px rgb(64, 20, 146)) drop-shadow(-5px -5px 50px rgb(64, 20, 146));
  }
}
</style>
