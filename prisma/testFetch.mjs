import { PrismaClient } from '@prisma/client';

async function fetchClips() {
    const prisma = new PrismaClient();

    try {
        // Fetch all clips without any filter
        const allClips = await prisma.clip.findMany();
        console.log(allClips);
    } catch (error) {
        console.error('Error fetching clips:', error);
    } finally {
        await prisma.$disconnect();
    }
}

fetchClips();
