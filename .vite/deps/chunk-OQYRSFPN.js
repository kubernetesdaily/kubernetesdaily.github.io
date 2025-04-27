import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/properties.js
var require_properties = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/properties.js"(exports, module) {
    module.exports = properties;
    properties.displayName = "properties";
    properties.aliases = [];
    function properties(Prism) {
      Prism.languages.properties = {
        comment: /^[ \t]*[#!].*$/m,
        "attr-value": {
          pattern: /(^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+(?: *[=:] *(?! )| ))(?:\\(?:\r\n|[\s\S])|[^\\\r\n])+/m,
          lookbehind: true
        },
        "attr-name": /^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+(?= *[=:]| )/m,
        punctuation: /[=:]/
      };
    }
  }
});

export {
  require_properties
};
//# sourceMappingURL=chunk-OQYRSFPN.js.map
