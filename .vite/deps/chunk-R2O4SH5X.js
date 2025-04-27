import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/nand2tetris-hdl.js
var require_nand2tetris_hdl = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/nand2tetris-hdl.js"(exports, module) {
    module.exports = nand2tetrisHdl;
    nand2tetrisHdl.displayName = "nand2tetrisHdl";
    nand2tetrisHdl.aliases = [];
    function nand2tetrisHdl(Prism) {
      Prism.languages["nand2tetris-hdl"] = {
        comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
        keyword: /\b(?:BUILTIN|CHIP|CLOCKED|IN|OUT|PARTS)\b/,
        boolean: /\b(?:false|true)\b/,
        function: /\b[A-Za-z][A-Za-z0-9]*(?=\()/,
        number: /\b\d+\b/,
        operator: /=|\.\./,
        punctuation: /[{}[\];(),:]/
      };
    }
  }
});

export {
  require_nand2tetris_hdl
};
//# sourceMappingURL=chunk-R2O4SH5X.js.map
