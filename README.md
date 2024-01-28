# Real Estate API Demo

REST API demo for a search app to rent a property. Tech stack Bun, Hono, Drizzle, Planetscale

## Project setup

1. Clone the repo and install dependencies

```
bun install
```

2. Create a `.env` file inside of the root of the project and fill in the variables after you setup PlanetScale (`dev` branch), Google Maps Api, Pexels accounts.

```
BUN_ENV=dev
DATABASE_NAME=<planetscale_database_name>
DATABASE_HOST=aws.connect.psdb.cloud
DATABASE_USERNAME=<planetscale_username>
DATABASE_PASSWORD=<planetscale_password>
DATABASE_URI=mysql://<planetscale_username>:<planetscale_password>@aws.connect.psdb.cloud/<planetscale_database_name>?ssl={"rejectUnauthorized": "true"}
GOOGLE_MAPS_API_KEY=<google_maps_api_key>
PEXELS_API_KEY=<pexels_api_key>
WINSTON_LOG_DAYS=5
SERVER_TIMEZONE=Europe/Berlin
DATABASE_SEED_BLOCKED=false
```

3. Install PlanetScale CLI `pscale`

```
brew install planetscale/tap/pscale
```

4. Install `mysql-client`

```
brew install mysql-client
```

5. Push schema to PlanetScale

```
bun run db:push
```

6. Create database views (you need to be logged in to PlanetScale with `pscale`)

```
bun run db:create:views
```

7. Seed the database. Before running the command bellow, you need to seed `community` (wikipedia scraping) and `seedAddress` (Google Maps geocoder reverse) models first. See files here `src/utils/db/seed`.  

```
bun run db:seed
```

8. Start the project in dev mode

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
