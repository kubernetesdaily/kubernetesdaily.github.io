import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/ada.js
var require_ada = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/ada.js"(exports, module) {
    module.exports = ada;
    ada.displayName = "ada";
    ada.aliases = [];
    function ada(Prism) {
      Prism.languages.ada = {
        comment: /--.*/,
        string: /"(?:""|[^"\r\f\n])*"/,
        number: [
          {
            pattern: /\b\d(?:_?\d)*#[\dA-F](?:_?[\dA-F])*(?:\.[\dA-F](?:_?[\dA-F])*)?#(?:E[+-]?\d(?:_?\d)*)?/i
          },
          {
            pattern: /\b\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:E[+-]?\d(?:_?\d)*)?\b/i
          }
        ],
        "attr-name": /\b'\w+/,
        keyword: /\b(?:abort|abs|abstract|accept|access|aliased|all|and|array|at|begin|body|case|constant|declare|delay|delta|digits|do|else|elsif|end|entry|exception|exit|for|function|generic|goto|if|in|interface|is|limited|loop|mod|new|not|null|of|others|out|overriding|package|pragma|private|procedure|protected|raise|range|record|rem|renames|requeue|return|reverse|select|separate|some|subtype|synchronized|tagged|task|terminate|then|type|until|use|when|while|with|xor)\b/i,
        boolean: /\b(?:false|true)\b/i,
        operator: /<[=>]?|>=?|=>?|:=|\/=?|\*\*?|[&+-]/,
        punctuation: /\.\.?|[,;():]/,
        char: /'.'/,
        variable: /\b[a-z](?:\w)*\b/i
      };
    }
  }
});

export {
  require_ada
};
//# sourceMappingURL=chunk-KTEMXW4H.js.map
