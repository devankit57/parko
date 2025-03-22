import { MongoClient, ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]"; // Adjust the import path if needed
import dotenv from "dotenv";
import CryptoJS from "crypto-js"; // Import crypto library

dotenv.config();

// MongoDB connection URI and database details
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "event_database";
const participantsCollection = "participants";

// Secret key for encryption (ensure it's stored securely)
const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET || "supersecretkey123";

// Create a single MongoClient instance
const client = new MongoClient(mongoUri);
let isConnected = false; // Track the connection status

async function connectToDatabase() {
  if (!isConnected) {
    await client.connect();
    isConnected = true; // Update the connection status
  }
  return client.db(dbName);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Authenticate user using NextAuth session
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { email, eventId } = req.body;

    // Validate inputs
    if (!email || !eventId) {
      return res.status(400).json({ message: "Email and Event ID are required" });
    }

    // Connect to the database
    const db = await connectToDatabase();

    // Find the participant by email and event ID
    const participant = await db.collection(participantsCollection).findOne({
      email: email.toLowerCase().trim(),
      $or: [
        { eventId: eventId }, // If eventId is stored as a string
        { eventId: new ObjectId(eventId) }, // If eventId is stored as an ObjectId
      ],
    });

    if (!participant) {
      return res.status(404).json({
        message: "Participant not found for the given email and event ID.",
        exists: false,
      });
    }

    // Encrypt response data
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(participant),
      ENCRYPTION_SECRET
    ).toString();

    return res.json({
      exists: true,
      data: encryptedData, // Send encrypted data
    });
  } catch (error) {
    console.error("Database query failed:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
