import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

const url_default = "https://jsonplaceholder.typicode.com/photos";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list_images: [],
    image_selected: [],
    loading_images: true,
  },

  mutations: {
    commit_list_of_images(state, payload_list_images) {
      state.list_images.push(...payload_list_images);
    },
    commit_loading_images_boolean(state, payload_loading_images) {
      return (state.loading_images = payload_loading_images);
    },

    commit_filtered_list_of_images(state, payload) {
      let cardIndex;
      for (let i = 0; i < state.list_images.length; i++) {
        if (state.list_images[i].id == payload) {
          cardIndex = i;
          break;
        }
      }
      return state.list_images.splice(cardIndex, 1);
    },
  },

  getters: {
    getListOfImages(state) {
      return state.list_images;
    },

    getBooleanLoadingImages(state) {
      return state.loading_images;
    },
  },

  actions: {
    booleanPermission({ commit }) {
      commit("commit_loading_images_boolean", true);
    },
    async actionListOfImages({ commit, state }, payload) {
      if (state.loading_images) {
        axios
          .get(url_default)
          .then(async (data) => {
            let sum_for_slice =
              state.list_images.length + parseInt(payload.limitPerCall);

            const append = data.data.slice(
              state.list_images.length,
              sum_for_slice
            );

            commit("commit_list_of_images", append);
            commit("commit_loading_images_boolean", false);
          })
          .catch((error) => {
            console.log(error);
            commit("commit_loading_images_boolean", false);
          });
      }
    },

    deleteSelectedCard({ commit }, payload) {
      commit("commit_filtered_list_of_images", payload.id);
    },

    getSpecificImage({ commit }, payload_id_image) {
      let params = payload_id_image;

      if (payload_id_image) {
        axios
          .get(url_default, { params: params })
          .then((data) => {
            commit("commit_list_of_images", data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
});
