import Vue from 'vue'
import App from './App.vue'
//引入ag-grid的样式文件，也可放main.js文件全局引用
//引入ag-grid的样式文件，也可放main.js文件全局引用
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
// 加载 element 组件库
import ElementUI from 'element-ui'

// 加载 element 组件库的样式
import 'element-ui/lib/theme-chalk/index.css'

import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'

Vue.use(contentmenu)
// 全局注册 element 组件库
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
}).$mount('#app')
