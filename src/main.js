import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import {
  Popup,
  Button,
  Slider,
  Field,
  Cell,
  CellGroup,
  SwipeCell,
  Form,
  Overlay,
  Icon,
} from "vant";
import "vant/lib/index.css";

Vue.use(Overlay);
Vue.use(Form);
Vue.use(Icon);
Vue.use(SwipeCell);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Field);
Vue.use(Slider);
Vue.use(Button);
Vue.use(Popup);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
