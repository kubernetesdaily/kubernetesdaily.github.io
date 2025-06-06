import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/highlight.js/lib/languages/ada.js
var require_ada = __commonJS({
  "node_modules/highlight.js/lib/languages/ada.js"(exports, module) {
    function ada(hljs) {
      const INTEGER_RE = "\\d(_|\\d)*";
      const EXPONENT_RE = "[eE][-+]?" + INTEGER_RE;
      const DECIMAL_LITERAL_RE = INTEGER_RE + "(\\." + INTEGER_RE + ")?(" + EXPONENT_RE + ")?";
      const BASED_INTEGER_RE = "\\w+";
      const BASED_LITERAL_RE = INTEGER_RE + "#" + BASED_INTEGER_RE + "(\\." + BASED_INTEGER_RE + ")?#(" + EXPONENT_RE + ")?";
      const NUMBER_RE = "\\b(" + BASED_LITERAL_RE + "|" + DECIMAL_LITERAL_RE + ")";
      const ID_REGEX = "[A-Za-z](_?[A-Za-z0-9.])*";
      const BAD_CHARS = `[]\\{\\}%#'"`;
      const COMMENTS = hljs.COMMENT("--", "$");
      const VAR_DECLS = {
        // TODO: These spaces are not required by the Ada syntax
        // however, I have yet to see handwritten Ada code where
        // someone does not put spaces around :
        begin: "\\s+:\\s+",
        end: "\\s*(:=|;|\\)|=>|$)",
        // endsWithParent: true,
        // returnBegin: true,
        illegal: BAD_CHARS,
        contains: [
          {
            // workaround to avoid highlighting
            // named loops and declare blocks
            beginKeywords: "loop for declare others",
            endsParent: true
          },
          {
            // properly highlight all modifiers
            className: "keyword",
            beginKeywords: "not null constant access function procedure in out aliased exception"
          },
          {
            className: "type",
            begin: ID_REGEX,
            endsParent: true,
            relevance: 0
          }
        ]
      };
      return {
        name: "Ada",
        case_insensitive: true,
        keywords: {
          keyword: "abort else new return abs elsif not reverse abstract end accept entry select access exception of separate aliased exit or some all others subtype and for out synchronized array function overriding at tagged generic package task begin goto pragma terminate body private then if procedure type case in protected constant interface is raise use declare range delay limited record when delta loop rem while digits renames with do mod requeue xor",
          literal: "True False"
        },
        contains: [
          COMMENTS,
          // strings "foobar"
          {
            className: "string",
            begin: /"/,
            end: /"/,
            contains: [{
              begin: /""/,
              relevance: 0
            }]
          },
          // characters ''
          {
            // character literals always contain one char
            className: "string",
            begin: /'.'/
          },
          {
            // number literals
            className: "number",
            begin: NUMBER_RE,
            relevance: 0
          },
          {
            // Attributes
            className: "symbol",
            begin: "'" + ID_REGEX
          },
          {
            // package definition, maybe inside generic
            className: "title",
            begin: "(\\bwith\\s+)?(\\bprivate\\s+)?\\bpackage\\s+(\\bbody\\s+)?",
            end: "(is|$)",
            keywords: "package body",
            excludeBegin: true,
            excludeEnd: true,
            illegal: BAD_CHARS
          },
          {
            // function/procedure declaration/definition
            // maybe inside generic
            begin: "(\\b(with|overriding)\\s+)?\\b(function|procedure)\\s+",
            end: "(\\bis|\\bwith|\\brenames|\\)\\s*;)",
            keywords: "overriding function procedure with is renames return",
            // we need to re-match the 'function' keyword, so that
            // the title mode below matches only exactly once
            returnBegin: true,
            contains: [
              COMMENTS,
              {
                // name of the function/procedure
                className: "title",
                begin: "(\\bwith\\s+)?\\b(function|procedure)\\s+",
                end: "(\\(|\\s+|$)",
                excludeBegin: true,
                excludeEnd: true,
                illegal: BAD_CHARS
              },
              // 'self'
              // // parameter types
              VAR_DECLS,
              {
                // return type
                className: "type",
                begin: "\\breturn\\s+",
                end: "(\\s+|;|$)",
                keywords: "return",
                excludeBegin: true,
                excludeEnd: true,
                // we are done with functions
                endsParent: true,
                illegal: BAD_CHARS
              }
            ]
          },
          {
            // new type declarations
            // maybe inside generic
            className: "type",
            begin: "\\b(sub)?type\\s+",
            end: "\\s+",
            keywords: "type",
            excludeBegin: true,
            illegal: BAD_CHARS
          },
          // see comment above the definition
          VAR_DECLS
          // no markup
          // relevance boosters for small snippets
          // {begin: '\\s*=>\\s*'},
          // {begin: '\\s*:=\\s*'},
          // {begin: '\\s+:=\\s+'},
        ]
      };
    }
    module.exports = ada;
  }
});

export {
  require_ada
};
//# sourceMappingURL=chunk-2IUT5JHS.js.map
