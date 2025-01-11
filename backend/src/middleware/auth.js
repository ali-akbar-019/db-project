import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});


export const jwtParse = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.sub) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const auth0Id = decoded.sub;

    const user = await prisma.user.findUnique({
      where: { auth0Id },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.auth0Id = auth0Id;
    req.userId = user.id.toString();
    next();
  } catch (error) {
    console.error("Error decoding token:", error);
    return res.status(401).json({ message: "Unauthorized: Error decoding token" });
  }
};
