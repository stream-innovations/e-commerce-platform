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

const DATABASE_TYPE = process.env.DATABASE_TYPE || "sqlite";
const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost/medusa-store";
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "pk_live_51N5Q0DKjdN5iZkcXhxtDR5qcjJw6sGAWmQGst8PP4OwE9WeV5kvYu5b7dJO2Gzbl9DLee9ZQAjwX0hoGvhrbJeKk004uB84Buc";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "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";

const plugins = [
    `medusa-fulfillment-manual`,
    `medusa-payment-manual`,
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
    /*eventBus: {
      resolve: "@medusajs/event-bus-redis",
      options: {
        redisUrl: REDIS_URL
      }
    },
    cacheService: {
      resolve: "@medusajs/cache-redis",
      options: {
        redisUrl: REDIS_URL
      }
    },*/
}

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
    database_database: "./medusa-db.sql",
    database_type: DATABASE_TYPE,
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
    // Uncomment the following lines to enable REDIS
    // redis_url: REDIS_URL
}

if (DATABASE_URL && DATABASE_TYPE === "postgres") {
    projectConfig.database_url = DATABASE_URL;
    delete projectConfig["database_database"];
}


/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
    projectConfig,
    plugins,
    modules,
};