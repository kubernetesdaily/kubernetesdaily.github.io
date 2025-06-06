import {
  require_java
} from "./chunk-5QTRC3JG.js";
import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/scala.js
var require_scala = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/scala.js"(exports, module) {
    var refractorJava = require_java();
    module.exports = scala;
    scala.displayName = "scala";
    scala.aliases = [];
    function scala(Prism) {
      Prism.register(refractorJava);
      Prism.languages.scala = Prism.languages.extend("java", {
        "triple-quoted-string": {
          pattern: /"""[\s\S]*?"""/,
          greedy: true,
          alias: "string"
        },
        string: {
          pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
          greedy: true
        },
        keyword: /<-|=>|\b(?:abstract|case|catch|class|def|do|else|extends|final|finally|for|forSome|if|implicit|import|lazy|match|new|null|object|override|package|private|protected|return|sealed|self|super|this|throw|trait|try|type|val|var|while|with|yield)\b/,
        number: /\b0x(?:[\da-f]*\.)?[\da-f]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e\d+)?[dfl]?/i,
        builtin: /\b(?:Any|AnyRef|AnyVal|Boolean|Byte|Char|Double|Float|Int|Long|Nothing|Short|String|Unit)\b/,
        symbol: /'[^\d\s\\]\w*/
      });
      Prism.languages.insertBefore("scala", "triple-quoted-string", {
        "string-interpolation": {
          pattern: /\b[a-z]\w*(?:"""(?:[^$]|\$(?:[^{]|\{(?:[^{}]|\{[^{}]*\})*\}))*?"""|"(?:[^$"\r\n]|\$(?:[^{]|\{(?:[^{}]|\{[^{}]*\})*\}))*")/i,
          greedy: true,
          inside: {
            id: {
              pattern: /^\w+/,
              greedy: true,
              alias: "function"
            },
            escape: {
              pattern: /\\\$"|\$[$"]/,
              greedy: true,
              alias: "symbol"
            },
            interpolation: {
              pattern: /\$(?:\w+|\{(?:[^{}]|\{[^{}]*\})*\})/,
              greedy: true,
              inside: {
                punctuation: /^\$\{?|\}$/,
                expression: {
                  pattern: /[\s\S]+/,
                  inside: Prism.languages.scala
                }
              }
            },
            string: /[\s\S]+/
          }
        }
      });
      delete Prism.languages.scala["class-name"];
      delete Prism.languages.scala["function"];
    }
  }
});

export {
  require_scala
};
//# sourceMappingURL=chunk-CDWX4QY7.js.map
