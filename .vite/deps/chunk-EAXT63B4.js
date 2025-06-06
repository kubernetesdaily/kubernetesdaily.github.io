import {
  require_markup_templating
} from "./chunk-MU3HEQT6.js";
import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/handlebars.js
var require_handlebars = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/handlebars.js"(exports, module) {
    var refractorMarkupTemplating = require_markup_templating();
    module.exports = handlebars;
    handlebars.displayName = "handlebars";
    handlebars.aliases = ["hbs"];
    function handlebars(Prism) {
      Prism.register(refractorMarkupTemplating);
      (function(Prism2) {
        Prism2.languages.handlebars = {
          comment: /\{\{![\s\S]*?\}\}/,
          delimiter: {
            pattern: /^\{\{\{?|\}\}\}?$/,
            alias: "punctuation"
          },
          string: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
          number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][+-]?\d+)?/,
          boolean: /\b(?:false|true)\b/,
          block: {
            pattern: /^(\s*(?:~\s*)?)[#\/]\S+?(?=\s*(?:~\s*)?$|\s)/,
            lookbehind: true,
            alias: "keyword"
          },
          brackets: {
            pattern: /\[[^\]]+\]/,
            inside: {
              punctuation: /\[|\]/,
              variable: /[\s\S]+/
            }
          },
          punctuation: /[!"#%&':()*+,.\/;<=>@\[\\\]^`{|}~]/,
          variable: /[^!"#%&'()*+,\/;<=>@\[\\\]^`{|}~\s]+/
        };
        Prism2.hooks.add("before-tokenize", function(env) {
          var handlebarsPattern = /\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/g;
          Prism2.languages["markup-templating"].buildPlaceholders(
            env,
            "handlebars",
            handlebarsPattern
          );
        });
        Prism2.hooks.add("after-tokenize", function(env) {
          Prism2.languages["markup-templating"].tokenizePlaceholders(
            env,
            "handlebars"
          );
        });
        Prism2.languages.hbs = Prism2.languages.handlebars;
      })(Prism);
    }
  }
});

export {
  require_handlebars
};
//# sourceMappingURL=chunk-EAXT63B4.js.map
