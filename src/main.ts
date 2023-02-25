import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import routes from './routers/index'
import axios from 'axios'
import store from "./store";
import {useAppStore} from "./store/app";
// @ts-ignore
import progress from 'nprogress';
import 'nprogress/nprogress.css'

axios.defaults.baseURL = 'http://localhost:8081/todo'

createApp(App).use(routes).use(store).mount('#app')

//-----------------store/index.ts-----------------

const appState = useAppStore()

axios.interceptors.request.use(function (config) {
    progress.start();
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
}, function (error) {
    progress.done();
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    progress.done();
    appState.version = response.headers['version'];
    return response.data;
}, (error) => {
    progress.done();
    return Promise.reject(error);
})