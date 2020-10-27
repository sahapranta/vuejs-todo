<template>
  <header class="header">
    <h1>todo</h1>
    <input
      class="new-todo"
      autofocus
      autocomplete="off"
      placeholder="What needs to be done?"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <button
      v-if="demoEnabled"
      @click="addDemo"
      class="button"
      :class="{demo}"
    >{{demo?'Reset':'Demo'}}</button>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import demoTodos from "./demo.json";

export default {
  name: "TodoHeader",
  data() {
    return {
      newTodo: ""
    };
  },
  computed: mapGetters({
    todos: "todos",
    demo: "demo_mode",
    demoEnabled: "demo_enabled"
  }),
  methods: {
    async addTodo() {
      var value = this.newTodo && this.newTodo.trim();
      if (!value) return;
      await this.$store.dispatch("createTodo", value);
      this.newTodo = "";
    },
    addDemo() {
      this.$store.commit("CHANGE_DEMO_MODE", !this.demo);
      this.$store.commit("ADD_DEMO_TODO", this.demo ? demoTodos : []);
    }
  }
};
</script>
<style scoped>
.demo {
  background-color: rgba(161, 175, 255, 0.6) !important;
}

.button {
  border-radius: 10em;
  position: absolute;
  color: #f8f8f8;
  text-shadow: 1px 1px 5px #aaa;
  background-color: rgba(223, 164, 164, 0.6);
  text-transform: uppercase;
  word-wrap: break-word;
  white-space: normal;
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  padding: 0.7rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  transition: 0.2s all;
  top: -70px;
  right: 65px;
}
.button:active {
  transform: scale(0.85);
  box-shadow: 1px 2px 15px 1px rgba(0, 0, 0, 0.2);
}
</style>