import nodemailer from "nodemailer"


import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { email } = req.body;

    if (req.method === 'POST') {

        try {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            let transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "sonu.mondal.2027@gmail.com",
                    pass: "olpu rpqo rdcr gjdd",
                },
            });

            let mailOptions = {
                from: "sonu.mondal.2027@gmail.com",
                to: email,
                subject: "Email Verification Code",
                text: `Your verification code is: ${user.otp}.
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