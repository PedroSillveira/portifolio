const security = require('../security/cypher')

function buscar_usuario_para_login(email) {
    return {
        text: `
            SELECT 
                id,
                nome_completo,
                email,
                senha,
                cpf,
                telefone,
                data_nascimento,
                sexo,
                ativo
            FROM usuarios 
            WHERE email = $1 
            AND ativo = true
        `,
        values: [email]
    }
}

function verificar_email_existente(email) {
    return {
        text: `
            SELECT id, email 
            FROM usuarios 
            WHERE email = $1 
            AND ativo = true
        `,
        values: [email]
    }
}

function criar_usuario(nome_completo, email, senhaHash, cpf, telefone, data_nascimento, sexo) {
    const cpfCriptografado = cpf ? security.encryptCPF(cpf) : null
    
    return {
        text: `
            INSERT INTO usuarios (
                nome_completo, 
                email, 
                senha, 
                cpf, 
                telefone, 
                data_nascimento, 
                sexo, 
                ativo
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, true)
            RETURNING id, nome_completo, email
        `,
        values: [
            nome_completo,
            email,
            senhaHash,
            cpfCriptografado,
            telefone,
            data_nascimento,
            sexo
        ]
    }
}

function buscar_usuario_por_email(email) {
    return {
        text: `
            SELECT 
                id,
                nome_completo,
                email,
                cpf,
                telefone,
                data_nascimento,
                sexo,
                ativo,
                data_cadastro
            FROM usuarios 
            WHERE email = $1 
            AND ativo = true
        `,
        values: [email]
    }
}

function atualizar_ultimo_acesso(usuario_id) {
    return {
        text: `
            UPDATE usuarios 
            SET ultimo_acesso = CURRENT_TIMESTAMP 
            WHERE id = $1
        `,
        values: [usuario_id]
    }
}

function alterar_senha(email, senhaHash) {
    return {
        text: `
            UPDATE usuarios 
            SET senha = $1 
            WHERE email = $2 
            AND ativo = true
        `,
        values: [senhaHash, email]
    }
}

function salvar_token_recuperacao(email, token) {
    return {
        text: `
            UPDATE usuarios 
            SET 
                token_recuperacao = $1,
                token_expiracao = NOW() + INTERVAL '10 minutes'
            WHERE email = $2 
            AND ativo = true
        `,
        values: [token, email]
    }
}

function verificar_token_recuperacao(email, token) {
    return {
        text: `
            SELECT id, email, nome_completo
            FROM usuarios 
            WHERE email = $1 
            AND token_recuperacao = $2
            AND token_expiracao > NOW()
            AND ativo = true
        `,
        values: [email, token]
    }
}

function limpar_token_recuperacao(email) {
    return {
        text: `
            UPDATE usuarios 
            SET 
                token_recuperacao = NULL,
                token_expiracao = NULL
            WHERE email = $1
        `,
        values: [email]
    }
}

function atualizar_perfil(usuario_id, nome_completo, telefone, data_nascimento, sexo) {
    return {
        text: `
            UPDATE usuarios 
            SET 
                nome_completo = $1,
                telefone = $2,
                data_nascimento = $3,
                sexo = $4
            WHERE id = $5
            AND ativo = true
            RETURNING id, nome_completo, email, telefone, data_nascimento, sexo
        `,
        values: [nome_completo, telefone, data_nascimento, sexo, usuario_id]
    }
}

module.exports = {
    buscar_usuario_para_login,
    verificar_email_existente,
    criar_usuario,
    buscar_usuario_por_email,
    atualizar_ultimo_acesso,
    alterar_senha,
    salvar_token_recuperacao,
    verificar_token_recuperacao,
    limpar_token_recuperacao,
    atualizar_perfil
}