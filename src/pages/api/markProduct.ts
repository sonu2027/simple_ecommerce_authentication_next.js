import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from "zod"

const prisma = new PrismaClient();

const productData = z.object({
    userId: z.number(),
    productId: z.string()
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { userId, productId }: { userId: number, productId: string } = productData.parse(req.body);

        try {
            const MarkedProductId = await prisma.markedProductId.create({
                data: {
                    userId,
                    productId
                },
            });
            res.status(201).json(MarkedProductId)
        } catch (error) {
            res.status(500).json({ error: 'Error marking product' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
