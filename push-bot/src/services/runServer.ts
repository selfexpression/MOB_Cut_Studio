import type { Express } from 'express';

import type { ConfigBot } from '../init';

export const runServer = (config: ConfigBot, app: Express): void => {
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
};
