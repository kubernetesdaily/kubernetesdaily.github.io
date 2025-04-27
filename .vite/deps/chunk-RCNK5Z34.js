import {
  require_markup_templating
} from "./chunk-MU3HEQT6.js";
import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/ejs.js
var require_ejs = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/ejs.js"(exports, module) {
    var refractorMarkupTemplating = require_markup_templating();
    module.exports = ejs;
    ejs.displayName = "ejs";
    ejs.aliases = ["eta"];
    function ejs(Prism) {
      Prism.register(refractorMarkupTemplating);
      (function(Prism2) {
        Prism2.languages.ejs = {
          delimiter: {
            pattern: /^<%[-_=]?|[-_]?%>$/,
            alias: "punctuation"
          },
          comment: /^#[\s\S]*/,
          "language-javascript": {
            pattern: /[\s\S]+/,
            inside: Prism2.languages.javascript
          }
        };
        Prism2.hooks.add("before-tokenize", function(env) {
          var ejsPattern = /<%(?!%)[\s\S]+?%>/g;
          Prism2.languages["markup-templating"].buildPlaceholders(
            env,
            "ejs",
            ejsPattern
          );
        });
        Prism2.hooks.add("after-tokenize", function(env) {
          Prism2.languages["markup-templating"].tokenizePlaceholders(env, "ejs");
        });
        Prism2.languages.eta = Prism2.languages.ejs;
      })(Prism);
    }
  }
});

export {
  require_ejs
};
//# sourceMappingURL=chunk-RCNK5Z34.js.map
