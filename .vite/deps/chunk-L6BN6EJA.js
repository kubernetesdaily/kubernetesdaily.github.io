import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/j.js
var require_j = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/j.js"(exports, module) {
    module.exports = j;
    j.displayName = "j";
    j.aliases = [];
    function j(Prism) {
      Prism.languages.j = {
        comment: {
          pattern: /\bNB\..*/,
          greedy: true
        },
        string: {
          pattern: /'(?:''|[^'\r\n])*'/,
          greedy: true
        },
        keyword: /\b(?:(?:CR|LF|adverb|conjunction|def|define|dyad|monad|noun|verb)\b|(?:assert|break|case|catch[dt]?|continue|do|else|elseif|end|fcase|for|for_\w+|goto_\w+|if|label_\w+|return|select|throw|try|while|whilst)\.)/,
        verb: {
          // Negative look-ahead prevents bad highlighting
          // of ^: ;. =. =: !. !:
          pattern: /(?!\^:|;\.|[=!][.:])(?:\{(?:\.|::?)?|p(?:\.\.?|:)|[=!\]]|[<>+*\-%$|,#][.:]?|[?^]\.?|[;\[]:?|[~}"i][.:]|[ACeEIjLor]\.|(?:[_\/\\qsux]|_?\d):)/,
          alias: "keyword"
        },
        number: /\b_?(?:(?!\d:)\d+(?:\.\d+)?(?:(?:ad|ar|[ejpx])_?\d+(?:\.\d+)?)*(?:b_?[\da-z]+(?:\.[\da-z]+)?)?|_\b(?!\.))/,
        adverb: {
          pattern: /[~}]|[\/\\]\.?|[bfM]\.|t[.:]/,
          alias: "builtin"
        },
        operator: /[=a][.:]|_\./,
        conjunction: {
          pattern: /&(?:\.:?|:)?|[.:@][.:]?|[!D][.:]|[;dHT]\.|`:?|[\^LS]:|"/,
          alias: "variable"
        },
        punctuation: /[()]/
      };
    }
  }
});

export {
  require_j
};
//# sourceMappingURL=chunk-L6BN6EJA.js.map
