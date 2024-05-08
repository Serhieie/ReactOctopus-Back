import sendHelp from '../helpers/sendHelp.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import 'dotenv/config';

const { SEND_HELP_MAIL } = process.env;

const sendNeedHelp = async (req, res) => {
  const { email, comment } = req.body;

  const helpBody = {
    to: SEND_HELP_MAIL,
    subject: `Need Help Appeal ${email}`,
    html: `
      <div style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); max-width: 600px; background-color: #fafafa; border: 2px solid #ddd; border-radius: 12px; box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1); padding: 25px;">
        <div>
          <p style="margin: 15px 0; color: #333;"><strong style="color: #666;">Від:</strong> <a href="mailto:${email}" style="color: #666; text-decoration: underline;">${email}</a></p>
          <p style="margin: 15px 0; color: #333;"><strong style="color: #666;">Повідомлення:</strong></p>
          <p style="margin: 15px 0; color: #333;">${comment}</p>
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
