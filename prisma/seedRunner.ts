// prisma/seedRunner.ts
async function runSeeding() {
    // Import and run the function from seed.mjs
    const { default: seedFromMjs } = await import('./seed.mjs');
    seedFromMjs(); // Call the default-exported seed function
}

runSeeding().catch((e) => {
    console.error(e);
    process.exit(1);
});
