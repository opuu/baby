function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Baby JS Framework
 * @version 0.0.1
 */
var Baby = /*#__PURE__*/function () {
  /**
   * Baby Class
   * @param {object} props required props to initialize the framework.
   */
  function Baby(props) {
    _classCallCheck(this, Baby);

    // Asign props to $ variable
    this.$ = props; // Asign component to comps variable

    var comps = this.$.components; // Get all components and add them to $.data

    for (var index in comps) {
      if (comps.hasOwnProperty(index)) {
        this.$.data = _objectSpread(_objectSpread({}, this.data), comps);
      }
    } // Combine all methods and computed methods in $.data


    this.$.data = _objectSpread(_objectSpread(_objectSpread({}, this.$.data), this.$.methods), this.$.computed); // Set value of this as $.data

    this.$.created.call(this.$.data);
    this.$.mounted.call(this.$.data); // We don't need them anymore.

    delete this.$.components;
    delete this.$.methods;
    delete this.$.computed;
  }
  /**
   * Get the data from $.data
   */


  _createClass(Baby, [{
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.matches("[data-click]")) {
        event.preventDefault();
        console.log(this);
        console.log("this.$.data." + event.target.dataset.click);
        eval("this.$.data." + event.target.dataset.click);
      }
    }
  }, {
    key: "listener",
    value: function listener() {
      document.addEventListener("click", this.handleClick, false);
    }
  }, {
    key: "render",
    value: function render() {
      var html = this.$.template.call(this.$.data);
      document.querySelector(this.$.main).innerHTML = html;
      this.listener();
    }
  }, {
    key: "data",
    get: function get() {
      return this.$.data;
    }
    /**
     * Set the data to $.data
     */
    ,
    set: function set(data) {
      // if not an object throw error
      if (_typeof(data) !== "object") {
        console.error("[Baby] TypeError: Data must be an object ".concat(_typeof(data), " given."));
      } // Update the data in $.data


      this.$.data = _objectSpread(_objectSpread({}, this.$.data), data); // Rerender the page

      this.render();
    }
  }]);

  return Baby;
}(); // export them


export { Baby };