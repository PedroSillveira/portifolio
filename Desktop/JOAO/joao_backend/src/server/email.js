require('dotenv').config();
const nodemailer = require("nodemailer");

async function send_email(email_recive, subject, html) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_PROVIDER,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email_recive,
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erro ao enviar e-mail:", error);
    } else {
      console.log("E-mail enviado com sucesso:", info.response);
    }
  });
}

function send_retrive_pass(destino, token) {
  const html = `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperação de Senha</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 2px solid #eeeeee;
        }
        .content {
            padding: 20px 0;
            text-align: center;
            color: #333333;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            text-decoration: none;
            background-color: #007bff;
            color: #ffffff;
            border-radius: 5px;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Alteração de Senha</h2>
        </div>
        <div class="content">
            <p>Olá,</p>
            <p>Você solicitou a alteração de senha. Seu código de verificação é:</p>
            <h3 style="color: #007bff;">${token}</h3>
            <a class="button" href="${process.env.FRONTEND_URL}/reset?email=${destino}">Redefinir Senha</a>
            <p style="margin-top: 20px;">Caso não tenha solicitado a alteração, ignore este email</p>
            <p style="font-size: 12px; color: #999;">O código expira em 10 minutos</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Sistema. Todos os direitos reservados.</p>
        </div>
    </div>
</body>
</html>
    `;
  const assunto = "Token de alteração de senha";
  send_email(destino, assunto, html);
}

module.exports = { send_retrive_pass };