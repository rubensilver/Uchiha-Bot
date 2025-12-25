const fs = require("fs");
const path = require("path");

function fix(file) {
  let c = fs.readFileSync(file, "utf8");

  c = c.replace(
    /async\s*\(\s*sock\s*,\s*m\s*,\s*args\s*\)/g,
    "async ({ sock, msg, args })"
  );

  c = c.replace(/\bm\b/g, "msg");

  fs.writeFileSync(file, c);
}

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".ts")) fix(p);
  }
}

walk("src/commands");
console.log("✅ TODOS os comandos corrigidos");
