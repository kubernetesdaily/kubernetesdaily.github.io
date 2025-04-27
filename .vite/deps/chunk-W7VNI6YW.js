import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/highlight.js/lib/languages/ldif.js
var require_ldif = __commonJS({
  "node_modules/highlight.js/lib/languages/ldif.js"(exports, module) {
    function ldif(hljs) {
      return {
        name: "LDIF",
        contains: [
          {
            className: "attribute",
            begin: "^dn",
            end: ": ",
            excludeEnd: true,
            starts: {
              end: "$",
              relevance: 0
            },
            relevance: 10
          },
          {
            className: "attribute",
            begin: "^\\w",
            end: ": ",
            excludeEnd: true,
            starts: {
              end: "$",
              relevance: 0
            }
          },
          {
            className: "literal",
            begin: "^-",
            end: "$"
          },
          hljs.HASH_COMMENT_MODE
        ]
      };
    }
    module.exports = ldif;
  }
});

export {
  require_ldif
};
//# sourceMappingURL=chunk-W7VNI6YW.js.map
