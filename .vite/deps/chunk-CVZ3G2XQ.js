import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/solidity.js
var require_solidity = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/solidity.js"(exports, module) {
    module.exports = solidity;
    solidity.displayName = "solidity";
    solidity.aliases = ["sol"];
    function solidity(Prism) {
      Prism.languages.solidity = Prism.languages.extend("clike", {
        "class-name": {
          pattern: /(\b(?:contract|enum|interface|library|new|struct|using)\s+)(?!\d)[\w$]+/,
          lookbehind: true
        },
        keyword: /\b(?:_|anonymous|as|assembly|assert|break|calldata|case|constant|constructor|continue|contract|default|delete|do|else|emit|enum|event|external|for|from|function|if|import|indexed|inherited|interface|internal|is|let|library|mapping|memory|modifier|new|payable|pragma|private|public|pure|require|returns?|revert|selfdestruct|solidity|storage|struct|suicide|switch|this|throw|using|var|view|while)\b/,
        operator: /=>|->|:=|=:|\*\*|\+\+|--|\|\||&&|<<=?|>>=?|[-+*/%^&|<>!=]=?|[~?]/
      });
      Prism.languages.insertBefore("solidity", "keyword", {
        builtin: /\b(?:address|bool|byte|u?int(?:8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?|string|bytes(?:[1-9]|[12]\d|3[0-2])?)\b/
      });
      Prism.languages.insertBefore("solidity", "number", {
        version: {
          pattern: /([<>]=?|\^)\d+\.\d+\.\d+\b/,
          lookbehind: true,
          alias: "number"
        }
      });
      Prism.languages.sol = Prism.languages.solidity;
    }
  }
});

export {
  require_solidity
};
//# sourceMappingURL=chunk-CVZ3G2XQ.js.map
