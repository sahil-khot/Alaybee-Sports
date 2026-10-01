const mongoose = require("mongoose");
const User = require("../models/User");
const dummyAccounts = require("../data/dummyAccounts");

let isConnected = false;

// Helper to normalize and sanitize Mongo URI (removes accidental < > brackets and adds database name if missing)
const normalizeMongoUri = (rawUri) => {
  if (!rawUri) return "";
  let uri = rawUri.trim();

  // If user pasted with < > around credentials e.g. <user>:<pass>
  uri = uri.replace(/<([^>]+)>/g, "$1");

  // Ensure database name 'alaybee_sports' is in the path
  if (uri.includes(".mongodb.net/?")) {
    uri = uri.replace(".mongodb.net/?", ".mongodb.net/alaybee_sports?");
  } else if (uri.endsWith(".mongodb.net/")) {
    uri = uri + "alaybee_sports";
  } else if (uri.endsWith(".mongodb.net")) {
    uri = uri + "/alaybee_sports";
  }

  return uri;
};

const seedDummyAccounts = async () => {
  try {
    for (const account of dummyAccounts) {
      const existingUser = await User.findOne({ email: account.email.toLowerCase() });
      if (!existingUser) {
        await User.create({
          name: account.name,
          email: account.email.toLowerCase(),
          password: account.password,
          role: account.role,
          phone: account.phone,
          city: account.city,
        });
        console.log(`[Atlas Seed] Created dummy account in Atlas: ${account.email} (${account.role})`);
      } else {
        console.log(`[Atlas Verified] Dummy account exists: ${account.email}`);
      }
    }
  } catch (error) {
    console.error("[Seed] Error seeding dummy accounts:", error.message);
  }
};

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return true;
  }
  const rawUri = process.env.MONGO_URI;
  const uri = normalizeMongoUri(rawUri);

  if (!uri || uri.includes("demo:demo123@cluster0.mongodb.net")) {
    console.log("--------------------------------------------------");
    console.log("⚠️  MongoDB Atlas URI is not configured yet in server/.env");
    console.log("👉 Please update MONGO_URI in server/.env with your MongoDB Atlas connection string.");
    console.log("--------------------------------------------------");
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`📁 Database Name: ${conn.connection.name}`);
    await seedDummyAccounts();
    return true;
  } catch (error) {
    console.error("❌ MongoDB Atlas Connection Error:", error.message);
    console.log("⚠️ Make sure your IP address (0.0.0.0/0) is whitelisted in MongoDB Atlas Network Access.");
    return false;
  }
};

const isDbConnected = () => isConnected;

module.exports = { connectDB, seedDummyAccounts, isDbConnected, normalizeMongoUri };
