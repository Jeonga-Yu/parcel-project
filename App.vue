<template>
  <div>
    hello world!
    <i class="fab fa-500px"></i>
  </div>
  
</template>
<script>
import Vue from 'Vue'
// import FontAwesomeIcon from '@fontawesome/vue-fontawesome'

export default Vue.extend({
  data() {
    return {
      bundler: "Parcel"
    }
  }
})
</script>
<style lang="scss" scoped>
.container {
  color: green;
}
</style>