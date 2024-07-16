import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { useremail: email, otp } = req.body;
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (user && user.otp && user.otp === otp) {
                console.log("otp verification successful");
                res.status(201).json(user);
            }
            else {
                console.log("otp verification failed");
                throw new Error("OTP verification failed");
            }
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
