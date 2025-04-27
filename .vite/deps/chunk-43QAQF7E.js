import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/naniscript.js
var require_naniscript = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/naniscript.js"(exports, module) {
    module.exports = naniscript;
    naniscript.displayName = "naniscript";
    naniscript.aliases = [];
    function naniscript(Prism) {
      ;
      (function(Prism2) {
        var expressionDef = /\{[^\r\n\[\]{}]*\}/;
        var params = {
          "quoted-string": {
            pattern: /"(?:[^"\\]|\\.)*"/,
            alias: "operator"
          },
          "command-param-id": {
            pattern: /(\s)\w+:/,
            lookbehind: true,
            alias: "property"
          },
          "command-param-value": [
            {
              pattern: expressionDef,
              alias: "selector"
            },
            {
              pattern: /([\t ])\S+/,
              lookbehind: true,
              greedy: true,
              alias: "operator"
            },
            {
              pattern: /\S(?:.*\S)?/,
              alias: "operator"
            }
          ]
        };
        Prism2.languages.naniscript = {
          // ; ...
          comment: {
            pattern: /^([\t ]*);.*/m,
            lookbehind: true
          },
          // > ...
          // Define is a control line starting with '>' followed by a word, a space and a text.
          define: {
            pattern: /^>.+/m,
            alias: "tag",
            inside: {
              value: {
                pattern: /(^>\w+[\t ]+)(?!\s)[^{}\r\n]+/,
                lookbehind: true,
                alias: "operator"
              },
              key: {
                pattern: /(^>)\w+/,
                lookbehind: true
              }
            }
          },
          // # ...
          label: {
            pattern: /^([\t ]*)#[\t ]*\w+[\t ]*$/m,
            lookbehind: true,
            alias: "regex"
          },
          command: {
            pattern: /^([\t ]*)@\w+(?=[\t ]|$).*/m,
            lookbehind: true,
            alias: "function",
            inside: {
              "command-name": /^@\w+/,
              expression: {
                pattern: expressionDef,
                greedy: true,
                alias: "selector"
              },
              "command-params": {
                pattern: /\s*\S[\s\S]*/,
                inside: params
              }
            }
          },
          // Generic is any line that doesn't start with operators: ;>#@
          "generic-text": {
            pattern: /(^[ \t]*)[^#@>;\s].*/m,
            lookbehind: true,
            alias: "punctuation",
            inside: {
              // \{ ... \} ... \[ ... \] ... \"
              "escaped-char": /\\[{}\[\]"]/,
              expression: {
                pattern: expressionDef,
                greedy: true,
                alias: "selector"
              },
              "inline-command": {
                pattern: /\[[\t ]*\w[^\r\n\[\]]*\]/,
                greedy: true,
                alias: "function",
                inside: {
                  "command-params": {
                    pattern: /(^\[[\t ]*\w+\b)[\s\S]+(?=\]$)/,
                    lookbehind: true,
                    inside: params
                  },
                  "command-param-name": {
                    pattern: /^(\[[\t ]*)\w+/,
                    lookbehind: true,
                    alias: "name"
                  },
                  "start-stop-char": /[\[\]]/
                }
              }
            }
          }
        };
        Prism2.languages.nani = Prism2.languages["naniscript"];
        Prism2.hooks.add("after-tokenize", function(env) {
          var tokens = env.tokens;
          tokens.forEach(function(token) {
            if (typeof token !== "string" && token.type === "generic-text") {
              var content = getTextContent(token);
              if (!isBracketsBalanced(content)) {
                token.type = "bad-line";
                token.content = content;
              }
            }
          });
        });
        function isBracketsBalanced(input) {
          var brackets = "[]{}";
          var stack = [];
          for (var i = 0; i < input.length; i++) {
            var bracket = input[i];
            var bracketsIndex = brackets.indexOf(bracket);
            if (bracketsIndex !== -1) {
              if (bracketsIndex % 2 === 0) {
                stack.push(bracketsIndex + 1);
              } else if (stack.pop() !== bracketsIndex) {
                return false;
              }
            }
          }
          return stack.length === 0;
        }
        function getTextContent(token) {
          if (typeof token === "string") {
            return token;
          } else if (Array.isArray(token)) {
            return token.map(getTextContent).join("");
          } else {
            return getTextContent(token.content);
          }
        }
      })(Prism);
    }
  }
});

export {
  require_naniscript
};
//# sourceMappingURL=chunk-43QAQF7E.js.map
