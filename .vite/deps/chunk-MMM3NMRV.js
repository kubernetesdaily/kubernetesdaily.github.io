import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/prolog.js
var require_prolog = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/prolog.js"(exports, module) {
    module.exports = prolog;
    prolog.displayName = "prolog";
    prolog.aliases = [];
    function prolog(Prism) {
      Prism.languages.prolog = {
        // Syntax depends on the implementation
        comment: {
          pattern: /\/\*[\s\S]*?\*\/|%.*/,
          greedy: true
        },
        // Depending on the implementation, strings may allow escaped newlines and quote-escape
        string: {
          pattern: /(["'])(?:\1\1|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1(?!\1)/,
          greedy: true
        },
        builtin: /\b(?:fx|fy|xf[xy]?|yfx?)\b/,
        // FIXME: Should we list all null-ary predicates (not followed by a parenthesis) like halt, trace, etc.?
        function: /\b[a-z]\w*(?:(?=\()|\/\d+)/,
        number: /\b\d+(?:\.\d*)?/,
        // Custom operators are allowed
        operator: /[:\\=><\-?*@\/;+^|!$.]+|\b(?:is|mod|not|xor)\b/,
        punctuation: /[(){}\[\],]/
      };
    }
  }
});

export {
  require_prolog
};
//# sourceMappingURL=chunk-MMM3NMRV.js.map
