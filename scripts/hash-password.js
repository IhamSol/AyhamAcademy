/**
 * Utility script to hash a password for use in credentials.json
 *
 * Usage:
 *   node scripts/hash-password.js <password>
 *
 * Example:
 *   node scripts/hash-password.js MySecurePassword123!
 *
 * Then copy the output hash into src/data/credentials.json
 */

const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/hash-password.js <password>");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log("Password hash:", hash);
console.log("\nAdd this to src/data/credentials.json in the passwordHash field.");
