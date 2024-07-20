import nodemailer from "nodemailer"
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from "zod"

const prisma = new PrismaClient();

const userData = z.object({
    email: z.string()
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { email } = userData.parse(req.body);

    if (req.method === 'POST') {

        try {
            const users = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "sonu.mondal.2027@gmail.com",
                    pass: "olpu rpqo rdcr gjdd",
                },
            });

            const mailOptions = {
                from: "sonu.mondal.2027@gmail.com",
                to: email,
                subject: "Email Verification Code",
                text: `Your verification code is: ${users?.otp}.
                Enter this verification code to proceed`,
            };

            await transporter.sendMail(mailOptions);

            res.status(201).json({ emailstatus: "Email sent successfully!" });

        } catch (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ emailstatus: "Error sending email!" });
            throw error
        } finally {
            await prisma.$disconnect();
        }

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}