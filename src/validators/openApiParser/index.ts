/* eslint-disable no-console */
import OpenAPIParser from '@readme/openapi-parser';
import logSymbols from 'log-symbols';
import path from 'path';

try {
  const api = await OpenAPIParser.validate(
    path.join(process.cwd(), 'spec', 'spec.json'),
  );

  console.log(
    logSymbols.success,
    `API is valid. API name: ${api.info.title}, Version: ${api.info.version}`,
  );
} catch (err) {
  console.error(logSymbols.error, `Error validating API`, err);
}
