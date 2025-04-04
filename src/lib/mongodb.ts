'use client';

import { MongoClient } from 'mongodb';

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri);
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
