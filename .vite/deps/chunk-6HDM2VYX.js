import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/kumir.js
var require_kumir = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/kumir.js"(exports, module) {
    module.exports = kumir;
    kumir.displayName = "kumir";
    kumir.aliases = ["kum"];
    function kumir(Prism) {
      ;
      (function(Prism2) {
        var nonId = /\s\x00-\x1f\x22-\x2f\x3a-\x3f\x5b-\x5e\x60\x7b-\x7e/.source;
        function wrapId(pattern, flags) {
          return RegExp(pattern.replace(/<nonId>/g, nonId), flags);
        }
        Prism2.languages.kumir = {
          comment: {
            pattern: /\|.*/
          },
          prolog: {
            pattern: /#.*/,
            greedy: true
          },
          string: {
            pattern: /"[^\n\r"]*"|'[^\n\r']*'/,
            greedy: true
          },
          boolean: {
            pattern: wrapId(/(^|[<nonId>])(?:да|нет)(?=[<nonId>]|$)/.source),
            lookbehind: true
          },
          "operator-word": {
            pattern: wrapId(/(^|[<nonId>])(?:и|или|не)(?=[<nonId>]|$)/.source),
            lookbehind: true,
            alias: "keyword"
          },
          "system-variable": {
            pattern: wrapId(/(^|[<nonId>])знач(?=[<nonId>]|$)/.source),
            lookbehind: true,
            alias: "keyword"
          },
          type: [
            {
              pattern: wrapId(
                /(^|[<nonId>])(?:вещ|лит|лог|сим|цел)(?:\x20*таб)?(?=[<nonId>]|$)/.source
              ),
              lookbehind: true,
              alias: "builtin"
            },
            {
              pattern: wrapId(
                /(^|[<nonId>])(?:компл|сканкод|файл|цвет)(?=[<nonId>]|$)/.source
              ),
              lookbehind: true,
              alias: "important"
            }
          ],
          /**
           * Should be performed after searching for type names because of "таб".
           * "таб" is a reserved word, but never used without a preceding type name.
           * "НАЗНАЧИТЬ", "Фввод", and "Фвывод" are not reserved words.
           */
          keyword: {
            pattern: wrapId(
              /(^|[<nonId>])(?:алг|арг(?:\x20*рез)?|ввод|ВКЛЮЧИТЬ|вс[её]|выбор|вывод|выход|дано|для|до|дс|если|иначе|исп|использовать|кон(?:(?:\x20+|_)исп)?|кц(?:(?:\x20+|_)при)?|надо|нач|нс|нц|от|пауза|пока|при|раза?|рез|стоп|таб|то|утв|шаг)(?=[<nonId>]|$)/.source
            ),
            lookbehind: true
          },
          /** Should be performed after searching for reserved words. */
          name: {
            // eslint-disable-next-line regexp/no-super-linear-backtracking
            pattern: wrapId(
              /(^|[<nonId>])[^\d<nonId>][^<nonId>]*(?:\x20+[^<nonId>]+)*(?=[<nonId>]|$)/.source
            ),
            lookbehind: true
          },
          /** Should be performed after searching for names. */
          number: {
            pattern: wrapId(
              /(^|[<nonId>])(?:\B\$[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)(?=[<nonId>]|$)/.source,
              "i"
            ),
            lookbehind: true
          },
          /** Should be performed after searching for words. */
          punctuation: /:=|[(),:;\[\]]/,
          /**
           * Should be performed after searching for
           * - numeric constants (because of "+" and "-");
           * - punctuation marks (because of ":=" and "=").
           */
          "operator-char": {
            pattern: /\*\*?|<[=>]?|>=?|[-+/=]/,
            alias: "operator"
          }
        };
        Prism2.languages.kum = Prism2.languages.kumir;
      })(Prism);
    }
  }
});

export {
  require_kumir
};
//# sourceMappingURL=chunk-6HDM2VYX.js.map
