import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from "zod"

const prisma = new PrismaClient();

const userData = z.object({
  username: z.string(),
  useremail: z.string(),
  userpassword: z.string()
})

function generate8digitOtp() {
  const min = 10000000; 
  const max = 99999999; 
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const otp = String(generate8digitOtp());
    const verified = false
    const { username: name, useremail: email, userpassword: password } = userData.parse(req.body);
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
