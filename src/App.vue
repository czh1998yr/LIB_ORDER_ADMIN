<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    window.addEventListener('unload',this.saveState)
    },
  methods: {
    saveState() {
      // window.sessionStorage.setItem('state',JSON.stringify(this.$store.state))
    }
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
