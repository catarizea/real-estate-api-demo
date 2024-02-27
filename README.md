# Real Estate API Demo

REST API demo for a search app to rent a property. Tech stack Bun, Hono, Drizzle, PlanetScale, Algolia, Clerk, RabbitMQ (CloudAMQP)

Find more details in this blog article [Real estate API for a search-to-rent application](https://catalin.works/blog/real-estate-api-bun-hono-drizzle-planetscale-algolia).

## Development environment setup

1. Clone the repo and install dependencies

```
bun install
```

2. Create a `.env` file inside of the root of the project and fill in the variables after you setup PlanetScale (`dev` branch), Google Maps Api, Pexels, Algolia, Clerk, CloudAMQP, Postman accounts.

```
BUN_ENV=dev
DATABASE_NAME=<planetscale_database_name>
DATABASE_HOST=aws.connect.psdb.cloud
DATABASE_USERNAME=<planetscale_username>
DATABASE_PASSWORD=<planetscale_password>
DATABASE_URI=mysql://<planetscale_username>:<planetscale_password>@aws.connect.psdb.cloud/<planetscale_database_name>?ssl={"rejectUnauthorized": "true"}
GCLOUD_API_KEY=<gcloud_api_key>
PEXELS_API_KEY=<pexels_api_key>
ALGOLIA_APP_ID=<algolia_app_id>
ALGOLIA_ADMIN_API_KEY=<algolia_admin_api_key>
ALGOLIA_SEARCH_API_KEY=<algolia_search_api_key>
CLOUDAMQP_URL=<cloudamqp_url>
SERVER_TIMEZONE=Europe/Berlin
DATABASE_SEED_BLOCKED=false
POSTMAN_API_KEY=<postman_api_key>
CLERK_PUBLISHABLE_KEY=<clerk_publishable_key>
CLERK_SECRET_KEY=<clerk_secret_key>
CLERK_JWT_TEST=<clerk_jwt_test>
```

3. Clerk Setup. Create an organization. For your organization you have to create two custom roles: `Creator` and `Reader` and assign at least one verified user each.

[See here details](https://clerk.com/docs/testing/postman-or-insomnia) on how you can generate a JWT template on Clerk dashboard and based on that a long term JWT as `CLERK_JWT_TEST` environment variable. Make sure your custom JWT template looks like this:

```
{
 "role": "{{org.role}}",
 "email": "{{user.primary_email_address}}",
 "fullName": "{{user.full_name}}"
}
```

4. Install PlanetScale CLI `pscale`

```
brew install planetscale/tap/pscale
```

5. Install `mysql-client`

```
brew install mysql-client
```

6. Push schema to PlanetScale

```
bun run db:push
```

7. Create database views (you need to be logged in to PlanetScale with `pscale`)

```
bun run db:create:views
```

8. Seed the database. Before running the command bellow, you need to seed `community` (wikipedia scraping) and `seedAddress` (Google Maps geocoder reverse) models first. See files here `src/utils/db/seed/wiki` and here `src/utils/db/seed/gmaps`.  

```
bun run db:seed
```

9. Block any accidental database seed from now on by setting this environment variable to `true`:

```
DATABASE_SEED_BLOCKED=true
```

10. Create `all` table containing all data generated previously, to be used via `searchView` model for search testing purposes only. The search will be provided by Algolia to the frontend directly.

```
bun run db:create:all
```

11. Seed Algolia `property-unit` index. This is going to be used directly by the frontend.

```
bun run algolia:seed
```

12. Start the project in dev mode

```
bun run dev
```

13. Access the API at:

```
http://localhost:3000
```

14. Access the API Swagger documentation at:

```
http://localhost:3000/ui
```

15. For client code generators access the JSON api specification at:

```
http://localhost:3000/doc
```

16. Start Drizzle Studio

```
bun run db:studio
```

17. Access Drizzle Studio at:

```
https://local.drizzle.studio/?port=3001
```

18. See entity relationship Draw.io diagram inside this folder `erd/entity-relationship-diagram.drawio`

19. You can run normal tests

```
bun run test
```

20. You can run Algolia workers tests

```
bun run test:workers
```

21. Install **Postman** and import `spec/real-estate-api-demo.postman_collection.json`. In Postman set `baseUrl` variable as `http://localhost:3000`. Set a Postman environment variable `clerk_jwt_test` and use it at the top authorization as a `Bearer Token` `{{clerk_jwt_test}}`. All endpoints should have authorization header as `Inherit from parent`.

22. Install Postman CLI with Homebrew

```
brew install --cask postman-cli
```

23. You can run tests from Postman app or from CLI

```
bun run test:postman
```
