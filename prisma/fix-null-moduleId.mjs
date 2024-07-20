import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixNullModuleId() {
    try {
        // Fetch all clips
        const allClips = await prisma.clip.findMany();

        // Process clips with null moduleId
        const invalidClips = allClips.filter(clip => !clip.moduleId);

        if (invalidClips.length > 0) {
            console.log(`Found ${invalidClips.length} clips with null moduleId`);

            for (const clip of invalidClips) {
                console.log(`Deleting clip with ID: ${clip.id}`);
                // Optionally update or delete these records
                await prisma.clip.delete({
                    where: { id: clip.id }
                });
            }
        } else {
            console.log('No clips with null moduleId found');
        }
    } catch (error) {
        console.error('Error fixing null moduleId:', error);
    } finally {
        await prisma.$disconnect();
    }
}

fixNullModuleId();
