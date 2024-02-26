import logSymbols from 'log-symbols';
import { createLogger, format, transports } from 'winston';
import { Logger } from 'winston';

type MockLogger = {
  error: () => void;
  warn: () => void;
  info: () => void;
};

let logger: Logger | MockLogger = {
  error: () => {},
  warn: () => {},
  info: () => {},
};

if (process.env.BUN_ENV && process.env.BUN_ENV !== 'test') {
  logger = createLogger({
    level: 'info',
    transports: [
      new transports.Console({
        format: format.combine(
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
          format.printf((info) => {
            let symbol;

            switch (info.level) {
              case 'error':
                symbol = logSymbols.error;
                break;
              case 'warn':
                symbol = logSymbols.warning;
                break;
              case 'info':
                symbol = logSymbols.info;
                break;
            }

            if (info.message.includes('success')) {
              symbol = logSymbols.success;
            }

            return `${symbol} ${info.timestamp} ${info.level}: ${info.message}`;
          }),
          format.align(),
          format.colorize({ all: true }),
        ),
      }),
    ],
  });
}

export default logger;
