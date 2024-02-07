import type {
  Request,
  Response,
  Express,
} from 'express';
import type TelegramBot from 'node-telegram-bot-api';

import type { ConfigBot } from '../init';
import { apiRoutes } from '../utils/routes';
import { errors } from '../utils/errors';

export const sendTeleGramMessage = (
  config: ConfigBot,
  app: Express,
  bot: TelegramBot,
): void => {
  app.post(apiRoutes.sendMessage(), async (req: Request, res: Response) => {
    try {
      const { message }: { message: string } = req.body;
      await bot.sendMessage(config.chatId, message);
      res.json({ success: true });
    } catch (error) {
      throw error instanceof Error
        ? res.status(500).json({ success: false, error: error.message })
        : res.status(500).json({ success: false, error: errors.unknownError() });
    }
  });
};
