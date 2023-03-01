<template>
  <div class="container mx-auto flex flex-col">
    <h1 class="text-3xl self-start m-4">Login</h1>
    <div class="flex items-baseline">
      <span class="ml-4 min-w-fit">账户:</span>
      <input class="w-1/3 max-sm:w-full bg-gray-50 m-2 h-8 border-gray-500 border-2 rounded"
             v-model="username" @keydown.enter="HandleLogin" autocomplete="username">
    </div>
    <div class="flex items-baseline">
      <span class="ml-4 min-w-fit">密码:</span>
      <input class="w-1/3 max-sm:w-full bg-gray-50 m-2 h-8 border-gray-500 border-2 rounded"
             type="password" v-model="password" @keydown.enter="HandleLogin" autocomplete="password">
    </div>
    <div class="flex">
      <button
          class="rounded border-2 border-gray-500 ml-4 w-16 h-8 mt-4 active:border-black active:bg-gray-200"
          @click="HandleLogin">登录
      </button>
      <button
          class="rounded border-2 border-gray-500 ml-4 w-16 h-8 mt-4 active:border-black active:bg-gray-200"
          @click="HandleRegister">注册
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";
import {addResponse} from "../api/home";
import routes from "../routers";

const username = ref("");
const password = ref("");

const HandleLogin = () => {
  if (username.value === "" || password.value === "") {
    alert("账户或密码不能为空");
    return;
  }
  if (password.value.length > 18) {
    alert("密码长度不能超过18位");
    return;
  }
  if (password.value.length < 6) {
    alert("密码长度不能小于6位");
    return;
  }

  axios.post<any,addResponse>("/login", {
    username: username.value,
    password: password.value
  }).then((res) => {
        if (res.code !== 0) {
          alert(res.msg);
        } else {
          localStorage.setItem("token", res.data.token);
          routes.push("/");
        }
      }
  ).catch((err) => {
    console.log(err);
  })
};

const HandleRegister = () =>{
  if (username.value === "" || password.value === "") {
    alert("账户或密码不能为空");
    return;
  }
  if (password.value.length > 18) {
    alert("密码长度不能超过18位");
    return;
  }
  if (password.value.length < 6) {
    alert("密码长度不能小于6位");
    return;
  }

  axios.post<any,addResponse>("/register", {
    username: username.value,
    password: password.value
  }).then((res) => {
        if (res.code !== 0) {
          alert(res.msg);
        } else {
          localStorage.setItem("token", res.data.token);
          routes.push("/");
        }
      }
  ).catch((err) => {
    console.log(err);
  })
}
</script>
