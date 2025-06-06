import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/nasm.js
var require_nasm = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/nasm.js"(exports, module) {
    module.exports = nasm;
    nasm.displayName = "nasm";
    nasm.aliases = [];
    function nasm(Prism) {
      Prism.languages.nasm = {
        comment: /;.*$/m,
        string: /(["'`])(?:\\.|(?!\1)[^\\\r\n])*\1/,
        label: {
          pattern: /(^\s*)[A-Za-z._?$][\w.?$@~#]*:/m,
          lookbehind: true,
          alias: "function"
        },
        keyword: [
          /\[?BITS (?:16|32|64)\]?/,
          {
            pattern: /(^\s*)section\s*[a-z.]+:?/im,
            lookbehind: true
          },
          /(?:extern|global)[^;\r\n]*/i,
          /(?:CPU|DEFAULT|FLOAT).*$/m
        ],
        register: {
          pattern: /\b(?:st\d|[xyz]mm\d\d?|[cdt]r\d|r\d\d?[bwd]?|[er]?[abcd]x|[abcd][hl]|[er]?(?:bp|di|si|sp)|[cdefgs]s)\b/i,
          alias: "variable"
        },
        number: /(?:\b|(?=\$))(?:0[hx](?:\.[\da-f]+|[\da-f]+(?:\.[\da-f]+)?)(?:p[+-]?\d+)?|\d[\da-f]+[hx]|\$\d[\da-f]*|0[oq][0-7]+|[0-7]+[oq]|0[by][01]+|[01]+[by]|0[dt]\d+|(?:\d+(?:\.\d+)?|\.\d+)(?:\.?e[+-]?\d+)?[dt]?)\b/i,
        operator: /[\[\]*+\-\/%<>=&|$!]/
      };
    }
  }
});

export {
  require_nasm
};
//# sourceMappingURL=chunk-YPJOUN5H.js.map
