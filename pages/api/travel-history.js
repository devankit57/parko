import { getSession } from "next-auth/react";
import { MongoClient } from "mongodb";
import connectDB from "../../utils/db"; // Ensure this is correctly set up

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const session = await getSession({ req });

  if (!session || !session.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const db = await connectDB();
    const collection = db.collection("plans"); // Using "plans" collection

    // Fetch all plans for the logged-in user
    const history = await collection
      .find({ userEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json({ history: history || [] });
  } catch (error) {
    console.error("Error fetching travel history:", error);
    res.status(500).json({ error: "Failed to fetch travel history" });
  }
}
