const Joi = require('joi');

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
const telefoneRegex = /^\(\d{2}\)\s?\d{4,5}-?\d{4}$|^\d{10,11}$/;

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .max(255)
    .required()
    .messages({
      'string.email': 'Email inválido',
      'string.empty': 'Email é obrigatório',
      'any.required': 'Email é obrigatório'
    }),
  senha: Joi.string()
    .min(6)
    .max(100)
    .required()
    .messages({
      'string.min': 'Senha deve ter pelo menos 6 caracteres',
      'string.empty': 'Senha é obrigatória',
      'any.required': 'Senha é obrigatória'
    })
});

const registroSchema = Joi.object({
  nome_completo: Joi.string()
    .min(2)
    .max(255)
    .trim()
    .required()
    .messages({
      'string.min': 'Nome completo deve ter pelo menos 2 caracteres',
      'string.max': 'Nome completo muito longo',
      'string.empty': 'Nome completo é obrigatório',
      'any.required': 'Nome completo é obrigatório'
    }),
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .max(255)
    .required()
    .messages({
      'string.email': 'Email inválido',
      'string.empty': 'Email é obrigatório',
      'any.required': 'Email é obrigatório'
    }),
  senha: Joi.string()
    .min(6)
    .max(100)
    .required()
    .messages({
      'string.min': 'Senha deve ter pelo menos 6 caracteres',
      'string.max': 'Senha muito longa',
      'string.empty': 'Senha é obrigatória',
      'any.required': 'Senha é obrigatória'
    }),
  cpf: Joi.string()
    .pattern(cpfRegex)
    .allow(null, '')
    .optional()
    .messages({
      'string.pattern.base': 'CPF inválido. Use formato 000.000.000-00 ou 00000000000'
    }),
  telefone: Joi.string()
    .pattern(telefoneRegex)
    .allow(null, '')
    .optional()
    .messages({
      'string.pattern.base': 'Telefone inválido. Use formato (00) 00000-0000 ou 00000000000'
    }),
  data_nascimento: Joi.date()
    .max('now')
    .allow(null, '')
    .optional()
    .messages({
      'date.max': 'Data de nascimento inválida',
      'date.base': 'Data de nascimento inválida'
    }),
  sexo: Joi.string()
    .valid('M', 'F', 'Outro')
    .allow(null, '')
    .optional()
    .messages({
      'any.only': 'Sexo deve ser M, F ou Outro'
    })
});

const solicitarRecuperacaoSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .max(255)
    .required()
    .messages({
      'string.email': 'Email inválido',
      'string.empty': 'Email é obrigatório',
      'any.required': 'Email é obrigatório'
    })
});

const verificarTokenSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .max(255)
    .required()
    .messages({
      'string.email': 'Email inválido',
      'string.empty': 'Email é obrigatório',
      'any.required': 'Email é obrigatório'
    }),
  token: Joi.string()
    .length(6)
    .pattern(/^\d{6}$/)
    .required()
    .messages({
      'string.length': 'Token deve ter 6 dígitos',
      'string.pattern.base': 'Token deve conter apenas números',
      'string.empty': 'Token é obrigatório',
      'any.required': 'Token é obrigatório'
    })
});

const redefinirSenhaSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .max(255)
    .required()
    .messages({
      'string.email': 'Email inválido',
      'string.empty': 'Email é obrigatório',
      'any.required': 'Email é obrigatório'
    }),
  token: Joi.string()
    .length(6)
    .pattern(/^\d{6}$/)
    .required()
    .messages({
      'string.length': 'Token deve ter 6 dígitos',
      'string.pattern.base': 'Token deve conter apenas números',
      'string.empty': 'Token é obrigatório',
      'any.required': 'Token é obrigatório'
    }),
  nova_senha: Joi.string()
    .min(6)
    .max(100)
    .required()
    .messages({
      'string.min': 'Nova senha deve ter pelo menos 6 caracteres',
      'string.max': 'Nova senha muito longa',
      'string.empty': 'Nova senha é obrigatória',
      'any.required': 'Nova senha é obrigatória'
    })
});

const atualizarPerfilSchema = Joi.object({
  nome_completo: Joi.string()
    .min(2)
    .max(255)
    .trim()
    .required()
    .messages({
      'string.min': 'Nome completo deve ter pelo menos 2 caracteres',
      'string.max': 'Nome completo muito longo',
      'string.empty': 'Nome completo é obrigatório',
      'any.required': 'Nome completo é obrigatório'
    }),
  telefone: Joi.string()
    .pattern(telefoneRegex)
    .allow(null, '')
    .optional()
    .messages({
      'string.pattern.base': 'Telefone inválido. Use formato (00) 00000-0000 ou 00000000000'
    }),
  data_nascimento: Joi.date()
    .max('now')
    .allow(null, '')
    .optional()
    .messages({
      'date.max': 'Data de nascimento inválida',
      'date.base': 'Data de nascimento inválida'
    }),
  sexo: Joi.string()
    .valid('M', 'F', 'Outro')
    .allow(null, '')
    .optional()
    .messages({
      'any.only': 'Sexo deve ser M, F ou Outro'
    })
});

const alterarSenhaSchema = Joi.object({
  senha_atual: Joi.string()
    .min(6)
    .max(100)
    .required()
    .messages({
      'string.min': 'Senha atual deve ter pelo menos 6 caracteres',
      'string.empty': 'Senha atual é obrigatória',
      'any.required': 'Senha atual é obrigatória'
    }),
  nova_senha: Joi.string()
    .min(6)
    .max(100)
    .required()
    .messages({
      'string.min': 'Nova senha deve ter pelo menos 6 caracteres',
      'string.max': 'Nova senha muito longa',
      'string.empty': 'Nova senha é obrigatória',
      'any.required': 'Nova senha é obrigatória'
    })
});

module.exports = {
  loginSchema,
  registroSchema,
  solicitarRecuperacaoSchema,
  verificarTokenSchema,
  redefinirSenhaSchema,
  atualizarPerfilSchema,
  alterarSenhaSchema
};