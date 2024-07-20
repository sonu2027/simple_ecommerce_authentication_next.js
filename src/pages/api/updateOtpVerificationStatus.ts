import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from "zod"

const prisma = new PrismaClient();

const userData = z.object({
    email: z.string()
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const verified = true
    if (req.method === 'PUT') {
        const { email } = userData.parse(req.body);
        try {
            const user = await prisma.user.update({
                where: {
                    email,
                },
                data: {
                    verified
                }
            });
            res.status(201).json(user);

        } catch (error) {
            res.status(500).json({ error: 'Error registering user' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
