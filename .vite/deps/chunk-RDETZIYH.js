import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/rip.js
var require_rip = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/rip.js"(exports, module) {
    module.exports = rip;
    rip.displayName = "rip";
    rip.aliases = [];
    function rip(Prism) {
      Prism.languages.rip = {
        comment: {
          pattern: /#.*/,
          greedy: true
        },
        char: {
          pattern: /\B`[^\s`'",.:;#\/\\()<>\[\]{}]\b/,
          greedy: true
        },
        string: {
          pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
          greedy: true
        },
        regex: {
          pattern: /(^|[^/])\/(?!\/)(?:\[[^\n\r\]]*\]|\\.|[^/\\\r\n\[])+\/(?=\s*(?:$|[\r\n,.;})]))/,
          lookbehind: true,
          greedy: true
        },
        keyword: /(?:=>|->)|\b(?:case|catch|class|else|exit|finally|if|raise|return|switch|try)\b/,
        builtin: /@|\bSystem\b/,
        boolean: /\b(?:false|true)\b/,
        date: /\b\d{4}-\d{2}-\d{2}\b/,
        time: /\b\d{2}:\d{2}:\d{2}\b/,
        datetime: /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\b/,
        symbol: /:[^\d\s`'",.:;#\/\\()<>\[\]{}][^\s`'",.:;#\/\\()<>\[\]{}]*/,
        number: /[+-]?\b(?:\d+\.\d+|\d+)\b/,
        punctuation: /(?:\.{2,3})|[`,.:;=\/\\()<>\[\]{}]/,
        reference: /[^\d\s`'",.:;#\/\\()<>\[\]{}][^\s`'",.:;#\/\\()<>\[\]{}]*/
      };
    }
  }
});

export {
  require_rip
};
//# sourceMappingURL=chunk-RDETZIYH.js.map
