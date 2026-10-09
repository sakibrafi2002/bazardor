import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

// Fail early with a clear message instead of a confusing error later
if (!uri) {
  throw new Error("MONGODB_URI is missing. Add it to .env.local");
}

/**
 * In development, Next.js reloads files whenever you save (hot reload).
 * Without care, every reload would open a NEW database connection and
 * eventually exhaust Atlas's connection limit.
 *
 * Fix: store the client on `globalThis`, which survives hot reloads,
 * and reuse it if it already exists.
 */
const globalForMongo = globalThis as unknown as {
  _mongoClient?: MongoClient;
};

// Reuse the existing client, or create a new one
export const client = globalForMongo._mongoClient ?? new MongoClient(uri);

// Only cache on globalThis in development. In production each server
// instance starts once, so there is no hot-reload problem.
if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = client;
}

// client.db() with no argument uses the database name written in the URI
// (the "bazardor" part). Better Auth will create its collections inside it.
export const db = client.db("bazardor");