import {
  require_t4_templating
} from "./chunk-NWD2AGJ2.js";
import {
  require_csharp
} from "./chunk-6LDQGKBD.js";
import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/t4-cs.js
var require_t4_cs = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/t4-cs.js"(exports, module) {
    var refractorT4Templating = require_t4_templating();
    var refractorCsharp = require_csharp();
    module.exports = t4Cs;
    t4Cs.displayName = "t4Cs";
    t4Cs.aliases = [];
    function t4Cs(Prism) {
      Prism.register(refractorT4Templating);
      Prism.register(refractorCsharp);
      Prism.languages.t4 = Prism.languages["t4-cs"] = Prism.languages["t4-templating"].createT4("csharp");
    }
  }
});

export {
  require_t4_cs
};
//# sourceMappingURL=chunk-BTIHM6CL.js.map
