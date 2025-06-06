import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/matlab.js
var require_matlab = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/matlab.js"(exports, module) {
    module.exports = matlab;
    matlab.displayName = "matlab";
    matlab.aliases = [];
    function matlab(Prism) {
      Prism.languages.matlab = {
        comment: [/%\{[\s\S]*?\}%/, /%.+/],
        string: {
          pattern: /\B'(?:''|[^'\r\n])*'/,
          greedy: true
        },
        // FIXME We could handle imaginary numbers as a whole
        number: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+)?(?:[ij])?|\b[ij]\b/,
        keyword: /\b(?:NaN|break|case|catch|continue|else|elseif|end|for|function|if|inf|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
        function: /\b(?!\d)\w+(?=\s*\()/,
        operator: /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/,
        punctuation: /\.{3}|[.,;\[\](){}!]/
      };
    }
  }
});

export {
  require_matlab
};
//# sourceMappingURL=chunk-VJ6LU46X.js.map
