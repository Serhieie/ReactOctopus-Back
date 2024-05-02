const sendHelp = require('../helpers/sendHelp');
const { ctrlWrapper } = require('../helpers');
require('dotenv').config();

const { SEND_HELP_MAIL } = process.env;

const sendNeedHelp = async (req, res) => {
  const { email, message } = req.body;

  const helpBody = {
    to: SEND_HELP_MAIL,
    subject: `Need Help Appeal ${email}`,
    html: `<div class="container" style="max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); padding: 20px;">
    <div class="email-info">
    <p style="margin: 10px 0; color: #666;"><strong style="color: #333;">Від:</strong> <a href="mailto:$    {email}" style="color: #666; text-decoration: underline;">${email}</a></p>
    <p style="margin: 10px 0; color: #666;"><strong style="color: #333;">Повідомлення:</strong></p>
    <p style="margin: 10px 0; color: #666;">${message}</p>
    </div>
    </div>
`,
  };

  await sendHelp(helpBody);

  return res.status(201).json({
    message: 'Help message send',
  });
};

export default {
  sendNeedHelp: ctrlWrapper(sendNeedHelp),
};
