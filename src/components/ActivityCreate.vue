<template>
  <div class="activityCreateForm">
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
        <div class="field">
          <label class="label">Categories</label>
          <div class="control">
            <select v-model="newActivity.category" class="select">
              <option disabled value="">Please select one</option>
              <option v-for="category in categories" :key="category.id">
                {{ category.text }}
                <!-- bu kodda, optionda neyi secsek, vue consoleda da newactivity-nin category bolmesinde o gorsenecek.
                      cunki v-model ile optiondan elde etdiyimizi ora yaziriq.
                      :value="category.id" de elave etsek, newactivity ctegory-ye gondereceyimiz deyer categorynin id-si olacaq  -->
              </option>
            </select>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button
              @click.prevent="createActivity"
              :disabled="!isFormValid"
              class="button is-link"
            >
              Create Activity
            </button>
          </div>
          <div class="control">
            <button @click.prevent="toggleFormDisplay" class="button is-text">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { createActivityAPI } from "@/api";

export default {
  props: ["categories"],
  data() {
    return {
      isFormDisplayed: false,
      newActivity: {
        title: "",
        notes: "",
        category: "",
      },
    };
  },
  computed: {
    isFormValid() {
      //when title notes and category sections are full,form is valid
      return (
        this.newActivity.title &&
        this.newActivity.notes &&
        this.newActivity.category
      );
    },
  },
  methods: {
    toggleFormDisplay() {
      this.isFormDisplayed = !this.isFormDisplayed;
      this.isButtonDisplayed = !this.isButtonDisplayed;
    },
    resetActivity() {
      this.newActivity.title = "";
      this.newActivity.notes = "";
      this.newActivity.category = "";
    },
    createActivity() {
      createActivityAPI({ ...this.newActivity })
        .then((activity) => {
          this.resetActivity();
          this.isFormDisplayed = false;
          this.$emit("activityCreated", { ...activity }); // ... means copy of this object
        })
        .catch((err) => {
          console.log(err);
        });
      //activityCreated -emitting event name
      // this.newActivity - providing newactivity object we are filling in our form
      // this.$emit("activityCreated", this.newActivity);

      // debugger;
      // const activity = createActivityAPI(this.newActivity);
      // this.$emit("activityCreated", { ...activity });
    },
  },
};
</script>

<style scoped>
</style>