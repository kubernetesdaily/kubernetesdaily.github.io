import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/mizar.js
var require_mizar = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/mizar.js"(exports, module) {
    module.exports = mizar;
    mizar.displayName = "mizar";
    mizar.aliases = [];
    function mizar(Prism) {
      Prism.languages.mizar = {
        comment: /::.+/,
        keyword: /@proof\b|\b(?:according|aggregate|all|and|antonym|are|as|associativity|assume|asymmetry|attr|be|begin|being|by|canceled|case|cases|clusters?|coherence|commutativity|compatibility|connectedness|consider|consistency|constructors|contradiction|correctness|def|deffunc|define|definitions?|defpred|do|does|end|environ|equals|ex|exactly|existence|for|from|func|given|hence|hereby|holds|idempotence|identity|iff?|implies|involutiveness|irreflexivity|is|it|let|means|mode|non|not|notations?|now|of|or|otherwise|over|per|pred|prefix|projectivity|proof|provided|qua|reconsider|redefine|reduce|reducibility|reflexivity|registrations?|requirements|reserve|sch|schemes?|section|selector|set|sethood|st|struct|such|suppose|symmetry|synonym|take|that|the|then|theorems?|thesis|thus|to|transitivity|uniqueness|vocabular(?:ies|y)|when|where|with|wrt)\b/,
        parameter: {
          pattern: /\$(?:10|\d)/,
          alias: "variable"
        },
        variable: /\b\w+(?=:)/,
        number: /(?:\b|-)\d+\b/,
        operator: /\.\.\.|->|&|\.?=/,
        punctuation: /\(#|#\)|[,:;\[\](){}]/
      };
    }
  }
});

export {
  require_mizar
};
//# sourceMappingURL=chunk-L2HRRRGW.js.map
