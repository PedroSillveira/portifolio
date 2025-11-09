require('dotenv').config();
const crypto = require("crypto");
const speak = require("speakeasy");
const bcrypt = require("bcrypt");
const { SignJWT, jwtVerify } = require('jose');

const KEY = process.env.CRYPTO_KEY;
const IV = Buffer.from(process.env.CRYPTO_IV, "hex");
const SPEAKKEY = process.env.SPEAKEASY_KEY;
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);
const SALT_ROUNDS = 12;

function encryptCPF(cpf) {
  const cipher = crypto.createCipheriv("aes-256-cbc", KEY, IV);
  let encrypted = cipher.update(cpf, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decryptCPF(encryptedCPF) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", KEY, IV);
  let decrypted = decipher.update(encryptedCPF, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}

async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

function speakeasytokengen() {
  const token = speak.totp({
    secret: SPEAKKEY,
    encoding: "hex",
    digits: 6,
    step: 600,
  });
  return token;
}

function speakeasytokenver(tokenRecebido) {
  const isValid = speak.totp.verify({
    secret: SPEAKKEY,
    encoding: "hex",
    token: tokenRecebido,
    step: 600,
    window: 1,
  });
  return isValid;
}

async function jwtencript(obj) {
  return await new SignJWT(obj)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('12h')
    .sign(SECRET_KEY);
}

async function jwtdecript(payload) {
  try {
    if (!payload || !payload.payload) {
        console.error("Payload ou payload.payload está faltando no jwtdecript");
        return null;
    }
    const { payload: verifiedPayload } = await jwtVerify(payload.payload, SECRET_KEY);
    return verifiedPayload;
  } catch (err) {
    console.error("Token inválido ou expirado:", err.message);
    return null;
  }
}

module.exports = {
  encryptCPF,
  decryptCPF,
  hashPassword,
  comparePassword,
  speakeasytokengen,
  speakeasytokenver,
  jwtencript,
  jwtdecript,
};