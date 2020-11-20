<template>
  <article class="post">
    <div class="activity-title-wrapper">
      <h4 class="activity-title">{{ activity.title }}</h4>
      <i
        class="fas fa-cog activity-settings"
        @click="isMenuDisplayed = !isMenuDisplayed"
      />
    </div>
    <!-- burda categories-i 1 saniye vaxt sonra aliriq. 1 saniye vaxta qeder categories-in ici bos olur. ona gore de consoleda text undefined error aliriq.
    bunun qarsisini almaq ucun App.vue id="activityApp"-e v-if veririk -->
    <p>{{ textUtility_capitalize(categories[activity.category].text) }}</p>
    <p>{{ activity.notes }}</p>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="../assets/user.png" />
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">Filip Jerga</a> updated
            {{ activity.updatedAt | prettyTime }} &nbsp;
            <!-- prettyTime - filter functiondir  -->
          </p>
        </div>
      </div>
      <div class="media-right">
        <span
          >Progress
          <!-- :style-daki color class color yox, color:red-deki colordu ve 
          style ile yazanda css style taginde color-red:{color:red} kimi classlar elave etmeye ehtiyac yoxdur -->
          <!-- <span :class="'color-' + activityProgress" -->
          <span :style="{ color: activityProgress }"
            >{{ activity.progress }} %</span
          >
        </span>
      </div>
    </div>
    <div v-if="isMenuDisplayed" class="activity-controll">
      <!-- eslint-plugin-vue error --- $emit(toggleUpdate)
         **v-on event listeners inside DOM templates will be automatically transformed to lowercase (due to HTML’s case-insensitivity), 
            so v-on:myEvent would become v-on:myevent – making myEvent impossible to listen to.
            For these reasons, we recommend you always use kebab-case for event names. -->

      <!--emit etmemisden once edit butonuna klikleyen hec ne olmurdu. cunki activityitem emit verende, parenti app.vue idi, 
          hal hazirda edit butonumuz activityitemdetailde olduguna gore, emit ederek activityitem-e gondermek lazimdir ki, buton islesin.
          emit etdiyimizde, ilk event adi yazilir, ikinci hansi deyeri gondereceyimiz. meqsedimiz edite klikleyende activityupdatein acilmagidir.
          buna gore de biz activityitem-da isUpdateActive false verdiyimiz ucun, emitle true deyeri gondererek, isUpdateactive true edib, hemin componenti aciriq -->
      <a class="button is-warning" @click="$emit('toggle-update', true)"
        >Edit</a
      >
      <a class="button is-danger" @click="deleteActivity">Delete</a>
    </div>
  </article>
</template>

<script>
import textUtility from "@/mixins/textUtility";
import store from "@/store";

export default {
  mixins: [textUtility],
  props: ["categories", "activity"],
  data() {
    return {
      isMenuDisplayed: false,
    };
  },
  computed: {
    activityProgress() {
      const progress = this.activity.progress;

      if (progress <= 0) {
        return "red";
      } else if (progress <= 50) {
        return "orange";
      } else {
        return "green";
      }
    },
  },
  methods: {
    deleteActivity() {
      /**eventi emit edende child-dan parente gedir. ona gore parent hansidirsa, orda emiti qebul etmelisen */
      /**storedan sonra emit eventi silinir. cunki artiq apilarla islemirik */
      // this.$emit("activityDeleted", this.activity);
      store.deleteActivity(this.activity);
      /* store.deleteActivity() storedaki deleteActivitydir, methods deyil. moterize icerisine de sileceyimiz activityni yaziriq .
      yazdiqdan sonra storedaki deleteactivity-ye then() elave ederek improve edirik
      */
    },
  },
};
</script>

<style lang="scss" scoped>
/* templatede :class ile style deyisende css styleda da classlar elave etmeliyik,
yox eger :style ile yaziriqsa, css styleda class elave etmeye ehtiyac yoxdur. ona gore commente alinib */
/* .color-red {
  color: red;
}
.color-orange {
  color: orange;
}
.color-green {
  color: green;
} */

.post h4 {
  margin-bottom: 5px;
}

.activity-title {
  margin-bottom: 5px;
  display: inline-block;
}
.activity-settings {
  float: right;
  font-size: 22px;
  &:hover {
    cursor: pointer;
  }
}
.activity-controll {
  margin: 20px 0 0 0;
  a {
    margin-right: 5px;
  }
}
</style>