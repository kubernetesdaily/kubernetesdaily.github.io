import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/ini.js
var require_ini = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/ini.js"(exports, module) {
    module.exports = ini;
    ini.displayName = "ini";
    ini.aliases = [];
    function ini(Prism) {
      Prism.languages.ini = {
        /**
         * The component mimics the behavior of the Win32 API parser.
         *
         * @see {@link https://github.com/PrismJS/prism/issues/2775#issuecomment-787477723}
         */
        comment: {
          pattern: /(^[ \f\t\v]*)[#;][^\n\r]*/m,
          lookbehind: true
        },
        section: {
          pattern: /(^[ \f\t\v]*)\[[^\n\r\]]*\]?/m,
          lookbehind: true,
          inside: {
            "section-name": {
              pattern: /(^\[[ \f\t\v]*)[^ \f\t\v\]]+(?:[ \f\t\v]+[^ \f\t\v\]]+)*/,
              lookbehind: true,
              alias: "selector"
            },
            punctuation: /\[|\]/
          }
        },
        key: {
          pattern: /(^[ \f\t\v]*)[^ \f\n\r\t\v=]+(?:[ \f\t\v]+[^ \f\n\r\t\v=]+)*(?=[ \f\t\v]*=)/m,
          lookbehind: true,
          alias: "attr-name"
        },
        value: {
          pattern: /(=[ \f\t\v]*)[^ \f\n\r\t\v]+(?:[ \f\t\v]+[^ \f\n\r\t\v]+)*/,
          lookbehind: true,
          alias: "attr-value",
          inside: {
            "inner-value": {
              pattern: /^("|').+(?=\1$)/,
              lookbehind: true
            }
          }
        },
        punctuation: /=/
      };
    }
  }
});

export {
  require_ini
};
//# sourceMappingURL=chunk-QV7Y2KEW.js.map
