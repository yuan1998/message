
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
import VueAMap from 'vue-amap';

window.axios = axios;


// package を使う宣言
Vue.use(VueAMap);
Vue.use(VueRouter);
Vue.use(ElementUI);



VueAMap.initAMapApiLoader({
    key: '18466ae6bc3fb6e154cae817f57dc6ff',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    // 默认高德 sdk 版本为 1.4.4
    v: '1.4.4'
});


// vue-routerのインスタンス化、オプションroutesでアクセスされるパスとその時に表示するComponentを指定
const router = new VueRouter({
    mode: 'history',
    routes
});



const app = new Vue({
    el: '#app',
    router
});
