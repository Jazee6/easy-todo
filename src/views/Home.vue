<template>
  <div class="container mx-auto flex flex-col">
    <div class="flex rounded-2xl shadow">
      <h1 class="text-3xl self-start m-4 h-8">Todos</h1>
      <button class="ml-auto rounded w-32" @click="HandleLogin">
        {{ login }}
      </button>
    </div>
    <transition-group name="bounce">
      <Todolist v-for="todo in todos" :key="todo.id" :todo="todo"/>
    </transition-group>
    <div class="flex rounded-2xl shadow mt-4 h-12 transition hover:shadow-2xl" v-if="token">
      <input class="ml-8 flex-1 outline-0" v-model="todo">
      <button class="ml-auto pr-8 pl-4" @click="HandleAdd">
        添加
      </button>
    </div>
    <footer class="fixed bottom-0 left-1/2 translate-x-[-50%]">
      <span>{{ version }}</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {addTodo, getTodo} from "../api/home";
import Todolist from "../components/Todolist.vue";
import {useAppStore} from "../store/app";
import {todoData} from "../types/home";

const token = localStorage.getItem("token");
const login = ref("登出");
const todos = ref<todoData>();
const appState = useAppStore();
const version = ref();
const todo = ref("");

const init = () => {
  if (token == null) {
    login.value = "登录";
    return;
  }
  getTodo().then((res) => {
    console.log(res);
    todos.value = res.data;
    version.value = appState.version;
  });
};

init();

const HandleLogin = () => {
  if (token == null) {
    window.location.href = "/login";
  } else {
    localStorage.removeItem("token");
    window.location.href = "/";
  }
};

const HandleAdd = () => {
  if (token == null) {
    window.location.href = "/login";
  } else {
    if (todo.value.trim() === "") {
      alert("不能为空");
      return;
    }
    let v = {
      todo: todo.value
    }
    todo.value = "";
    addTodo(v).then((res) => {
      if (res.code !== 0) {
        alert(res.msg);
        return;
      }
      alert(res.msg);
      init();
    });
  }
};

</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}
</style>