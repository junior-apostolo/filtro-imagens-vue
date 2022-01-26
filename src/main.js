import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from "vue-router";
import {routes} from './routes'
import './directives/Transform';
import VeeValidate from 'vee-validate';
import msg from './pt_BR'

Vue.use(VueResource)
Vue.http.options.root = 'http://localhost:3000'

// Vue.http.interceptors.push((req, next) => {
//
//   // é possível colocar informações no header antes do envio da requisição
//   req.headers.set('Authorization', 'informação de segurança aqui');
//   console.log('Lidando com o request');
//
//   next(res => {
//     console.log('Lidando com a resposta')
//     // é possível acessar os dados da reposta e realizar transformações antes
//     console.log(res.body);
//   });
//
// });

Vue.use(VueRouter)
Vue.use(VeeValidate, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});

const router = new VueRouter({
  routes,
  mode: "history"
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
