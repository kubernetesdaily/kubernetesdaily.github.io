import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/highlight.js/lib/languages/htmlbars.js
var require_htmlbars = __commonJS({
  "node_modules/highlight.js/lib/languages/htmlbars.js"(exports, module) {
    function source(re) {
      if (!re) return null;
      if (typeof re === "string") return re;
      return re.source;
    }
    function anyNumberOfTimes(re) {
      return concat("(", re, ")*");
    }
    function optional(re) {
      return concat("(", re, ")?");
    }
    function concat(...args) {
      const joined = args.map((x) => source(x)).join("");
      return joined;
    }
    function either(...args) {
      const joined = "(" + args.map((x) => source(x)).join("|") + ")";
      return joined;
    }
    function handlebars(hljs) {
      const BUILT_INS = {
        "builtin-name": [
          "action",
          "bindattr",
          "collection",
          "component",
          "concat",
          "debugger",
          "each",
          "each-in",
          "get",
          "hash",
          "if",
          "in",
          "input",
          "link-to",
          "loc",
          "log",
          "lookup",
          "mut",
          "outlet",
          "partial",
          "query-params",
          "render",
          "template",
          "textarea",
          "unbound",
          "unless",
          "view",
          "with",
          "yield"
        ]
      };
      const LITERALS = {
        literal: [
          "true",
          "false",
          "undefined",
          "null"
        ]
      };
      const DOUBLE_QUOTED_ID_REGEX = /""|"[^"]+"/;
      const SINGLE_QUOTED_ID_REGEX = /''|'[^']+'/;
      const BRACKET_QUOTED_ID_REGEX = /\[\]|\[[^\]]+\]/;
      const PLAIN_ID_REGEX = /[^\s!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]+/;
      const PATH_DELIMITER_REGEX = /(\.|\/)/;
      const ANY_ID = either(
        DOUBLE_QUOTED_ID_REGEX,
        SINGLE_QUOTED_ID_REGEX,
        BRACKET_QUOTED_ID_REGEX,
        PLAIN_ID_REGEX
      );
      const IDENTIFIER_REGEX = concat(
        optional(/\.|\.\/|\//),
        // relative or absolute path
        ANY_ID,
        anyNumberOfTimes(concat(
          PATH_DELIMITER_REGEX,
          ANY_ID
        ))
      );
      const HASH_PARAM_REGEX = concat(
        "(",
        BRACKET_QUOTED_ID_REGEX,
        "|",
        PLAIN_ID_REGEX,
        ")(?==)"
      );
      const HELPER_NAME_OR_PATH_EXPRESSION = {
        begin: IDENTIFIER_REGEX,
        lexemes: /[\w.\/]+/
      };
      const HELPER_PARAMETER = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
        keywords: LITERALS
      });
      const SUB_EXPRESSION = {
        begin: /\(/,
        end: /\)/
        // the "contains" is added below when all necessary sub-modes are defined
      };
      const HASH = {
        // fka "attribute-assignment", parameters of the form 'key=value'
        className: "attr",
        begin: HASH_PARAM_REGEX,
        relevance: 0,
        starts: {
          begin: /=/,
          end: /=/,
          starts: {
            contains: [
              hljs.NUMBER_MODE,
              hljs.QUOTE_STRING_MODE,
              hljs.APOS_STRING_MODE,
              HELPER_PARAMETER,
              SUB_EXPRESSION
            ]
          }
        }
      };
      const BLOCK_PARAMS = {
        // parameters of the form '{{#with x as | y |}}...{{/with}}'
        begin: /as\s+\|/,
        keywords: {
          keyword: "as"
        },
        end: /\|/,
        contains: [
          {
            // define sub-mode in order to prevent highlighting of block-parameter named "as"
            begin: /\w+/
          }
        ]
      };
      const HELPER_PARAMETERS = {
        contains: [
          hljs.NUMBER_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.APOS_STRING_MODE,
          BLOCK_PARAMS,
          HASH,
          HELPER_PARAMETER,
          SUB_EXPRESSION
        ],
        returnEnd: true
        // the property "end" is defined through inheritance when the mode is used. If depends
        // on the surrounding mode, but "endsWithParent" does not work here (i.e. it includes the
        // end-token of the surrounding mode)
      };
      const SUB_EXPRESSION_CONTENTS = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
        className: "name",
        keywords: BUILT_INS,
        starts: hljs.inherit(HELPER_PARAMETERS, {
          end: /\)/
        })
      });
      SUB_EXPRESSION.contains = [SUB_EXPRESSION_CONTENTS];
      const OPENING_BLOCK_MUSTACHE_CONTENTS = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
        keywords: BUILT_INS,
        className: "name",
        starts: hljs.inherit(HELPER_PARAMETERS, {
          end: /\}\}/
        })
      });
      const CLOSING_BLOCK_MUSTACHE_CONTENTS = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
        keywords: BUILT_INS,
        className: "name"
      });
      const BASIC_MUSTACHE_CONTENTS = hljs.inherit(HELPER_NAME_OR_PATH_EXPRESSION, {
        className: "name",
        keywords: BUILT_INS,
        starts: hljs.inherit(HELPER_PARAMETERS, {
          end: /\}\}/
        })
      });
      const ESCAPE_MUSTACHE_WITH_PRECEEDING_BACKSLASH = {
        begin: /\\\{\{/,
        skip: true
      };
      const PREVENT_ESCAPE_WITH_ANOTHER_PRECEEDING_BACKSLASH = {
        begin: /\\\\(?=\{\{)/,
        skip: true
      };
      return {
        name: "Handlebars",
        aliases: [
          "hbs",
          "html.hbs",
          "html.handlebars",
          "htmlbars"
        ],
        case_insensitive: true,
        subLanguage: "xml",
        contains: [
          ESCAPE_MUSTACHE_WITH_PRECEEDING_BACKSLASH,
          PREVENT_ESCAPE_WITH_ANOTHER_PRECEEDING_BACKSLASH,
          hljs.COMMENT(/\{\{!--/, /--\}\}/),
          hljs.COMMENT(/\{\{!/, /\}\}/),
          {
            // open raw block "{{{{raw}}}} content not evaluated {{{{/raw}}}}"
            className: "template-tag",
            begin: /\{\{\{\{(?!\/)/,
            end: /\}\}\}\}/,
            contains: [OPENING_BLOCK_MUSTACHE_CONTENTS],
            starts: {
              end: /\{\{\{\{\//,
              returnEnd: true,
              subLanguage: "xml"
            }
          },
          {
            // close raw block
            className: "template-tag",
            begin: /\{\{\{\{\//,
            end: /\}\}\}\}/,
            contains: [CLOSING_BLOCK_MUSTACHE_CONTENTS]
          },
          {
            // open block statement
            className: "template-tag",
            begin: /\{\{#/,
            end: /\}\}/,
            contains: [OPENING_BLOCK_MUSTACHE_CONTENTS]
          },
          {
            className: "template-tag",
            begin: /\{\{(?=else\}\})/,
            end: /\}\}/,
            keywords: "else"
          },
          {
            className: "template-tag",
            begin: /\{\{(?=else if)/,
            end: /\}\}/,
            keywords: "else if"
          },
          {
            // closing block statement
            className: "template-tag",
            begin: /\{\{\//,
            end: /\}\}/,
            contains: [CLOSING_BLOCK_MUSTACHE_CONTENTS]
          },
          {
            // template variable or helper-call that is NOT html-escaped
            className: "template-variable",
            begin: /\{\{\{/,
            end: /\}\}\}/,
            contains: [BASIC_MUSTACHE_CONTENTS]
          },
          {
            // template variable or helper-call that is html-escaped
            className: "template-variable",
            begin: /\{\{/,
            end: /\}\}/,
            contains: [BASIC_MUSTACHE_CONTENTS]
          }
        ]
      };
    }
    function htmlbars(hljs) {
      const definition = handlebars(hljs);
      definition.name = "HTMLbars";
      if (hljs.getLanguage("handlebars")) {
        definition.disableAutodetect = true;
      }
      return definition;
    }
    module.exports = htmlbars;
  }
});

export {
  require_htmlbars
};
//# sourceMappingURL=chunk-2GCIH6AA.js.map
