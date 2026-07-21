#!/usr/bin/env node
/**
 * Convert Bluesky chat export JSON to a simple YAML file
 * with sender, timestamp, and message content.
 *
 * Usage: node scripts/convert-chat.mjs
 */

import { readFileSync, writeFileSync, statSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const INPUT = join(ROOT, 'intake', 'chat-possible_borges-3mo4kmoixas2r.json');
const OUTPUT = join(ROOT, 'src', 'content', 'chat.yaml');

const data = JSON.parse(readFileSync(INPUT, 'utf-8'));

// Build DID → name map from members
const didMap = {};
for (const m of data.members) {
  didMap[m.did] = m.displayName || m.handle || m.did;
}

// Convert messages, skipping system messages and empties
const messages = [];
for (const msg of data.messages) {
  if (!msg.sender || !msg.text) continue;
  messages.push({
    sender: didMap[msg.sender.did] || msg.sender.did,
    timestamp: msg.sentAt,
    text: msg.text,
  });
}

// Build YAML document with header comments
const header = [
  `# ${data.groupName} — Bluesky group chat export`,
  `# Exported: ${data.exportedAt}`,
  '# Members:',
  ...data.members.map(m => {
    const name = m.displayName || m.handle || m.did;
    return `#   - ${name} (${m.handle})`;
  }),
].join('\n');

const doc = yaml.dump({ messages }, {
  lineWidth: -1,        // no wrapping
  noRefs: true,
  quotingType: '"',
  forceQuotes: false,
});

mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, `${header}\n\n${doc}`);

console.log(`Converted ${messages.length} messages → ${OUTPUT}`);
console.log(`Output size: ${(statSync(OUTPUT).size / 1024).toFixed(0)} KB`);
