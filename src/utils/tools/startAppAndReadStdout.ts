/* eslint-disable no-console */
const proc = Bun.spawn(['bun', 'run', 'start:postman:test']);

const stream = new WritableStream({
  write: (chunk) => {
    const str = new TextDecoder().decode(chunk);
    console.log(str);
  },
});

proc.stdout.pipeTo(stream);
