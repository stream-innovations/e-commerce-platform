const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
    case "production":
        ENV_FILE_NAME = ".env.production";
        break;
    case "staging":
        ENV_FILE_NAME = ".env.staging";
        break;
    case "test":
        ENV_FILE_NAME = ".env.test";
        break;
    case "development":
    default:
        ENV_FILE_NAME = ".env";
        break;
}

try {
    dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
    process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001,https://admin.streampay.store";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000,https://streampay.store";

const DATABASE_URL =
    process.env.DATABASE_URL || "postgres://hunfzuexskynga:308bd31faf709282666344e67655c2dd39a98e44f08ce51986d94bcacd87614f@ec2-52-19-55-12.eu-west-1.compute.amazonaws.com:5432/d1dq3su9eah4o2";

const REDIS_URL = process.env.REDIS_URL || "redis://default:JXxWvP1twsaS3LleLUubr48my3Ke2hBE7IX5cdvULQeTNsbrq8uCWjxQlzuYSda7@6qcck4.stackhero-network.com:6379";

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "pk_live_51N5Q0DKjdN5iZkcXhxtDR5qcjJw6sGAWmQGst8PP4OwE9WeV5kvYu5b7dJO2Gzbl9DLee9ZQAjwX0hoGvhrbJeKk004uB84Buc";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "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";

const plugins = [
    `medusa-fulfillment-manual`,
    `medusa-payment-manual`,
    {
      resolve: `@medusajs/file-local`,
      options: {
        upload_dir: "uploads",
      },
    },
    // To enable the admin plugin, uncomment the following lines and run `yarn add @medusajs/admin`
    // Please note is not recommended to build the admin in production, cause a minimum of 2GB RAM
    // is required.
    {
        resolve: "@medusajs/admin",
        options: {
            serve: true,
            path: 'app'
        },
    },
    {
        resolve: `medusa-payment-stripe`,
        options: {
            api_key: STRIPE_API_KEY,
            webhook_secret: STRIPE_WEBHOOK_SECRET,
            automatic_payment_methods: true,
        },
    },
    {
        resolve: `medusa-plugin-sendgrid`,
        options: {
            api_key: process.env.SENDGRID_API_KEY,
            from: process.env.SENDGRID_FROM,
            order_placed_template: process.env.SENDGRID_ORDER_PLACED_ID,
            localization: {
                "en-EN": { // locale key
                    order_placed_template: process.env.SENDGRID_ORDER_PLACED_ID_LOCALIZED,
                }
            }
        }
    },
    {
        resolve: `medusa-plugin-meilisearch`,
        options: {
            config: {
                host: process.env.MEILISEARCH_HOST,
                apiKey: process.env.MEILISEARCH_API_KEY,
            },
            settings: {
                // index name
                products: {
                    indexSettings: {
                        searchableAttributes: [
                            "title",
                            "description",
                            "variant_sku",
                        ],
                        displayedAttributes: [
                            "title",
                            "description",
                            "variant_sku",
                            "thumbnail",
                            "handle",
                        ],
                    },
                    primaryKey: "id",
                    transform: (product) => ({
                        id: product.id,
                        // other attributes...
                    }),
                },
            },
        },
    },
];

const modules = {
     eventBus: {
       resolve: "@medusajs/event-bus-redis",
       options: {
         redisUrl: process.env.REDIS_URL
       }
     },
     cacheService: {
       resolve: "@medusajs/cache-redis",
       options: {
         redisUrl: process.env.REDIS_URL
       }
     },
  };

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
    // redis_url: process.env.REDIS_URL,
    database_url: process.env.DATABASE_URL,
    database_type: "postgres",
    store_cors: process.env.STORE_CORS,
    admin_cors: process.env.ADMIN_CORS,
    database_extra:
      process.env.NODE_ENV !== "development"
        ? { ssl: { rejectUnauthorized: false } }
        : {},
  };

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
    projectConfig,
    plugins,
    modules,
  };