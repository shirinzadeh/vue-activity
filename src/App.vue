<template>
  <div id="activityApp">
    <!-- burdaki activityApp id'sinin app id'si ile elaqesi yoxdur. bu id sadece htmli style etmek ucundur -->
    <nav class="navbar is-white topNav">
      <div class="container">
        <div class="navbar-brand">
          <h1>Activity Planner</h1>
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
          <a
            @click="toggleFormDisplay"
            v-if="!isFormDisplayed"
            class="button is-primary is-block is-alt is-large"
            href="#"
            >New Activity</a
          >
          <div v-if="isFormDisplayed" class="create-form">
            <h2>Create Activity</h2>
            <form>
              <div class="field">
                <label class="label">Title</label>
                <div class="control">
                  <input
                    v-model="newActivity.title"
                    class="input"
                    type="text"
                    placeholder="Read a Book"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Notes</label>
                <div class="control">
                  <textarea
                    v-model="newActivity.notes"
                    class="textarea"
                    placeholder="Textarea"
                  ></textarea>
                </div>
              </div>
              <div class="field is-grouped">
                <div class="control">
                  <button
                    @click="createActivity"
                    :disabled="!isFormValid"
                    class="button is-link"
                  >
                    Create Activity
                  </button>
                </div>
                <div class="control">
                  <button @click="toggleFormDisplay" class="button is-text">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="column is-9">
          <div class="box content">
            <ActivityItem
              v-for="activity in activities"
              v-bind:activity="activity"
              v-bind:key="activity.id"
            >
            </ActivityItem>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ActivityItem from "@/components/ActivityItem.vue";
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
  components: { ActivityItem }, //html template ActivityItem-e reference edirik
  data() {
    //data vue-goalsda oldugu kimi object deyil, functiondir ve object return edir
    return {
      isFormDisplayed: false,
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
      newActivity: {
        title: "",
        notes: "",
      },
      user: {},
      activities: {},
      categories: {},
    };
  },
  computed: {
    isFormValid() {
      return this.newActivity.title && this.newActivity.notes;
    },
  },
  created() {
    //fetchActivities-i cagirmaliyiq. cagirmaq ucun variable assign etmeliyik. o da activities objectidir
    this.activities = fetchActivities();
    this.user = fetchUser();
    this.categories = fetchCategories();
  },
  methods: {
    toggleFormDisplay() {
      this.isFormDisplayed = !this.isFormDisplayed;
      this.isButtonDisplayed = !this.isButtonDisplayed;
    },
    createActivity() {
      alert(this.newActivity.title, this.newActivity.notes);
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
</style>
