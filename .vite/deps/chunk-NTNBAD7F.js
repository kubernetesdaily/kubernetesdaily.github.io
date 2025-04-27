import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/batch.js
var require_batch = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/batch.js"(exports, module) {
    module.exports = batch;
    batch.displayName = "batch";
    batch.aliases = [];
    function batch(Prism) {
      ;
      (function(Prism2) {
        var variable = /%%?[~:\w]+%?|!\S+!/;
        var parameter = {
          pattern: /\/[a-z?]+(?=[ :]|$):?|-[a-z]\b|--[a-z-]+\b/im,
          alias: "attr-name",
          inside: {
            punctuation: /:/
          }
        };
        var string = /"(?:[\\"]"|[^"])*"(?!")/;
        var number = /(?:\b|-)\d+\b/;
        Prism2.languages.batch = {
          comment: [
            /^::.*/m,
            {
              pattern: /((?:^|[&(])[ \t]*)rem\b(?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
              lookbehind: true
            }
          ],
          label: {
            pattern: /^:.*/m,
            alias: "property"
          },
          command: [
            {
              // FOR command
              pattern: /((?:^|[&(])[ \t]*)for(?: \/[a-z?](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* \S+ in \([^)]+\) do/im,
              lookbehind: true,
              inside: {
                keyword: /\b(?:do|in)\b|^for\b/i,
                string,
                parameter,
                variable,
                number,
                punctuation: /[()',]/
              }
            },
            {
              // IF command
              pattern: /((?:^|[&(])[ \t]*)if(?: \/[a-z?](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* (?:not )?(?:cmdextversion \d+|defined \w+|errorlevel \d+|exist \S+|(?:"[^"]*"|(?!")(?:(?!==)\S)+)?(?:==| (?:equ|geq|gtr|leq|lss|neq) )(?:"[^"]*"|[^\s"]\S*))/im,
              lookbehind: true,
              inside: {
                keyword: /\b(?:cmdextversion|defined|errorlevel|exist|not)\b|^if\b/i,
                string,
                parameter,
                variable,
                number,
                operator: /\^|==|\b(?:equ|geq|gtr|leq|lss|neq)\b/i
              }
            },
            {
              // ELSE command
              pattern: /((?:^|[&()])[ \t]*)else\b/im,
              lookbehind: true,
              inside: {
                keyword: /^else\b/i
              }
            },
            {
              // SET command
              pattern: /((?:^|[&(])[ \t]*)set(?: \/[a-z](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* (?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
              lookbehind: true,
              inside: {
                keyword: /^set\b/i,
                string,
                parameter,
                variable: [variable, /\w+(?=(?:[*\/%+\-&^|]|<<|>>)?=)/],
                number,
                operator: /[*\/%+\-&^|]=?|<<=?|>>=?|[!~_=]/,
                punctuation: /[()',]/
              }
            },
            {
              // Other commands
              pattern: /((?:^|[&(])[ \t]*@?)\w+\b(?:"(?:[\\"]"|[^"])*"(?!")|[^"^&)\r\n]|\^(?:\r\n|[\s\S]))*/m,
              lookbehind: true,
              inside: {
                keyword: /^\w+\b/,
                string,
                parameter,
                label: {
                  pattern: /(^\s*):\S+/m,
                  lookbehind: true,
                  alias: "property"
                },
                variable,
                number,
                operator: /\^/
              }
            }
          ],
          operator: /[&@]/,
          punctuation: /[()']/
        };
      })(Prism);
    }
  }
});

export {
  require_batch
};
//# sourceMappingURL=chunk-NTNBAD7F.js.map
