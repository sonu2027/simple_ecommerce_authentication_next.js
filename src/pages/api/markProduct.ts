import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { userId, productId } = req.body;

        console.log("userId and productId in marked product: ", userId , productId, typeof userId ,typeof productId);
        
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
