/**
 * Baby JS Framework
 * @version 0.0.1
 */
class Baby {
  /**
   * Baby Class
   * @param {object} props required props to initialize the framework.
   */
  constructor(props) {
    // Asign props to $ variable
    this.$ = props;
    // Asign component to comps variable
    let comps = this.$.components;
    // Get all components and add them to $.data
    for (var index in comps) {
      if (comps.hasOwnProperty(index)) {
        this.$.data = { ...this.data, ...comps };
      }
    }

    // Combine all methods and computed methods in $.data
    this.$.data = {
      ...this.$.data,
      ...this.$.methods,
      ...this.$.computed,
    };

    // Set value of this as $.data
    this.$.created.call(this.$.data);
    this.$.mounted.call(this.$.data);

    // We don't need them anymore.
    delete this.$.components;
    delete this.$.methods;
    delete this.$.computed;
  }

  /**
   * Get the data from $.data
   */
  get data() {
    return this.$.data;
  }

  /**
   * Set the data to $.data
   */
  set data(data) {
    // if not an object throw error
    if (typeof data !== "object") {
      console.error(
        `[Baby] TypeError: Data must be an object ${typeof data} given.`
      );
    }
    // Update the data in $.data
    this.$.data = { ...this.$.data, ...data };
    // Rerender the page
    this.render();
  }

  handleClick(event) {
    if (event.target.matches("[data-click]")) {
      event.preventDefault();
      console.log(this);
      console.log("this.$.data." + event.target.dataset.click);
      eval("this.$.data." + event.target.dataset.click);
    }
  }

  listener() {
    document.addEventListener("click", this.handleClick, false);
  }

  render() {
    let html = this.$.template.call(this.$.data);
    document.querySelector(this.$.main).innerHTML = html;
    this.listener();
  }
}

// export them
export { Baby };

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

  // push state and path
  pushState(data) {
    window.history.pushState(
      data,
      data.name,
      window.location.origin + this.root + data.path
    );
    that.match();
  }

  // push routes
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

export { Router };
