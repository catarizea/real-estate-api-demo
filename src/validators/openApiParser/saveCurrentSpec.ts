/* eslint-disable no-console */
import logSymbols from 'log-symbols';
import path from 'path';

try {
  const result = await fetch('http://localhost:3000/doc');

  const api = await result.json();

  await Bun.write(
    path.join(process.cwd(), 'spec', 'spec.json'),
    JSON.stringify(api),
  );

  console.log(logSymbols.success, `API saved to spec/spec.json`);
} catch (error) {
  console.error(logSymbols.error, `Error saving API spec`, error);
}
