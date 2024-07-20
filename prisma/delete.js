const { MongoClient } = require('mongodb');

async function updateSchema() {
  const uri = "mongodb+srv://skudsi490:lHpMdYGJoyPuG82e@cluster0.r7augpr.mongodb.net/WONDERX";  // replace with your connection string
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db("WONDERX");  // replace with your database name

    // Remove `description` field from all documents in the `Module` collection
    await db.collection('Module').updateMany({}, { $unset: { description: "" } });

    // Remove `description` and `thumbnailUrl` fields from all documents in the `Clip` collection
    await db.collection('Clip').updateMany({}, { $unset: { description: "", thumbnailUrl: "" } });

    console.log("Schema updated successfully!");

  } catch (error) {
    console.error("Error updating schema:", error);
  } finally {
    await client.close();
  }
}

updateSchema();
