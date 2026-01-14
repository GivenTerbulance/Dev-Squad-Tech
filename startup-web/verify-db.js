require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

async function verify() {
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    try {
        const users = await prisma.user.findMany();
        console.log("Users in database:", users);
    } catch (err) {
        console.error("Verification failed:", err);
    } finally {
        await pool.end();
    }
}

verify();
