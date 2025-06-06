import {
  require_csharp
} from "./chunk-6LDQGKBD.js";
import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/aspnet.js
var require_aspnet = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/aspnet.js"(exports, module) {
    var refractorCsharp = require_csharp();
    module.exports = aspnet;
    aspnet.displayName = "aspnet";
    aspnet.aliases = [];
    function aspnet(Prism) {
      Prism.register(refractorCsharp);
      Prism.languages.aspnet = Prism.languages.extend("markup", {
        "page-directive": {
          pattern: /<%\s*@.*%>/,
          alias: "tag",
          inside: {
            "page-directive": {
              pattern: /<%\s*@\s*(?:Assembly|Control|Implements|Import|Master(?:Type)?|OutputCache|Page|PreviousPageType|Reference|Register)?|%>/i,
              alias: "tag"
            },
            rest: Prism.languages.markup.tag.inside
          }
        },
        directive: {
          pattern: /<%.*%>/,
          alias: "tag",
          inside: {
            directive: {
              pattern: /<%\s*?[$=%#:]{0,2}|%>/,
              alias: "tag"
            },
            rest: Prism.languages.csharp
          }
        }
      });
      Prism.languages.aspnet.tag.pattern = /<(?!%)\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/;
      Prism.languages.insertBefore(
        "inside",
        "punctuation",
        {
          directive: Prism.languages.aspnet["directive"]
        },
        Prism.languages.aspnet.tag.inside["attr-value"]
      );
      Prism.languages.insertBefore("aspnet", "comment", {
        "asp-comment": {
          pattern: /<%--[\s\S]*?--%>/,
          alias: ["asp", "comment"]
        }
      });
      Prism.languages.insertBefore(
        "aspnet",
        Prism.languages.javascript ? "script" : "tag",
        {
          "asp-script": {
            pattern: /(<script(?=.*runat=['"]?server\b)[^>]*>)[\s\S]*?(?=<\/script>)/i,
            lookbehind: true,
            alias: ["asp", "script"],
            inside: Prism.languages.csharp || {}
          }
        }
      );
    }
  }
});

export {
  require_aspnet
};
//# sourceMappingURL=chunk-UDTMQA44.js.map
