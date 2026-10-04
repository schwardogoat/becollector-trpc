import { MongoClient } from "mongodb";

import { env } from "../config/env.js";

const client = new MongoClient(env.DATABASE_URL);

export const db = client.db("betterauth");