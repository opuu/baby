export default function Home(props) {
  return {
    data: {
      name: "Template",
      color: "red",
    },
    props: props,
    render: function () {
      return html`
        <h1>
          ${this.data.name}
          <h2>${this.props.name}</h2>
          <button>click</button>
        </h1>
      `;
    },
    style: function () {
      return /*css*/ `
        .style {
          color: ${this.color};
        }
      `;
    },
  };
}
