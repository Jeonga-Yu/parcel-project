<template>
  <div>
    <div>
      {{description}}
    </div>
    <div>
      <i class="fab fa-500px"></i>
    </div>
    <div>
      {{navigation}}
    </div>
    <draggable v-model="navigation" group="people" @start="drag=true" @end="drag=false">
      <div v-for="(element, idx) in navigation" :key="idx" class="item">{{element.phase}}</div>
    </draggable>
    <button class="btn btn-secondary" @click="add">Add</button>
    <button class="btn btn-secondary" @click="save">Save</button>
  </div>
</template>
<script>
import Vue from 'Vue'
import draggable from 'vuedraggable'
import navigation from './navigation'
import axios from 'axios'
const localurl = 'http://localhost:5000'
export default Vue.extend({
  components: {
    draggable
  },
  data() {
    return {
      description: "Parcel - Vue Project is test",
      navigation
    }
  },
  created () {
  },
  methods: {
    onError (error) {
      console.log(error)
    },
    add() {
      this.navigation.push({ name: "test " + id, id: id++ });
    },
    save () {
      try {
        axios.post(localurl + '/navigation/update', this.navigation)
        .then(res => {
          console.log(res)
        })
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  }
})

</script>
<style lang="scss" scoped>
.container {
  color: green;
}
.item {
  position: relative;
  display: flex;
  padding: .75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.125);
}
</style>