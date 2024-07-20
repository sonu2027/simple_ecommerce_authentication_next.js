import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const prisma = new PrismaClient();

const deleteMarkedProductSchema = z.object({
    userId: z.number(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        console.log("req for post method");
        const { userId } = deleteMarkedProductSchema.parse(req.body)

        try {
            const markedProductId = await prisma.markedProductId.findMany({
                where: {
                    userId
                }
            })

            res.status(201).json(markedProductId);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching marked product' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
