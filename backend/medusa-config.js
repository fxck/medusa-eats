const { Modules, defineConfig, loadEnv } = require("@medusajs/utils");

loadEnv(process.env.NODE_ENV || "development", process.cwd());

// CORS when consuming Medusa from admin
// Medusa's docs are added for a better learning experience. Feel free to remove.
const ADMIN_CORS = `${
  process.env.ADMIN_CORS?.length
    ? `${process.env.ADMIN_CORS},`
    : "http://localhost:7000,http://localhost:7001,"
}https://docs.medusajs.com,https://medusa-docs-v2-git-docs-v2-medusajs.vercel.app,https://medusa-resources-git-docs-v2-medusajs.vercel.app`;

// CORS to avoid issues when consuming Medusa from a client
// Medusa's docs are added for a better learning experience. Feel free to remove.
const STORE_CORS = `${
  process.env.STORE_CORS?.length
    ? `${process.env.STORE_CORS},`
    : "http://localhost:3000,"
}https://docs.medusajs.com,https://medusa-docs-v2-git-docs-v2-medusajs.vercel.app,https://medusa-resources-git-docs-v2-medusajs.vercel.app`;

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-eats";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const BACKEND_URL = process.env.BACKEND_URL || "";

export default defineConfig({
  admin: {
    backendUrl: BACKEND_URL,
  },
  projectConfig: {
    databaseUrl: DATABASE_URL,
    http: {
      storeCors: STORE_CORS,
      adminCors: ADMIN_CORS,
      authCors: process.env.AUTH_CORS || ADMIN_CORS,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    databaseDriverOptions: { connection: { ssl: false } },
    redisUrl: REDIS_URL,
  },
  modules: {
    restaurantModuleService: {
      resolve: "./modules/restaurant",
    },
    deliveryModuleService: {
      resolve: "./modules/delivery",
    },
    eventBus: {
      resolve: "@medusajs/event-bus-redis",
      options: {
        redisUrl: process.env.EVENTS_REDIS_URL,
      },
    },
    [Modules.FULFILLMENT]: {
      options: {
        providers: [
          {
            resolve: "@medusajs/fulfillment-manual",
            id: "manual-provider",
          },
        ],
      },
    },
  },
  plugins: [
    {
      resolve: `medusa-file-minio`,
      options: {
          endpoint: process.env.MINIO_ENDPOINT,
          bucket: process.env.MINIO_BUCKET,
          access_key_id: process.env.MINIO_ACCESS_KEY,
          secret_access_key: process.env.MINIO_SECRET_KEY,
      },
    },
    {
      resolve: "@medusajs/admin",
      /** @type {import('@medusajs/admin').PluginOptions} */
      options: {
        // ...
      },
    },
  ],
});
