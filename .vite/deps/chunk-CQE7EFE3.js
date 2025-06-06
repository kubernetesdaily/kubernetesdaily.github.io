import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/llvm.js
var require_llvm = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/llvm.js"(exports, module) {
    module.exports = llvm;
    llvm.displayName = "llvm";
    llvm.aliases = [];
    function llvm(Prism) {
      ;
      (function(Prism2) {
        Prism2.languages.llvm = {
          comment: /;.*/,
          string: {
            pattern: /"[^"]*"/,
            greedy: true
          },
          boolean: /\b(?:false|true)\b/,
          variable: /[%@!#](?:(?!\d)(?:[-$.\w]|\\[a-f\d]{2})+|\d+)/i,
          label: /(?!\d)(?:[-$.\w]|\\[a-f\d]{2})+:/i,
          type: {
            pattern: /\b(?:double|float|fp128|half|i[1-9]\d*|label|metadata|ppc_fp128|token|void|x86_fp80|x86_mmx)\b/,
            alias: "class-name"
          },
          keyword: /\b[a-z_][a-z_0-9]*\b/,
          number: /[+-]?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b|\b0x[\dA-Fa-f]+\b|\b0xK[\dA-Fa-f]{20}\b|\b0x[ML][\dA-Fa-f]{32}\b|\b0xH[\dA-Fa-f]{4}\b/,
          punctuation: /[{}[\];(),.!*=<>]/
        };
      })(Prism);
    }
  }
});

export {
  require_llvm
};
//# sourceMappingURL=chunk-CQE7EFE3.js.map
