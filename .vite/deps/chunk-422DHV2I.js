import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/jq.js
var require_jq = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/jq.js"(exports, module) {
    module.exports = jq;
    jq.displayName = "jq";
    jq.aliases = [];
    function jq(Prism) {
      ;
      (function(Prism2) {
        var interpolation = /\\\((?:[^()]|\([^()]*\))*\)/.source;
        var string = RegExp(
          /(^|[^\\])"(?:[^"\r\n\\]|\\[^\r\n(]|__)*"/.source.replace(
            /__/g,
            function() {
              return interpolation;
            }
          )
        );
        var stringInterpolation = {
          interpolation: {
            pattern: RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + interpolation),
            lookbehind: true,
            inside: {
              content: {
                pattern: /^(\\\()[\s\S]+(?=\)$)/,
                lookbehind: true,
                inside: null
                // see below
              },
              punctuation: /^\\\(|\)$/
            }
          }
        };
        var jq2 = Prism2.languages.jq = {
          comment: /#.*/,
          property: {
            pattern: RegExp(string.source + /(?=\s*:(?!:))/.source),
            lookbehind: true,
            greedy: true,
            inside: stringInterpolation
          },
          string: {
            pattern: string,
            lookbehind: true,
            greedy: true,
            inside: stringInterpolation
          },
          function: {
            pattern: /(\bdef\s+)[a-z_]\w+/i,
            lookbehind: true
          },
          variable: /\B\$\w+/,
          "property-literal": {
            pattern: /\b[a-z_]\w*(?=\s*:(?!:))/i,
            alias: "property"
          },
          keyword: /\b(?:as|break|catch|def|elif|else|end|foreach|if|import|include|label|module|modulemeta|null|reduce|then|try|while)\b/,
          boolean: /\b(?:false|true)\b/,
          number: /(?:\b\d+\.|\B\.)?\b\d+(?:[eE][+-]?\d+)?\b/,
          operator: [
            {
              pattern: /\|=?/,
              alias: "pipe"
            },
            /\.\.|[!=<>]?=|\?\/\/|\/\/=?|[-+*/%]=?|[<>?]|\b(?:and|not|or)\b/
          ],
          "c-style-function": {
            pattern: /\b[a-z_]\w*(?=\s*\()/i,
            alias: "function"
          },
          punctuation: /::|[()\[\]{},:;]|\.(?=\s*[\[\w$])/,
          dot: {
            pattern: /\./,
            alias: "important"
          }
        };
        stringInterpolation.interpolation.inside.content.inside = jq2;
      })(Prism);
    }
  }
});

export {
  require_jq
};
//# sourceMappingURL=chunk-422DHV2I.js.map
