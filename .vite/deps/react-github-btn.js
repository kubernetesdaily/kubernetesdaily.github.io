import {
  require_react
} from "./chunk-TWJRYSII.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/react-github-btn/index.js
var import_react = __toESM(require_react());
var GitHubButton = class extends import_react.PureComponent {
  constructor(props) {
    super(props);
    this.$ = import_react.default.createRef();
    this._ = import_react.default.createRef();
  }
  render() {
    return import_react.default.createElement("span", { ref: this.$ }, import_react.default.createElement("a", { ...this.props, ref: this._ }, this.props.children));
  }
  componentDidMount() {
    this.paint();
  }
  getSnapshotBeforeUpdate() {
    this.reset();
    return null;
  }
  componentDidUpdate() {
    this.paint();
  }
  componentWillUnmount() {
    this.reset();
  }
  paint() {
    const _ = this.$.current.appendChild(document.createElement("span"));
    import(
      /* webpackMode: "eager" */
      "./buttons.esm-2ODEPCPE.js"
    ).then(({ render }) => {
      if (this._.current != null) {
        render(_.appendChild(this._.current), function(el) {
          try {
            _.parentNode.replaceChild(el, _);
          } catch (_2) {
          }
        });
      }
    });
  }
  reset() {
    this.$.current.replaceChild(this._.current, this.$.current.lastChild);
  }
};
var react_github_btn_default = GitHubButton;
export {
  react_github_btn_default as default
};
//# sourceMappingURL=react-github-btn.js.map
