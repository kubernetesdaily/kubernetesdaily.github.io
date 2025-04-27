import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/highlight.js/lib/languages/clean.js
var require_clean = __commonJS({
  "node_modules/highlight.js/lib/languages/clean.js"(exports, module) {
    function clean(hljs) {
      return {
        name: "Clean",
        aliases: [
          "icl",
          "dcl"
        ],
        keywords: {
          keyword: "if let in with where case of class instance otherwise implementation definition system module from import qualified as special code inline foreign export ccall stdcall generic derive infix infixl infixr",
          built_in: "Int Real Char Bool",
          literal: "True False"
        },
        contains: [
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.C_NUMBER_MODE,
          {
            // relevance booster
            begin: "->|<-[|:]?|#!?|>>=|\\{\\||\\|\\}|:==|=:|<>"
          }
        ]
      };
    }
    module.exports = clean;
  }
});

export {
  require_clean
};
//# sourceMappingURL=chunk-FG42CWTM.js.map
