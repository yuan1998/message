
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// vueとvue-routerの定義
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'animate.css';
import VueRouter from 'vue-router'
import routes from './routes'
import axios from 'axios'


window.axios = axios;


// package を使う宣言
Vue.use(VueRouter);
Vue.use(ElementUI);


// vue-routerのインスタンス化、オプションroutesでアクセスされるパスとその時に表示するComponentを指定
const router = new VueRouter({
    mode: 'history',
    routes
});



const app = new Vue({
    el: '#app',
    router
});
