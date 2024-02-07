/* eslint-disable @typescript-eslint/no-non-null-assertion */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import TelegramBot from 'node-telegram-bot-api';

import { sendTeleGramMessage } from './services/telegramRoutes';
import { errors } from './utils/errors';
import { runServer } from './services/runServer';

export interface ConfigBot {
  port: string;
  token: string;
  chatId: string;
}

const initBot = async (token: string): Promise<TelegramBot> => {
  try {
    const bot = new TelegramBot(token, { polling: true });
    return bot;
  } catch (error) {
    console.error(errors.initializingError(), error);
    throw error;
  }
};

export const init = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  const config: ConfigBot = {
    port: process.env.PORT_VALUE!,
    token: process.env.BOT_API_TOKEN!,
    chatId: process.env.CHAT_ID!,
  };

  const bot = await initBot(config.token);

  runServer(config, app);
  sendTeleGramMessage(config, app, bot);
};
