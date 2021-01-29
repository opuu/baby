export default function newElement(name, data, template) {
  class CustomElem extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      const interpolateUrl = (string, values) =>
        string.replace(/{{(.*?)}}/g, (match, offset) => values[offset]);

      this.innerHTML = interpolateUrl(template, data);
    }
  }
  customElements.define(name, CustomElem);
}

newElement("bb-span", { text: "Text" }, `<p>{{text}}</p>`);
newElement("bb-div", { name: "Opu" }, `<p>{{name}}</p>`);
