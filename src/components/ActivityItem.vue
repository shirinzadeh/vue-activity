<template>
  <div>
    <ActivityItemUpdate
      v-if="isUpdateActive"
      :activity="activity"
      :categories="categories"
      @toggle-update="changeUpdateState"
    />
    <ActivityItemDetail
      v-else
      :activity="activity"
      :categories="categories"
      @toggle-update="changeUpdateState"
    />
    <!-- emit etdiyimizde girdiyimiz event adini @ ile yazaraq qebul edirik. daha sonra hemin hemin evente function giririk.  
        hemin functionla emit ederken gonderdiyimiz deyeri qebul edirik -->
  </div>
</template>

<script>
import ActivityItemDetail from "./ActivityItemDetail";
import ActivityItemUpdate from "./ActivityItemUpdate";

export default {
  components: {
    ActivityItemDetail,
    ActivityItemUpdate,
  },
  props: {
    activity: {
      required: true,
      type: Object,
    },
    categories: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      isUpdateActive: false,
    };
  },
  methods: {
    /**burada isUpdate emitle gonderdiyimiz deyerdir, yeni true */
    changeUpdateState(isUpdate) {
      this.isUpdateActive = isUpdate;
    },
  },
};
</script>

<style scoped>
</style>