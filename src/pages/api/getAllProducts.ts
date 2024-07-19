import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        console.log("req for get method");

        try {
            const products = await prisma.product.findMany({})
            console.log("Product is: ", products);

            res.status(201).json(products);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching product' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
