import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/highlight.js/lib/languages/clojure-repl.js
var require_clojure_repl = __commonJS({
  "node_modules/highlight.js/lib/languages/clojure-repl.js"(exports, module) {
    function clojureRepl(hljs) {
      return {
        name: "Clojure REPL",
        contains: [
          {
            className: "meta",
            begin: /^([\w.-]+|\s*#_)?=>/,
            starts: {
              end: /$/,
              subLanguage: "clojure"
            }
          }
        ]
      };
    }
    module.exports = clojureRepl;
  }
});

export {
  require_clojure_repl
};
//# sourceMappingURL=chunk-KUT5BGYZ.js.map
