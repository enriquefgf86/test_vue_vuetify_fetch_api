<template>
  <v-container id="container_card">
    <v-card
      max-width="150"
      max-height="130"
      outlined
      class="jumpy_card"
      elevation="24"
      id="card"
      data-test="card"
    >
      <div class="jumpy_card_inner_side">
        <div class="jumpy_card_front_side">
          <img
            :id="single_card.id"
            @click="deleteCardSelected($event)"
            :src="single_card.url"
            class="image_card"
            data-testid='img_card'
          />
        </div>
        <div class="jumpy_card_back_side" @click="deleteCardSelected($event)">
          <h5>{{ single_card.title }}</h5>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex"; //importando las accione de vuex

export default {
  name: "single-card",
  props: {
    single_card: Object,
  },
  data() {
    return {
      images: [],
      expand: false,
    };
  },
  methods: {
    ...mapActions(["getSpecificImage", "actionListOfImages"]),
    deleteCardSelected(event) {
      if (event) {
        this.$store.dispatch("deleteSelectedCard", { id: event.target.id });
      }
    },
  },
  computed: {
    ...mapGetters(["getListOfImages"]),
  },
  created() {
    this.getSpecificImage();
    this.getListOfImages;
    this.actionListOfImages();
    this.getAllImages;
    this.deleteCardSelected();
  },
};
</script>

<style>
#container_card {
  width: 150px;
  height: 150px;
}
.image_card {
  max-width: 150px;
  max-height: 128px;
}
.jumpy_card {
  width: 130px;
  height: 150px;
}
.jumpy_card {
  background-color: transparent;
  perspective: 1000px;
}

.jumpy_card_inner_side {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}
.jumpy_card_inner_side,
.jumpy_card,
.jumpy_card_front_side,
.jumpy_card_back_side,
#card,
.image_card {
  border-radius: 16%;
}

.jumpy_card:hover .jumpy_card_inner_side {
  transform: rotateY(180deg);
}

.jumpy_card_front_side,
.jumpy_card_back_side {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.jumpy_card_front_side {
  background-color: #bbb;
  color: black;
}

.jumpy_card_back_side {
  background-color: white !important;
  color: black;
  transform: rotateY(180deg);
}
</style>
