import {
  require_json
} from "./chunk-YCP672XU.js";
import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/jsonp.js
var require_jsonp = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/jsonp.js"(exports, module) {
    var refractorJson = require_json();
    module.exports = jsonp;
    jsonp.displayName = "jsonp";
    jsonp.aliases = [];
    function jsonp(Prism) {
      Prism.register(refractorJson);
      Prism.languages.jsonp = Prism.languages.extend("json", {
        punctuation: /[{}[\]();,.]/
      });
      Prism.languages.insertBefore("jsonp", "punctuation", {
        function: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*\()/
      });
    }
  }
});

export {
  require_jsonp
};
//# sourceMappingURL=chunk-DR5CKJIV.js.map
