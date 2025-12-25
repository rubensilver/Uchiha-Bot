module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "no-restricted-syntax": [
      "warn",
      {
        selector: "CallExpression[callee.property.name='groupMetadata']",
        message:
          "❌ Permissões NÃO devem ficar dentro de comandos. Use o commandHandler."
      },
      {
        selector: "Identifier[name='botIsAdmin']",
        message:
          "❌ botIsAdmin não deve ser usado em comandos."
      },
      {
        selector: "Identifier[name='senderIsAdmin']",
        message:
          "❌ senderIsAdmin não deve ser usado em comandos."
      }
    ]
  }
};
