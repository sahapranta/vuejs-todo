import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    visibility: "all",
    todos: [],
    demo_mode: false,
    demo_enabled: true,
    visibility_types: ["active", "completed", "all"]
  },
  getters: {
    remaining: state => state.todos.filter(t => !t.completed).length,
    todos: state => state.todos,
    demo_mode: state => state.demo_mode,
    demo_enabled: state => state.demo_enabled,
    visibility: state => state.visibility
  },
  mutations: {
    CHANGE_DEMO_MODE(state, payload) {
      state.demo_mode = payload;
    },
    ADD_DEMO_TODO(state, payload) {
      state.todos = payload;
    },
    SET_VISIBILITY(state, payload) {
      state.visibility = payload;
    },
    SET_TODO(state, payload) {
      state.demo_enabled = false;
      state.todos = [payload, ...state.todos];
    },
    REMOVE_TODO(state, payload) {
      state.todos = state.todos.filter(t => t.id !== payload);
    },
    REMOVE_COMPLETED_TODO(state) {
      state.todos = state.todos.filter(t => !t.completed);
      state.demo_enabled = state.todos.length <= 0 ? true : false;
    },
    UPDATE_TODO(state, payload) {
      state.todos = state.todos.map(t => {
        if (t.id === payload.id) return payload;
        return t;
      });
    },
    UPDATE_ALL_TODO(state, payload) {
      state.todos = state.todos.map(t => ({ ...t, ...payload }));
    }
  },
  actions: {
    setVisibility({ commit, state }, data) {
      commit(
        "SET_VISIBILITY",
        state.visibility_types.find(r => r === data) || "all"
      );
    },
    createTodo({ commit, state }, title) {
      commit("SET_TODO", {
        id: state.todos.length + 1,
        title,
        completed: false
      });
    },
    updateTodo({ commit }, todo) {
      commit("UPDATE_TODO", todo);
    },
    removeTodo({ commit }, todo) {
      commit("REMOVE_TODO", todo.id);
    },
    markAllDone({ commit }, data) {
      commit("UPDATE_ALL_TODO", { completed: data });
    }
  },
  plugins: [vuexLocal.plugin]
});
