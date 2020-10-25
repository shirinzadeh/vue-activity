import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App), //(App) yox, hansisa html code yazsaq browserde onu render edecek, yeni gosterecek. hal hazirda app.vue-daki kodlari render edir
}).$mount('#app') //vue index.htmle mounting edir
