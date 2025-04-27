import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/brainfuck.js
var require_brainfuck = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/brainfuck.js"(exports, module) {
    module.exports = brainfuck;
    brainfuck.displayName = "brainfuck";
    brainfuck.aliases = [];
    function brainfuck(Prism) {
      Prism.languages.brainfuck = {
        pointer: {
          pattern: /<|>/,
          alias: "keyword"
        },
        increment: {
          pattern: /\+/,
          alias: "inserted"
        },
        decrement: {
          pattern: /-/,
          alias: "deleted"
        },
        branching: {
          pattern: /\[|\]/,
          alias: "important"
        },
        operator: /[.,]/,
        comment: /\S+/
      };
    }
  }
});

export {
  require_brainfuck
};
//# sourceMappingURL=chunk-ILABGQAB.js.map
