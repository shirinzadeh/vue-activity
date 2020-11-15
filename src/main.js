import Vue from 'vue'
import App from './App.vue'
/* activityitemde dogru zaman formatini eks etdirmek ucun moment library yukleyirik. npm install --save moment*/
import moment from 'moment'

Vue.config.productionTip = false

/*filter adeten bir value alir
componentde istediyimiz deyerden sonra | yazib, filter functionun adini yaziriq */
// Vue.filter('uppercase', function (value) {
//   if (!value) return ''

//   return value.toUpperCase();
// })

Vue.filter('prettyTime', function (timeStamp) {
  if (!timeStamp) return ''

  return moment(timeStamp).format('LLL')
})

new Vue({
  render: h => h(App), //(App) yox, hansisa html code yazsaq browserde onu render edecek, yeni gosterecek. hal hazirda app.vue-daki kodlari render edir
}).$mount('#app') //vue index.htmle mounting edir
