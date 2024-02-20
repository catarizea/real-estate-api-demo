# Real Estate API Demo

REST API demo for a search app to rent a property. Tech stack Bun, Hono, Drizzle, PlanetScale, Algolia, RabbitMQ (CloudAMQP)

## Development environment setup

1. Clone the repo and install dependencies

```
bun install
```

2. Create a `.env` file inside of the root of the project and fill in the variables after you setup PlanetScale (`dev` branch), Google Maps Api, Pexels, Algolia, CloudAMQP, Postman accounts.

```
BUN_ENV=dev
DATABASE_NAME=<planetscale_database_name>
DATABASE_HOST=aws.connect.psdb.cloud
DATABASE_USERNAME=<planetscale_username>
DATABASE_PASSWORD=<planetscale_password>
DATABASE_URI=mysql://<planetscale_username>:<planetscale_password>@aws.connect.psdb.cloud/<planetscale_database_name>?ssl={"rejectUnauthorized": "true"}
GOOGLE_MAPS_API_KEY=<google_maps_api_key>
PEXELS_API_KEY=<pexels_api_key>
ALGOLIA_APP_ID=<algolia_app_id>
ALGOLIA_ADMIN_API_KEY=<algolia_admin_api_key>
ALGOLIA_SEARCH_API_KEY=<algolia_search_api_key>
CLOUDAMQP_URL=<cloudamqp_url>
WINSTON_LOG_DAYS=5
SERVER_TIMEZONE=Europe/Berlin
DATABASE_SEED_BLOCKED=false
POSTMAN_API_KEY=<postman_api_key>
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

7. Seed the database. Before running the command bellow, you need to seed `community` (wikipedia scraping) and `seedAddress` (Google Maps geocoder reverse) models first. See files here `src/utils/db/seed/wiki` and here `src/utils/db/seed/gmaps`.  

```
bun run db:seed
```

8. Block any accidental database seed from now on by setting this environment variable to `true`:

```
DATABASE_SEED_BLOCKED=true
```

9. Create `all` table containing all data generated previously, to be used via `searchView` model for search testing purposes only. The search will be provided by Algolia to the frontend directly.

```
bun run db:create:all
```

10. Seed Algolia `property-unit` index. This is going to be used directly by the frontend.

```
bun run algolia:seed
```

11. Start the project in dev mode

```
bun run dev
```

12. Access the API at:

```
http://localhost:3000
```

13. Access the API Swagger documentation at:

```
http://localhost:3000/ui
```

14. For client code generators access the JSON api specification at:

```
http://localhost:3000/doc
```

15. Start Drizzle Studio

```
bun run db:studio
```

16. Access Drizzle Studio at:

```
https://local.drizzle.studio/?port=3001
```

17. See entity relationship Draw.io diagram inside this folder `erd/entity-relationship-diagram.drawio`

18. Install **Postman** and import `spec/real-estate-api-demo.postman_collection.json`. In Postman set `baseUrl` variable as `http://localhost:3000`

19. Install Postman CLI with Homebrew

```
brew install --cask postman-cli
```

20. Start api for Postman

```
bun run start:postman:test
```

21. You can run tests from Postman app or from CLI

```
bun run postman
```
