import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;

export interface JWTPayload {
  userId: number;
  username: string;
  email: string;
  role: string;
}

// Genera un JWT con los datos del usuario
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// Verifica y decodifica un JWT
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

// Extrae el usuario autenticado de la request (header Authorization: Bearer <token>)
export function getAuthUser(req: NextRequest): JWTPayload | null {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  return verifyToken(token);
}

// Verifica la contraseña hasheada por Django (PBKDF2-SHA256)
// Formato Django: pbkdf2_sha256$<iterations>$<salt>$<hash>
export function verifyDjangoPassword(password: string, encoded: string): boolean {
  const parts = encoded.split('$');
  if (parts.length !== 4 || parts[0] !== 'pbkdf2_sha256') return false;

  const [, iterStr, salt, storedHash] = parts;
  const iterations = parseInt(iterStr, 10);

  const derivedKey = crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha256');
  const computedHash = derivedKey.toString('base64');

  return computedHash === storedHash;
}

// Hashea una contraseña nueva en formato Django (PBKDF2-SHA256)
export function hashPassword(password: string): string {
  const iterations = 870000;
  const salt = crypto.randomBytes(12).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 22);
  const derivedKey = crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha256');
  const hash = derivedKey.toString('base64');
  return `pbkdf2_sha256$${iterations}$${salt}$${hash}`;
}
