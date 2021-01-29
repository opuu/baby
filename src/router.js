// export default
class Router {
  constructor(config) {
    let that = this;
    // get routes
    this.routes = config.routes;
    // get the root of application
    this.root = config.root;
    // route object of home
    this.home = config.home;
    // start matching
    this.match();
    // listen for changes
    window.addEventListener("popstate", function () {
      that.match();
    });
  }

  /**
   * Remove first and last slashes from strings
   * @param {string} string replace starting and ending slashes
   */
  removeSlash(string) {
    if (string.charAt(0) == "/") string = string.substr(1);
    if (string.charAt(string.length - 1) == "/")
      string = string.substr(0, string.length - 1);
    return string;
  }

  pushState(data) {
    window.history.pushState(
      data,
      data.name,
      window.location.origin + this.root + data.path
    );
    that.match();
  }

  push(obj) {
    if (obj.name) {
      let data = this.routes.find((x) => x.name === obj.name);
      this.pushState(data);
    }
    if (obj.path) {
      let data = this.routes.find((x) => x.path === obj.path);
      this.pushState(data);
    }
    if (typeof obj !== "object") {
      window.history.pushState({}, "", window.location.origin + obj);
      that.match();
    }
  }

  match() {
    // current path
    let url = this.removeSlash(window.location.pathname);

    // if home page stop here
    if (this.removeSlash(this.root) === url) {
      let route = {
        path: this.root,
        params: {},
      };
      this.$route = { ...this.home, ...route };
      return true;
    } else {
      // loop all routes
      for (let route of this.routes) {
        // route path
        let path = this.removeSlash(this.root + route.path);
        // if not exact match check for parameters
        let routeMatcher = new RegExp(path.replace(/:[^\s/]+/g, "([\\w-]+)"));
        // array of matched routes
        let match = url.match(routeMatcher);
        // if matched route is not null
        if (match !== null) {
          // slice the path by /
          let currentRoute = path.split("/");
          // slice the url by /
          let matchedRoute = Array.from(match)[0].split("/");
          // pair current route with matched route params
          let params = matchedRoute.reduce(function (result, field, index) {
            // skip params with same key and value
            if (currentRoute[index] !== field) {
              result[currentRoute[index].replace(":", "")] = field;
            }
            // return teh result
            return result;
          }, {});

          // store the url params to params object
          params = { params: params };
          // basic route info
          route = {
            path: this.root + match[0],
            name: route.name,
          };

          // combine params object with route info
          this.$route = { ...params, ...route };
        } else {
          // 404 page
          let route = {
            path: window.location.pathname,
            params: {},
          };
          this.$route = { ...this.error, ...route };
          return false;
        }
      }
    }
  }
}

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
