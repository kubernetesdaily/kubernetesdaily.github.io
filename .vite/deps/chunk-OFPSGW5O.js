import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/qore.js
var require_qore = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/qore.js"(exports, module) {
    module.exports = qore;
    qore.displayName = "qore";
    qore.aliases = [];
    function qore(Prism) {
      Prism.languages.qore = Prism.languages.extend("clike", {
        comment: {
          pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:\/\/|#).*)/,
          lookbehind: true
        },
        // Overridden to allow unescaped multi-line strings
        string: {
          pattern: /("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/,
          greedy: true
        },
        keyword: /\b(?:abstract|any|assert|binary|bool|boolean|break|byte|case|catch|char|class|code|const|continue|data|default|do|double|else|enum|extends|final|finally|float|for|goto|hash|if|implements|import|inherits|instanceof|int|interface|long|my|native|new|nothing|null|object|our|own|private|reference|rethrow|return|short|soft(?:bool|date|float|int|list|number|string)|static|strictfp|string|sub|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while)\b/,
        boolean: /\b(?:false|true)\b/i,
        function: /\$?\b(?!\d)\w+(?=\()/,
        number: /\b(?:0b[01]+|0x(?:[\da-f]*\.)?[\da-fp\-]+|(?:\d+(?:\.\d+)?|\.\d+)(?:e\d+)?[df]|(?:\d+(?:\.\d+)?|\.\d+))\b/i,
        operator: {
          pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|[!=](?:==?|~)?|>>?=?|<(?:=>?|<=?)?|&[&=]?|\|[|=]?|[*\/%^]=?|[~?])/,
          lookbehind: true
        },
        variable: /\$(?!\d)\w+\b/
      });
    }
  }
});

export {
  require_qore
};
//# sourceMappingURL=chunk-OFPSGW5O.js.map
