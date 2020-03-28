import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

export const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  req: Request
  res: Response
  payload?: { userId: string }
}

export function createContext({
  req,
  res,
}: {
  req: Request
  res: Response
}): Context {
  return { prisma, req, res }
}
