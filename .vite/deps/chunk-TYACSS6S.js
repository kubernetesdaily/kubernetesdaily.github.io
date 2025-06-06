import {
  require_markup_templating
} from "./chunk-MU3HEQT6.js";
import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/tt2.js
var require_tt2 = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/tt2.js"(exports, module) {
    var refractorMarkupTemplating = require_markup_templating();
    module.exports = tt2;
    tt2.displayName = "tt2";
    tt2.aliases = [];
    function tt2(Prism) {
      Prism.register(refractorMarkupTemplating);
      (function(Prism2) {
        Prism2.languages.tt2 = Prism2.languages.extend("clike", {
          comment: /#.*|\[%#[\s\S]*?%\]/,
          keyword: /\b(?:BLOCK|CALL|CASE|CATCH|CLEAR|DEBUG|DEFAULT|ELSE|ELSIF|END|FILTER|FINAL|FOREACH|GET|IF|IN|INCLUDE|INSERT|LAST|MACRO|META|NEXT|PERL|PROCESS|RAWPERL|RETURN|SET|STOP|SWITCH|TAGS|THROW|TRY|UNLESS|USE|WHILE|WRAPPER)\b/,
          punctuation: /[[\]{},()]/
        });
        Prism2.languages.insertBefore("tt2", "number", {
          operator: /=[>=]?|!=?|<=?|>=?|&&|\|\|?|\b(?:and|not|or)\b/,
          variable: {
            pattern: /\b[a-z]\w*(?:\s*\.\s*(?:\d+|\$?[a-z]\w*))*\b/i
          }
        });
        Prism2.languages.insertBefore("tt2", "keyword", {
          delimiter: {
            pattern: /^(?:\[%|%%)-?|-?%\]$/,
            alias: "punctuation"
          }
        });
        Prism2.languages.insertBefore("tt2", "string", {
          "single-quoted-string": {
            pattern: /'[^\\']*(?:\\[\s\S][^\\']*)*'/,
            greedy: true,
            alias: "string"
          },
          "double-quoted-string": {
            pattern: /"[^\\"]*(?:\\[\s\S][^\\"]*)*"/,
            greedy: true,
            alias: "string",
            inside: {
              variable: {
                pattern: /\$(?:[a-z]\w*(?:\.(?:\d+|\$?[a-z]\w*))*)/i
              }
            }
          }
        });
        delete Prism2.languages.tt2.string;
        Prism2.hooks.add("before-tokenize", function(env) {
          var tt2Pattern = /\[%[\s\S]+?%\]/g;
          Prism2.languages["markup-templating"].buildPlaceholders(
            env,
            "tt2",
            tt2Pattern
          );
        });
        Prism2.hooks.add("after-tokenize", function(env) {
          Prism2.languages["markup-templating"].tokenizePlaceholders(env, "tt2");
        });
      })(Prism);
    }
  }
});

export {
  require_tt2
};
//# sourceMappingURL=chunk-TYACSS6S.js.map
