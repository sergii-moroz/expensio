import { config } from 'dotenv'

config({path: '.env.local'})

export default {
	schema: "./db/schema.jsx",
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.NEXT_PUBLIC_DATABASE_URL,
	}
};
