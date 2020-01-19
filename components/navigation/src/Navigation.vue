<template>
  <div>
    <div class="nav_phase" v-for="phase in navigation" :key="phase.text">
      <div>{{phase.text}}</div>
      <div class="nav_item" v-for="item in phase.children" :key="item.text">
        <div v-if="item.type == 'folder'">
          <div @click="move(item)">{{item.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue"
import nav from './navigation.json'

export default Vue.extend({
  name: 'Navigation',
  data() {
    return {
      navigation: nav
    }
  },
  created () {
    // console.log(this.$route)
  },
  methods: {
    async move(e) {
      console.log(e)
      // await this.$router.push({path: '/test', component: () => import('./test')})
      this.$router.push({path: '/HSSE/Dashboard'})
    }
  }
});

</script>