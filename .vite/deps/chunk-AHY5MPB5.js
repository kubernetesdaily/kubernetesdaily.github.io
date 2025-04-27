import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-syntax-highlighter/node_modules/refractor/lang/dns-zone-file.js
var require_dns_zone_file = __commonJS({
  "node_modules/react-syntax-highlighter/node_modules/refractor/lang/dns-zone-file.js"(exports, module) {
    module.exports = dnsZoneFile;
    dnsZoneFile.displayName = "dnsZoneFile";
    dnsZoneFile.aliases = [];
    function dnsZoneFile(Prism) {
      Prism.languages["dns-zone-file"] = {
        comment: /;.*/,
        string: {
          pattern: /"(?:\\.|[^"\\\r\n])*"/,
          greedy: true
        },
        variable: [
          {
            pattern: /(^\$ORIGIN[ \t]+)\S+/m,
            lookbehind: true
          },
          {
            pattern: /(^|\s)@(?=\s|$)/,
            lookbehind: true
          }
        ],
        keyword: /^\$(?:INCLUDE|ORIGIN|TTL)(?=\s|$)/m,
        class: {
          // https://tools.ietf.org/html/rfc1035#page-13
          pattern: /(^|\s)(?:CH|CS|HS|IN)(?=\s|$)/,
          lookbehind: true,
          alias: "keyword"
        },
        type: {
          // https://en.wikipedia.org/wiki/List_of_DNS_record_types
          pattern: /(^|\s)(?:A|A6|AAAA|AFSDB|APL|ATMA|CAA|CDNSKEY|CDS|CERT|CNAME|DHCID|DLV|DNAME|DNSKEY|DS|EID|GID|GPOS|HINFO|HIP|IPSECKEY|ISDN|KEY|KX|LOC|MAILA|MAILB|MB|MD|MF|MG|MINFO|MR|MX|NAPTR|NB|NBSTAT|NIMLOC|NINFO|NS|NSAP|NSAP-PTR|NSEC|NSEC3|NSEC3PARAM|NULL|NXT|OPENPGPKEY|PTR|PX|RKEY|RP|RRSIG|RT|SIG|SINK|SMIMEA|SOA|SPF|SRV|SSHFP|TA|TKEY|TLSA|TSIG|TXT|UID|UINFO|UNSPEC|URI|WKS|X25)(?=\s|$)/,
          lookbehind: true,
          alias: "keyword"
        },
        punctuation: /[()]/
      };
      Prism.languages["dns-zone"] = Prism.languages["dns-zone-file"];
    }
  }
});

export {
  require_dns_zone_file
};
//# sourceMappingURL=chunk-AHY5MPB5.js.map
