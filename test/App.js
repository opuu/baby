import { Baby } from "./../src/baby.js";
import BabyView from "../src/BabyView.js";
import Home from "../test/template.js";

let baby = new Baby({
  main: "#app",
  data: {
    name: "Opu",
  },
  components: { home: Home, new: Home },
  methods: {
    method() {
      console.log(this);
    },
  },
  computed: {
    name2() {
      return this.name + this.name;
    },
  },
  mounted: function () {
    console.log(this);
  },
  created: function () {
    console.log(this);
  },
  template: function () {
    return /*html*/ `<div>${this.home(this).template()}</div>`;
  },
});

baby.render();

console.log(typeof baby);
