import { PrismaClient } from '@prisma/client';

async function seed() {
    const prisma = new PrismaClient();

    try {
        // Fetch all clips without checking for moduleId
        const allClips = await prisma.clip.findMany();

        for (let clip of allClips) {
            // Only process clips with a valid moduleId
            if (clip.moduleId) {
                // Convert duration from string to integer (minutes to seconds)
                let durationInSeconds = parseInt(clip.duration) * 60;

                // Update the clip's duration
                await prisma.clip.update({
                    where: { id: clip.id },
                    data: { duration: durationInSeconds.toString() } // Storing as string as per the model
                });
            }
        }

        console.log('Migration completed successfully!');
    } catch (error) {
        console.error('Error during seed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
