function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// export default
var Router = /*#__PURE__*/function () {
  function Router(config) {
    _classCallCheck(this, Router);

    var that = this; // get routes

    this.routes = config.routes; // get the root of application

    this.root = config.root; // route object of home

    this.home = config.home; // start matching

    this.match(); // listen for changes

    window.addEventListener("popstate", function () {
      that.match();
    });
  }
  /**
   * Remove first and last slashes from strings
   * @param {string} string replace starting and ending slashes
   */


  _createClass(Router, [{
    key: "removeSlash",
    value: function removeSlash(string) {
      if (string.charAt(0) == "/") string = string.substr(1);
      if (string.charAt(string.length - 1) == "/") string = string.substr(0, string.length - 1);
      return string;
    } // push state and path

  }, {
    key: "pushState",
    value: function pushState(data) {
      window.history.pushState(data, data.name, window.location.origin + this.root + data.path);
      that.match();
    } // push routes

  }, {
    key: "push",
    value: function push(obj) {
      if (obj.name) {
        var data = this.routes.find(function (x) {
          return x.name === obj.name;
        });
        this.pushState(data);
      }

      if (obj.path) {
        var _data = this.routes.find(function (x) {
          return x.path === obj.path;
        });

        this.pushState(_data);
      }

      if (_typeof(obj) !== "object") {
        window.history.pushState({}, "", window.location.origin + obj);
        that.match();
      }
    }
  }, {
    key: "match",
    value: function match() {
      var _this = this;

      // current path
      var url = this.removeSlash(window.location.pathname); // if home page stop here

      if (this.removeSlash(this.root) === url) {
        var route = {
          path: this.root,
          params: {}
        };
        this.$route = _objectSpread(_objectSpread({}, this.home), route);
        return true;
      } else {
        // loop all routes
        var _iterator = _createForOfIteratorHelper(this.routes),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _route = _step.value;
            // route path
            var path = this.removeSlash(this.root + _route.path); // if not exact match check for parameters

            var routeMatcher = new RegExp(path.replace(/:[^\s/]+/g, "([\\w-]+)")); // array of matched routes

            var match = url.match(routeMatcher); // if matched route is not null

            if (match !== null) {
              (function () {
                // slice the path by /
                var currentRoute = path.split("/"); // slice the url by /

                var matchedRoute = Array.from(match)[0].split("/"); // pair current route with matched route params

                var params = matchedRoute.reduce(function (result, field, index) {
                  // skip params with same key and value
                  if (currentRoute[index] !== field) {
                    result[currentRoute[index].replace(":", "")] = field;
                  } // return teh result


                  return result;
                }, {}); // store the url params to params object

                params = {
                  params: params
                }; // basic route info

                _route = {
                  path: _this.root + match[0],
                  name: _route.name
                }; // combine params object with route info

                _this.$route = _objectSpread(_objectSpread({}, params), _route);
              })();
            } else {
              // 404 page
              var _route2 = {
                path: window.location.pathname,
                params: {}
              };
              this.$route = _objectSpread(_objectSpread({}, this.error), _route2);
              return false;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
  }]);

  return Router;
}();

export { Router };