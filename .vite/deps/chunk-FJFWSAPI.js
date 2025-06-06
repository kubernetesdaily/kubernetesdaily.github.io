import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/turtle.js
var require_turtle = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/turtle.js"(exports, module) {
    module.exports = turtle;
    turtle.displayName = "turtle";
    turtle.aliases = [];
    function turtle(Prism) {
      Prism.languages.turtle = {
        comment: {
          pattern: /#.*/,
          greedy: true
        },
        "multiline-string": {
          pattern: /"""(?:(?:""?)?(?:[^"\\]|\\.))*"""|'''(?:(?:''?)?(?:[^'\\]|\\.))*'''/,
          greedy: true,
          alias: "string",
          inside: {
            comment: /#.*/
          }
        },
        string: {
          pattern: /"(?:[^\\"\r\n]|\\.)*"|'(?:[^\\'\r\n]|\\.)*'/,
          greedy: true
        },
        url: {
          pattern: /<(?:[^\x00-\x20<>"{}|^`\\]|\\(?:u[\da-fA-F]{4}|U[\da-fA-F]{8}))*>/,
          greedy: true,
          inside: {
            punctuation: /[<>]/
          }
        },
        function: {
          pattern: /(?:(?![-.\d\xB7])[-.\w\xB7\xC0-\uFFFD]+)?:(?:(?![-.])(?:[-.:\w\xC0-\uFFFD]|%[\da-f]{2}|\\.)+)?/i,
          inside: {
            "local-name": {
              pattern: /([^:]*:)[\s\S]+/,
              lookbehind: true
            },
            prefix: {
              pattern: /[\s\S]+/,
              inside: {
                punctuation: /:/
              }
            }
          }
        },
        number: /[+-]?\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i,
        punctuation: /[{}.,;()[\]]|\^\^/,
        boolean: /\b(?:false|true)\b/,
        keyword: [/(?:\ba|@prefix|@base)\b|=/, /\b(?:base|graph|prefix)\b/i],
        tag: {
          pattern: /@[a-z]+(?:-[a-z\d]+)*/i,
          inside: {
            punctuation: /@/
          }
        }
      };
      Prism.languages.trig = Prism.languages["turtle"];
    }
  }
});

export {
  require_turtle
};
//# sourceMappingURL=chunk-FJFWSAPI.js.map
