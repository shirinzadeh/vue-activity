/** Datalari yeni activity-ni categories-i app.vue-da yazdigimiza gore, her defe yeni component yaradanda, emit etdiyimizde parent elementi 
 * app.vue olmadigina gore emit ede bilmirik. Buna gore de store yaradiriq ve butun datalari store-a elave edib, melumatlara storedan yiyelenirik
 * 
 * store objectdir*/

import fakeApi from '@/lib/fakeApi'
import Vue from 'vue'

const store = {
  state: {
    activities: {},
    categories: {}
  },
  generateUid() {
    return Math.floor(new Date() * Math.random())
  },
  fetchActivities() {
    return fakeApi.get('activities', { force: 1 })
      .then((activities) => {
        /**bu formada yaza bilmerik. 
         * Cunki objectlerle islediyimizde Vue.set istifade edirik. Bu biraz qeliz olacaq. cunki we need set each activity individually
         */
        // this.state.activity = activities;
        // return activities;

        /**Object olduguna gore ilk arraya cevirmeliyik */
        //key burda activity keydir. qisa olsun deye key yazilib
        Object.keys(activities).forEach((key) => {
          /** categoriesle oxsar kod olduguna gore abstract edildi */
          // Vue.set(this.state.activities, key, activities[key])
          this.setItem('activities', key, activities[key])

          return activities
        })
      })
  },
  fetchCategories() {
    return fakeApi.get('categories', { force: 1 })
      .then(categories => {
        // this.state.categories = categories;
        Object.keys(categories).forEach((key) => {
          // Vue.set(this.state.categories, key, categories[key])
          this.setItem('categories', key, categories[key])
        })
        return categories;
      })
  },

  fetchUser() {
    return {
      name: "Filip Jerga",
      id: "-Aj34jknvncx98812",
    }
  },
  //we will get here newActivity
  createActivity(activity) {
    activity.id = this.generateUid()
    activity.progress = 0
    activity.updatedAt = new Date()
    activity.createdAt = new Date()

    return fakeApi.post('activities', activity) //we want to add this under activities, and want to save our activity
      .then(createdActivity => {
        /**burda Vue.setle yazilir. ancaq Vue.seti abstract etdiyimiz ucun bele yazildi */
        this.setItem('activities', createdActivity.id, createdActivity)
      })
  },

  deleteActivity(activity) {
    return fakeApi.delete('activities', activity)
      /**then bloku chain edirik, if we are having activity back */
      .then((deletedActivity) => {
        /**moterize icerisindeki ilk silmek istediyimizi yaziriq(yeni statedeki activities)
         * ikincisi, we want to delete activity by id
        */
        Vue.delete(this.state.activities, activity.id);
        return deletedActivity;
      })
  },

  setItem(resource, id, item) {
    Vue.set(this.state[resource], id, item)
  },

}

export default store;