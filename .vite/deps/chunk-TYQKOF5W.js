import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/moonscript.js
var require_moonscript = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/moonscript.js"(exports, module) {
    module.exports = moonscript;
    moonscript.displayName = "moonscript";
    moonscript.aliases = ["moon"];
    function moonscript(Prism) {
      Prism.languages.moonscript = {
        comment: /--.*/,
        string: [
          {
            pattern: /'[^']*'|\[(=*)\[[\s\S]*?\]\1\]/,
            greedy: true
          },
          {
            pattern: /"[^"]*"/,
            greedy: true,
            inside: {
              interpolation: {
                pattern: /#\{[^{}]*\}/,
                inside: {
                  moonscript: {
                    pattern: /(^#\{)[\s\S]+(?=\})/,
                    lookbehind: true,
                    inside: null
                    // see beow
                  },
                  "interpolation-punctuation": {
                    pattern: /#\{|\}/,
                    alias: "punctuation"
                  }
                }
              }
            }
          }
        ],
        "class-name": [
          {
            pattern: /(\b(?:class|extends)[ \t]+)\w+/,
            lookbehind: true
          },
          // class-like names start with a capital letter
          /\b[A-Z]\w*/
        ],
        keyword: /\b(?:class|continue|do|else|elseif|export|extends|for|from|if|import|in|local|nil|return|self|super|switch|then|unless|using|when|while|with)\b/,
        variable: /@@?\w*/,
        property: {
          pattern: /\b(?!\d)\w+(?=:)|(:)(?!\d)\w+/,
          lookbehind: true
        },
        function: {
          pattern: /\b(?:_G|_VERSION|assert|collectgarbage|coroutine\.(?:create|resume|running|status|wrap|yield)|debug\.(?:debug|getfenv|gethook|getinfo|getlocal|getmetatable|getregistry|getupvalue|setfenv|sethook|setlocal|setmetatable|setupvalue|traceback)|dofile|error|getfenv|getmetatable|io\.(?:close|flush|input|lines|open|output|popen|read|stderr|stdin|stdout|tmpfile|type|write)|ipairs|load|loadfile|loadstring|math\.(?:abs|acos|asin|atan|atan2|ceil|cos|cosh|deg|exp|floor|fmod|frexp|ldexp|log|log10|max|min|modf|pi|pow|rad|random|randomseed|sin|sinh|sqrt|tan|tanh)|module|next|os\.(?:clock|date|difftime|execute|exit|getenv|remove|rename|setlocale|time|tmpname)|package\.(?:cpath|loaded|loadlib|path|preload|seeall)|pairs|pcall|print|rawequal|rawget|rawset|require|select|setfenv|setmetatable|string\.(?:byte|char|dump|find|format|gmatch|gsub|len|lower|match|rep|reverse|sub|upper)|table\.(?:concat|insert|maxn|remove|sort)|tonumber|tostring|type|unpack|xpcall)\b/,
          inside: {
            punctuation: /\./
          }
        },
        boolean: /\b(?:false|true)\b/,
        number: /(?:\B\.\d+|\b\d+\.\d+|\b\d+(?=[eE]))(?:[eE][-+]?\d+)?\b|\b(?:0x[a-fA-F\d]+|\d+)(?:U?LL)?\b/,
        operator: /\.{3}|[-=]>|~=|(?:[-+*/%<>!=]|\.\.)=?|[:#^]|\b(?:and|or)\b=?|\b(?:not)\b/,
        punctuation: /[.,()[\]{}\\]/
      };
      Prism.languages.moonscript.string[1].inside.interpolation.inside.moonscript.inside = Prism.languages.moonscript;
      Prism.languages.moon = Prism.languages.moonscript;
    }
  }
});

export {
  require_moonscript
};
//# sourceMappingURL=chunk-TYQKOF5W.js.map
