import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode('786af68110556384b274e23e03da5b9e');

export async function encrypt(payload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('12h')
    .sign(SECRET_KEY);
  return token;
}

export async function decrypt(token) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch (err) {
    console.error('Token inválido ou expirado:', err.message);
    return null;
  }
}