import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from "zod"

const prisma = new PrismaClient();

const userData = z.object({
    useremail: z.string(),
    userpassword: z.string(),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {

        const { useremail: email, userpassword: password } = userData.parse(req.body);
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                    password,
                },
            });

            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error login user' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
