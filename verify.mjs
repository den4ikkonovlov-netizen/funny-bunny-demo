import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
const html=fs.readFileSync('dist/index.html','utf8');const js=fs.readFileSync('dist/app.js','utf8');const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
const assets=[...html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)].map(m=>m[1]).filter(x=>!/^https?:|^tel:/.test(x));for(const asset of assets)assert(fs.existsSync(path.join('dist',asset)),`Missing asset: ${asset}`);
for(const m of html.matchAll(/href="#([^"]+)"/g))assert(ids.has(m[1]),`Missing anchor: ${m[1]}`);
assert.equal([...html.matchAll(/<h1\b/g)].length,1);assert(html.includes('Content-Security-Policy'));assert(!/<script[^>]*src="https?:/.test(html));assert(!/\b(fetch|eval)\s*\(|localStorage|sessionStorage|innerHTML/.test(js));
for(const m of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g))assert(m[0].includes('noopener noreferrer'));
console.log(`PASS: ${assets.length} local asset references, all section anchors, one H1, external link protection, CSP and browser-only interactions.`);
