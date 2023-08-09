import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/style.less'
import './assets/font/iconfont.css'
// import hljs from 'highlight.js';
// import 'highlight.js/styles/atom-one-dark.css'	//样式

// // 高亮提示
// Vue.directive('highlight', function (el) {
//   let blocks = el.querySelectorAll('pre code');
//   blocks.forEach((block) => {
//     hljs.highlightBlock(block)
//   })
// })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
