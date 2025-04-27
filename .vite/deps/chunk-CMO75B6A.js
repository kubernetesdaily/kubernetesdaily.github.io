import {
  require_scheme
} from "./chunk-R34ENJOF.js";
import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/racket.js
var require_racket = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/racket.js"(exports, module) {
    var refractorScheme = require_scheme();
    module.exports = racket;
    racket.displayName = "racket";
    racket.aliases = ["rkt"];
    function racket(Prism) {
      Prism.register(refractorScheme);
      Prism.languages.racket = Prism.languages.extend("scheme", {
        "lambda-parameter": {
          // the racket lambda syntax is a lot more complex, so we won't even attempt to capture it.
          // this will just prevent false positives of the `function` pattern
          pattern: /([(\[]lambda\s+[(\[])[^()\[\]'\s]+/,
          lookbehind: true
        }
      });
      Prism.languages.insertBefore("racket", "string", {
        lang: {
          pattern: /^#lang.+/m,
          greedy: true,
          alias: "keyword"
        }
      });
      Prism.languages.rkt = Prism.languages.racket;
    }
  }
});

export {
  require_racket
};
//# sourceMappingURL=chunk-CMO75B6A.js.map
