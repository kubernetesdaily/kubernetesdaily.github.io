import {
  require_sql
} from "./chunk-GA5ARIVI.js";
import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/apex.js
var require_apex = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/apex.js"(exports, module) {
    var refractorSql = require_sql();
    module.exports = apex;
    apex.displayName = "apex";
    apex.aliases = [];
    function apex(Prism) {
      Prism.register(refractorSql);
      (function(Prism2) {
        var keywords = /\b(?:(?:after|before)(?=\s+[a-z])|abstract|activate|and|any|array|as|asc|autonomous|begin|bigdecimal|blob|boolean|break|bulk|by|byte|case|cast|catch|char|class|collect|commit|const|continue|currency|date|datetime|decimal|default|delete|desc|do|double|else|end|enum|exception|exit|export|extends|final|finally|float|for|from|get(?=\s*[{};])|global|goto|group|having|hint|if|implements|import|in|inner|insert|instanceof|int|integer|interface|into|join|like|limit|list|long|loop|map|merge|new|not|null|nulls|number|object|of|on|or|outer|override|package|parallel|pragma|private|protected|public|retrieve|return|rollback|select|set|short|sObject|sort|static|string|super|switch|synchronized|system|testmethod|then|this|throw|time|transaction|transient|trigger|try|undelete|update|upsert|using|virtual|void|webservice|when|where|while|(?:inherited|with|without)\s+sharing)\b/i;
        var className = /\b(?:(?=[a-z_]\w*\s*[<\[])|(?!<keyword>))[A-Z_]\w*(?:\s*\.\s*[A-Z_]\w*)*\b(?:\s*(?:\[\s*\]|<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>))*/.source.replace(
          /<keyword>/g,
          function() {
            return keywords.source;
          }
        );
        function insertClassName(pattern) {
          return RegExp(
            pattern.replace(/<CLASS-NAME>/g, function() {
              return className;
            }),
            "i"
          );
        }
        var classNameInside = {
          keyword: keywords,
          punctuation: /[()\[\]{};,:.<>]/
        };
        Prism2.languages.apex = {
          comment: Prism2.languages.clike.comment,
          string: Prism2.languages.clike.string,
          sql: {
            pattern: /((?:[=,({:]|\breturn)\s*)\[[^\[\]]*\]/i,
            lookbehind: true,
            greedy: true,
            alias: "language-sql",
            inside: Prism2.languages.sql
          },
          annotation: {
            pattern: /@\w+\b/,
            alias: "punctuation"
          },
          "class-name": [
            {
              pattern: insertClassName(
                /(\b(?:class|enum|extends|implements|instanceof|interface|new|trigger\s+\w+\s+on)\s+)<CLASS-NAME>/.source
              ),
              lookbehind: true,
              inside: classNameInside
            },
            {
              // cast
              pattern: insertClassName(
                /(\(\s*)<CLASS-NAME>(?=\s*\)\s*[\w(])/.source
              ),
              lookbehind: true,
              inside: classNameInside
            },
            {
              // variable/parameter declaration and return types
              pattern: insertClassName(/<CLASS-NAME>(?=\s*\w+\s*[;=,(){:])/.source),
              inside: classNameInside
            }
          ],
          trigger: {
            pattern: /(\btrigger\s+)\w+\b/i,
            lookbehind: true,
            alias: "class-name"
          },
          keyword: keywords,
          function: /\b[a-z_]\w*(?=\s*\()/i,
          boolean: /\b(?:false|true)\b/i,
          number: /(?:\B\.\d+|\b\d+(?:\.\d+|L)?)\b/i,
          operator: /[!=](?:==?)?|\?\.?|&&|\|\||--|\+\+|[-+*/^&|]=?|:|<<?=?|>{1,3}=?/,
          punctuation: /[()\[\]{};,.]/
        };
      })(Prism);
    }
  }
});

export {
  require_apex
};
//# sourceMappingURL=chunk-SXI3524K.js.map
