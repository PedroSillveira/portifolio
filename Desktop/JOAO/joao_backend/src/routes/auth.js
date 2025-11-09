const express = require("express");
const rota = express.Router();
const security = require("../security/cypher");
const execute = require("../services/execute_auth");
const { send_retrive_pass } = require("../server/email");
const { verificarAutenticacao } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validationMiddleware");
const {
  loginLimiter,
  strictLoginLimiter,
  passwordResetLimiter,
  registroLimiter,
  authLimiter,
  speedLimiter,
} = require("../middleware/rateLimiters");
const {
  loginSchema,
  registroSchema,
  solicitarRecuperacaoSchema,
  verificarTokenSchema,
  redefinirSenhaSchema,
  atualizarPerfilSchema,
  alterarSenhaSchema
} = require("../validators/authSchemas");

async function jsonMount(boll, data, msg) {
  return {
    payload: await security.jwtencript({ boleano: boll, obj: data, mensagem: msg }),
  };
}

async function errorHandle(error, rota) {
  console.log(`Erro na rota ${rota}`);
  console.log(error);
  return await jsonMount(false, {}, "Erro no servidor. Tente novamente mais tarde");
}

rota.post("/login", loginLimiter, strictLoginLimiter, speedLimiter, validate(loginSchema), async (req, res) => {
  try {
    const data = req.validatedData;

    const usuario = await execute.execute_login(data.email, data.senha);

    if (usuario.length === 0) {
      return res.json(await jsonMount(false, {}, "Email ou senha incorretos"));
    }

    const user = usuario[0];

    if (!user.ativo) {
      return res.json(
        await jsonMount(false, {}, "Usuário inativo. Entre em contato com o suporte")
      );
    }

    await execute.execute_atualizar_ultimo_acesso(user.id);

    if (user.cpf) {
      user.cpf = security.decryptCPF(user.cpf);
    }

    const dadosUsuario = {
      usuario_id: user.id,
      id: user.id,
      nome_completo: user.nome_completo,
      email: user.email,
      telefone: user.telefone,
      data_nascimento: user.data_nascimento,
      sexo: user.sexo,
    };

    return res.json(
      await jsonMount(true, dadosUsuario, `Bem-vindo, ${user.nome_completo}!`)
    );
  } catch (error) {
    return res.json(await errorHandle(error, "/login"));
  }
});

rota.post("/registro", registroLimiter, speedLimiter, validate(registroSchema), async (req, res) => {
  try {
    const data = req.validatedData;

    const emailExistente = await execute.execute_verificar_email_existente(
      data.email
    );

    if (emailExistente.length > 0) {
      return res.json(await jsonMount(false, {}, "Este email já está cadastrado"));
    }

    const novoUsuario = await execute.execute_criar_usuario(
      data.nome_completo,
      data.email,
      data.senha,
      data.cpf || null,
      data.telefone || null,
      data.data_nascimento || null,
      data.sexo || null
    );

    if (novoUsuario.length === 0) {
      return res.json(await jsonMount(false, {}, "Erro ao criar usuário"));
    }

    const usuario = novoUsuario[0];

    const dadosRetorno = {
      id: usuario.id,
      nome_completo: usuario.nome_completo,
      email: usuario.email,
    };

    return res.json(
      await jsonMount(true, dadosRetorno, "Usuário cadastrado com sucesso!")
    );
  } catch (error) {
    return res.json(await errorHandle(error, "/registro"));
  }
});

rota.post("/solicitar-recuperacao", passwordResetLimiter, speedLimiter, validate(solicitarRecuperacaoSchema), async (req, res) => {
  try {
    const data = req.validatedData;

    const usuario = await execute.execute_verificar_email_existente(data.email);

    if (usuario.length === 0) {
      return res.json(await jsonMount(true, {}, "Se o email existir, você receberá um código"));
    }

    const token = security.speakeasytokengen();
    await execute.execute_salvar_token_recuperacao(data.email, token);
    send_retrive_pass(data.email, token);

    return res.json(
      await jsonMount(true, {}, "Código enviado para seu email")
    );
  } catch (error) {
    return res.json(await errorHandle(error, "/solicitar-recuperacao"));
  }
});

rota.post("/verificar-token-recuperacao", authLimiter, validate(verificarTokenSchema), async (req, res) => {
  try {
    const data = req.validatedData;

    const usuario = await execute.execute_verificar_token_recuperacao(
      data.email,
      data.token
    );

    if (usuario.length === 0) {
      return res.json(await jsonMount(false, {}, "Token inválido ou expirado"));
    }

    return res.json(await jsonMount(true, {}, "Token válido"));
  } catch (error) {
    return res.json(await errorHandle(error, "/verificar-token-recuperacao"));
  }
});

rota.post("/redefinir-senha", authLimiter, validate(redefinirSenhaSchema), async (req, res) => {
  try {
    const data = req.validatedData;

    const usuario = await execute.execute_verificar_token_recuperacao(
      data.email,
      data.token
    );

    if (usuario.length === 0) {
      return res.json(await jsonMount(false, {}, "Token inválido ou expirado"));
    }

    await execute.execute_alterar_senha(data.email, data.nova_senha);
    await execute.execute_limpar_token_recuperacao(data.email);

    return res.json(await jsonMount(true, {}, "Senha alterada com sucesso!"));
  } catch (error) {
    return res.json(await errorHandle(error, "/redefinir-senha"));
  }
});

rota.post("/verificar-token", authLimiter, async (req, res) => {
  try {
    const payload = req.body;
    const data = await security.jwtdecript(payload);

    if (!data || !data.obj || !data.obj.usuario_id) {
      return res.json(await jsonMount(false, {}, "Token inválido"));
    }

    const usuario = await execute.execute_buscar_usuario_por_email(data.obj.email);

    if (usuario.length === 0) {
      return res.json(await jsonMount(false, {}, "Usuário não encontrado"));
    }

    const user = usuario[0];

    if (!user.ativo) {
      return res.json(await jsonMount(false, {}, "Usuário inativo"));
    }

    if (user.cpf) {
      user.cpf = security.decryptCPF(user.cpf);
    }

    const dadosUsuario = {
      id: user.id,
      nome_completo: user.nome_completo,
      email: user.email,
      telefone: user.telefone,
      data_nascimento: user.data_nascimento,
      sexo: user.sexo,
    };

    return res.json(await jsonMount(true, dadosUsuario, "Token válido"));
  } catch (error) {
    return res.json(await jsonMount(false, {}, "Token inválido"));
  }
});

rota.post("/perfil", verificarAutenticacao, async (req, res) => {
  try {
    const usuario = await execute.execute_buscar_usuario_por_email(
      req.usuario.email
    );

    if (usuario.length === 0) {
      return res.json(await jsonMount(false, {}, "Usuário não encontrado"));
    }

    const user = usuario[0];

    if (user.cpf) {
      user.cpf = security.decryptCPF(user.cpf);
    }

    const perfilUsuario = {
      id: user.id,
      nome_completo: user.nome_completo,
      email: user.email,
      cpf: user.cpf,
      telefone: user.telefone,
      data_nascimento: user.data_nascimento,
      sexo: user.sexo,
      data_cadastro: user.data_cadastro,
    };

    return res.json(
      await jsonMount(true, perfilUsuario, "Dados do perfil carregados")
    );
  } catch (error) {
    return res.json(await errorHandle(error, "/perfil"));
  }
});

rota.post("/atualizar-perfil", verificarAutenticacao, authLimiter, validate(atualizarPerfilSchema), async (req, res) => {
  try {
    const data = req.validatedData;

    const usuarioAtualizado = await execute.execute_atualizar_perfil(
      req.usuario.usuario_id,
      data.nome_completo,
      data.telefone || null,
      data.data_nascimento || null,
      data.sexo || null
    );

    if (usuarioAtualizado.length === 0) {
      return res.json(await jsonMount(false, {}, "Erro ao atualizar perfil"));
    }

    return res.json(
      await jsonMount(true, usuarioAtualizado[0], "Perfil atualizado com sucesso!")
    );
  } catch (error) {
    return res.json(await errorHandle(error, "/atualizar-perfil"));
  }
});

rota.post("/alterar-senha", verificarAutenticacao, authLimiter, validate(alterarSenhaSchema), async (req, res) => {
  try {
    const data = req.validatedData;

    const usuario = await execute.execute_buscar_usuario_para_validar_senha(
      req.usuario.email
    );

    if (usuario.length === 0) {
      return res.json(await jsonMount(false, {}, "Usuário não encontrado"));
    }

    const senhaValida = await security.comparePassword(data.senha_atual, usuario[0].senha);

    if (!senhaValida) {
      return res.json(await jsonMount(false, {}, "Senha atual incorreta"));
    }

    await execute.execute_alterar_senha(req.usuario.email, data.nova_senha);

    return res.json(await jsonMount(true, {}, "Senha alterada com sucesso!"));
  } catch (error) {
    return res.json(await errorHandle(error, "/alterar-senha"));
  }
});

module.exports = rota;