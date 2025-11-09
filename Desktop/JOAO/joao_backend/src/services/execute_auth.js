const models = require("../models/models_auth");
const security = require("../security/cypher");
const { postgres } = require("../server/connect");

async function execute_login(email, senha) {
  const client = await postgres.connect();
  try {
    const query = models.buscar_usuario_para_login(email);
    const ret = await client.query(query.text, query.values);
    
    if (ret.rows.length === 0) {
      return [];
    }

    const usuario = ret.rows[0];
    const senhaValida = await security.comparePassword(senha, usuario.senha);

    if (!senhaValida) {
      return [];
    }

    delete usuario.senha;
    return [usuario];
  } finally {
    client.release();
  }
}

async function execute_verificar_email_existente(email) {
  const client = await postgres.connect();
  try {
    const query = models.verificar_email_existente(email);
    const ret = await client.query(query.text, query.values);
    return ret.rows;
  } finally {
    client.release();
  }
}

async function execute_criar_usuario(
  nome_completo,
  email,
  senha,
  cpf,
  telefone,
  data_nascimento,
  sexo
) {
  const client = await postgres.connect();
  try {
    const senhaHash = await security.hashPassword(senha);
    const query = models.criar_usuario(
      nome_completo,
      email,
      senhaHash,
      cpf,
      telefone,
      data_nascimento,
      sexo
    );
    const ret = await client.query(query.text, query.values);
    return ret.rows;
  } finally {
    client.release();
  }
}

async function execute_buscar_usuario_por_email(email) {
  const client = await postgres.connect();
  try {
    const query = models.buscar_usuario_por_email(email);
    const ret = await client.query(query.text, query.values);
    return ret.rows;
  } finally {
    client.release();
  }
}

async function execute_atualizar_ultimo_acesso(usuario_id) {
  const client = await postgres.connect();
  try {
    const query = models.atualizar_ultimo_acesso(usuario_id);
    await client.query(query.text, query.values);
  } finally {
    client.release();
  }
}

async function execute_alterar_senha(email, nova_senha) {
  const client = await postgres.connect();
  try {
    const senhaHash = await security.hashPassword(nova_senha);
    const query = models.alterar_senha(email, senhaHash);
    await client.query(query.text, query.values);
  } finally {
    client.release();
  }
}

async function execute_salvar_token_recuperacao(email, token) {
  const client = await postgres.connect();
  try {
    const query = models.salvar_token_recuperacao(email, token);
    await client.query(query.text, query.values);
  } finally {
    client.release();
  }
}

async function execute_verificar_token_recuperacao(email, token) {
  const client = await postgres.connect();
  try {
    const query = models.verificar_token_recuperacao(email, token);
    const ret = await client.query(query.text, query.values);
    return ret.rows;
  } finally {
    client.release();
  }
}

async function execute_limpar_token_recuperacao(email) {
  const client = await postgres.connect();
  try {
    const query = models.limpar_token_recuperacao(email);
    await client.query(query.text, query.values);
  } finally {
    client.release();
  }
}

async function execute_atualizar_perfil(usuario_id, nome_completo, telefone, data_nascimento, sexo) {
  const client = await postgres.connect();
  try {
    const query = models.atualizar_perfil(usuario_id, nome_completo, telefone, data_nascimento, sexo);
    const ret = await client.query(query.text, query.values);
    return ret.rows;
  } finally {
    client.release();
  }
}

async function execute_buscar_usuario_para_validar_senha(email) {
  const client = await postgres.connect();
  try {
    const query = models.buscar_usuario_para_login(email);
    const ret = await client.query(query.text, query.values);
    return ret.rows;
  } finally {
    client.release();
  }
}

module.exports = {
  execute_login,
  execute_verificar_email_existente,
  execute_criar_usuario,
  execute_buscar_usuario_por_email,
  execute_atualizar_ultimo_acesso,
  execute_alterar_senha,
  execute_salvar_token_recuperacao,
  execute_verificar_token_recuperacao,
  execute_limpar_token_recuperacao,
  execute_atualizar_perfil,
  execute_buscar_usuario_para_validar_senha,
};