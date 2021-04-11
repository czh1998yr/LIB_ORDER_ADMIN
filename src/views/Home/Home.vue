<template>
  <div id="home">
    <nav-bar/>
    <left-bar/>
    <mains/>
  </div>
</template>

<script>
import NavBar from "@/components/common/Navbar/NavBar";
import LeftBar from "@/components/common/LeftBar/LeftBar";
import Mains from "@/components/common/Main/Main";
export default {
  name: "Home",
  components: {
    NavBar,
    LeftBar,
    Mains
  }
}
</script>

<style scoped>
  #home{
    height: 100%;
    background-color: #f8f8f8;
  }
</style>