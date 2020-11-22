<template>
  <!-- eger activities ve categoriesimiz varsa, yeni bos deyilse, display our components.
  oncesinde v-if="activities && categories" yazilib. daha yaxsi gorsensin deye computed propery yaradildi  -->
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
    <TheNavbar />
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <!-- child elementde(ActivityCreate) activityCreated eventi emit olanda,parent elementde(App.vue) @activityCreated yazaraq catch edirik.
          bu event emitted olanda da addActivity function cagiririq, sonrasinda methodda addActivity funct yaradiriq -->
          <!-- sending categories value to categories props. birincisi propsdu, ikincisi value -->
          <ActivityCreate :categories="categories" />
          <!-- @activityCreated="addActivity" store ile islediyimiz ucun artiq bu evente ehtiyac yoxdur. commente ala bilmek ucun tagin icinden cixartdim
          ve eventin yaratdigi addactivity function da methodsdan silinir-->
        </div>
        <div class="column is-9">
          <!-- if is fetching true, we assign to div fetching class.. if we have error, assign div has-error class  -->
          <!-- has-error`da tire olduguna gore dirnaq icinde yazmaliyiq, fetching classini dirnaq icinde yazmaga ehtiyac yoxdur 
            when we use dash(-) we cannot write as a key of obkect(has-error). so we write it inside ' ', 
            because dash is now allowed when we are providing key to our object -->
          <div
            class="box content"
            :class="{ fetching: isFetching, 'has-error': error }"
          >
            <!--baslangicda error null-dur.api-da promise reject olanda catch() ile err receive edib, object error-a beraber etmisdik.
            belelikle promise reject olsa rejecte ne yazmisiqsa error objectimiz icinde o olur. -->
            <!-- bu kodda da eger error varsa, error display etsin, yoxdusa ActivityItem display etsin  -->
            <!-- v-for ile v-else qarismasin deye ActivityItem-i div-e aliriq -->
            <div v-if="error">{{ error }}</div>

            <div v-else>
              <!-- fetching oldugu 2 saniye erzinde Loading... yazisi gorsedecek. bu divi ActivityItem-den sonra da yazmaq olar -->
              <div v-if="isFetching">Loading...</div>
              <!-- isdataloaded evvel #activityApp divine yazilmisdi. Ancaq ele olanda activityleri silende, ekranda hec ne gorsenmir  -->
              <div v-if="isDataLoaded">
                <ActivityItem
                  v-for="activity in activities"
                  :activity="activity"
                  :categories="categories"
                  :key="activity.id"
                />
              </div>
              <!-- @activityDeleted="handleActivityDelete" APilarla islediyimizde istifade etmisdik. store isledenden sonra silinir
                Bu kod eslinde activity item icinde olmalidir, sadece commente ala bilmek ucun çölünə çıxartdım
                ve eventin yaratdigi function da methodsdan silinir-->
            </div>

            <!-- bura v-if yazmasaq fetching oldugu 2 saniye erzinde Loading...-in asagisinda 'Currently activities' yazisi gorsenir.
fetching true-dusa bu yazi gorsenirse, fetching false olanda gorsenmeyecek -->
            <div v-if="!isFetching">
              <div class="activity-length">
                Currently {{ activityLength }} activities
              </div>
              <div class="activity-motivation">{{ activityMotivation }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import store from "./store";
import fakeApi from "@/lib/fakeApi";

import ActivityItem from "@/components/ActivityItem";
import ActivityCreate from "@/components/ActivityCreate";
import TheNavbar from "@/components/TheNavbar";
// ????? niye fetchactivites import edende {} ile yazilir. function olduguna gore?

/**Artiq datani apidan yox, storedan elde etdiyimize gore, api import edilmir */
// import {
//   fetchActivities,
//   fetchUser,
//   fetchCategories,
//   deleteActivityAPI,
// } from "@/api";
/*@ yazanda avtomatik src faylindaki folderlere baxir. ic ice cox folder olsa noqte ile folder mueyyen etmek cetinlesecek
                                        ./api da yazmaq olar, ./api/index de yazmaq olar. 
                                        sadece ./api yazanda avtomatik api folder icinde index.js-e yonlenir.
                                        eger api icinde js faylinin adi index deyilse ./api/fayl-adi seklinde yazilmalidir
                                        */
export default {
  name: "app",
  components: { ActivityItem, ActivityCreate, TheNavbar }, //html template ActivityItem-e reference edirik
  data() {
    const {
      state: { activities, categories },
    } = store;

    //data vue-goalsda oldugu kimi object deyil, functiondir ve object return edir
    return {
      creator: "Tahmasib Shirinzada",
      appName: "Activity Planner",
      // wathcedAppName: "Activity Planner by Tahmasib Shirinzada",
      isFetching: false,
      error: null,
      user: {},
      /* ilk basda activities ve categoriesde datalar yazilir. sonra hemin datalar js faylina kocurulur ve app.vueda empty object formasinda
        yazilir. empty object olaraq qalsa, #activityApp-de v-if hemise pass kececek.
      buna gore activities ve categories null etmeliyik. cunki  bizim bu deyerimiz yoxdur, empty object olsa da bele.
      
      store import edenden sonra activities ve categoriesi storedan qebul edeceyimiz ucun artiq null deyeri verilmir*/
      // activities: {},
      // categories: {},
      // activities: null,
      // categories: null,

      /**store import etdikden sonra ilk 
       activities: store.state.activities kimi yazmaq olar. ama qisaltmaq ucun | const {state} = store | deyeri yaradilir. O zaman
       activities: state.activities       kimi yazilir. daha da qisaltmaq ucun | const {state: {activities,categories}} =store | deyeri verilir.O zaman
       activities: activities             kimi yazilir. Bu halda eyni key name, ve value name oldugu ucun sadece
       activities                         kimi yaza bilerik. 
        * 
      */
      activities,
      categories,
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
    activitiesLength() {
      return Object.keys(this.activities).length;
    },
    categoriesLength() {
      return Object.keys(this.categories).length;
    },
    isDataLoaded() {
      /**activities ve categories storedan eristikten sonra bu kod deyisir
       * storeda activities ve categories array ilk basda emptydi, sonradan activity elave etdikce dolur.
       * eger activities ve categories dolu objectdirse, yeni uzunlugu varsa, Datani yukle
       */
      // return this.activities && this.categories;
      return this.activitiesLength && this.categoriesLength;
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
    //DO NOT FORGET! WE JUST WRITE THIS CODE ONCE. AFTER STORE THE DATA IN LOCAL STORAGE, WE MUST COMMENT OR DELETE THIS LINE
    // fakeApi.fillDB();

    //before fetching activities we set isFetching to true, because we are fetching data
    this.isFetching = true;
    //fetchActivities-i cagirmaliyiq. cagirmaq ucun variable assign etmeliyik. o da activities objectidir
    /**store importdan sonra fetchactivities, fetchcategories ve digerlerini storedan qebul etdiyimize gore qarsisina store. yazmaliyiq  */
    store
      .fetchActivities()
      /*then() - moterize icerisinde eslinde data-dir. biz datamizin activity oldugunu bilirik deye then(activity) yazdiq. ferqi yoxdur*/
      .then((activities) => {
        // component activitiesi (activities:{}), then() blokundan qebul etdiyimiz activities-e beraber edirik
        /**here we assign this.activities to activities. store import etdikden sonra bu setir silinir. 
                                            Cunki artiq activities-e storedan assign etmeliyik*/
        // this.activities = activities;
        //when our data is resolved, we can sey isfetching to false
        this.isFetching = false;
      })
      //
      .catch((err) => {
        this.error = err; // err - apida promise reject olanda cixan netice
        this.isFetching = false; //if we receive error that means we are not fetching any data
      });
    this.user = store.fetchUser();
    // this.categories = fetchCategories(); evvel bele idi. fakeApi.jsde promise return etdik deye, fetchcategoriese then() elave etmeliyik
    /* in a promise we receive data in then() */
    store.fetchCategories().then((categories) => {
      // this.categories = categories;
      /** store import etdikden sonra categoriese de activities de oldugu kimi storedan fetchCategories-e then bloku elave ederek
       *  assign etmeliyik deye bu setir silnr */
    });
  },
  methods: {
    /**storela islediyimiz ucun emit eventine de ehtiyac olmadigi ucun, eventle yaratdigimiz addactvity function da silinir */
    //we will get our new activity
    // addActivity(newActivity) {
    //   /*bir object diger objecte Vue.set() ile elave edilir. moterizede 3 deyer girilir.
    //   1ci hansi objecte elave edilecek, 2ci hansi key adinda objecti bu objecte elave edesiyik, 3cu elave edilecek object*/
    //   Vue.set(this.activities, newActivity.id, newActivity);
    //   /* console.log(newActivity); consoleda object formasinda category,notes,title cixacaq.
    //   amma biz hem de id,progress,updatedat,createdat de elde etmeliyik. ona gore index.js-de yeni funct yaradib, bu melumatlari ora elave edirik*/
    // },
    /** APIlarla islediyimizde bu kodu yazilib. store import etdikten sonra bu kod silinir. */
    // handleActivityDelete(activity) {
    //   /**deleteActivityAPI(activity) --- activityni silmek istediyimiz ucun moterizeye activity yaziriq
    //    * then() we will get activity inside then. but specify it deletedActivity.. cunki then icerisinde aldigimiz bu activity sileceyimiz activitydi
    //    * eslinde then blokunda moterize icerisine ne yazagamizin onemi yoxdu. cunki thende qayidan data-di. sadece kod anlasilan olsun deye  yazilir
    //    */
    //   store.deleteActivityAPI(activity).then((deletedActivity) => {
    //     Vue.delete(
    //       this.activities,
    //       deletedActivity.id
    //     ); /**bu setri yazmadan da bizim activity silinir, sadece browserde app vueda da silinmesi ucun yazilmalidir*/
    //   });
    // },
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
.fetching {
  border: 2px solid orange;
}
.has-error {
  border: 2px solid red;
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
