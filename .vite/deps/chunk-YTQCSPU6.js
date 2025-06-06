import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/xquery.js
var require_xquery = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/xquery.js"(exports, module) {
    module.exports = xquery;
    xquery.displayName = "xquery";
    xquery.aliases = [];
    function xquery(Prism) {
      ;
      (function(Prism2) {
        Prism2.languages.xquery = Prism2.languages.extend("markup", {
          "xquery-comment": {
            pattern: /\(:[\s\S]*?:\)/,
            greedy: true,
            alias: "comment"
          },
          string: {
            pattern: /(["'])(?:\1\1|(?!\1)[\s\S])*\1/,
            greedy: true
          },
          extension: {
            pattern: /\(#.+?#\)/,
            alias: "symbol"
          },
          variable: /\$[-\w:]+/,
          axis: {
            pattern: /(^|[^-])(?:ancestor(?:-or-self)?|attribute|child|descendant(?:-or-self)?|following(?:-sibling)?|parent|preceding(?:-sibling)?|self)(?=::)/,
            lookbehind: true,
            alias: "operator"
          },
          "keyword-operator": {
            pattern: /(^|[^:-])\b(?:and|castable as|div|eq|except|ge|gt|idiv|instance of|intersect|is|le|lt|mod|ne|or|union)\b(?=$|[^:-])/,
            lookbehind: true,
            alias: "operator"
          },
          keyword: {
            pattern: /(^|[^:-])\b(?:as|ascending|at|base-uri|boundary-space|case|cast as|collation|construction|copy-namespaces|declare|default|descending|else|empty (?:greatest|least)|encoding|every|external|for|function|if|import|in|inherit|lax|let|map|module|namespace|no-inherit|no-preserve|option|order(?: by|ed|ing)?|preserve|return|satisfies|schema|some|stable|strict|strip|then|to|treat as|typeswitch|unordered|validate|variable|version|where|xquery)\b(?=$|[^:-])/,
            lookbehind: true
          },
          function: /[\w-]+(?::[\w-]+)*(?=\s*\()/,
          "xquery-element": {
            pattern: /(element\s+)[\w-]+(?::[\w-]+)*/,
            lookbehind: true,
            alias: "tag"
          },
          "xquery-attribute": {
            pattern: /(attribute\s+)[\w-]+(?::[\w-]+)*/,
            lookbehind: true,
            alias: "attr-name"
          },
          builtin: {
            pattern: /(^|[^:-])\b(?:attribute|comment|document|element|processing-instruction|text|xs:(?:ENTITIES|ENTITY|ID|IDREFS?|NCName|NMTOKENS?|NOTATION|Name|QName|anyAtomicType|anyType|anyURI|base64Binary|boolean|byte|date|dateTime|dayTimeDuration|decimal|double|duration|float|gDay|gMonth|gMonthDay|gYear|gYearMonth|hexBinary|int|integer|language|long|negativeInteger|nonNegativeInteger|nonPositiveInteger|normalizedString|positiveInteger|short|string|time|token|unsigned(?:Byte|Int|Long|Short)|untyped(?:Atomic)?|yearMonthDuration))\b(?=$|[^:-])/,
            lookbehind: true
          },
          number: /\b\d+(?:\.\d+)?(?:E[+-]?\d+)?/,
          operator: [
            /[+*=?|@]|\.\.?|:=|!=|<[=<]?|>[=>]?/,
            {
              pattern: /(\s)-(?=\s)/,
              lookbehind: true
            }
          ],
          punctuation: /[[\](){},;:/]/
        });
        Prism2.languages.xquery.tag.pattern = /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|\{(?!\{)(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/;
        Prism2.languages.xquery["tag"].inside["attr-value"].pattern = /=(?:("|')(?:\\[\s\S]|\{(?!\{)(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}|(?!\1)[^\\])*\1|[^\s'">=]+)/;
        Prism2.languages.xquery["tag"].inside["attr-value"].inside["punctuation"] = /^="|"$/;
        Prism2.languages.xquery["tag"].inside["attr-value"].inside["expression"] = {
          // Allow for two levels of nesting
          pattern: /\{(?!\{)(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}/,
          inside: Prism2.languages.xquery,
          alias: "language-xquery"
        };
        var stringifyToken = function(token) {
          if (typeof token === "string") {
            return token;
          }
          if (typeof token.content === "string") {
            return token.content;
          }
          return token.content.map(stringifyToken).join("");
        };
        var walkTokens = function(tokens) {
          var openedTags = [];
          for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            var notTagNorBrace = false;
            if (typeof token !== "string") {
              if (token.type === "tag" && token.content[0] && token.content[0].type === "tag") {
                if (token.content[0].content[0].content === "</") {
                  if (openedTags.length > 0 && openedTags[openedTags.length - 1].tagName === stringifyToken(token.content[0].content[1])) {
                    openedTags.pop();
                  }
                } else {
                  if (token.content[token.content.length - 1].content === "/>") {
                  } else {
                    openedTags.push({
                      tagName: stringifyToken(token.content[0].content[1]),
                      openedBraces: 0
                    });
                  }
                }
              } else if (openedTags.length > 0 && token.type === "punctuation" && token.content === "{" && // Ignore `{{`
              (!tokens[i + 1] || tokens[i + 1].type !== "punctuation" || tokens[i + 1].content !== "{") && (!tokens[i - 1] || tokens[i - 1].type !== "plain-text" || tokens[i - 1].content !== "{")) {
                openedTags[openedTags.length - 1].openedBraces++;
              } else if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces > 0 && token.type === "punctuation" && token.content === "}") {
                openedTags[openedTags.length - 1].openedBraces--;
              } else if (token.type !== "comment") {
                notTagNorBrace = true;
              }
            }
            if (notTagNorBrace || typeof token === "string") {
              if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces === 0) {
                var plainText = stringifyToken(token);
                if (i < tokens.length - 1 && (typeof tokens[i + 1] === "string" || tokens[i + 1].type === "plain-text")) {
                  plainText += stringifyToken(tokens[i + 1]);
                  tokens.splice(i + 1, 1);
                }
                if (i > 0 && (typeof tokens[i - 1] === "string" || tokens[i - 1].type === "plain-text")) {
                  plainText = stringifyToken(tokens[i - 1]) + plainText;
                  tokens.splice(i - 1, 1);
                  i--;
                }
                if (/^\s+$/.test(plainText)) {
                  tokens[i] = plainText;
                } else {
                  tokens[i] = new Prism2.Token(
                    "plain-text",
                    plainText,
                    null,
                    plainText
                  );
                }
              }
            }
            if (token.content && typeof token.content !== "string") {
              walkTokens(token.content);
            }
          }
        };
        Prism2.hooks.add("after-tokenize", function(env) {
          if (env.language !== "xquery") {
            return;
          }
          walkTokens(env.tokens);
        });
      })(Prism);
    }
  }
});

export {
  require_xquery
};
//# sourceMappingURL=chunk-YTQCSPU6.js.map
