const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    payload: "Muitas requisições. Tente novamente mais tarde"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    payload: "Muitas tentativas. Tente novamente em 15 minutos"
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    payload: "Muitas tentativas de login. Tente novamente em 15 minutos"
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

const strictLoginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: {
    payload: "Conta temporariamente bloqueada por excesso de tentativas"
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    payload: "Muitas solicitações de recuperação. Tente novamente em 1 hora"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const registroLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    payload: "Limite de registros atingido. Tente novamente em 1 hora"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 5,
  delayMs: (hits) => hits * 200,
});

module.exports = {
  generalLimiter,
  authLimiter,
  loginLimiter,
  strictLoginLimiter,
  passwordResetLimiter,
  registroLimiter,
  speedLimiter,
};