import { NextRequest } from "next/server";
import crypto from "crypto";

interface AttemptRecord {
  count: number;
  resetAt: number;
}

// In-memory tracker for failed login attempts
// Map<IP, AttemptRecord>
const failedAttempts = new Map<string, AttemptRecord>();

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Extracts client IP from request headers (works with Vercel, proxies, and localhost)
 */
export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

/**
 * Checks whether the client IP is currently rate-limited.
 * Returns { isLimited: boolean, remainingAttempts: number, retryAfterSeconds: number }
 */
export function checkRateLimit(ip: string): {
  isLimited: boolean;
  remainingAttempts: number;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const record = failedAttempts.get(ip);

  if (!record) {
    return { isLimited: false, remainingAttempts: MAX_FAILED_ATTEMPTS, retryAfterSeconds: 0 };
  }

  // If lockout window has expired, clear record
  if (now > record.resetAt) {
    failedAttempts.delete(ip);
    return { isLimited: false, remainingAttempts: MAX_FAILED_ATTEMPTS, retryAfterSeconds: 0 };
  }

  // If exceeded max attempts
  if (record.count >= MAX_FAILED_ATTEMPTS) {
    const retryAfterSeconds = Math.ceil((record.resetAt - now) / 1000);
    return { isLimited: true, remainingAttempts: 0, retryAfterSeconds };
  }

  return {
    isLimited: false,
    remainingAttempts: MAX_FAILED_ATTEMPTS - record.count,
    retryAfterSeconds: 0,
  };
}

/**
 * Records a failed attempt for the client IP.
 */
export function recordFailedAttempt(ip: string): number {
  const now = Date.now();
  const record = failedAttempts.get(ip);

  if (!record || now > record.resetAt) {
    failedAttempts.set(ip, {
      count: 1,
      resetAt: now + LOCKOUT_WINDOW_MS,
    });
    return MAX_FAILED_ATTEMPTS - 1;
  }

  record.count += 1;
  return Math.max(0, MAX_FAILED_ATTEMPTS - record.count);
}

/**
 * Clears failed attempts for an IP upon successful authentication.
 */
export function resetRateLimit(ip: string): void {
  failedAttempts.delete(ip);
}

/**
 * Constant-time string comparison to prevent timing attacks.
 */
export function secureCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) {
      // Still execute timingSafeEqual with dummy to maintain constant time
      crypto.timingSafeEqual(bufA, bufA);
      return false;
    }
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}
