import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config({ path: './.env.local' });

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not found in env!');
    return;
  }
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected successfully to database');
    const db = client.db('ideavault');
    const ideasCollection = db.collection('ideas');
    
    // Clear existing ideas to ensure clean state
    await ideasCollection.deleteMany({});
    console.log('Cleared existing ideas collection');

    // Read data.json
    const rawData = fs.readFileSync('./public/data.json', 'utf-8');
    const ideas = JSON.parse(rawData);
    
    // Insert ideas
    const result = await ideasCollection.insertMany(ideas);
    console.log(`Successfully seeded ${result.insertedCount} ideas into MongoDB!`);
  } catch (err) {
    console.error('Error seeding DB:', err);
  } finally {
    await client.close();
  }
}

seed();
