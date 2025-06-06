import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/xeora.js
var require_xeora = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/xeora.js"(exports, module) {
    module.exports = xeora;
    xeora.displayName = "xeora";
    xeora.aliases = ["xeoracube"];
    function xeora(Prism) {
      ;
      (function(Prism2) {
        Prism2.languages.xeora = Prism2.languages.extend("markup", {
          constant: {
            pattern: /\$(?:DomainContents|PageRenderDuration)\$/,
            inside: {
              punctuation: {
                pattern: /\$/
              }
            }
          },
          variable: {
            pattern: /\$@?(?:#+|[-+*~=^])?[\w.]+\$/,
            inside: {
              punctuation: {
                pattern: /[$.]/
              },
              operator: {
                pattern: /#+|[-+*~=^@]/
              }
            }
          },
          "function-inline": {
            pattern: /\$F:[-\w.]+\?[-\w.]+(?:,(?:(?:@[-#]*\w+\.[\w+.]\.*)*\|)*(?:(?:[\w+]|[-#*.~^]+[\w+]|=\S)(?:[^$=]|=+[^=])*=*|(?:@[-#]*\w+\.[\w+.]\.*)+(?:(?:[\w+]|[-#*~^][-#*.~^]*[\w+]|=\S)(?:[^$=]|=+[^=])*=*)?)?)?\$/,
            inside: {
              variable: {
                pattern: /(?:[,|])@?(?:#+|[-+*~=^])?[\w.]+/,
                inside: {
                  punctuation: {
                    pattern: /[,.|]/
                  },
                  operator: {
                    pattern: /#+|[-+*~=^@]/
                  }
                }
              },
              punctuation: {
                pattern: /\$\w:|[$:?.,|]/
              }
            },
            alias: "function"
          },
          "function-block": {
            pattern: /\$XF:\{[-\w.]+\?[-\w.]+(?:,(?:(?:@[-#]*\w+\.[\w+.]\.*)*\|)*(?:(?:[\w+]|[-#*.~^]+[\w+]|=\S)(?:[^$=]|=+[^=])*=*|(?:@[-#]*\w+\.[\w+.]\.*)+(?:(?:[\w+]|[-#*~^][-#*.~^]*[\w+]|=\S)(?:[^$=]|=+[^=])*=*)?)?)?\}:XF\$/,
            inside: {
              punctuation: {
                pattern: /[$:{}?.,|]/
              }
            },
            alias: "function"
          },
          "directive-inline": {
            pattern: /\$\w(?:#\d+\+?)?(?:\[[-\w.]+\])?:[-\/\w.]+\$/,
            inside: {
              punctuation: {
                pattern: /\$(?:\w:|C(?:\[|#\d))?|[:{[\]]/,
                inside: {
                  tag: {
                    pattern: /#\d/
                  }
                }
              }
            },
            alias: "function"
          },
          "directive-block-open": {
            pattern: /\$\w+:\{|\$\w(?:#\d+\+?)?(?:\[[-\w.]+\])?:[-\w.]+:\{(?:![A-Z]+)?/,
            inside: {
              punctuation: {
                pattern: /\$(?:\w:|C(?:\[|#\d))?|[:{[\]]/,
                inside: {
                  tag: {
                    pattern: /#\d/
                  }
                }
              },
              attribute: {
                pattern: /![A-Z]+$/,
                inside: {
                  punctuation: {
                    pattern: /!/
                  }
                },
                alias: "keyword"
              }
            },
            alias: "function"
          },
          "directive-block-separator": {
            pattern: /\}:[-\w.]+:\{/,
            inside: {
              punctuation: {
                pattern: /[:{}]/
              }
            },
            alias: "function"
          },
          "directive-block-close": {
            pattern: /\}:[-\w.]+\$/,
            inside: {
              punctuation: {
                pattern: /[:{}$]/
              }
            },
            alias: "function"
          }
        });
        Prism2.languages.insertBefore(
          "inside",
          "punctuation",
          {
            variable: Prism2.languages.xeora["function-inline"].inside["variable"]
          },
          Prism2.languages.xeora["function-block"]
        );
        Prism2.languages.xeoracube = Prism2.languages.xeora;
      })(Prism);
    }
  }
});

export {
  require_xeora
};
//# sourceMappingURL=chunk-T5K5BPSD.js.map
