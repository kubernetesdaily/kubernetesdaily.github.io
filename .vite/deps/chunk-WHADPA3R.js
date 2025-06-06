import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/gdscript.js
var require_gdscript = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/gdscript.js"(exports, module) {
    module.exports = gdscript;
    gdscript.displayName = "gdscript";
    gdscript.aliases = [];
    function gdscript(Prism) {
      Prism.languages.gdscript = {
        comment: /#.*/,
        string: {
          pattern: /@?(?:("|')(?:(?!\1)[^\n\\]|\\[\s\S])*\1(?!"|')|"""(?:[^\\]|\\[\s\S])*?""")/,
          greedy: true
        },
        "class-name": {
          // class_name Foo, extends Bar, class InnerClass
          // export(int) var baz, export(int, 0) var i
          // as Node
          // const FOO: int = 9, var bar: bool = true
          // func add(reference: Item, amount: int) -> Item:
          pattern: /(^(?:class|class_name|extends)[ \t]+|^export\([ \t]*|\bas[ \t]+|(?:\b(?:const|var)[ \t]|[,(])[ \t]*\w+[ \t]*:[ \t]*|->[ \t]*)[a-zA-Z_]\w*/m,
          lookbehind: true
        },
        keyword: /\b(?:and|as|assert|break|breakpoint|class|class_name|const|continue|elif|else|enum|export|extends|for|func|if|in|is|master|mastersync|match|not|null|onready|or|pass|preload|puppet|puppetsync|remote|remotesync|return|self|setget|signal|static|tool|var|while|yield)\b/,
        function: /\b[a-z_]\w*(?=[ \t]*\()/i,
        variable: /\$\w+/,
        number: [
          /\b0b[01_]+\b|\b0x[\da-fA-F_]+\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.[\d_]+)(?:e[+-]?[\d_]+)?\b/,
          /\b(?:INF|NAN|PI|TAU)\b/
        ],
        constant: /\b[A-Z][A-Z_\d]*\b/,
        boolean: /\b(?:false|true)\b/,
        operator: /->|:=|&&|\|\||<<|>>|[-+*/%&|!<>=]=?|[~^]/,
        punctuation: /[.:,;()[\]{}]/
      };
    }
  }
});

export {
  require_gdscript
};
//# sourceMappingURL=chunk-WHADPA3R.js.map
