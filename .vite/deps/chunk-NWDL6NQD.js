import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/highlight.js/lib/languages/basic.js
var require_basic = __commonJS({
  "node_modules/highlight.js/lib/languages/basic.js"(exports, module) {
    function basic(hljs) {
      return {
        name: "BASIC",
        case_insensitive: true,
        illegal: "^.",
        // Support explicitly typed variables that end with $%! or #.
        keywords: {
          $pattern: "[a-zA-Z][a-zA-Z0-9_$%!#]*",
          keyword: "ABS ASC AND ATN AUTO|0 BEEP BLOAD|10 BSAVE|10 CALL CALLS CDBL CHAIN CHDIR CHR$|10 CINT CIRCLE CLEAR CLOSE CLS COLOR COM COMMON CONT COS CSNG CSRLIN CVD CVI CVS DATA DATE$ DEFDBL DEFINT DEFSNG DEFSTR DEF|0 SEG USR DELETE DIM DRAW EDIT END ENVIRON ENVIRON$ EOF EQV ERASE ERDEV ERDEV$ ERL ERR ERROR EXP FIELD FILES FIX FOR|0 FRE GET GOSUB|10 GOTO HEX$ IF THEN ELSE|0 INKEY$ INP INPUT INPUT# INPUT$ INSTR IMP INT IOCTL IOCTL$ KEY ON OFF LIST KILL LEFT$ LEN LET LINE LLIST LOAD LOC LOCATE LOF LOG LPRINT USING LSET MERGE MID$ MKDIR MKD$ MKI$ MKS$ MOD NAME NEW NEXT NOISE NOT OCT$ ON OR PEN PLAY STRIG OPEN OPTION BASE OUT PAINT PALETTE PCOPY PEEK PMAP POINT POKE POS PRINT PRINT] PSET PRESET PUT RANDOMIZE READ REM RENUM RESET|0 RESTORE RESUME RETURN|0 RIGHT$ RMDIR RND RSET RUN SAVE SCREEN SGN SHELL SIN SOUND SPACE$ SPC SQR STEP STICK STOP STR$ STRING$ SWAP SYSTEM TAB TAN TIME$ TIMER TROFF TRON TO USR VAL VARPTR VARPTR$ VIEW WAIT WHILE WEND WIDTH WINDOW WRITE XOR"
        },
        contains: [
          hljs.QUOTE_STRING_MODE,
          hljs.COMMENT("REM", "$", {
            relevance: 10
          }),
          hljs.COMMENT("'", "$", {
            relevance: 0
          }),
          {
            // Match line numbers
            className: "symbol",
            begin: "^[0-9]+ ",
            relevance: 10
          },
          {
            // Match typed numeric constants (1000, 12.34!, 1.2e5, 1.5#, 1.2D2)
            className: "number",
            begin: "\\b\\d+(\\.\\d+)?([edED]\\d+)?[#!]?",
            relevance: 0
          },
          {
            // Match hexadecimal numbers (&Hxxxx)
            className: "number",
            begin: "(&[hH][0-9a-fA-F]{1,4})"
          },
          {
            // Match octal numbers (&Oxxxxxx)
            className: "number",
            begin: "(&[oO][0-7]{1,6})"
          }
        ]
      };
    }
    module.exports = basic;
  }
});

export {
  require_basic
};
//# sourceMappingURL=chunk-NWDL6NQD.js.map
