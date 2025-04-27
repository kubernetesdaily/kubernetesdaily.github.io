import {
  require_jsx
} from "./chunk-UCK3IP6V.js";
import {
  require_typescript
} from "./chunk-KT2WC6BS.js";
import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/tsx.js
var require_tsx = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/tsx.js"(exports, module) {
    var refractorJsx = require_jsx();
    var refractorTypescript = require_typescript();
    module.exports = tsx;
    tsx.displayName = "tsx";
    tsx.aliases = [];
    function tsx(Prism) {
      Prism.register(refractorJsx);
      Prism.register(refractorTypescript);
      (function(Prism2) {
        var typescript = Prism2.util.clone(Prism2.languages.typescript);
        Prism2.languages.tsx = Prism2.languages.extend("jsx", typescript);
        delete Prism2.languages.tsx["parameter"];
        delete Prism2.languages.tsx["literal-property"];
        var tag = Prism2.languages.tsx.tag;
        tag.pattern = RegExp(
          /(^|[^\w$]|(?=<\/))/.source + "(?:" + tag.pattern.source + ")",
          tag.pattern.flags
        );
        tag.lookbehind = true;
      })(Prism);
    }
  }
});

export {
  require_tsx
};
//# sourceMappingURL=chunk-MLO3SRAA.js.map
