<style scoped>
.item-container {
  max-width: 20rem;
  margin: 0;
}
.item {
  padding: 1rem;
  border: solid black 1px;
  background-color: #fefefe;
}
.item-sub {
  margin: 0 0 0 1rem;
}
</style>

<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    class="item-container"
    :list="list"
    :value="value"
    @input="emitter"
  >
    <div class="item-group" :key="el.name" v-for="el in realValue">
      <div class="item">{{ el.name }}
        <i v-if="el.level === 'group'" class="fas fa-plus" @click="createAt(el)"></i>
        <i class="fa fa-times close" @click="deleteAt(el)"></i>
      </div>
      <nested-test class="item-sub" :list="el.elements" />
    </div>
    
  </draggable>
</template>

<script>
import draggable from "vuedraggable"
import axios from 'axios'
const localurl = 'http://localhost:5000'
export default {
  name: "nested-test",
  methods: {
    emitter(value) {
      this.$emit("input", value);
    },
    deleteAt(el) {
      console.log(el.parent)

      axios.post(localurl + '/delete', {dir: el.parent + '/' + el.name})
      .then(res => {
        console.log(res)
      })
    },
    createAt(el) {
      axios.post(localurl + '/create', {dir: el.parent + '/' + 'Menu Test'})
      .then(res => {
        console.log(res)
      })
    }
  },
  components: {
    draggable
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    // this.value when input = v-model
    // this.list  when input != v-model
    realValue() {
      return this.value ? this.value : this.list;
    }
  },
  props: {
    value: {
      required: false,
      type: Array,
      default: null
    },
    list: {
      required: false,
      type: Array,
      default: null
    }
  }
};
</script>