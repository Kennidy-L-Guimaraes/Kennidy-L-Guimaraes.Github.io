
(() => {
  "use strict";

  if (!window.hljs) return;

  //Logic
  hljs.registerLanguage("logic", (hljs) => ({
    name: "Logic",
    aliases: ["pseudo", "pseudocode", "portugol"],
    case_insensitive: true,

    keywords: {
      $pattern: /[A-Za-zÀ-ÿ_][A-Za-zÀ-ÿ_0-9]*/,
      keyword:
        "if then else elseif endif while do for each in to step repeat until " +
        "return function procedure begin end and or not xor break continue " +
        "se entao então senao senão enquanto faca faça para ate até passo " +
        "repita retorne funcao função procedimento inicio início fim e ou nao não",
      literal: "true false null nil verdadeiro falso nulo",
      built_in: "print read write input output escreva leia imprima"
    },

    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.HASH_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      hljs.C_NUMBER_MODE
    ]
  }));

  //Bitcoin Script.
  hljs.registerLanguage("bitcoin-script", (hljs) => ({
    name: "Bitcoin Script",
    aliases: ["bitcoin", "btc-script"],
    case_insensitive: true,

    
contains: [
  // Controle de fluxo
        {
            scope: "keyword",
            match: /\bOP_(?:IF|NOTIF|ELSE|ENDIF|VERIFY|RETURN)\b/
        },

        {
            scope: "built_in",
            match: /\bOP_(?:CHECKSIG|CHECKSIGVERIFY|CHECKMULTISIG|CHECKMULTISIGVERIFY|HASH160|HASH256|SHA256|SHA1|RIPEMD160|DUP|DROP|EQUAL|EQUALVERIFY|CHECKLOCKTIMEVERIFY|CHECKSEQUENCEVERIFY)\b/
        },

        {
            scope: "variable",
            begin: /<[A-Za-z0-9_:.-]+>/
        },

        {
            scope: "number",
            match: /\b\d+\b/
        }
    ]

  }));

  hljs.configure({
    languages: ["delphi", "csharp", "logic", "bitcoin-script"]
  });

  hljs.highlightAll();
})();
