
import { config } from 'dotenv'
import { join } from 'path';
config({ path: join(__dirname, '../.env') });

export const env = {
    PORT: process.env.PORT || "3000",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_HOST_PORT: process.env.DB_HOST_PORT || "27017",
    JWT_TOKEN: process.env.JWT_TOKEN || "DNAJKDKSADASND",
    DB_USERNAME: process.env.DB_USERNAME || "root",
    DB_USERNAME_PASSWORD: process.env.DB_USERNAME_PASSWORD || "",
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
    DB_CONNECTION_URL: process.env.DB_CONNECTION_URL || "",
};
