const security = require("../security/cypher");

async function verificarAutenticacao(req, res, next) { // Adicione async
  try {
    const payload = req.body;
    const data = await security.jwtdecript(payload); // Adicione await
    if (!data || !data.usuario_id) {
      return res.json({
        payload: await security.jwtencript({ // Adicione await
          boleano: false,
          obj: {},
          mensagem: "Token inválido ou expirado",
        }),
      });
    }

    req.usuario = data;
    next();
  } catch (error) {
    return res.json({
      payload: await security.jwtencript({ // Adicione await
        boleano: false,
        obj: {},
        mensagem: "Erro na autenticação",
      }),
    });
  }
}

module.exports = { verificarAutenticacao };