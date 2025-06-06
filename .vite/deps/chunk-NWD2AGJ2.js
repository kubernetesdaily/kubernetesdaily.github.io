import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/t4-templating.js
var require_t4_templating = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/t4-templating.js"(exports, module) {
    module.exports = t4Templating;
    t4Templating.displayName = "t4Templating";
    t4Templating.aliases = [];
    function t4Templating(Prism) {
      ;
      (function(Prism2) {
        function createBlock(prefix, inside, contentAlias) {
          return {
            pattern: RegExp("<#" + prefix + "[\\s\\S]*?#>"),
            alias: "block",
            inside: {
              delimiter: {
                pattern: RegExp("^<#" + prefix + "|#>$"),
                alias: "important"
              },
              content: {
                pattern: /[\s\S]+/,
                inside,
                alias: contentAlias
              }
            }
          };
        }
        function createT4(insideLang) {
          var grammar = Prism2.languages[insideLang];
          var className = "language-" + insideLang;
          return {
            block: {
              pattern: /<#[\s\S]+?#>/,
              inside: {
                directive: createBlock("@", {
                  "attr-value": {
                    pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/,
                    inside: {
                      punctuation: /^=|^["']|["']$/
                    }
                  },
                  keyword: /\b\w+(?=\s)/,
                  "attr-name": /\b\w+/
                }),
                expression: createBlock("=", grammar, className),
                "class-feature": createBlock("\\+", grammar, className),
                standard: createBlock("", grammar, className)
              }
            }
          };
        }
        Prism2.languages["t4-templating"] = Object.defineProperty({}, "createT4", {
          value: createT4
        });
      })(Prism);
    }
  }
});

export {
  require_t4_templating
};
//# sourceMappingURL=chunk-NWD2AGJ2.js.map
