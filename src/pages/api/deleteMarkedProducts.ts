import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { userId, productId } = req.body

        console.log("userId and product id received is: ", userId, productId, typeof userId, typeof productId);

        try {
            console.log("I am in delete method");
            const deleteMarkedProduct = await prisma.markedProductId.delete({
                where: {
                    productId_userId: { // Compound key
                        productId: productId,
                        userId: userId
                    }
                }
            })
            console.log("deleted marked Product is: ", deleteMarkedProduct);

            res.status(201).json(deleteMarkedProduct);
        } catch (error) {
            res.status(500).json({ error: 'Error deleting marked product product' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
