import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/highlight.js/lib/languages/haml.js
var require_haml = __commonJS({
  "node_modules/highlight.js/lib/languages/haml.js"(exports, module) {
    function haml(hljs) {
      return {
        name: "HAML",
        case_insensitive: true,
        contains: [
          {
            className: "meta",
            begin: "^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$",
            relevance: 10
          },
          // FIXME these comments should be allowed to span indented lines
          hljs.COMMENT(
            "^\\s*(!=#|=#|-#|/).*$",
            false,
            {
              relevance: 0
            }
          ),
          {
            begin: "^\\s*(-|=|!=)(?!#)",
            starts: {
              end: "\\n",
              subLanguage: "ruby"
            }
          },
          {
            className: "tag",
            begin: "^\\s*%",
            contains: [
              {
                className: "selector-tag",
                begin: "\\w+"
              },
              {
                className: "selector-id",
                begin: "#[\\w-]+"
              },
              {
                className: "selector-class",
                begin: "\\.[\\w-]+"
              },
              {
                begin: /\{\s*/,
                end: /\s*\}/,
                contains: [
                  {
                    begin: ":\\w+\\s*=>",
                    end: ",\\s+",
                    returnBegin: true,
                    endsWithParent: true,
                    contains: [
                      {
                        className: "attr",
                        begin: ":\\w+"
                      },
                      hljs.APOS_STRING_MODE,
                      hljs.QUOTE_STRING_MODE,
                      {
                        begin: "\\w+",
                        relevance: 0
                      }
                    ]
                  }
                ]
              },
              {
                begin: "\\(\\s*",
                end: "\\s*\\)",
                excludeEnd: true,
                contains: [
                  {
                    begin: "\\w+\\s*=",
                    end: "\\s+",
                    returnBegin: true,
                    endsWithParent: true,
                    contains: [
                      {
                        className: "attr",
                        begin: "\\w+",
                        relevance: 0
                      },
                      hljs.APOS_STRING_MODE,
                      hljs.QUOTE_STRING_MODE,
                      {
                        begin: "\\w+",
                        relevance: 0
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            begin: "^\\s*[=~]\\s*"
          },
          {
            begin: /#\{/,
            starts: {
              end: /\}/,
              subLanguage: "ruby"
            }
          }
        ]
      };
    }
    module.exports = haml;
  }
});

export {
  require_haml
};
//# sourceMappingURL=chunk-JBV34UZX.js.map
