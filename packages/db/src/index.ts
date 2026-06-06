import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import {config} from "dotenv"
import { resolve } from "path";

config({ path: resolve(__dirname, "../.env") });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

export const prismaClient = new PrismaClient({ adapter });
export * from "../generated/prisma/client";
