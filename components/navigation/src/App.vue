<template>
  <div id="add">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  created() {
    console.log(this.$router)
  }
}
</script>
<style lang="scss" scoped>
.container {
  color: green;
}
</style>