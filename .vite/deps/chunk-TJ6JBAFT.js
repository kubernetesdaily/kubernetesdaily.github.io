import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/nim.js
var require_nim = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/nim.js"(exports, module) {
    module.exports = nim;
    nim.displayName = "nim";
    nim.aliases = [];
    function nim(Prism) {
      Prism.languages.nim = {
        comment: {
          pattern: /#.*/,
          greedy: true
        },
        string: {
          // Double-quoted strings can be prefixed by an identifier (Generalized raw string literals)
          pattern: /(?:\b(?!\d)(?:\w|\\x[89a-fA-F][0-9a-fA-F])+)?(?:"""[\s\S]*?"""(?!")|"(?:\\[\s\S]|""|[^"\\])*")/,
          greedy: true
        },
        char: {
          // Character literals are handled specifically to prevent issues with numeric type suffixes
          pattern: /'(?:\\(?:\d+|x[\da-fA-F]{0,2}|.)|[^'])'/,
          greedy: true
        },
        function: {
          pattern: /(?:(?!\d)(?:\w|\\x[89a-fA-F][0-9a-fA-F])+|`[^`\r\n]+`)\*?(?:\[[^\]]+\])?(?=\s*\()/,
          greedy: true,
          inside: {
            operator: /\*$/
          }
        },
        // We don't want to highlight operators (and anything really) inside backticks
        identifier: {
          pattern: /`[^`\r\n]+`/,
          greedy: true,
          inside: {
            punctuation: /`/
          }
        },
        // The negative look ahead prevents wrong highlighting of the .. operator
        number: /\b(?:0[xXoObB][\da-fA-F_]+|\d[\d_]*(?:(?!\.\.)\.[\d_]*)?(?:[eE][+-]?\d[\d_]*)?)(?:'?[iuf]\d*)?/,
        keyword: /\b(?:addr|as|asm|atomic|bind|block|break|case|cast|concept|const|continue|converter|defer|discard|distinct|do|elif|else|end|enum|except|export|finally|for|from|func|generic|if|import|include|interface|iterator|let|macro|method|mixin|nil|object|out|proc|ptr|raise|ref|return|static|template|try|tuple|type|using|var|when|while|with|without|yield)\b/,
        operator: {
          // Look behind and look ahead prevent wrong highlighting of punctuations [. .] {. .} (. .)
          // but allow the slice operator .. to take precedence over them
          // One can define his own operators in Nim so all combination of operators might be an operator.
          pattern: /(^|[({\[](?=\.\.)|(?![({\[]\.).)(?:(?:[=+\-*\/<>@$~&%|!?^:\\]|\.\.|\.(?![)}\]]))+|\b(?:and|div|in|is|isnot|mod|not|notin|of|or|shl|shr|xor)\b)/m,
          lookbehind: true
        },
        punctuation: /[({\[]\.|\.[)}\]]|[`(){}\[\],:]/
      };
    }
  }
});

export {
  require_nim
};
//# sourceMappingURL=chunk-TJ6JBAFT.js.map
