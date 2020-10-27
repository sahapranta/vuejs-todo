<template>
  <section class="todoapp" v-cloak>
    <todo-header />
    <section class="main" v-show="todos.length">
      <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone" />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li
          class="todo"
          v-for="todo in filteredTodos"
          :key="todo.id"
          :class="{completed: todo.completed, editing: todo == editedTodo}"
        >
          <div class="view">
            <input
              class="toggle"
              type="checkbox"
              v-model="todo.completed"
              @change="updateTodo(todo)"
            />
            <label @dblclick="editTodo(todo)">{{todo.title}}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input
            class="edit"
            type="text"
            v-model="todo.title"
            v-focus-editing="todo == editTodo"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
          />
        </li>
      </ul>
    </section>
    <todo-footer />
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TodoFooter from "@/components/Footer";
import TodoHeader from "@/components/Header";
export default {
  components: {
    TodoFooter,
    TodoHeader
  },
  data() {
    return {
      editedTodo: null,
      beforeEditCache: ""
    };
  },
  methods: {
    ...mapActions(["updateTodo", "removeTodo", "markAllDone"]),
    filters(type) {
      return this.todos.filter(t => {
        if (type === "active") return !t.completed;
        if (type === "completed") return t.completed;
        return true;
      });
    },
    editTodo(todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },
    doneEdit(todo) {
      if (!this.editedTodo) return;
      this.updateTodo({ ...todo, title: todo.title.trim() });
      if (!todo.title) this.removeTodo(todo);
    },
    cancelEdit(todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    }
  },
  computed: {
    ...mapGetters(["remaining", "todos", "visibility"]),
    filteredTodos() {
      return this.filters(this.visibility);
    },
    allDone: {
      get() {
        return this.remaining === 0;
      },
      set(value) {
        this.markAllDone(value);
      }
    }
  },
  directives: {
    "focus-editing": function(el, binding) {
      if (binding.value) el.focus();
    }
  }
};
</script>