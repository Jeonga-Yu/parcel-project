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
    <!-- <draggable v-model="navigation" group="people" @start="drag=true" @end="drag=false">
      <div v-for="(element, idx) in navigation" :key="idx" class="item">{{element.phase}}</div>
    </draggable> -->

    <div class="justify-content-between row">
      <nested class="col-8" v-model="navigation" :dir="directory" />
      <!-- <raw-displayer class="col-4" :title="'Vuex Store'" :value="navigation" /> -->
    </div>

    <br>
    <input type="text" v-model="directory" placeholder="dir name...">

    <!-- <div class="justify-content-between row">
      <nested-test class="col-8" v-model="navigation" />
      <raw-displayer class="col-4" :title="'Vuex Store'" :value="navigation" />
    </div> -->

    <button class="btn btn-secondary" @click="add">Add</button>
    <button class="btn btn-secondary" @click="save">Save</button>
  </div>
</template>
<script>
import Vue from 'Vue'
import draggable from 'vuedraggable'
import navSrc from './navigation'
import axios from 'axios'
import localforage from 'localforage'
import _ from 'lodash'
const localurl = 'http://localhost:5000'
import Nested from "./nested.vue";

export default Vue.extend({
  name: 'App',
  components: {
    draggable,
    Nested
  },
  data() {
    return {
      description: "Parcel - Vue Project is test",
      navigation: null,
      directory: 'Test'
    }
  },
  created () {
    // this.navigation = _.filter(navSrc, d => { d.phase === 'Project'})
    // console.log(this.navigation)

    console.log(navSrc)

    let arr = navSrc.filter(function(el){
      console.log(el.phase)
      return el.phase === 'Project'
    })
    
    console.log(arr[0])

    this.navigation = arr[0].group

    // fix me
    // localforage.getItem('navigation')
    // .then(value => {
    //   if (value) this.navigation = value.files
    //   else this.navigation = navSrc
    // }).catch(err => { console.log(err) })
  },
  methods: {
    add() {
      this.navigation.push({ name: "test " + id, id: id++ });
    },
    save () {
      try {
        let arr = navSrc.filter(function(el){
          console.log(el.phase)
          return el.phase === 'Project'
        })

        console.log(arr)

        axios.post(localurl + '/navigation/update', arr[0])
        .then(res => {
          localforage.setItem('navigation', res.data)
          .then(value => {
            console.log(value)
          }).catch(err => { console.log(err) })
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