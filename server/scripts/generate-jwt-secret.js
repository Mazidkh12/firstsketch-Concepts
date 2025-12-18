#!/usr/bin/env node

/**
 * JWT Secret Generator
 * 
 * Generates a cryptographically secure random string for JWT signing.
 * Run with: node scripts/generate-jwt-secret.js
 */

const crypto = require('crypto');

const generateJWTSecret = (length = 64) => {
  return crypto.randomBytes(length).toString('hex');
};

const jwtSecret = generateJWTSecret();

console.log('🔐 JWT Secret Generator');
console.log('========================');
console.log('');
console.log('Generated JWT Secret:');
console.log(jwtSecret);
console.log('');
console.log('Length:', jwtSecret.length, 'characters');
console.log('');
console.log('Add this to your .env file:');
console.log(`JWT_SECRET=${jwtSecret}`);
console.log('');
console.log('⚠️  Keep this secret secure and never commit it to version control!');

module.exports = { generateJWTSecret };