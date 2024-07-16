import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

function generate8digitOtp() {
  const min = 10000000; // Minimum 8-digit number
  const max = 99999999; // Maximum 8-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const otp = String(generate8digitOtp());
    const verified = false
    const { username: name, useremail: email, userpassword: password } = req.body;
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
          otp,
          verified
        },
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
