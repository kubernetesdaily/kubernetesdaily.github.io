import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/xojo.js
var require_xojo = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/xojo.js"(exports, module) {
    module.exports = xojo;
    xojo.displayName = "xojo";
    xojo.aliases = [];
    function xojo(Prism) {
      Prism.languages.xojo = {
        comment: {
          pattern: /(?:'|\/\/|Rem\b).+/i,
          greedy: true
        },
        string: {
          pattern: /"(?:""|[^"])*"/,
          greedy: true
        },
        number: [/(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:E[+-]?\d+)?/i, /&[bchou][a-z\d]+/i],
        directive: {
          pattern: /#(?:Else|ElseIf|Endif|If|Pragma)\b/i,
          alias: "property"
        },
        keyword: /\b(?:AddHandler|App|Array|As(?:signs)?|Auto|Boolean|Break|By(?:Ref|Val)|Byte|Call|Case|Catch|CFStringRef|CGFloat|Class|Color|Const|Continue|CString|Currency|CurrentMethodName|Declare|Delegate|Dim|Do(?:uble|wnTo)?|Each|Else(?:If)?|End|Enumeration|Event|Exception|Exit|Extends|False|Finally|For|Function|Get|GetTypeInfo|Global|GOTO|If|Implements|In|Inherits|Int(?:8|16|32|64|eger|erface)?|Lib|Loop|Me|Module|Next|Nil|Object|Optional|OSType|ParamArray|Private|Property|Protected|PString|Ptr|Raise(?:Event)?|ReDim|RemoveHandler|Return|Select(?:or)?|Self|Set|Shared|Short|Single|Soft|Static|Step|String|Sub|Super|Text|Then|To|True|Try|Ubound|UInt(?:8|16|32|64|eger)?|Until|Using|Var(?:iant)?|Wend|While|WindowPtr|WString)\b/i,
        operator: /<[=>]?|>=?|[+\-*\/\\^=]|\b(?:AddressOf|And|Ctype|IsA?|Mod|New|Not|Or|WeakAddressOf|Xor)\b/i,
        punctuation: /[.,;:()]/
      };
    }
  }
});

export {
  require_xojo
};
//# sourceMappingURL=chunk-C7L3I7L4.js.map
