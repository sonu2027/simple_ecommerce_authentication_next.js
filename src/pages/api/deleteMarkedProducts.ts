import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const prisma = new PrismaClient();

const deleteMarkedProductSchema = z.object({
    userId: z.number(),
    productId: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        try {
            const { userId, productId } = deleteMarkedProductSchema.parse(req.body);

            const deleteMarkedProduct = await prisma.markedProductId.delete({
                where: {
                    productId_userId: { 
                        productId: productId,
                        userId: userId,
                    },
                },
            });

            res.status(201).json(deleteMarkedProduct);
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: 'Invalid request body' });
            } else {
                res.status(500).json({ error: 'Error deleting marked product' });
            }
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
