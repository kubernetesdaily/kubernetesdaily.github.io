import {
  require_markup_templating
} from "./chunk-MU3HEQT6.js";
import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/twig.js
var require_twig = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/twig.js"(exports, module) {
    var refractorMarkupTemplating = require_markup_templating();
    module.exports = twig;
    twig.displayName = "twig";
    twig.aliases = [];
    function twig(Prism) {
      Prism.register(refractorMarkupTemplating);
      Prism.languages.twig = {
        comment: /^\{#[\s\S]*?#\}$/,
        "tag-name": {
          pattern: /(^\{%-?\s*)\w+/,
          lookbehind: true,
          alias: "keyword"
        },
        delimiter: {
          pattern: /^\{[{%]-?|-?[%}]\}$/,
          alias: "punctuation"
        },
        string: {
          pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
          inside: {
            punctuation: /^['"]|['"]$/
          }
        },
        keyword: /\b(?:even|if|odd)\b/,
        boolean: /\b(?:false|null|true)\b/,
        number: /\b0x[\dA-Fa-f]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][-+]?\d+)?/,
        operator: [
          {
            pattern: /(\s)(?:and|b-and|b-or|b-xor|ends with|in|is|matches|not|or|same as|starts with)(?=\s)/,
            lookbehind: true
          },
          /[=<>]=?|!=|\*\*?|\/\/?|\?:?|[-+~%|]/
        ],
        punctuation: /[()\[\]{}:.,]/
      };
      Prism.hooks.add("before-tokenize", function(env) {
        if (env.language !== "twig") {
          return;
        }
        var pattern = /\{(?:#[\s\S]*?#|%[\s\S]*?%|\{[\s\S]*?\})\}/g;
        Prism.languages["markup-templating"].buildPlaceholders(env, "twig", pattern);
      });
      Prism.hooks.add("after-tokenize", function(env) {
        Prism.languages["markup-templating"].tokenizePlaceholders(env, "twig");
      });
    }
  }
});

export {
  require_twig
};
//# sourceMappingURL=chunk-7Y7MBDVR.js.map
