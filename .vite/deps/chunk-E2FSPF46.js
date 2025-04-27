import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/highlight.js/lib/languages/properties.js
var require_properties = __commonJS({
  "node_modules/highlight.js/lib/languages/properties.js"(exports, module) {
    function properties(hljs) {
      var WS0 = "[ \\t\\f]*";
      var WS1 = "[ \\t\\f]+";
      var EQUAL_DELIM = WS0 + "[:=]" + WS0;
      var WS_DELIM = WS1;
      var DELIM = "(" + EQUAL_DELIM + "|" + WS_DELIM + ")";
      var KEY_ALPHANUM = "([^\\\\\\W:= \\t\\f\\n]|\\\\.)+";
      var KEY_OTHER = "([^\\\\:= \\t\\f\\n]|\\\\.)+";
      var DELIM_AND_VALUE = {
        // skip DELIM
        end: DELIM,
        relevance: 0,
        starts: {
          // value: everything until end of line (again, taking into account backslashes)
          className: "string",
          end: /$/,
          relevance: 0,
          contains: [
            { begin: "\\\\\\\\" },
            { begin: "\\\\\\n" }
          ]
        }
      };
      return {
        name: ".properties",
        case_insensitive: true,
        illegal: /\S/,
        contains: [
          hljs.COMMENT("^\\s*[!#]", "$"),
          // key: everything until whitespace or = or : (taking into account backslashes)
          // case of a "normal" key
          {
            returnBegin: true,
            variants: [
              { begin: KEY_ALPHANUM + EQUAL_DELIM, relevance: 1 },
              { begin: KEY_ALPHANUM + WS_DELIM, relevance: 0 }
            ],
            contains: [
              {
                className: "attr",
                begin: KEY_ALPHANUM,
                endsParent: true,
                relevance: 0
              }
            ],
            starts: DELIM_AND_VALUE
          },
          // case of key containing non-alphanumeric chars => relevance = 0
          {
            begin: KEY_OTHER + DELIM,
            returnBegin: true,
            relevance: 0,
            contains: [
              {
                className: "meta",
                begin: KEY_OTHER,
                endsParent: true,
                relevance: 0
              }
            ],
            starts: DELIM_AND_VALUE
          },
          // case of an empty key
          {
            className: "attr",
            relevance: 0,
            begin: KEY_OTHER + WS0 + "$"
          }
        ]
      };
    }
    module.exports = properties;
  }
});

export {
  require_properties
};
//# sourceMappingURL=chunk-E2FSPF46.js.map
