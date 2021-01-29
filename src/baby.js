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
