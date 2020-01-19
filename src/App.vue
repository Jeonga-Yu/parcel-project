<template>
  <div>
    <div>
      <input type="text" v-model="temp" placeholder="phase or item name...">
      <button @click="createAt('phase')">Add Phase</button>
      
      <div class="nav_phase" v-for="phase in dir" :key="phase.text">
        {{phase.text}}
        <i class="fas fa-plus" @click="createAt(phase)"></i>
        <i class="fas fa-minus" @click="deleteAt(phase)"></i>
        <div class="nav_item" v-for="item in phase.children" :key="item.text">
          <div v-if="item.type == 'folder'">
            {{item.text}} <i class="fas fa-minus" @click="deleteAt(item)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'Vue'
import axios from 'axios'
const localhost = 'http://localhost:5000/'
export default Vue.extend({
  data () {
    return {
      dir : null,
      temp: null
    }
  },
  async created () {
    const res = await axios.get(localhost+'directory')
    console.log(res.data)
    this.dir = res.data
  },
  methods: {
    async createAt(item) {
      const obj = {
        type: item === 'phase' ? 'phase' : 'item',
        path: item === 'phase' ? null : item.path,
        text: this.temp
      }
      const res = await axios.post(localhost+'create', obj)
      this.dir = res.data
    },
    async deleteAt(item) {
      const obj = {
        type: item === 'phase' ? 'phase' : 'item',
        path: item.path,
        text: item.text
      }
      const res = await axios.post(localhost+'delete', obj)
      this.dir = res.data
    }
  }
})
</script>
<style lang="scss" scope>
.nav_item {
  padding-left: 10px;
}
i {
  font-size: 5px;
  &:hover { cursor: pointer; }
}
</style>