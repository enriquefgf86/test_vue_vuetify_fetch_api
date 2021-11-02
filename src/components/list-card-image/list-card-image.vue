<template>
  <v-container>
    <v-container
      justify-center
      align-center
      v-if="getListOfImagesComputed"
      id="grid"
      v-on:scroll="onScrollGetimages($event)"
    >
      <v-container class="text_field"
        ><v-text-field
          data-test="text-field"
          label="Set the length of elements in the call"
          :rules="rulesOnlyNumbers"
          hide-details="auto"
          v-model="limit_per_call"
        ></v-text-field
      ></v-container>
      <v-container class="d-flex justify-center"
        ><v-btn class="mx-2" fab dark large color="purple">
          {{ images.length }}
        </v-btn></v-container
      >

      <transition-group
        name="fade-in"
        mode="out-in"
        id="loop_container"
        class="mt-16"
      >
        <single-card
          data-test="data"
          v-for="(imgs, index) in images"
          v-bind:key="index"
          :single_card="imgs"
        >
        </single-card>
      </transition-group>
    </v-container>
    <v-container class="d-flex justify-center">
      <v-btn
        v-show="$vuetify.breakpoint.lgAndUp && images.length < 22"
        :disabled="!$vuetify.breakpoint.lgAndDown && !images.length < 22"
        class="mx-2"
        dark
        large
        color="purple"
        @click="getAllImages()"
      >
        Load More
      </v-btn>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "list-card-image",
  data() {
    return {
      images: [],
      limit_per_call: 15,
      rulesOnlyNumbers: [
        (v) => {
          if (!v.trim()) return true;
          if (!isNaN(parseFloat(v)) && v >= 0) return true;
          return alert("You need to write a number here");
        },
      ],
    };
  },

  methods: {
    ...mapActions(["actionListOfImages", "actionListOfImages"]),
    loadMoreImages() {
      this.$store.dispatch("booleanPermission", {});
    },
    async getAllImages() {
      await this.loadMoreImages();
      let limit_per_call = await this.limit_per_call;
      this.$store.dispatch("actionListOfImages", {
        limitPerCall: limit_per_call,
      });
    },

    onScrollGetimages(event) {
      if (event) {
        if (
          event.target.scrollTop + event.target.clientHeight >=
          event.target.scrollHeight
        ) {
          this.getAllImages();
        }
      }
    },
  },
  computed: {
    ...mapGetters(["getListOfImages", "getBooleanLoadingImages"]),

    getListOfImagesComputed() {
      return this.$store.getters.getListOfImages;
    },

    getBooleanLoadingImagesComputed() {
      return this.$store.getters.getBooleanLoadingImages;
    },
  },
  watch: {
    getListOfImagesComputed() {
      this.images = this.$store.getters.getListOfImages;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScrollGetimages());
  },
  created() {
    this.getAllImages();
  },
};
</script>

<style>
.fade-in-enter-active {
  transition: all 1.5s ease;
}

.fade-in-leave-active {
  transition: all 1.5s ease;
}

.fade-in-enter,
.fade-in-leave-to {
  position: absolute; /* add for smooth transition between elements */
  opacity: 0;
}
#button_load_images {
  position: fixed;
  z-index: 3;
}
#grid {
  width: 100%;
  overflow: scroll;
}
#loop_container {
  display: flex;
  flex-direction: row !important;
  flex-wrap: wrap;
  width: 100%;
  height: 24rem;
}
.text_field {
  max-width: 300px;
}
</style>
