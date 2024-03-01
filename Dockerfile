FROM oven/bun:1

WORKDIR /app

COPY ./build/index.js .

USER bun

EXPOSE 3000/tcp

ENTRYPOINT [ "bun", "index.js" ]

