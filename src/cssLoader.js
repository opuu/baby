const style = {
  ".h1": {
    width: "1px",
    height: "1px",
    backgroundColor: "red",
    transform: "rotateZ(45deg)",
    marginTop: "calc(100% - 20%)",
  },
  ".h3 h4": {
    width: "1px",
    height: "1px",
    backgroundColor: "red",
    transform: "rotateZ(45deg)",
    marginTop: "calc(100% - 20%)",
  },
};
const styleToString = (style) => {
  let styles = "";
  for (var key in style) {
    if (style.hasOwnProperty(key)) {
      styles += key + " { " + toCss(style[key]) + "}";
    }
  }
  return styles;
};

function toCss(params) {
  return Object.keys(params).reduce(
    (acc, key) =>
      acc +
      key
        .split(/(?=[A-Z])/)
        .join("-")
        .toLowerCase() +
      ":" +
      params[key] +
      ";",
    ""
  );
}

console.log(styleToString(style));
