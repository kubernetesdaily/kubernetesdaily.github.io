import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/tcl.js
var require_tcl = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/tcl.js"(exports, module) {
    module.exports = tcl;
    tcl.displayName = "tcl";
    tcl.aliases = [];
    function tcl(Prism) {
      Prism.languages.tcl = {
        comment: {
          pattern: /(^|[^\\])#.*/,
          lookbehind: true
        },
        string: {
          pattern: /"(?:[^"\\\r\n]|\\(?:\r\n|[\s\S]))*"/,
          greedy: true
        },
        variable: [
          {
            pattern: /(\$)(?:::)?(?:[a-zA-Z0-9]+::)*\w+/,
            lookbehind: true
          },
          {
            pattern: /(\$)\{[^}]+\}/,
            lookbehind: true
          },
          {
            pattern: /(^[\t ]*set[ \t]+)(?:::)?(?:[a-zA-Z0-9]+::)*\w+/m,
            lookbehind: true
          }
        ],
        function: {
          pattern: /(^[\t ]*proc[ \t]+)\S+/m,
          lookbehind: true
        },
        builtin: [
          {
            pattern: /(^[\t ]*)(?:break|class|continue|error|eval|exit|for|foreach|if|proc|return|switch|while)\b/m,
            lookbehind: true
          },
          /\b(?:else|elseif)\b/
        ],
        scope: {
          pattern: /(^[\t ]*)(?:global|upvar|variable)\b/m,
          lookbehind: true,
          alias: "constant"
        },
        keyword: {
          pattern: /(^[\t ]*|\[)(?:Safe_Base|Tcl|after|append|apply|array|auto_(?:execok|import|load|mkindex|qualify|reset)|automkindex_old|bgerror|binary|catch|cd|chan|clock|close|concat|dde|dict|encoding|eof|exec|expr|fblocked|fconfigure|fcopy|file(?:event|name)?|flush|gets|glob|history|http|incr|info|interp|join|lappend|lassign|lindex|linsert|list|llength|load|lrange|lrepeat|lreplace|lreverse|lsearch|lset|lsort|math(?:func|op)|memory|msgcat|namespace|open|package|parray|pid|pkg_mkIndex|platform|puts|pwd|re_syntax|read|refchan|regexp|registry|regsub|rename|scan|seek|set|socket|source|split|string|subst|tcl(?:_endOfWord|_findLibrary|startOf(?:Next|Previous)Word|test|vars|wordBreak(?:After|Before))|tell|time|tm|trace|unknown|unload|unset|update|uplevel|vwait)\b/m,
          lookbehind: true
        },
        operator: /!=?|\*\*?|==|&&?|\|\|?|<[=<]?|>[=>]?|[-+~\/%?^]|\b(?:eq|in|ne|ni)\b/,
        punctuation: /[{}()\[\]]/
      };
    }
  }
});

export {
  require_tcl
};
//# sourceMappingURL=chunk-RA4SERXD.js.map
