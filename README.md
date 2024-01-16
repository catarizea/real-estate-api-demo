# Real Estate API Demo

## Project setup

1. Clone the repo and install dependencies

```
bun install
```

2. Create a `.env` file inside of the root of the project and fill in the variables

```
DATABASE_NAME=<planetscale_database_name>
DATABASE_HOST=aws.connect.psdb.cloud
DATABASE_USERNAME=<planetscale_username>
DATABASE_PASSWORD=<planetscale_password>
DATABASE_URI=mysql://<planetscale_username>:<planetscale_password>@aws.connect.psdb.cloud/<planetscale_database_name>?ssl={"rejectUnauthorized": "true"}

```

3. Start the project in dev mode

```
bun run dev
```

## Development environment

You can access the API at:

```
http://localhost:3000
```

You can access the API Swagger documentation at:

```
http://localhost:3000/ui
```
