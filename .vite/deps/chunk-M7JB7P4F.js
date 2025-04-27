import {
  require_php
} from "./chunk-DUCQ4BTN.js";
import {
  require_markup_templating
} from "./chunk-MU3HEQT6.js";
import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/latte.js
var require_latte = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/latte.js"(exports, module) {
    var refractorMarkupTemplating = require_markup_templating();
    var refractorPhp = require_php();
    module.exports = latte;
    latte.displayName = "latte";
    latte.aliases = [];
    function latte(Prism) {
      Prism.register(refractorMarkupTemplating);
      Prism.register(refractorPhp);
      (function(Prism2) {
        Prism2.languages.latte = {
          comment: /^\{\*[\s\S]*/,
          "latte-tag": {
            // https://latte.nette.org/en/tags
            pattern: /(^\{(?:\/(?=[a-z]))?)(?:[=_]|[a-z]\w*\b(?!\())/i,
            lookbehind: true,
            alias: "important"
          },
          delimiter: {
            pattern: /^\{\/?|\}$/,
            alias: "punctuation"
          },
          php: {
            pattern: /\S(?:[\s\S]*\S)?/,
            alias: "language-php",
            inside: Prism2.languages.php
          }
        };
        var markupLatte = Prism2.languages.extend("markup", {});
        Prism2.languages.insertBefore(
          "inside",
          "attr-value",
          {
            "n-attr": {
              pattern: /n:[\w-]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+))?/,
              inside: {
                "attr-name": {
                  pattern: /^[^\s=]+/,
                  alias: "important"
                },
                "attr-value": {
                  pattern: /=[\s\S]+/,
                  inside: {
                    punctuation: [
                      /^=/,
                      {
                        pattern: /^(\s*)["']|["']$/,
                        lookbehind: true
                      }
                    ],
                    php: {
                      pattern: /\S(?:[\s\S]*\S)?/,
                      inside: Prism2.languages.php
                    }
                  }
                }
              }
            }
          },
          markupLatte.tag
        );
        Prism2.hooks.add("before-tokenize", function(env) {
          if (env.language !== "latte") {
            return;
          }
          var lattePattern = /\{\*[\s\S]*?\*\}|\{[^'"\s{}*](?:[^"'/{}]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|\/\*(?:[^*]|\*(?!\/))*\*\/)*\}/g;
          Prism2.languages["markup-templating"].buildPlaceholders(
            env,
            "latte",
            lattePattern
          );
          env.grammar = markupLatte;
        });
        Prism2.hooks.add("after-tokenize", function(env) {
          Prism2.languages["markup-templating"].tokenizePlaceholders(env, "latte");
        });
      })(Prism);
    }
  }
});

export {
  require_latte
};
//# sourceMappingURL=chunk-M7JB7P4F.js.map
