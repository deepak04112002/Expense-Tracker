import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export default function rateLimit() {
  return new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s"),
  });
}
