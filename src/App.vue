<template>
  <div id="activityApp">
    <!-- burdaki activityApp id'sinin app id'si ile elaqesi yoxdur. bu id sadece htmli style etmek ucundur -->
    <nav class="navbar is-white topNav">
      <div class="container">
        <div class="navbar-brand">
          <h1>{{ fullAppName }}</h1>
          <!-- <h1>{{ wathcedAppName }}</h1> -->
        </div>
      </div>
    </nav>
    <nav class="navbar is-white">
      <div class="container">
        <div class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item is-active" href="#">Newest</a>
            <a class="navbar-item" href="#">In Progress</a>
            <a class="navbar-item" href="#">Finished</a>
          </div>
        </div>
      </div>
    </nav>
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <!-- child elementde(ActivityCreate) activityCreated eventi emit olanda,parent elementde(App.vue) @activityCreated yazaraq catch edirik.
          bu event emitted olanda da addActivity function cagiririq, sonrasinda methodda addActivity funct yaradiriq -->
          <!-- sending categories value to categories props. birincisi propsdu, ikincisi value -->
          <ActivityCreate
            @activityCreated="addActivity"
            :categories="categories"
          />
        </div>
        <div class="column is-9">
          <div class="box content">
            <ActivityItem
              v-for="activity in activities"
              v-bind:activity="activity"
              v-bind:key="activity.id"
            >
            </ActivityItem>
            <div class="activity-length">
              Currently {{ activityLength }} activities
            </div>
            <div class="activity-motivation">{{ activityMotivation }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import ActivityItem from "@/components/ActivityItem.vue";
import ActivityCreate from "@/components/ActivityCreate.vue";
// ????? niye fetchactivites import edende {} ile yazilir. function olduguna gore?
import {
  fetchActivities,
  fetchUser,
  fetchCategories,
} from "@/api"; /*@ yazanda avtomatik src faylindaki folderlere baxir. ic ice cox folder olsa noqte ile folder mueyyen etmek cetinlesecek
                                        ./api da yazmaq olar, ./api/index de yazmaq olar. 
                                        sadece ./api yazanda avtomatik api folder icinde index.js-e yonlenir.
                                        eger api icinde js faylinin adi index deyilse ./api/fayl-adi seklinde yazilmalidir
                                        */
export default {
  name: "app",
  components: { ActivityItem, ActivityCreate }, //html template ActivityItem-e reference edirik
  data() {
    //data vue-goalsda oldugu kimi object deyil, functiondir ve object return edir
    return {
      creator: "Tahmasib Shirinzada",
      appName: "Activity Planner",
      wathcedAppName: "Activity Planner by Tahmasib Shirinzada",
      employees: {
        first: {
          name: "tuh",
          id: "253",
        },
        second: {
          name: "reus",
          id: "534",
        },
      },
      user: {},
      activities: {},
      categories: {},
    };
  },
  computed: {
    fullAppName() {
      return this.appName + " by " + this.creator;
    },
    activityLength() {
      return Object.keys(this.activities).length;
    },
    activityMotivation() {
      if (this.activityLength && this.activityLength <= 5) {
        return "Nice to see some acitivities";
      } else if (this.activityLength > 5) {
        return "More than 5 activities";
      } else {
        return "No activities";
      }
    },
  },
  // watch: {
  //   creator(val) {
  //     this.wathcedAppName = this.appName + " by " + val;
  //   },
  //   appName(val) {
  //     this.wathcedAppName = val + " by " + this.creator;
  //   },
  // },
  created() {
    //fetchActivities-i cagirmaliyiq. cagirmaq ucun variable assign etmeliyik. o da activities objectidir
    this.activities = fetchActivities();
    this.user = fetchUser();
    this.categories = fetchCategories();
  },
  methods: {
    //we will get our new activity
    addActivity(newActivity) {
      /*bir object diger objecte Vue.set() ile elave edilir. moterizede 3 deyer girilir.
      1ci hansi objecte elave edilecek, 2ci hansi key adinda objecti bu objecte elave edesiyik, 3cu elave edilecek object*/
      Vue.set(this.activities, newActivity.id, newActivity);
      /* console.log(newActivity); consoleda object formasinda category,notes,title cixacaq. 
      amma biz hem de id,progress,updatedat,createdat de elde etmeliyik. ona gore index.js-de yeni funct yaradib, bu melumatlari ora elave edirik*/
    },
  },
};
</script>

<style>
#activityApp {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html,
body {
  font-family: "Open Sans", serif;
  background: #f2f6fa;
}
footer {
  background-color: #f2f6fa !important;
}
.topNav {
  border-top: 5px solid #3498db;
}
.topNav .container {
  border-bottom: 1px solid #e6eaee;
}
.container .columns {
  margin: 3rem 0;
}
.navbar-menu .navbar-item {
  padding: 0 2rem;
}
aside.menu {
  padding-top: 3rem;
}
aside.menu .menu-list {
  line-height: 1.5;
}
aside.menu .menu-label {
  padding-left: 10px;
  font-weight: 700;
}
.button.is-primary.is-alt {
  background: #00c6ff;
  background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
  background: linear-gradient(to bottom, #0072ff, #00c6ff);
  font-weight: 700;
  font-size: 14px;
  height: 3rem;
  line-height: 2.8;
}
.media-left img {
  border-radius: 50%;
}
.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8f99a3;
}
article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e6eaee;
}
article.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
.menu-list li {
  padding: 5px;
}

.navbar-brand > h1 {
  font-size: 31px;
  padding: 20px;
}

.activity-length {
  display: inline-block;
}

.activity-motivation {
  float: right;
}
</style>
