import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
console.log("MONGO:", process.env.MONGODB_URI);

await client.connect()//optional add
const db = client.db("ideavault");

export const auth = betterAuth({
  database: mongodbAdapter(db, {

    client
  }),

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {        
      google: {             
        clientId: process.env.GOOGLE_CLIENT_ID,             
        clientSecret: process.env.GOOGLE_SECRET,        
      }     
    },
    
});
