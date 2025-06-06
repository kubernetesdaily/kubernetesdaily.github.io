import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/n1ql.js
var require_n1ql = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/n1ql.js"(exports, module) {
    module.exports = n1ql;
    n1ql.displayName = "n1ql";
    n1ql.aliases = [];
    function n1ql(Prism) {
      Prism.languages.n1ql = {
        comment: {
          pattern: /\/\*[\s\S]*?(?:$|\*\/)|--.*/,
          greedy: true
        },
        string: {
          pattern: /(["'])(?:\\[\s\S]|(?!\1)[^\\]|\1\1)*\1/,
          greedy: true
        },
        identifier: {
          pattern: /`(?:\\[\s\S]|[^\\`]|``)*`/,
          greedy: true
        },
        parameter: /\$[\w.]+/,
        // https://docs.couchbase.com/server/current/n1ql/n1ql-language-reference/reservedwords.html#n1ql-reserved-words
        keyword: /\b(?:ADVISE|ALL|ALTER|ANALYZE|AS|ASC|AT|BEGIN|BINARY|BOOLEAN|BREAK|BUCKET|BUILD|BY|CALL|CAST|CLUSTER|COLLATE|COLLECTION|COMMIT|COMMITTED|CONNECT|CONTINUE|CORRELATE|CORRELATED|COVER|CREATE|CURRENT|DATABASE|DATASET|DATASTORE|DECLARE|DECREMENT|DELETE|DERIVED|DESC|DESCRIBE|DISTINCT|DO|DROP|EACH|ELEMENT|EXCEPT|EXCLUDE|EXECUTE|EXPLAIN|FETCH|FILTER|FLATTEN|FLUSH|FOLLOWING|FOR|FORCE|FROM|FTS|FUNCTION|GOLANG|GRANT|GROUP|GROUPS|GSI|HASH|HAVING|IF|IGNORE|ILIKE|INCLUDE|INCREMENT|INDEX|INFER|INLINE|INNER|INSERT|INTERSECT|INTO|IS|ISOLATION|JAVASCRIPT|JOIN|KEY|KEYS|KEYSPACE|KNOWN|LANGUAGE|LAST|LEFT|LET|LETTING|LEVEL|LIMIT|LSM|MAP|MAPPING|MATCHED|MATERIALIZED|MERGE|MINUS|MISSING|NAMESPACE|NEST|NL|NO|NTH_VALUE|NULL|NULLS|NUMBER|OBJECT|OFFSET|ON|OPTION|OPTIONS|ORDER|OTHERS|OUTER|OVER|PARSE|PARTITION|PASSWORD|PATH|POOL|PRECEDING|PREPARE|PRIMARY|PRIVATE|PRIVILEGE|PROBE|PROCEDURE|PUBLIC|RANGE|RAW|REALM|REDUCE|RENAME|RESPECT|RETURN|RETURNING|REVOKE|RIGHT|ROLE|ROLLBACK|ROW|ROWS|SATISFIES|SAVEPOINT|SCHEMA|SCOPE|SELECT|SELF|SEMI|SET|SHOW|SOME|START|STATISTICS|STRING|SYSTEM|TIES|TO|TRAN|TRANSACTION|TRIGGER|TRUNCATE|UNBOUNDED|UNDER|UNION|UNIQUE|UNKNOWN|UNNEST|UNSET|UPDATE|UPSERT|USE|USER|USING|VALIDATE|VALUE|VALUES|VIA|VIEW|WHERE|WHILE|WINDOW|WITH|WORK|XOR)\b/i,
        function: /\b[a-z_]\w*(?=\s*\()/i,
        boolean: /\b(?:FALSE|TRUE)\b/i,
        number: /(?:\b\d+\.|\B\.)\d+e[+\-]?\d+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
        operator: /[-+*\/%]|!=|==?|\|\||<[>=]?|>=?|\b(?:AND|ANY|ARRAY|BETWEEN|CASE|ELSE|END|EVERY|EXISTS|FIRST|IN|LIKE|NOT|OR|THEN|VALUED|WHEN|WITHIN)\b/i,
        punctuation: /[;[\](),.{}:]/
      };
    }
  }
});

export {
  require_n1ql
};
//# sourceMappingURL=chunk-GALURAXA.js.map
