import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/highlight.js/lib/languages/smalltalk.js
var require_smalltalk = __commonJS({
  "node_modules/highlight.js/lib/languages/smalltalk.js"(exports, module) {
    function smalltalk(hljs) {
      const VAR_IDENT_RE = "[a-z][a-zA-Z0-9_]*";
      const CHAR = {
        className: "string",
        begin: "\\$.{1}"
      };
      const SYMBOL = {
        className: "symbol",
        begin: "#" + hljs.UNDERSCORE_IDENT_RE
      };
      return {
        name: "Smalltalk",
        aliases: ["st"],
        keywords: "self super nil true false thisContext",
        // only 6
        contains: [
          hljs.COMMENT('"', '"'),
          hljs.APOS_STRING_MODE,
          {
            className: "type",
            begin: "\\b[A-Z][A-Za-z0-9_]*",
            relevance: 0
          },
          {
            begin: VAR_IDENT_RE + ":",
            relevance: 0
          },
          hljs.C_NUMBER_MODE,
          SYMBOL,
          CHAR,
          {
            // This looks more complicated than needed to avoid combinatorial
            // explosion under V8. It effectively means `| var1 var2 ... |` with
            // whitespace adjacent to `|` being optional.
            begin: "\\|[ ]*" + VAR_IDENT_RE + "([ ]+" + VAR_IDENT_RE + ")*[ ]*\\|",
            returnBegin: true,
            end: /\|/,
            illegal: /\S/,
            contains: [{
              begin: "(\\|[ ]*)?" + VAR_IDENT_RE
            }]
          },
          {
            begin: "#\\(",
            end: "\\)",
            contains: [
              hljs.APOS_STRING_MODE,
              CHAR,
              hljs.C_NUMBER_MODE,
              SYMBOL
            ]
          }
        ]
      };
    }
    module.exports = smalltalk;
  }
});

export {
  require_smalltalk
};
//# sourceMappingURL=chunk-365M56ON.js.map
