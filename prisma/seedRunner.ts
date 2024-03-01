async function runSeeding() {
    // Import and run the function from seed.mjs
    const seedFromMjs = await import('./seed.mjs');
    seedFromMjs.default(); // Assuming you're exporting a default function in seed.mjs
}

runSeeding().catch((e) => {
    console.error(e);
    process.exit(1);
});
