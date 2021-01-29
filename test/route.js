let routes = [
  {
    path: "about",
    name: "About",
    component: "componenet to be loaded",
    meta: {
      title: "About page",
      description: "This is about page",
    },
  },
  {
    path: "blog",
    name: "Blog",
    component: "componenet to be loaded",
    meta: {
      title: "About page",
      description: "This is about page",
    },
  },
  {
    path: "blog/:id",
    name: "BlogP",
    component: "componenet to be loaded",
    meta: {
      title: "About page",
      description: "This is about page",
    },
  },
];

let route = new Router({
  root: "/",
  home: {
    name: "Home",
    component: "Home component",
    meta: {
      title: "About page",
      description: "This is about page",
    },
  },
  error: {
    name: "404",
    component: "404 component",
    meta: {
      title: "About page",
      description: "This is about page",
    },
  },
  routes,
});

window.route = route;
console.log(route);
