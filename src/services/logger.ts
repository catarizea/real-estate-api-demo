import path from 'path';
import { createLogger, format, transports } from 'winston';
import { Logger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

type MockLogger = {
  log: () => void;
  error: () => void;
  warn: () => void;
  info: () => void;
};

let logger: Logger | MockLogger = {
  log: () => {},
  error: () => {},
  warn: () => {},
  info: () => {},
};

if (process.env.BUN_ENV !== 'test') {
  logger = createLogger({
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
      ),
    ),
    transports: [
      new DailyRotateFile({
        filename: path.join(process.cwd(), 'logs', 'all-logs-%DATE%.log'),
        json: false,
        maxSize: 5242880,
        maxFiles: process.env.WINSTON_LOG_DAYS,
      }),
      new transports.Console(),
    ],
  });
}

export default logger;
