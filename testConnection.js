const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://skudsi490:lHpMdYGJoyPuG82e@cluster0.r7augpr.mongodb.net/WONDERX";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connected to database!");
    } catch (e) {
        console.error("Connection error", e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
