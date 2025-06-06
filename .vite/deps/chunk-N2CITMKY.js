import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/highlight.js/lib/languages/rust.js
var require_rust = __commonJS({
  "node_modules/highlight.js/lib/languages/rust.js"(exports, module) {
    function rust(hljs) {
      const NUM_SUFFIX = "([ui](8|16|32|64|128|size)|f(32|64))?";
      const KEYWORDS = "abstract as async await become box break const continue crate do dyn else enum extern false final fn for if impl in let loop macro match mod move mut override priv pub ref return self Self static struct super trait true try type typeof unsafe unsized use virtual where while yield";
      const BUILTINS = (
        // functions
        "drop i8 i16 i32 i64 i128 isize u8 u16 u32 u64 u128 usize f32 f64 str char bool Box Option Result String Vec Copy Send Sized Sync Drop Fn FnMut FnOnce ToOwned Clone Debug PartialEq PartialOrd Eq Ord AsRef AsMut Into From Default Iterator Extend IntoIterator DoubleEndedIterator ExactSizeIterator SliceConcatExt ToString assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! debug_assert! debug_assert_eq! env! panic! file! format! format_args! include_bin! include_str! line! local_data_key! module_path! option_env! print! println! select! stringify! try! unimplemented! unreachable! vec! write! writeln! macro_rules! assert_ne! debug_assert_ne!"
      );
      return {
        name: "Rust",
        aliases: ["rs"],
        keywords: {
          $pattern: hljs.IDENT_RE + "!?",
          keyword: KEYWORDS,
          literal: "true false Some None Ok Err",
          built_in: BUILTINS
        },
        illegal: "</",
        contains: [
          hljs.C_LINE_COMMENT_MODE,
          hljs.COMMENT("/\\*", "\\*/", {
            contains: ["self"]
          }),
          hljs.inherit(hljs.QUOTE_STRING_MODE, {
            begin: /b?"/,
            illegal: null
          }),
          {
            className: "string",
            variants: [
              {
                begin: /r(#*)"(.|\n)*?"\1(?!#)/
              },
              {
                begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/
              }
            ]
          },
          {
            className: "symbol",
            begin: /'[a-zA-Z_][a-zA-Z0-9_]*/
          },
          {
            className: "number",
            variants: [
              {
                begin: "\\b0b([01_]+)" + NUM_SUFFIX
              },
              {
                begin: "\\b0o([0-7_]+)" + NUM_SUFFIX
              },
              {
                begin: "\\b0x([A-Fa-f0-9_]+)" + NUM_SUFFIX
              },
              {
                begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + NUM_SUFFIX
              }
            ],
            relevance: 0
          },
          {
            className: "function",
            beginKeywords: "fn",
            end: "(\\(|<)",
            excludeEnd: true,
            contains: [hljs.UNDERSCORE_TITLE_MODE]
          },
          {
            className: "meta",
            begin: "#!?\\[",
            end: "\\]",
            contains: [
              {
                className: "meta-string",
                begin: /"/,
                end: /"/
              }
            ]
          },
          {
            className: "class",
            beginKeywords: "type",
            end: ";",
            contains: [
              hljs.inherit(hljs.UNDERSCORE_TITLE_MODE, {
                endsParent: true
              })
            ],
            illegal: "\\S"
          },
          {
            className: "class",
            beginKeywords: "trait enum struct union",
            end: /\{/,
            contains: [
              hljs.inherit(hljs.UNDERSCORE_TITLE_MODE, {
                endsParent: true
              })
            ],
            illegal: "[\\w\\d]"
          },
          {
            begin: hljs.IDENT_RE + "::",
            keywords: {
              built_in: BUILTINS
            }
          },
          {
            begin: "->"
          }
        ]
      };
    }
    module.exports = rust;
  }
});

export {
  require_rust
};
//# sourceMappingURL=chunk-N2CITMKY.js.map
