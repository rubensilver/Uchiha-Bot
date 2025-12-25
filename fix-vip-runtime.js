const fs = require("fs");
const path = require("path");

function fix(file) {
  let c = fs.readFileSync(file, "utf8");

  // Remove returns de sendMessage
  c = c.replace(
    /return\s+sock\.sendMessage/g,
    "await sock.sendMessage"
  );

  // Garante jid seguro
  if (!c.includes("const jid = msg.key?.remoteJid")) {
    c = c.replace(
      /async\s*\(\s*\{\s*sock\s*,\s*msg\s*,\s*args\s*\}\s*\)\s*=>\s*\{/,
      match =>
        match +
        `\n  const jid = msg.key?.remoteJid;\n  if (!jid) return;\n`
    );
  }

  // Substitui msg.key.remoteJid
  c = c.replace(/msg\.key\.remoteJid/g, "jid");

  fs.writeFileSync(file, c);
}

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".ts")) fix(p);
  }
}

walk("src/commands/vip");
console.log("🔥 VIPs corrigidos");
