import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/erlang.js
var require_erlang = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/erlang.js"(exports, module) {
    module.exports = erlang;
    erlang.displayName = "erlang";
    erlang.aliases = [];
    function erlang(Prism) {
      Prism.languages.erlang = {
        comment: /%.+/,
        string: {
          pattern: /"(?:\\.|[^\\"\r\n])*"/,
          greedy: true
        },
        "quoted-function": {
          pattern: /'(?:\\.|[^\\'\r\n])+'(?=\()/,
          alias: "function"
        },
        "quoted-atom": {
          pattern: /'(?:\\.|[^\\'\r\n])+'/,
          alias: "atom"
        },
        boolean: /\b(?:false|true)\b/,
        keyword: /\b(?:after|case|catch|end|fun|if|of|receive|try|when)\b/,
        number: [
          /\$\\?./,
          /\b\d+#[a-z0-9]+/i,
          /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i
        ],
        function: /\b[a-z][\w@]*(?=\()/,
        variable: {
          // Look-behind is used to prevent wrong highlighting of atoms containing "@"
          pattern: /(^|[^@])(?:\b|\?)[A-Z_][\w@]*/,
          lookbehind: true
        },
        operator: [
          /[=\/<>:]=|=[:\/]=|\+\+?|--?|[=*\/!]|\b(?:and|andalso|band|bnot|bor|bsl|bsr|bxor|div|not|or|orelse|rem|xor)\b/,
          {
            // We don't want to match <<
            pattern: /(^|[^<])<(?!<)/,
            lookbehind: true
          },
          {
            // We don't want to match >>
            pattern: /(^|[^>])>(?!>)/,
            lookbehind: true
          }
        ],
        atom: /\b[a-z][\w@]*/,
        punctuation: /[()[\]{}:;,.#|]|<<|>>/
      };
    }
  }
});

export {
  require_erlang
};
//# sourceMappingURL=chunk-EL6T4HJ7.js.map
