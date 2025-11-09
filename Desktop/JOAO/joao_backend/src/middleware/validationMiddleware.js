const security = require("../security/cypher");

function validate(schema) {
  return async (req, res, next) => {
    try {
      const payload = req.body;
      const data = await security.jwtdecript(payload);

      if (!data) {
        return res.json({
          payload: await security.jwtencript({
            boleano: false,
            obj: {},
            mensagem: "Dados inválidos",
          }),
        });
      }

      const { error, value } = schema.validate(data, {
        abortEarly: false,
        stripUnknown: true
      });

      if (error) {
        const errors = error.details.map(detail => detail.message);
        return res.json({
          payload: await security.jwtencript({
            boleano: false,
            obj: {},
            mensagem: errors[0],
          }),
        });
      }

      req.validatedData = value;
      next();
    } catch (err) {
      return res.json({
        payload: await security.jwtencript({
          boleano: false,
          obj: {},
          mensagem: "Erro na validação dos dados",
        }),
      });
    }
  };
}

module.exports = { validate };