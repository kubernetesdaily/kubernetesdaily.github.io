import {
  require_json
} from "./chunk-YCP672XU.js";
import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/json5.js
var require_json5 = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/json5.js"(exports, module) {
    var refractorJson = require_json();
    module.exports = json5;
    json5.displayName = "json5";
    json5.aliases = [];
    function json5(Prism) {
      Prism.register(refractorJson);
      (function(Prism2) {
        var string = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/;
        Prism2.languages.json5 = Prism2.languages.extend("json", {
          property: [
            {
              pattern: RegExp(string.source + "(?=\\s*:)"),
              greedy: true
            },
            {
              pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/,
              alias: "unquoted"
            }
          ],
          string: {
            pattern: string,
            greedy: true
          },
          number: /[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+\b)?/
        });
      })(Prism);
    }
  }
});

export {
  require_json5
};
//# sourceMappingURL=chunk-7OURO6ZD.js.map
