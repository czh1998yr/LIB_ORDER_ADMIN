<template>
  <div id="home">
    <tab-bar/>
    <left-bar/>
    <mains/>
  </div>
</template>

<script>
import TabBar from "@/components/common/TabBar/TabBar";
import LeftBar from "@/components/common/LeftBar/LeftBar";
import Mains from "@/components/common/Main/Main";
export default {
  name: "Home",
  components: {
    TabBar,
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