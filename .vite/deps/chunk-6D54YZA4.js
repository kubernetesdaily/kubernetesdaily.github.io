import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/keyman.js
var require_keyman = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/keyman.js"(exports, module) {
    module.exports = keyman;
    keyman.displayName = "keyman";
    keyman.aliases = [];
    function keyman(Prism) {
      Prism.languages.keyman = {
        comment: {
          pattern: /\bc .*/i,
          greedy: true
        },
        string: {
          pattern: /"[^"\r\n]*"|'[^'\r\n]*'/,
          greedy: true
        },
        "virtual-key": {
          pattern: /\[\s*(?:(?:ALT|CAPS|CTRL|LALT|LCTRL|NCAPS|RALT|RCTRL|SHIFT)\s+)*(?:[TKU]_[\w?]+|[A-E]\d\d?|"[^"\r\n]*"|'[^'\r\n]*')\s*\]/i,
          greedy: true,
          alias: "function"
          // alias for styles
        },
        // https://help.keyman.com/developer/language/guide/headers
        "header-keyword": {
          pattern: /&\w+/,
          alias: "bold"
          // alias for styles
        },
        "header-statement": {
          pattern: /\b(?:bitmap|bitmaps|caps always off|caps on only|copyright|hotkey|language|layout|message|name|shift frees caps|version)\b/i,
          alias: "bold"
          // alias for styles
        },
        "rule-keyword": {
          pattern: /\b(?:any|baselayout|beep|call|context|deadkey|dk|if|index|layer|notany|nul|outs|platform|reset|return|save|set|store|use)\b/i,
          alias: "keyword"
        },
        "structural-keyword": {
          pattern: /\b(?:ansi|begin|group|match|nomatch|unicode|using keys)\b/i,
          alias: "keyword"
        },
        "compile-target": {
          pattern: /\$(?:keyman|keymanonly|keymanweb|kmfl|weaver):/i,
          alias: "property"
        },
        // U+####, x###, d### characters and numbers
        number: /\b(?:U\+[\dA-F]+|d\d+|x[\da-f]+|\d+)\b/i,
        operator: /[+>\\$]|\.\./,
        punctuation: /[()=,]/
      };
    }
  }
});

export {
  require_keyman
};
//# sourceMappingURL=chunk-6D54YZA4.js.map
