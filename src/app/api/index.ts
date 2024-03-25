import { PrismaClient } from "@prisma/client";

export interface CustomHeaders extends Headers {
  'user-wallet-address'?: string;
}

export const prisma = new PrismaClient();
